export const TIERS = ['S', 'A', 'B', 'C', 'D', 'F'];

export function rankedIds(placement) {
  return TIERS.flatMap((tier) => placement[tier]);
}

export function advancingIds(placement, { min = 2, max = 3 } = {}) {
  let chosen = placement.S;
  if (chosen.length < min) chosen = [...placement.S, ...placement.A];
  if (chosen.length < min) chosen = rankedIds(placement).slice(0, min);
  return chosen.slice(0, max);
}
