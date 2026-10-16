export class QuestionFlow {
  constructor(root, { onDone }) {
    this.screens = [...root.querySelectorAll('[data-question]')];
    this.next = root.querySelector('[data-action="next-question"]');
    this.progress = root.querySelector('[data-question-progress]');
    this.onDone = onDone;
    this.index = 0;

    this.screens.forEach((screen) => {
      screen.addEventListener('click', (event) => {
        const option = event.target.closest('[data-option]');
        if (option) this.pick(screen, option);
      });
    });
    root.querySelectorAll('[data-other]').forEach((input) => input.addEventListener('input', () => this.update()));
    this.next.addEventListener('click', () => this.advance());
  }

  start() {
    this.show(0);
  }

  get current() {
    return this.screens[this.index];
  }

  show(index) {
    this.index = index;
    this.screens.forEach((screen, i) => { screen.hidden = i !== index; });
    this.progress.textContent = `${index + 1} of ${this.screens.length}`;
    this.current.scrollIntoView({ block: 'nearest' });
    this.update();
  }

  pick(screen, option) {
    const pressed = option.getAttribute('aria-pressed') !== 'true';
    if (screen.dataset.pick === 'one') {
      screen.querySelectorAll('[data-option]').forEach((other) => this.setPressed(other, false));
    }
    this.setPressed(option, pressed);
    this.update();
  }

  setPressed(option, pressed) {
    option.setAttribute('aria-pressed', pressed);
    option.classList.toggle('is-active', pressed);
  }

  update() {
    const screen = this.current;
    const answered = screen.querySelector('[aria-pressed="true"]') || screen.querySelector('[data-other]')?.value.trim();
    this.next.disabled = screen.dataset.pick === 'one' && !answered;
  }

  advance() {
    if (this.index < this.screens.length - 1) {
      this.show(this.index + 1);
      return;
    }
    this.onDone(this.answers());
  }

  answers() {
    return Object.fromEntries(this.screens.map((screen) => [screen.dataset.question, {
      picked: [...screen.querySelectorAll('[aria-pressed="true"]')].map((option) => Number(option.dataset.option)),
      other: screen.querySelector('[data-other]')?.value.trim() || ''
    }]));
  }
}
