import { basic } from './modules/layouts';
import { AudioClip } from './modules/audio/audio-clip';
import { AudioPlayer } from './modules/audio/audio-player';
import { TierBoard } from './modules/components/tier-board';
import { QuestionFlow } from './modules/components/question-flow';
import { TIERS, AFFINITY_RANGE, tagAffinity } from './modules/utils/tier-scores';
import { shuffle } from './modules/utils/shuffle';
import { answerFactors } from './modules/utils/answer-factors';

basic();

const root = document.getElementById('tier-test');
if (root) init(root);

function init(root) {
  const data = JSON.parse(document.getElementById('tier-test-data').textContent);
  const q = (sel) => root.querySelector(sel);
  const show = (name) => root.querySelectorAll('[data-step]').forEach((el) => {
    el.hidden = el.dataset.step !== name;
  });

  const switches = Object.fromEntries(data.switches.map((item) => [item.id, item]));

  const player = new AudioPlayer();
  const clips = Object.fromEntries(Object.keys(switches).map((id) =>
    [id, new AudioClip(`${data.media}/${id}.mp3`)]));

  const shared = readHash();
  if (shared) {
    showResults(shared);
    return;
  }
  const done = q('[data-action="done"]');

  const board = new TierBoard(q('[data-tier-board]'), {
    onToggle(id) {
      if (player.playing && player.clip === clips[id]) {
        player.stop();
        board.setPlaying(null);
      } else {
        player.play(clips[id]);
        board.setPlaying(id);
      }
    },
    onDragStart() {
      player.stop();
      board.setPlaying(null);
    },
    onChange() {
      done.disabled = !board.anyRated;
    }
  });

  let loading = null;
  let answers = null;
  let order = null;

  async function openBoard(given) {
    answers = given;
    q('[data-loading]').textContent = 'Loading sounds...';
    try {
      await loading;
    } catch (err) {
      q('[data-loading]').textContent = `Could not load the sounds (${err.message}). Try reloading.`;
      return;
    }
    show('board');
    order = shuffle(Object.keys(switches));
    board.load(order);
  }

  const questions = data.questions && new QuestionFlow(q('[data-step="questions"]'), { onDone: openBoard });

  q('[data-action="start"]').addEventListener('click', () => {
    loading = player.load(Object.values(clips));
    show('questions');
    if (questions) questions.start();
    else openBoard({});
  });

  done.addEventListener('click', () => {
    player.stop();
    board.setPlaying(null);
    const result = { placement: board.placement(), answers, order };
    history.replaceState(null, '', `#r=${btoa(JSON.stringify(result))}`);
    showResults(result);
  });

  function showResults(result) {
    const grid = q('[data-result-cards]');
    [...TIERS, 'unrated'].flatMap((tier) => result.placement[tier].map((id) => [id, tier])).forEach(([id, tier], i) => {
      const card = grid.querySelector(`[data-card="${id}"]`);
      const rating = tier === 'unrated' ? 'Not rated' : `${tier} tier`;
      card.querySelector('[data-field="tier"]').textContent = `Clip ${result.order.indexOf(id) + 1} \u00b7 ${rating}`;
      card.classList.add(i % 2 ? 'posts-grid-hue-b' : 'posts-grid-hue-a');
      grid.appendChild(card);
    });

    const playButtons = [...grid.querySelectorAll('[data-play-card]')];
    async function playCard(button) {
      const clip = clips[button.closest('[data-card]').dataset.card];
      if (player.playing && player.clip === clip) {
        player.stop();
      } else {
        await player.load([clip]);
        player.play(clip);
      }
      playButtons.forEach((other) => {
        other.setAttribute('aria-pressed', player.playing && player.clip === clip && other === button);
      });
    }
    playButtons.forEach((button) => {
      button.setAttribute('aria-label', `Play ${switches[button.closest('[data-card]').dataset.card].name}`);
      button.addEventListener('click', () => playCard(button));
      button.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        playCard(button);
      });
    });

    if (data.questions) showAnswers(result);

    const copy = q('[data-action="copy"]');
    copy.addEventListener('click', () => {
      navigator.clipboard.writeText(location.href).then(() => {
        copy.querySelector('.kit-button__label').textContent = 'Link copied';
      });
    });
    show('results');
  }

  function showAnswers(result) {
    const chart = q('[data-tag-chart]');
    const barTemplate = q('[data-tag-template]');
    const tagsById = Object.fromEntries(data.switches.map((item) => [item.id, item.tags]));
    let rank = 0;
    tagAffinity(result.placement, tagsById).forEach(({ tag, affinity, switches }, i, scores) => {
      if (i === 0 || affinity < scores[i - 1].affinity) rank = i + 1;
      const bar = barTemplate.content.firstElementChild.cloneNode(true);
      const edge = 50 + (50 * affinity) / AFFINITY_RANGE;
      bar.style.setProperty('--fill-from', `${Math.min(50, edge)}%`);
      bar.style.setProperty('--fill-to', `${Math.max(50, edge)}%`);
      bar.querySelector('[data-field="rank"]').textContent = rank;
      bar.querySelector('[data-field="name"]').textContent = tag;
      bar.querySelector('[data-field="count"]').textContent = `${switches} ${switches === 1 ? 'switch' : 'switches'}`;
      bar.querySelector('[data-field="percent"]').textContent = affinity > 0 ? `+${affinity}` : `${affinity}`;
      chart.appendChild(bar);
    });

    const needs = answerFactors(data.questions, result.answers);
    const factorTemplate = q('[data-factor-template]');
    data.factors.forEach((factor) => {
      const bar = factorTemplate.content.firstElementChild.cloneNode(true);
      const edge = 50 + 50 * (needs.leans[factor.id] ?? 0);
      bar.style.setProperty('--fill-from', `${Math.min(50, edge)}%`);
      bar.style.setProperty('--fill-to', `${Math.max(50, edge)}%`);
      ['name', 'low', 'high'].forEach((field) => {
        bar.querySelector(`[data-field="${field}"]`).textContent = factor[field];
      });
      q('[data-factor-chart]').appendChild(bar);
    });
    q('[data-layout]').textContent = `Layout: ${needs.layout ?? '60% is enough'}`;
    needs.flags.forEach(({ flag, on }) => {
      const item = document.createElement('li');
      item.className = on ? 'tier-flag is-on' : 'tier-flag';
      item.textContent = `${on ? '\u2713' : '\u2717'} ${flag}`;
      q('[data-flags]').appendChild(item);
    });

    const list = q('[data-answers]');
    data.questions.forEach((question) => {
      const given = result.answers[question.id];
      const chosen = given.picked.map((index) => question.options[index]);
      if (!chosen.length && !given.other) return;
      const term = document.createElement('dt');
      term.textContent = question.text;
      list.appendChild(term);
      chosen.forEach((option) => {
        const detail = document.createElement('dd');
        detail.textContent = option.label;
        list.appendChild(detail);
      });
      if (given.other) {
        const detail = document.createElement('dd');
        detail.textContent = `Other: ${given.other}`;
        list.appendChild(detail);
      }
    });
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
