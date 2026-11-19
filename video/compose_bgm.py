import numpy as np, wave
SR = 44100
TOTAL = 93.0
BPM = 66.0
BEAT = 60.0 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(7)
N = int(SR * (TOTAL + 4))
L = np.zeros(N); R = np.zeros(N)

def midi(n): return 440.0 * 2 ** ((n - 69) / 12)

def piano(f, dur, vel):
    n = int(SR * dur); t = np.arange(n) / SR
    tone = np.zeros(n)
    for k, a in enumerate([1.0, 0.45, 0.22, 0.12, 0.06, 0.03], start=1):
        fk = f * k * (1 + 0.0004 * k * k)
        tone += a * np.sin(2 * np.pi * fk * t) * np.exp(-t * (1.6 + 0.9 * k))
    env = np.minimum(1, t / 0.006) * (0.75 * np.exp(-t * 2.2) + 0.25 * np.exp(-t * 0.45))
    rel = np.clip((dur - t) / 0.25, 0, 1)
    return vel * tone * env * rel

def pad(freqs, dur, vel):
    n = int(SR * dur); t = np.arange(n) / SR
    out = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.0, 0.12):
            ff = f * 2 ** (det / 12 / 4)
            out += np.sin(2 * np.pi * ff * t + rng.uniform(0, 6.28)) + 0.18 * np.sin(2 * np.pi * 2 * ff * t)
    out /= max(1, len(freqs) * 3)
    env = np.minimum(1, t / 1.6) * np.clip((dur - t) / 1.4, 0, 1)
    return vel * out * env

def add(sig, start, pan=0.0):
    i = int(start * SR); j = min(N, i + len(sig)); s = sig[: j - i]
    L[i:j] += s * (1 - max(0, pan)); R[i:j] += s * (1 + min(0, pan))

# 화음 (MIDI): 베이스, 화음음들
D, A, Bm, G = 50, 45, 47, 43
prog = [
    (38, [62, 66, 69]),        # D
    (37, [61, 64, 69]),        # A/C#
    (35, [62, 66, 71]),        # Bm
    (31, [62, 67, 71]),        # G
    (42, [62, 66, 69]),        # D/F#
    (31, [59, 62, 67]),        # G
    (40, [59, 62, 67]),        # Em7
    (33, [62, 64, 69]),        # Asus4 → A
]
CHORD_LEN = 2 * BAR
start = 3.0       # 앞 3초는 패드만
# 패드 깔기
t0 = 0.0
k = 0
while t0 < TOTAL:
    bass, tri = prog[k % len(prog)]
    if t0 == 0.0:
        add(pad([midi(n) for n in [bass + 12] + tri], start + CHORD_LEN + 1.2, 0.20), 0.0)
        t0 = start + CHORD_LEN; k += 1; continue
    add(pad([midi(n) for n in [bass + 12] + tri], CHORD_LEN + 1.2, 0.20), t0 - 0.6)
    t0 += CHORD_LEN; k += 1

# 피아노 아르페지오 (8분음표)
t0 = start; k = 0
end_music = TOTAL - 6.5
while t0 < end_music:
    bass, tri = prog[k % len(prog)]
    pattern = [bass, bass + 7, tri[0], tri[1], tri[2], tri[1], tri[0], bass + 7]
    for bar in range(2):
        for i, n in enumerate(pattern):
            tt = t0 + bar * BAR + i * BEAT / 2 + rng.normal(0, 0.006)
            if tt >= end_music: break
            vel = (0.30 if i == 0 else 0.17) * (0.9 + 0.2 * rng.random())
            if k % len(prog) == 7 and bar == 1 and n == tri[1]: n = 61   # sus4 → 3도로 해결
            add(piano(midi(n), 2.6, vel), tt, pan=-0.25 + 0.5 * (i / 7))
    t0 += CHORD_LEN; k += 1

# 둘째 바퀴부터 단순한 멜로디 (찬양풍)
mel_start = start + CHORD_LEN * 8
melody = [  # (박, 음, 길이)
    (0, 78, 2), (2, 76, 1), (3, 74, 1), (4, 76, 3), (8, 73, 2), (10, 76, 2), (12, 76, 3),
    (16, 74, 2), (18, 73, 1), (19, 71, 1), (20, 74, 3), (24, 74, 2), (26, 71, 2), (28, 71, 3),
    (32, 69, 2), (34, 74, 2), (36, 78, 3), (40, 79, 2), (42, 78, 1), (43, 76, 1), (44, 74, 3),
    (48, 71, 2), (50, 74, 1), (51, 76, 1), (52, 76, 3), (56, 76, 2), (58, 73, 2), (60, 74, 4),
]
for b, n, ln in melody:
    tt = mel_start + b * BEAT
    if tt + 0.3 < end_music:
        add(piano(midi(n), ln * BEAT + 1.2, 0.22), tt, pan=0.1)

# 마지막 D 화음
fin = end_music + 0.2
for i, n in enumerate([38, 50, 57, 62, 66, 69, 74]):
    add(piano(midi(n), 6.0, 0.20 if i else 0.28), fin + i * 0.09)
add(pad([midi(n) for n in [50, 62, 66, 69]], 6.3, 0.22), fin - 0.3)

# 리버브 (지수 감쇠 잡음 임펄스, FFT 합성곱)
def reverb(x, secs=2.4, mix=0.28):
    n = int(SR * secs); t = np.arange(n) / SR
    ir = rng.normal(0, 1, n) * np.exp(-t * 3.2); ir[0] = 0
    ir /= np.sqrt((ir ** 2).sum())
    m = len(x) + n
    size = 1 << int(np.ceil(np.log2(m)))
    y = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    return (1 - mix) * x + mix * y
L, R = reverb(L), reverb(R)
# 부드럽게 (고음 살짝 깎기)
def lowpass(x, a=0.35):
    y = np.empty_like(x); acc = 0.0
    for i in range(0, len(x), 1): pass
    return np.convolve(x, np.ones(3) / 3, mode='same')
L, R = lowpass(L), lowpass(R)

n_out = int(SR * TOTAL)
L, R = L[:n_out], R[:n_out]
t = np.arange(n_out) / SR
fade = np.minimum(1, t / 1.5) * np.clip((TOTAL - t) / 3.0, 0, 1)
L *= fade; R *= fade
peak = max(np.abs(L).max(), np.abs(R).max())
L, R = L / peak * 0.85, R / peak * 0.85
data = (np.stack([L, R], axis=1) * 32767).astype('<i2')
with wave.open('bgm.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('ok', round(n_out / SR, 1), 's')
