const TYPE_SPEED = 35;
const ERASE_START = 40;
const ERASE_MIN = 10;
const ERASE_ACCEL = 0.85;
const LEAVE_DELAY = 10000;
const ENTER_DELAY = 300;

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

    let eraseSpeed = ERASE_START;

    function eraseStep() {
      if (revealCount > 0) {
        revealCount--;
        render(startText, revealCount);
        eraseSpeed = Math.max(ERASE_MIN, eraseSpeed * ERASE_ACCEL);
        timer = setTimeout(eraseStep, eraseSpeed);
      } else {
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
