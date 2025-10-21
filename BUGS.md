# Known Bugs & Fixes

This document tracks significant bugs encountered while building SecureScholar. Items remain listed after resolution to preserve the debugging trail.

---

## Active Bugs (need follow-up)

### [BUG-001] No cross-session progress persistence

**Severity:** High
**Discovered:** Oct 19, 2025
**Impact:** Quiz and points reset on refresh or device change.
**Root cause:** State is maintained in memory and, where used, `localStorage` (device-scoped).
**Status:** Open — to be addressed with a backend (Phase 2).

**Notes:** A lightweight interim “checkpoint” save to `localStorage` is planned, but true cross-device persistence will require a database (e.g., Firebase).

---

### [BUG-002] Some mobile typography still cramped on very small screens

**Severity:** Medium
**Discovered:** Oct 20, 2025 (manual test at 320–360px widths)
**Impact:** Long lines in “Aarav’s Note” can feel dense; touch targets near the quiz footer can crowd.
**Root cause:** Card padding and line-height not scaled aggressively enough under 360px.
**Status:** Open — Phase 1 polish item.

**Proposed fix:**

```css
@media (max-width: 360px){
  .card{ padding: 1rem; }
  .creator-note{ font-size: .88rem; line-height: 1.65; }
  .button{ width: 100%; }
}
```

---

## Fixed Bugs

### [BUG-003] GitHub Pages served documentation view instead of site home

**Severity:** High
**Discovered:** Oct 20, 2025
**Impact:** Visiting the site displayed a GitHub-styled page instead of the landing page.
**Root cause:** Pages configuration and/or missing `index.html` at the site root caused Markdown to be rendered instead of the app.
**Fix (Oct 20, 2025):**

* Ensured `index.html` exists at the repository root.
* GitHub Pages: **Settings → Pages → Source:** `Deploy from a branch`, **Branch:** `main`, **Folder:** `/ (root)`.
  **Status:** Fixed.

---

### [BUG-004] Module links broke after moving files under `src/modules/`

**Severity:** High
**Discovered:** Oct 19, 2025
**Impact:** Clicking “Start Module 1” or internal links produced 404s.
**Root cause:** Absolute/hosted URLs and outdated paths after restructuring.
**Fix (Oct 19, 2025):** Converted all links to **relative paths**:

```html
<!-- Before -->
<a href="https://securescholar.netlify.app/src/modules/module1.html">Start</a>

<!-- After -->
<a href="src/modules/module1.html">Start Module 1</a>
```

**Status:** Fixed.

---

### [BUG-005] Achievement modal text hard to read in dark mode

**Severity:** Medium
**Discovered:** Oct 19, 2025
**Impact:** Modal appeared but copy looked faded on dark background.
**Root cause:** Inherited low-contrast color tokens.
**Fix (Oct 19, 2025):**

```css
.achievement-modal{ background:#0b1220; color:#e6e8ee; }
.achievement-modal h3{ color:#c7d2fe; }
.achievement-modal p{ color:#e5e7eb; }
```

**Status:** Fixed.

---

### [BUG-006] Hint modal didn’t appear when user missed two in a row

**Severity:** Medium
**Discovered:** Oct 20, 2025
**Impact:** Adaptive help never surfaced; toasts did, but no actionable hint.
**Root cause:** Duplicate `offerHint()` definitions and missing overlay element in the DOM path used by the running script.
**Fix (Oct 20, 2025):**

* Consolidated to a **single** `offerHint()` function.
* Appended modal to `document.body` with explicit z-index.

```js
function offerHint(){
  hintsUsed++;
  const overlay = document.createElement('div');
  overlay.className = 'hint-modal';      // CSS gives it z-index
  overlay.innerHTML = `...buttons...`;
  document.body.appendChild(overlay);
  overlay.querySelector('#hint-ok').addEventListener('click', ()=> overlay.remove());
  overlay.querySelector('#hint-cancel').addEventListener('click', ()=> overlay.remove());
}
```

**Status:** Fixed.

---

### [BUG-007] Same question served multiple times in one run

**Severity:** Medium
**Discovered:** Oct 20, 2025
**Impact:** User received identical prompt repeatedly.
**Root cause:** Random draw from difficulty pool without de-duplication.
**Fix (Oct 20, 2025):** Track `askedIds` and skip anything already asked.

```js
const askedIds = new Set();

function pickNextQuestion(){
  const pool = byLevel[currentLevel].filter(q => !askedIds.has(q.id));
  let q = pool.length ? pool[Math.random()*pool.length|0] 
                      : allQuestions.find(x => !askedIds.has(x.id));
  if(!q) q = allQuestions[Math.random()*allQuestions.length|0];
  askedIds.add(q.id);
  return q;
}
```

**Status:** Fixed.

---

### [BUG-008] Nested `<script>` tag accidentally included inside another `<script>`

**Severity:** Medium
**Discovered:** Oct 19, 2025
**Impact:** Parsing errors in some browsers; scripts after the nested tag didn’t execute.
**Root cause:** Copy/paste during refactor of inline quiz page.
**Fix (Oct 19, 2025):** Removed stray `<script>` tags inside script blocks; validated with HTML validator.
**Status:** Fixed.

---

### [BUG-009] Confetti/achievement layers could appear behind quiz content

**Severity:** Medium
**Discovered:** Oct 19, 2025
**Impact:** Visuals partially hidden.
**Root cause:** Competing stacking contexts from card shadows and positioned elements.
**Fix (Oct 19, 2025):** Established a clear z-index scale and applied to overlays.

```css
:root{ --z-base:1; --z-popover:100; --z-modal:1000; --z-absolute-top:9999; }
.achv-overlay,.hint-modal{ z-index: var(--z-modal); }
```

**Status:** Fixed.

---

### [BUG-010] Favicon did not load on some pages

**Severity:** Low
**Discovered:** Oct 19, 2025
**Impact:** Browser tab showed default icon.
**Root cause:** Wrong path after moving assets to `src/images/`.
**Fix (Oct 19, 2025):**

```html
<link rel="icon" type="image/png" href="src/images/favicon.png">
```

**Status:** Fixed.

---

## Low-priority items (cosmetic or deferred)

### [BUG-011] Progress bar animation can jitter on very slow devices

**Severity:** Low
**Discovered:** Oct 20, 2025
**Impact:** Cosmetic only.
**Cause:** Transition applied before layout settles.
**Mitigation:** Minor setTimeout before applying width; defer to Phase 4 polish.

---

### [BUG-012] Quiz question order changes after refresh

**Severity:** Low
**Discovered:** Oct 20, 2025
**Impact:** Order is not deterministic between sessions.
**Cause:** Randomized selection by design.
**Decision:** Keep as is to reduce memorization; will revisit if a “study mode” requires fixed order.

---

## Debugging tools and habits

* Chrome DevTools (network/console, mobile emulation)
* Firefox Developer Edition for cross-engine checks
* W3C HTML/CSS validators
* Manual device checks at 320–414px widths
* Console tracing around selection/DOM append points

---

## Metrics

* Total logged bugs: 12
* Active: 2
* Fixed: 10
* Longest single debug session: 45 minutes (overlay/hint duplication)
* Typical fix time: 15–30 minutes

---

## Lessons learned

1. Configure hosting early and keep a minimal `index.html` at root to avoid Pages routing surprises.
2. After file moves, switch all links to **relative paths**; avoid hard-coded origins.
3. For modals and toasts, define a z-index scale in one place and reuse it.
4. Never nest `<script>` tags; validate HTML after large pastes/refactors.
5. Random selection needs explicit de-duplication for a good quiz experience.
6. Build for small screens as you go; do not defer mobile passes to the end.

---

**Next review:** Week 1 (Oct 27, 2025). Open a GitHub issue if you find anything off.
