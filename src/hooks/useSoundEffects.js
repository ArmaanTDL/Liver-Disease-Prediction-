/**
 * useSoundEffects — Procedural sound engine using Web Audio API.
 * Soothing, low-pitched, gentle sound effects:
 *  - Scroll : soft low woodblock-style tick
 *  - Click  : warm bell-like tone with gentle decay
 *  - Hover  : barely-there whisper tone
 */

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ─── Master limiter / compressor (applied once at destination level) ──────────
let masterGain = null;
function getMasterGain(ctx) {
  if (!masterGain) {
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 10;
    comp.ratio.value = 4;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;

    masterGain = ctx.createGain();
    masterGain.gain.value = 0.6; // overall volume — keep it quiet

    masterGain.connect(comp);
    comp.connect(ctx.destination);
  }
  return masterGain;
}

// ─── Sound primitives ────────────────────────────────────────────────────────

/**
 * Soft low-pitched "tick" — like a gentle wooden bead drop.
 * Very short sine burst at ~120–180 Hz with slow decay.
 */
function playScrollTick() {
  try {
    const ctx = getCtx();
    const out  = getMasterGain(ctx);
    const now  = ctx.currentTime;

    // Slightly randomise pitch so repeated ticks feel natural
    const baseFreq = 130 + Math.random() * 40; // 130–170 Hz  (low C–ish range)

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, now + 0.12);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.008); // soft attack
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18); // gentle decay

    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch (_) {}
}

/**
 * Warm bell-like "chime" — soft sine + overtone, long tail.
 * Used for button/interactive element clicks.
 */
function playClick() {
  try {
    const ctx = getCtx();
    const out  = getMasterGain(ctx);
    const now  = ctx.currentTime;

    // Fundamental — warm low bell note (~220 Hz = A3)
    const fundamental = 220;

    const playTone = (freq, gainPeak, duration, type = 'sine') => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, now);
      gain.gain.linearRampToValueAtTime(gainPeak, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(out);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    };

    playTone(fundamental,       0.28, 0.5);          // fundamental
    playTone(fundamental * 2,   0.10, 0.35);         // 1st harmonic (softer)
    playTone(fundamental * 3.5, 0.04, 0.2);          // slight bell inharmonicity
  } catch (_) {}
}

/**
 * Whisper-soft hover — barely audible breath-like tone.
 */
function playHover() {
  try {
    const ctx = getCtx();
    const out  = getMasterGain(ctx);
    const now  = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(280, now + 0.07);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (_) {}
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useSoundEffects() {
  return { playScrollTick, playClick, playHover };
}

export { playScrollTick, playClick, playHover };
