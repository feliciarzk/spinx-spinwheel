// Simple synthesized sound effects using Web Audio API (no external files needed)

let audioCtx;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function beep(freq, duration, type = "sine", volume = 0.15, delay = 0) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const startTime = ctx.currentTime + delay;
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function playClick() {
  try {
    beep(600, 0.08, "square", 0.1);
  } catch (e) {
    // audio not supported / blocked, fail silently
  }
}

export function playWin() {
  try {
    beep(523.25, 0.15, "sine", 0.15, 0);      // C5
    beep(659.25, 0.15, "sine", 0.15, 0.12);   // E5
    beep(783.99, 0.25, "sine", 0.18, 0.24);   // G5
  } catch (e) {
    // audio not supported / blocked, fail silently
  }
}