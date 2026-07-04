# Apply Editorial Report Fixes to `learn-template`

Copy and paste the following prompt into a coding session that has write access to the `learn-template` repository.

---

Implement the following editorial-report fixes in `learn-template`. Preserve existing public APIs unless a change below explicitly updates one. Work on a dedicated branch, update or add tests where relevant, and run `pnpm test`, `pnpm validate`, `pnpm lint`, and `pnpm build` before reporting results.

## 1. Secure MDX execution

**File:** `src/components/MDXRemote.tsx`

Remove any `options={{ blockJS: false }}` override from `BaseMDXRemote`. Keep the library default that blocks JavaScript in AI-generated MDX content.

## 2. Accessible quiz semantics and feedback

**File:** `src/components/Quiz.tsx`

- Put each question and its options in a `<fieldset>` with a `<legend>` containing the question.
- Replace clickable option buttons with visually hidden `<input type="radio">` controls inside `<label>` elements.
- Keep selection and submitted-result styling, but add visible `Correct` and `Incorrect` text so correctness is not conveyed by color alone.
- Add a visually hidden `aria-live="polite"` status region that announces correctness and the explanation.
- Add `role="alert"` to the quiz-complete summary.
- Prevent selection changes after submission while retaining keyboard operation.

Update quiz tests to assert radio semantics, text feedback, the live announcement, and the completion alert.

## 3. Accessible code blocks

**File:** `src/components/CodeBlock.tsx`

- Add `role="region"` and an informative `aria-label` to the outer code-block container. Prefer the filename; otherwise identify the language.
- Add `accessibilitySupport: "on"` to Monaco editor options.
- Add a visually hidden `aria-live="polite"` region that announces `Code copied to clipboard.` after successful copying.

## 4. Permanent Mermaid text alternatives

**File:** `src/components/MermaidDiagram.tsx`

- Add `role="img"` and `aria-label={fallback || "Diagram"}` to the diagram container.
- When SVG rendering succeeds, also render a visually hidden `<p>` containing the fallback text so the text equivalent remains available.
- Mark the loading state with `aria-live="polite"`.
- Do not treat Mermaid source alone as the text alternative.

Add or update Mermaid tests for the accessible label, fallback text, and loading announcement.

## 5. Validator precision and coverage

**Files:** `README.md`, `scripts/validate.mjs`, and relevant tests

- Describe the validator as deterministic structural checks plus heuristic warnings. It does not establish factual accuracy, legal compliance, pedagogical quality, or complete accessibility conformance.
- Require a non-empty fallback for both `<Diagram>` and `<MermaidDiagram>` components.
- If `content/tutorials/` is optional, produce a clear validation message rather than an unhandled filesystem exception when it is absent. Otherwise, document and test it as mandatory.

## 6. Prompt/component contract alignment

**Files:** `prompts/02-lesson-writing.md` and relevant examples or tests

- Replace invalid `Callout type="tip"`, `type="info"`, and `type="warning"` guidance with supported `tone` prop values.
- Do not instruct the generator to emit unavailable components or unsupported interactive behaviour.

## 7. Presentation and artifact safeguards

**Files:** presentation-generation guidance and relevant renderers

- Require a fallback link for every slide embed.
- Require accessible text alternatives for diagrams and infographics.
- Flag artifacts that are only metadata or planned work; do not imply that they are working learner-facing interactions.

## 8. Verification

Run:

```bash
pnpm test
pnpm validate
pnpm lint
pnpm build
```

Report each command's result. If an environment prerequisite prevents a command from running, state the exact prerequisite and do not claim success.
