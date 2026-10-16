---
name: feedback_plain_language
description: "Rod wants plain language - no unexplained jargon, and any term I coin must be defined the moment I use it"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a185948a-8817-47ab-88b4-628603b1ec90
  modified: 2026-08-24T15:41:08.851Z
---

**NO UNEXPLAINED JARGON.** Name things by what they do, in words Rod already uses. "Text column
width", not "prose measure". This applies to slot names, checklists, docs and chat alike, not just
conversation.

**AND IF I DO USE A TERM, I MUST EXPLAIN IT IN THE SAME BREATH.** Rod 2026-08-24, on seeing a
checklist row that said *"reading well / prose measure"*: *"these two terms make no sense try to use
common language or terminology when speaking to me if you art doing jargon please explain what your
made up term actually means"*.

Both of those were **my** coinages, not standard terms, and neither was defined anywhere:
- **"reading well"** = nothing. An invented label. The real thing is the padded column the article
  text sits in.
- **"prose measure"** = the maximum width of the text column, so lines do not get too long to read
  comfortably. On this site it is **767px / 94ch**.

**Why:** Rod reviews everything by hand and approves slot by slot. A slot whose NAME he cannot parse
cannot be judged, so invented vocabulary does not just annoy him, it blocks the work. It also hides
whether I actually know what a thing is - "prose measure" sounded authoritative and meant "how wide
the text is".

**How to apply:**
- Default to the plain phrase. Rename existing slots and checklist rows when I notice jargon in them.
- When a technical term is genuinely the right one (`letter-spacing`, `line-height`, `unicode-range`,
  cascade layers), use it AND say what it does in that context in the same sentence - e.g. "in a
  vertical writing mode, `line-height` IS the horizontal gap between columns".
- Never invent a label and then use it as though it were established.

Related: [[feedback_manual_code_audit]], [[feedback_request_tracker]]


## NO ABBREVIATIONS (ROD, 2026-09-04) - his words, made a rule

**"NO ABBREVIATIONS UNLESS ITS A COMMONLY UNDERSTOOD ACRONYM OR IS A KNOWN EXCEPTION"** - and he
added that he cannot think of a single known exception off the top of his head, so treat the
exception list as EMPTY until he names one.

This is a naming rule for CODE, not just for prose: it governs class names, file names, token
names, variables. What triggered it, all on one page: `h` (the hero), `sec`, `col`, `lb` (the
line-boil hook), `epx-cards` ("expensive"). A reader cannot recover any of those from the name.

Applies to the whole naming pass. See [[project_element_vocabulary]] for the vocabulary the
renamed things have to fit into.

## SAY IT THE SIMPLEST WAY, IN TIGHT SHORT SENTENCES (ROD, 2026-10-10)

His words, while auditing code through the review pages: *"your overview is verbose and filled with
jargon try to tell me what the code does in a high level and why it cannot be simplified as well as
the function or functions within the code."* Then: *"evaluate if what your saying is the simplest
way to say something only say things in a clear and concise way keeping information thats
contextually close bundled in tight short sentences."*

**How to apply (chat AND docs, my reading of it is that it is general, not only the audit notes):**
- Before keeping a sentence, ask if there is a simpler way to say it. If yes, use that.
- Short sentences. Facts that belong together sit next to each other, not three paragraphs apart.
- No measurement tables, history or process narration unless he asks for evidence.
- **A code overview has exactly these parts:** what it does (what a visitor would lose if the file
  were deleted), why it is not simpler (what breaks without each piece), what could still go (only
  if something honestly could), the functions one line each. The format and the six rewritten
  examples are in repo `docs/CODE-AUDIT.md`. The first versions were 2,535 words for six files;
  the accepted shape is about half that.
- "Why it cannot be simplified" is an honest question, not a prompt to defend the code. If a piece
  could go, list it and let him decide.
