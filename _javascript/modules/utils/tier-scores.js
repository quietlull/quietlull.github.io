export const TIERS = ['S', 'A', 'B', 'C', 'D', 'F'];

const TIER_POINTS = { S: 100, A: 80, B: 60, C: 40, D: 20, F: 0 };

export function tagAffinity(placement, tagsById) {
  const scored = TIERS.flatMap((tier) => placement[tier].map((id) => ({ points: TIER_POINTS[tier], tags: tagsById[id] })));
  const average = scored.reduce((sum, item) => sum + item.points, 0) / scored.length;
  const tags = {};
  scored.forEach(({ points, tags: itemTags }) => {
    const weight = 1 / itemTags.length;
    itemTags.forEach((tag) => {
      const entry = (tags[tag] ??= { total: 0, weight: 0, switches: 0 });
      entry.total += points * weight;
      entry.weight += weight;
      entry.switches += 1;
    });
  });
  return Object.entries(tags)
    .map(([tag, { total, weight, switches }]) => ({ tag, affinity: Math.round(total / weight - average), switches }))
    .sort((x, y) => y.affinity - x.affinity);
}
