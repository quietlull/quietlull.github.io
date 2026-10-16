export class QuestionFlow {
  constructor(root, { onDone }) {
    this.screens = [...root.querySelectorAll('[data-question]')];
    this.next = root.querySelector('[data-action="next-question"]');
    this.onDone = onDone;
    this.index = 0;

    this.screens.forEach((screen, i) => {
      screen.querySelector('[data-question-progress]').textContent = `Question ${i + 1} of ${this.screens.length}`;
      screen.addEventListener('input', () => this.update());
    });
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
    this.current.scrollIntoView({ block: 'nearest' });
    this.update();
  }

  update() {
    const answered = this.current.querySelector(':checked') || this.current.querySelector('[data-other]')?.value.trim();
    this.next.disabled = this.current.dataset.pick === 'one' && !answered;
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
      picked: [...screen.querySelectorAll(':checked')].map((input) => Number(input.value)),
      other: screen.querySelector('[data-other]')?.value.trim() || ''
    }]));
  }
}
