const handlers = new Set();
let x = -9999;
let y = -9999;
let pending = false;
let bound = false;

function flush() {
  pending = false;
  handlers.forEach((fn) => fn(x, y));
}

export function onCursor(fn) {
  handlers.add(fn);
  if (!bound) {
    bound = true;
    window.addEventListener(
      'pointermove',
      (event) => {
        if (event.pointerType === 'touch') {
          return;
        }
        x = event.clientX;
        y = event.clientY;
        if (!pending) {
          pending = true;
          requestAnimationFrame(flush);
        }
      },
      { passive: true }
    );
  }
}
