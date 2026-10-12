export class AudioClip {
  constructor(url, { gainDb = 0 } = {}) {
    this.url = url;
    this.gain = 10 ** (gainDb / 20);
    this.buffer = null;
    this.loading = null;
  }

  load(ctx) {
    this.loading ??= fetch(this.url)
      .then((res) => {
        if (!res.ok) throw new Error(`${this.url}: ${res.status}`);
        return res.arrayBuffer();
      })
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        this.buffer = buffer;
        return this;
      });
    return this.loading;
  }

  get duration() {
    return this.buffer ? this.buffer.duration : 0;
  }
}
