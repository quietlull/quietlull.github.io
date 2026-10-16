import { basic } from './modules/layouts';
import { AudioClip } from './modules/audio/audio-clip';
import { AudioPlayer } from './modules/audio/audio-player';
import { TierBoard } from './modules/components/tier-board';
import { TIERS, advancingIds } from './modules/utils/tier-advance';
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

  const switches = Object.fromEntries(data.families.flatMap((family) =>
    family.switches.map((item) => [item.id, { ...item, family }])));

  const shared = readHash();
  if (shared) {
    showResults(shared);
    return;
  }

  const player = new AudioPlayer();
  const clips = Object.fromEntries(Object.keys(switches).map((id) =>
    [id, new AudioClip(`${data.media}/${id}-0.mp3`)]));
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

  q('[data-action="start"]').addEventListener('click', async (event) => {
    event.currentTarget.disabled = true;
    q('[data-status]').textContent = 'Loading sounds...';
    try {
      await player.load(Object.values(clips));
    } catch (err) {
      q('[data-status]').textContent = `Could not load the sounds (${err.message}). Try reloading.`;
      return;
    }
    show('board');
    board.load(shuffle(Object.keys(switches)));
  });

  done.addEventListener('click', () => {
    player.stop();
    board.setPlaying(null);
    const result = board.placement();
    history.replaceState(null, '', `#r=${btoa(JSON.stringify(result))}`);
    showResults(result);
  });

  function showResults(result) {
    const list = q('[data-results]');
    const template = q('[data-result-template]');
    TIERS.forEach((tier) => {
      const row = template.content.firstElementChild.cloneNode(true);
      row.dataset.tier = tier;
      row.querySelector('[data-field="tier"]').textContent = tier;
      const items = row.querySelector('[data-field="items"]');
      result[tier].forEach((id) => {
        const item = document.createElement('li');
        item.className = 'tier-result__item';
        const image = document.createElement('span');
        image.className = 'tier-result__image';
        image.style.backgroundImage = `url("${switches[id].image || data.placeholder}")`;
        const name = document.createElement('span');
        name.textContent = switches[id].name;
        item.append(image, name);
        items.appendChild(item);
      });
      list.appendChild(row);
    });

    const favourites = new Set(advancingIds(result).map((id) => switches[id].family.name));
    q('[data-families]').textContent = `Your sound: ${[...favourites].join(', ')}`;

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
