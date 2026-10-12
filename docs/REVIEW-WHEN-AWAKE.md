# For Rod, when you wake up

Rod, 2026-10-12, before going to sleep: *"continue going though files that need clear rewrites when
its unclear mark it as so and i will check it when i wake up."*

This is the list. Every file the night's work reached is here, in the order it was reached.

**How to read a row.**

- **REWRITTEN**: the change was clear, so it was made. Nothing a visitor can see or feel changed,
  and the row says how that was measured. The commit is named so you can read or undo it.
- **NOTE ONLY**: nothing needed changing, or the file was not safe to change without you (the 3D
  scene, anything that only runs on the live site). Its review page has a note.
- **UNCLEAR**: something should probably change but it needs your decision. The code was left
  alone. The row asks the question.

**What counted as clear.** Only these, and only when the checks could prove nothing visible moved:

- deleting code that measurement shows is dead;
- removing a guard, field or option that measurement shows can never matter;
- moving an effect onto a behaviour or class that already exists in `docs/behaviours/README.md`;
- replacing a hand-written copy of something `_sass/components/_behaviours.scss` already provides;
- renaming a local variable that is an abbreviation. Never a class, file, export, attribute or CSS
  value name: those are yours.

Anything about how it looks, what a public thing is called, or how it should behave is UNCLEAR.

**None of it has had your eye.** Measurement is not looking. Each REWRITTEN row that touches
something visible says where to look.

---

## The list

