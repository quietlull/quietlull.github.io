const clipboardSelector = '.code-header>button';

const ICON_DEFAULT = 'far fa-clipboard';
const ICON_SUCCESS = 'fas fa-check';

const ATTR_TIMEOUT = 'timeout';
const TIMEOUT = 2000;

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

  btnCopyLink.addEventListener('click', (e) => {
    const target = e.target;

    if (isLocked(target)) {
      return;
    }

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
