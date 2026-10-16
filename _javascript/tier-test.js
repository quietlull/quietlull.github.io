import { basic } from './modules/layouts';
import { AudioClip } from './modules/audio/audio-clip';
import { AudioPlayer } from './modules/audio/audio-player';
import { TierBoard } from './modules/components/tier-board';
import { QuestionFlow } from './modules/components/question-flow';
import { TIERS, tagAffinity } from './modules/utils/tier-scores';
import { shuffle } from './modules/utils/shuffle';

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

  const shared = readHash();
  if (shared) {
    showResults(shared);
    return;
  }

  const player = new AudioPlayer();
  const clips = Object.fromEntries(Object.keys(switches).map((id) =>
    [id, new AudioClip(`${data.media}/${id}.mp3`)]));
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
      done.disabled = !board.complete;
    }
  });

  let loading = null;
  let answers = null;

  const questions = new QuestionFlow(q('[data-step="questions"]'), {
    async onDone(given) {
      answers = given;
      q('[data-question-progress]').textContent = 'Loading sounds...';
      try {
        await loading;
      } catch (err) {
        q('[data-question-progress]').textContent = `Could not load the sounds (${err.message}). Try reloading.`;
        return;
      }
      show('board');
      board.load(shuffle(Object.keys(switches)));
    }
  });

  q('[data-action="start"]').addEventListener('click', () => {
    loading = player.load(Object.values(clips));
    show('questions');
    questions.start();
  });

  done.addEventListener('click', () => {
    player.stop();
    board.setPlaying(null);
    const result = { placement: board.placement(), answers };
    history.replaceState(null, '', `#r=${btoa(JSON.stringify(result))}`);
    showResults(result);
  });

  function showResults(result) {
    const grid = q('[data-result-cards]');
    TIERS.flatMap((tier) => result.placement[tier].map((id) => [id, tier])).forEach(([id, tier], i) => {
      const card = grid.querySelector(`[data-card="${id}"]`);
      card.querySelector('[data-field="tier"]').textContent = `${tier} tier`;
      card.classList.add(i % 2 ? 'posts-grid-hue-b' : 'posts-grid-hue-a');
      grid.appendChild(card);
    });

    const chart = q('[data-tag-chart]');
    const barTemplate = q('[data-tag-template]');
    const tagsById = Object.fromEntries(data.switches.map((item) => [item.id, item.tags]));
    let rank = 0;
    tagAffinity(result.placement, tagsById).forEach(({ tag, affinity, switches }, i, scores) => {
      if (i === 0 || affinity < scores[i - 1].affinity) rank = i + 1;
      const bar = barTemplate.content.firstElementChild.cloneNode(true);
      const edge = 50 + affinity / 2;
      bar.style.setProperty('--fill-from', `${Math.min(50, edge)}%`);
      bar.style.setProperty('--fill-to', `${Math.max(50, edge)}%`);
      bar.querySelector('[data-field="rank"]').textContent = rank;
      bar.querySelector('[data-field="name"]').textContent = tag;
      bar.querySelector('[data-field="count"]').textContent = `${switches} ${switches === 1 ? 'switch' : 'switches'}`;
      bar.querySelector('[data-field="percent"]').textContent = affinity > 0 ? `+${affinity}` : `${affinity}`;
      chart.appendChild(bar);
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
        detail.textContent = `${option.label} \u2192 ${option.means}`;
        list.appendChild(detail);
      });
      if (given.other) {
        const detail = document.createElement('dd');
        detail.textContent = `Other: ${given.other}`;
        list.appendChild(detail);
      }
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
