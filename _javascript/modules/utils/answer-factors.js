export function answerFactors(questions, answers) {
  const options = questions.flatMap((question) => question.options);
  const picked = questions.flatMap((question) => answers[question.id].picked.map((index) => question.options[index]));
  const nudges = {};
  picked.forEach((option) => Object.entries(option.leans ?? {}).forEach(([factor, lean]) => {
    (nudges[factor] ??= []).push(lean);
  }));
  const ticked = new Set(picked.map((option) => option.flag));
  return {
    leans: Object.fromEntries(Object.entries(nudges).map(([factor, list]) => [factor, list.reduce((sum, lean) => sum + lean, 0) / list.length])),
    flags: [...new Set(options.map((option) => option.flag).filter(Boolean))].map((flag) => ({ flag, on: ticked.has(flag) })),
    layout: picked.filter((option) => option.size).sort((x, y) => y.size - x.size)[0]?.means
  };
}
