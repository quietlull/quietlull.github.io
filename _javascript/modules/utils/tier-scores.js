export const TIERS = ['S', 'A', 'B', 'C', 'D', 'F'];

const TIER_POINTS = { S: 100, A: 80, B: 60, C: 40, D: 20, F: 0 };

export function tagScores(placement, tagsById) {
  const points = {};
  TIERS.forEach((tier) => placement[tier].forEach((id) => {
    tagsById[id].forEach((tag) => {
      (points[tag] ??= []).push(TIER_POINTS[tier]);
    });
  }));
  return Object.entries(points)
    .map(([tag, list]) => ({ tag, percent: Math.round(list.reduce((a, b) => a + b, 0) / list.length) }))
    .sort((x, y) => y.percent - x.percent);
}
