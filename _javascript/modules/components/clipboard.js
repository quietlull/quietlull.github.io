/**
 * Clipboard functions
 *
 * Dependencies:
 *    clipboard.js (https://github.com/zenorocha/clipboard.js)
 */

// Tooltip import removed - it only drove the "Copied!" bubble, and Bootstrap is gone (D48).
// The icon swap below (ICON_DEFAULT <-> ICON_SUCCESS) is the copy button's own feedback and
// did not depend on the tooltip; it still runs unchanged.

const clipboardSelector = '.code-header>button';

const ICON_DEFAULT = 'far fa-clipboard';
const ICON_SUCCESS = 'fas fa-check';

const ATTR_TIMEOUT = 'timeout';
const TIMEOUT = 2000; // in milliseconds

function isLocked(node) {
  if (node.hasAttribute(ATTR_TIMEOUT)) {
    let timeout = node.getAttribute(ATTR_TIMEOUT);
    if (Number(timeout) > Date.now()) {
      return true;
    }
  }

  return false;
}

function lock(node) {
  node.setAttribute(ATTR_TIMEOUT, Date.now() + TIMEOUT);
}

function unlock(node) {
  node.removeAttribute(ATTR_TIMEOUT);
}

function setSuccessIcon(btn) {
  const icon = btn.children[0];
  icon.setAttribute('class', ICON_SUCCESS);
}

function resumeIcon(btn) {
  const icon = btn.children[0];
  icon.setAttribute('class', ICON_DEFAULT);
}

function setCodeClipboard() {
  const clipboardList = document.querySelectorAll(clipboardSelector);

  if (clipboardList.length === 0) {
    return;
  }

  // Initial the clipboard.js object
  const clipboard = new ClipboardJS(clipboardSelector, {
    target: (trigger) => {
      const codeBlock = trigger.parentNode.nextElementSibling;
      return codeBlock.querySelector('code .rouge-code');
    }
  });

  clipboard.on('success', (e) => {
    const trigger = e.trigger;

    e.clearSelection();

    if (isLocked(trigger)) {
      return;
    }

    setSuccessIcon(trigger);
    lock(trigger);
    // OURS: achievement hook + sparkler burst on a successful copy (re-apply on Chirpy upgrade)
    document.dispatchEvent(new Event('achievement:codecopy'));

    if (typeof window.sparklerBurst === 'function') {
      const rect = trigger.getBoundingClientRect();
      window.sparklerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    setTimeout(() => {
      resumeIcon(trigger);
      unlock(trigger);
    }, TIMEOUT);
  });
}

function setLinkClipboard() {
  const btnCopyLink = document.getElementById('copy-link');

  if (btnCopyLink === null) {
    return;
  }

  // NOTE: this button's "Copied!" feedback was 100% the tooltip title swap below - unlike the
  // code-copy button above, it has no icon swap or other visual of its own. Removing the
  // tooltip leaves the copy working but silent (no confirmation shown at all). That is a real
  // UX loss, not a like-for-like removal - flagging for Rod rather than inventing a new visual.
  btnCopyLink.addEventListener('click', (e) => {
    const target = e.target;

    if (isLocked(target)) {
      return;
    }

    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      lock(target);

      setTimeout(() => {
        unlock(target);
      }, TIMEOUT);
    });
  });
}

export function initClipboard() {
  setCodeClipboard();
  setLinkClipboard();
}
