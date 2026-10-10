// What changed between two compiled stylesheets, rule by rule.
//
//   node tools/css-rule-diff.mjs before.css after.css
//
// Prints the rules that were removed, added or changed, each with the @media or @layer it sits in.
// Use it after deleting styles that are meant to be dead: the output should list exactly the rules
// you meant to remove and nothing else. Exits 1 if anything was added or changed.
import { readFileSync } from 'node:fs';
import postcss from 'postcss';

function rules(file) {
  const found = new Map();
  const walk = (node, context) => {
    node.each((child) => {
      if (child.type === 'rule') {
        const key = `${context}${child.selector.replace(/\s+/g, ' ')}`;
        const body = child.nodes.filter((n) => n.type === 'decl').map((n) => `${n.prop}:${n.value}${n.important ? '!important' : ''}`).join(';');
        found.set(key, (found.get(key) || []).concat(body));
        walk(child, `${key} { `);
      } else if (child.type === 'atrule' && child.nodes) {
        walk(child, `${context}@${child.name} ${child.params} { `);
      }
    });
  };
  walk(postcss.parse(readFileSync(file, 'utf8')), '');
  return found;
}

const [before, after] = process.argv.slice(2).map(rules);
const removed = [...before.keys()].filter((key) => !after.has(key));
const added = [...after.keys()].filter((key) => !before.has(key));
const changed = [...before.keys()].filter((key) => after.has(key) && before.get(key).join('|') !== after.get(key).join('|'));

for (const [label, list] of [['REMOVED', removed], ['ADDED', added], ['CHANGED', changed]]) {
  console.log(`${label}: ${list.length}`);
  list.forEach((key) => console.log('  ' + key));
}
process.exitCode = added.length || changed.length ? 1 : 0;
