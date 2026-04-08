/**
 * Tool icon hover → typewriter reveal on landing tagline.
 * Full text is laid out immediately (no shifting). A cursor reveals
 * characters left-to-right. Erase accelerates like holding backspace.
 */

const TYPE_SPEED = 35;          // ms per character when typing
const ERASE_START = 40;         // ms per character at start of erase
const ERASE_MIN = 10;           // ms per character at fastest erase
const ERASE_ACCEL = 0.85;       // multiplier each erase tick (speeds up)
const LEAVE_DELAY = 10000;      // ms before reverting after mouseleave
const ENTER_DELAY = 300;        // ms hover before triggering (debounce quick passes)

export function initToolTaglines() {
  const tagline = document.querySelector('.landing-tagline');
  const icons = document.querySelectorAll('.tool-icon[data-tool-desc]');
  if (!tagline || !icons.length) return;

  const originalText = tagline.textContent.trim();
  let timer = null;
  let leaveTimer = null;
  let enterTimer = null;
  let currentTarget = originalText;
  let revealCount = originalText.length;

  // Lock container height so different-length texts don't cause layout shift
  tagline.style.minHeight = tagline.offsetHeight + 'px';
  tagline.classList.add('typewriter-ready');

  function escape(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render(text, count) {
    const visible = text.slice(0, count);
    const hidden = text.slice(count);
    tagline.innerHTML =
      `<span class="tl-visible">${escape(visible)}</span><span class="tl-hidden">${escape(hidden)}</span>`;
  }

  function stopAnimation() {
    clearTimeout(timer);
    clearTimeout(leaveTimer);
    clearTimeout(enterTimer);
    timer = null;
  }

  function animateTo(target) {
    stopAnimation();
    if (target === currentTarget && revealCount === currentTarget.length) return;

    const startText = currentTarget;
    currentTarget = target;
    tagline.classList.add('typing');

    // Phase 1: erase current text with acceleration
    let eraseSpeed = ERASE_START;

    function eraseStep() {
      if (revealCount > 0) {
        revealCount--;
        render(startText, revealCount);
        eraseSpeed = Math.max(ERASE_MIN, eraseSpeed * ERASE_ACCEL);
        timer = setTimeout(eraseStep, eraseSpeed);
      } else {
        // Brief crossfade to mask layout shift when switching texts
        tagline.style.opacity = '0';
        timer = setTimeout(() => {
          render(target, 0);
          tagline.style.opacity = '1';
          timer = setTimeout(typeStep, 150);
        }, 150);
      }
    }

    function typeStep() {
      if (revealCount < target.length) {
        revealCount++;
        render(target, revealCount);
        timer = setTimeout(typeStep, TYPE_SPEED);
      } else {
        timer = null;
        tagline.classList.remove('typing');
      }
    }

    eraseStep();
  }

  icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      clearTimeout(leaveTimer);
      clearTimeout(enterTimer);
      enterTimer = setTimeout(() => {
        animateTo(icon.dataset.toolDesc);
      }, ENTER_DELAY);
    });

    icon.addEventListener('mouseleave', () => {
      clearTimeout(enterTimer);
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => animateTo(originalText), LEAVE_DELAY);
    });
  });
}
