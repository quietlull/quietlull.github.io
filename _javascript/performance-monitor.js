// Performance monitoring class
export class PerformanceMonitor {
  constructor() {
    this.frames = 0;
    this.prevTime = performance.now();
    this.fps = 0;
    this.avgFrameTime = 0;
    this.frameTimes = [];
    this.lanternCount = 0; // Initialize
    
    // Create UI
    this.container = document.createElement('div');
    this.container.style.position = 'fixed';
    this.container.style.top = '10px';
    this.container.style.right = '10px';
    this.container.style.background = 'rgba(0, 0, 0, 0.8)';
    this.container.style.color = '#0f0';
    this.container.style.padding = '10px';
    this.container.style.fontFamily = 'monospace';
    this.container.style.fontSize = '12px';
    this.container.style.zIndex = '10000';
    this.container.style.borderRadius = '4px';
    document.body.appendChild(this.container);
    
    // Initial render
    this.render();
  }
  
  update() {
    const time = performance.now();
    const delta = time - this.prevTime;
    this.frameTimes.push(delta);
    
    // Keep last 60 frame times for averaging
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }
    
    this.frames++;
    
    // Update display once per second
    if (time >= this.prevTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (time - this.prevTime));
      this.avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      this.frames = 0;
      this.prevTime = time;
      
      this.render();
    }
  }
  
  render() {
    const color = this.fps >= 55 ? '#0f0' : this.fps >= 30 ? '#ff0' : '#f00';
    this.container.style.color = color;
    
    this.container.innerHTML = `
      FPS: ${this.fps}<br>
      Frame: ${this.avgFrameTime.toFixed(2)}ms<br>
      Lanterns: ${this.lanternCount || 0}
    `;
  }
  
  setLanternCount(count) {
    this.lanternCount = count;
    this.render(); // Update display immediately
  }
  
  remove() {
    this.container.remove();
  }
}