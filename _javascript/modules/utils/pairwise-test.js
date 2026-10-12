function shuffle(list, random) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export class PairwiseTest {
  constructor(items, { variants = 1, controls = 0, random = Math.random } = {}) {
    const take = () => Math.floor(random() * variants);
    const trials = [];

    items.forEach((a, i) => items.slice(i + 1).forEach((b) => {
      trials.push({ a, b }, { a: b, b: a });
    }));
    trials.forEach((t) => { t.takeA = t.takeB = take(); });

    if (variants > 1) {
      shuffle([...items], random).slice(0, controls).forEach((id) => {
        const takeA = take();
        const takeB = (takeA + 1 + Math.floor(random() * (variants - 1))) % variants;
        trials.push({ a: id, b: id, takeA, takeB, control: true });
      });
    }

    this.items = items;
    this.trials = shuffle(trials, random);
    this.picks = [];
  }

  get current() {
    return this.trials[this.picks.length];
  }

  get done() {
    return this.picks.length === this.trials.length;
  }

  choose(side) {
    this.picks.push(side);
  }

    summary() {
    const wins = Object.fromEntries(this.items.map((id) => [id, 0]));
    const firstWinner = new Map();
    let agree = 0;
    let pairs = 0;

    this.trials.forEach((t, i) => {
      if (t.control) return;
      const winner = t[this.picks[i]];
      wins[winner]++;
      const key = [t.a, t.b].sort().join();
      if (!firstWinner.has(key)) {
        firstWinner.set(key, winner);
      } else {
        pairs++;
        if (firstWinner.get(key) === winner) agree++;
      }
    });

    return {
      ranking: this.items.map((id) => ({ id, wins: wins[id] })).sort((x, y) => y.wins - x.wins),
      outOf: 2 * (this.items.length - 1),
      consistent: [agree, pairs],
      pickedA: [this.picks.filter((p) => p === 'a').length, this.picks.length]
    };
  }
}
