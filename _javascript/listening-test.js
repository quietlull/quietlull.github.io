import { basic } from './modules/layouts';
import { AudioClip } from './modules/audio/audio-clip';
import { AudioPlayer } from './modules/audio/audio-player';
import { PairwiseTest } from './modules/utils/pairwise-test';

basic();

const root = document.getElementById('listening-test');
if (root) init(root);

function init(root) {
  const data = JSON.parse(document.getElementById('listening-test-data').textContent);
  const q = (sel) => root.querySelector(sel);
  const show = (name) => root.querySelectorAll('[data-step]').forEach((el) => {
    el.hidden = el.dataset.step !== name;
  });

  const shared = readHash();
  if (shared) {
    showResults(shared);
    return;
  }

  const player = new AudioPlayer();
  const clips = Object.fromEntries(data.switches.map((s) => [
    s.id,
    Array.from({ length: data.takes }, (_, n) => new AudioClip(`${data.media}/${s.id}-${n}.mp3`))
  ]));
  const test = new PairwiseTest(data.switches.map((s) => s.id), {
    variants: data.takes,
    controls: data.controls
  });
  const heard = { a: false, b: false };

  const playButtons = root.querySelectorAll('[data-play]');
  const chooseButtons = root.querySelectorAll('[data-choose]');

  q('[data-action="start"]').addEventListener('click', async (event) => {
    event.currentTarget.disabled = true;
    q('[data-status]').textContent = 'Loading sounds...';
    try {
      await player.load(Object.values(clips).flat());
    } catch (err) {
      q('[data-status]').textContent = `Could not load the sounds (${err.message}). Try reloading.`;
      return;
    }
    show('trial');
    renderTrial();
  });

  playButtons.forEach((btn) => btn.addEventListener('click', () => {
    const side = btn.dataset.play;
    const trial = test.current;
    const clip = clips[trial[side]][trial[side === 'a' ? 'takeA' : 'takeB']];
    if (player.playing && player.clip === clip) {
      player.stop();
    } else {
      player.play(clip);
      heard[side] = true;
    }
    renderButtons();
  }));

  chooseButtons.forEach((btn) => btn.addEventListener('click', () => {
    player.stop();
    test.choose(btn.dataset.choose);
    showProgress();
    if (test.done) {
      const summary = test.summary();
      history.replaceState(null, '', `#r=${btoa(JSON.stringify(summary))}`);
      showResults(summary);
    } else {
      renderTrial();
    }
  }));

  function showProgress() {
    const bar = q('[data-progress-bar]');
    const fraction = test.picks.length / test.trials.length;
    bar.style.setProperty('--percent', `${fraction * 100}%`);
    if (typeof window.sparklerBurst === 'function') {
      const rect = bar.getBoundingClientRect();
      window.sparklerBurst(rect.left + rect.width * fraction, rect.top + rect.height / 2);
    }
  }

  function renderTrial() {
    heard.a = heard.b = false;
    q('[data-progress]').textContent = `Pair ${test.picks.length + 1} of ${test.trials.length}`;
    renderButtons();
  }

  function renderButtons() {
    const trial = test.current;
    playButtons.forEach((btn) => {
      const side = btn.dataset.play;
      const on = player.playing && player.clip === clips[trial[side]][trial[side === 'a' ? 'takeA' : 'takeB']];
      btn.setAttribute('aria-pressed', on);
    });
    chooseButtons.forEach((btn) => { btn.disabled = !(heard.a && heard.b); });
  }

  function showResults(summary) {
    const byId = Object.fromEntries(data.switches.map((s) => [s.id, s]));
    const list = q('[data-results]');
    let rank = 0;
    const template = q('[data-result-template]');
    summary.ranking.forEach((entry, i) => {
      if (i === 0 || entry.wins < summary.ranking[i - 1].wins) rank = i + 1;
      const switchData = byId[entry.id];
      const percent = Math.round((100 * entry.wins) / summary.outOf);
      const row = template.content.firstElementChild.cloneNode(true);
      const field = (name) => row.querySelector(`[data-field="${name}"]`);
      row.style.setProperty('--percent', `${percent}%`);
      field('rank').textContent = rank;
      field('image').style.backgroundImage = `url("${switchData.image || data.placeholder}")`;
      field('name').textContent = switchData.name;
      field('percent').textContent = `${percent}%`;
      list.appendChild(row);
    });

    const copy = q('[data-action="copy"]');
    copy.addEventListener('click', () => {
      navigator.clipboard.writeText(location.href).then(() => {
        copy.querySelector('.kit-button__label').textContent = 'Link copied';
      });
    });
    show('results');
  }
}

function readHash() {
  const match = location.hash.match(/^#r=(.+)$/);
  if (!match) return null;
  try {
    return JSON.parse(atob(match[1]));
  } catch {
    return null;
  }
}
