/* code-block behavior — copy the block's text; feedback in the button label. */
const FEEDBACK_MS = 1500;

export function init(root = document) {
  root.querySelectorAll('.code-block').forEach((block) => {
    const copyButton = block.querySelector('.js-copy');
    const code = block.querySelector('.js-code');
    if (!copyButton || !code) {
      return;
    }
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        copyButton.textContent = 'copied';
      } catch {
        copyButton.textContent = 'select + copy';
      }
      setTimeout(() => {
        copyButton.textContent = 'copy';
      }, FEEDBACK_MS);
    });
  });
}
