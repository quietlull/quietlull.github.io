const FADE_SECONDS = 0.01;

export class AudioPlayer {
  constructor() {
    this.ctx = new AudioContext();
    this.clip = null;
    this.source = null;
    this.gain = null;
    this.startedAt = 0;
  }

  load(clips) {
    return Promise.all(clips.map((clip) => clip.load(this.ctx)));
  }

  get playing() {
    return this.source !== null;
  }

  get position() {
    return this.playing ? (this.ctx.currentTime - this.startedAt) % this.clip.duration : 0;
  }

  play(clip) {
    const offset = this.position % clip.duration;
    this.stop();
    this.ctx.resume();

    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(clip.gain, now + FADE_SECONDS);
    gain.connect(this.ctx.destination);

    const source = this.ctx.createBufferSource();
    source.buffer = clip.buffer;
    source.loop = true;
    source.connect(gain);
    source.start(now, offset);

    Object.assign(this, { clip, source, gain, startedAt: now - offset });
  }

  stop() {
    if (!this.playing) return;
    const now = this.ctx.currentTime;
    this.gain.gain.setValueAtTime(this.gain.gain.value, now);
    this.gain.gain.linearRampToValueAtTime(0, now + FADE_SECONDS);
    this.source.stop(now + FADE_SECONDS);
    this.source = null;
    this.gain = null;
  }
}
