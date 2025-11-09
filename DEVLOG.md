# SecureScholar Development Log
*Honest documentation of building this platform.*

---

## Week 0 (Oct 17–19, 2025) — MVP Launch

**Phase:** Foundation  
**Hours:** 8 total  
**Live Site:** [SecureScholar GitHub Page](https://aaravarora3835.github.io/SecureScholar-Platform/)

### What I Built

**Oct 17:** Initial setup, design decisions, deployed empty site to test hosting  
**Oct 18:** Landing page structure, chose Module 1 topic (Password Security)  
**Oct 19:** Built Module 1 (4 lessons + 10-question quiz), wrote Aarav's Notes, integrated achievement system

### Technical Breakdown

**Coded myself:** HTML structure, quiz logic, scoring system, lesson content  
**AI assistance:** CSS animations, achievement modal, glassmorphism effects  
**Referenced:** Confetti library, Stripe design patterns, MDN documentation

### Key Stats
- 140 lines HTML, 350 lines CSS, 220 lines JS
- 40% AI assistance on styling
- 8 hours development time
- 15+ documentation searches

### Lessons Learned
- Teaching content takes 3x longer than building UI
- Netlify deployment is straightforward
- `querySelectorAll()` and event delegation patterns
- Content quality matters more than visual polish
- Honest metrics build credibility

### Delivered
- Functional Module 1 with real educational content
- Interactive quiz with adaptive feedback
- Achievement system with confetti animations
- Progress tracking (linear + circular indicators)
- Personal insights in every lesson

**Status:** Week 0 Complete ✅

---

## Week 2 (Nov 3–8, 2025) — Cert Completion + Module 2 Foundation

**Phase:** Google Cert Course 1 + SecureScholar Module 2  
**Hours:** 10.5 total  
**Live Update:** Module 2 Lesson 1 + Quiz Navigator at `/src/modules/module2.html`

### What I Built

**Mon 11/03 — Google Cert Module 3 Completion**  
Completed "Protect Against Threats, Risks & Vulnerabilities." Key topics: threat actors, risk assessment formulas (Risk = Likelihood × Impact), vulnerability scanning methodology, incident response lifecycle. Passed quiz, documented core concepts in notes.

**Tue 11/04 — Kali VM Tool Practice**  
Tested security commands in isolated environment: `nmap -sn 127.0.0.1`, `whoami`, `grep "root" /etc/passwd`. All commands run locally only (safe, ethical practice). Recorded outputs and explanations for future lab documentation. Verified tool functionality before attempting real scans.

**Wed 11/05 — Module 2 HTML Skeleton + Course 1 Completion**  
Built `src/module2.html` with 2-lesson structure, Prev/Next navigation, keyboard shortcuts (arrow keys), quiz placeholder, progress footer. Also completed final Google Cert Course 1 modules and earned certificate ahead of schedule.

**Commits:**
- `feat: create Module 2 HTML structure with navigation`

**Thu 11/07 — Vulnerability Scan Lab (Docker + OWASP Juice Shop)**  
Configured Docker in Kali VM, launched OWASP Juice Shop container on port 3000, performed comprehensive Nmap reconnaissance:
- `sudo nmap -p 3000 -sS -sV 127.0.0.1` (service detection)
- `sudo nmap -p 3000 --script http-enum,http-headers,http-server-header 127.0.0.1` (HTTP enumeration)
- `sudo nmap -p 3000 --script vuln 127.0.0.1` (vulnerability scanning)

**Key Findings:**
- Port 3000/tcp open (Node.js Express server)
- HTTP headers revealed server version and framework
- No critical vulnerabilities detected (expected for patched container)

**Debugging Notes:** VirtualBox networking required NAT + Host-Only adapter configuration. Docker service initially wouldn't start—resolved by reinstalling Docker packages and enabling systemd service.

**Fri 11/08 — Lesson 1 Content Integration**  
Completed and integrated Lesson 1 draft (250 words + 169-word Aarav's Note) into live Module 2 page. Topic: "What is Phishing?" covering definition, real-world examples (Netflix scam, package delivery), psychology of phishing attacks, and statistics from Verizon DBIR 2024 (36% of breaches involve phishing).

**Writing Process:**
- Researched Verizon DBIR and FBI IC3 reports
- Drafted 3 versions to find peer-appropriate tone
- Integrated authentic personal story (school IT phishing near-miss)
- Used accessible language for high school audience

**Commits:**
- `feat: add Lesson 1 content - What is Phishing (Module 2)`

**Sat 11/08 Morning — Quiz Navigator Development**  
Built Module 2 quiz navigator with JavaScript question loop. Created `src/js/module2-quiz.js` (80 lines) and `src/modules/module2-quiz.html` (120 lines). Quiz displays 3 phishing defense questions one at a time, highlights selected answers (blue border), cycles through with "Next" button, shows completion message after final question. No scoring yet—foundation for Week 3 implementation.

**Technical Implementation:**
```javascript
// Core state management
let currentQuestionIndex = 0;

// Question navigation
function nextQuestion() {
  if (currentQuestionIndex < module2Questions.length - 1) {
    currentQuestionIndex++;
    nextButton.disabled = true;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

// Dynamic rendering
function renderQuestion() {
  const q = module2Questions[currentQuestionIndex];
  questionContainer.textContent = q.text;
  
  optionsContainer.innerHTML = '';
  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = option;
    button.onclick = () => selectOption(index);
    optionsContainer.appendChild(button);
  });
}
```

**Debugging Notes:** Quiz button in `module2.html` initially showed alert popups from old placeholder code. Fixed by replacing conditional logic with direct navigation: `window.location.href = 'module2-quiz.html'`. Required hard browser refresh (Ctrl+Shift+R) to clear cached JavaScript.

**Commits:**
- `feat: add Module 2 quiz navigator (JavaScript question loop)`
- `doc: add quiz navigator screenshot`

**Sat 11/08 Afternoon — Week 2 Documentation**  
Updated `Notes/Week02_Networking.md` with comprehensive lab documentation, tool commands, Module 3-4 key concepts, and quiz development details. Wrote Week 2 reflection covering Nmap lab experience, quiz coding journey, Docker troubleshooting, and content writing lessons.

**Key Insight:** Teaching security concepts to peers forces deeper understanding than passive studying. The "teach to learn" effect is real—explaining phishing for Lesson 1 solidified my cert knowledge better than just taking notes.

**Commits:**
- `doc: Week 2 reflection — Nmap lab + coding foundation`
- `doc: complete Week 2 devlog update`

---

### Technical Implementation Summary

**Module 2 Architecture:**
- Embedded CSS (no external dependencies)
- Vanilla JS navigation with keyboard accessibility
- localStorage autosave timestamp
- Modular lesson sections (easily add/remove)
- Reusable template for future modules
- Smart quiz gating (unlocks after lesson completion)

**Content Quality:**
- 250-word lesson with clear structure
- Personal anecdote grounded in real experience
- Statistics from reputable sources (Verizon DBIR 2024)
- Relatable examples (Netflix scam, package delivery texts)
- Accessible language for high school audience

**Quiz Navigator:**
- Question array with id, text, options, answer index
- State tracking: `currentQuestionIndex`
- Dynamic DOM manipulation for rendering
- Visual feedback on user selection
- Disabled "Next" button until answer selected
- Completion message after final question

**Portfolio Value:**
- Demonstrates ability to build educational UI from scratch
- Shows progressive enhancement understanding
- Commits provide evidence of iterative development
- Real educational content (not placeholder text) proves execution capability
- Vanilla JS implementation shows core competency without framework dependence

---

### Progress This Week

| Metric | Week 2 | Total |
|--------|--------|-------|
| Code Files | +3 | 14 |
| HTML Lines | +270 | 410 |
| JS Lines | +80 | 395 |
| Content Words | +419 | 1619 |
| Hours | 10.5 | 18.5 |
| Commits | 7 | 24+ |
| Lessons Complete | +1 | 5 |
| Screenshots | 8 | 15+ |

---

### Key Decisions

**Course 1 Acceleration:** Finished entire Course 1 instead of just Modules 3-4 as planned. Momentum was strong, content was clicking, and getting the certificate felt achievable. Decision paid off—now starting Week 3 ahead of schedule.

**Docker Lab Over Metasploitable:** Chose OWASP Juice Shop container instead of planned Metasploitable 2 VM for practical reasons:
- Faster setup (single Docker command vs full VM configuration)
- Still demonstrates Nmap reconnaissance skills
- Easier to reproduce and document
- More relevant to modern web application security

**Content-First Approach:** Integrated real lesson content instead of leaving placeholders. Makes the module feel tangible and demonstrates writing ability to portfolio viewers. Empty scaffolding doesn't prove capability—shipped content does.

**Work Distribution:** Mon–Tue = cert focus, Wed–Fri = coding, Sat = both. Prevents context-switching fatigue and allows deep focus on each domain. This rhythm feels sustainable long-term.

**Personal Story Selection:** Used authentic near-miss phishing experience rather than fabricating drama. Authenticity resonates more with students and maintains credibility. The vulnerability of sharing a mistake makes the lesson more memorable.

---

### Completed Week 2 Tasks

- ✅ Google Cert Course 1 completed (ahead of schedule)
- ✅ Module 3: Threats, Risks & Vulnerabilities finished
- ✅ Module 4: Cybersecurity Tools started (50% complete)
- ✅ Kali VM tool practice documented
- ✅ Docker + OWASP Juice Shop vulnerability scan completed
- ✅ Module 2 HTML structure built
- ✅ Lesson 1 draft written (250 words)
- ✅ Lesson 1 integrated into live page
- ✅ Aarav's Note completed (169 words, personal anecdote)
- ✅ Quiz navigator built and functional (3 questions)
- ✅ Quiz unlock logic added
- ✅ Week 2 notes and reflection documented

---

### Insights

**What's Working:**  
Small daily commits, separate cert/coding days, structure-then-content approach. The rhythm of "build skeleton → fill with content" prevents paralysis and creates visible momentum. Clear daily deliverables eliminate decision fatigue.

**Challenges:**  
Educational writing takes 3x longer than expected. Module 2 initially looked empty (just structure), but patience paid off—now Lesson 1 is live and looks professional. Writing for peers requires different voice than writing for instructors—more conversational, less formal, more examples.

Docker networking troubleshooting consumed 45 minutes but taught valuable lesson about VirtualBox adapter configuration. Now documented for future reference.

**Learning:**  
Writing about security concepts I just learned forces deeper understanding. The constraint actually improves retention. I can't just parrot the cert material—I have to synthesize it for a different audience (peers vs. instructors). This "teach to learn" loop is powerful and unexpected.

Building quiz logic without a framework forced understanding of state management fundamentals. While React or Vue would make this easier, vanilla JS proves I understand the underlying concepts.

**Portfolio Impact:**  
Having real lesson content (not "Lorem ipsum") shows I can execute, not just plan. Recruiters clicking through will see a working educational platform with thoughtful content, not a skeleton project. The Aarav's Notes sections particularly demonstrate personality and authentic voice—differentiation in a sea of technical portfolios.

Course 1 certificate adds credibility. Lab screenshots prove hands-on capability. Commit history shows iterative development process.

**Technical Growth:**  
More comfortable with vanilla JS state management. The quiz gating logic required thinking through user flows and edge cases (what if they click quiz on Lesson 1? What if all lessons complete?). Small details that show polish.

Kali Linux command-line confidence growing. Nmap flags (`-sS`, `-sV`, `--script`) now feel familiar rather than intimidating.

**Time Management Reality Check:**  
10.5 hours over 6 days = 1.75 hours/day average. Higher than Week 0's pace but still sustainable around school. Two weekend days (full Saturday + Sunday morning) provided flexibility for longer coding sessions while weekdays stayed manageable.

Course 1 acceleration added 2 extra hours but felt worthwhile—momentum compounds.

---

### Evidence for Portfolio Review

**GitHub Commits (Week 2):**
1. `feat: create Module 2 HTML structure with navigation` (Nov 5)
2. `feat: add Lesson 1 content - What is Phishing (Module 2)` (Nov 8)
3. `feat: add Module 2 quiz navigator (JavaScript question loop)` (Nov 8)
4. `doc: add quiz navigator screenshot` (Nov 8)
5. `doc: Week 2 reflection — Nmap lab + coding foundation` (Nov 8)
6. Plus 2 minor documentation commits

**Deployed Preview:**
- Live at: `https://aaravarora3835.github.io/SecureScholar-Platform/src/modules/module2.html`
- Quiz at: `https://aaravarora3835.github.io/SecureScholar-Platform/src/modules/module2-quiz.html`
- Demonstrates: Content creation, UI design, educational writing, JavaScript fundamentals

**Learning Artifacts:**
- Google Cert Course 1 completion certificate
- Module 3 notes (threat assessment formulas, risk calculations)
- Kali VM command screenshots (nmap, grep examples)
- Docker + OWASP Juice Shop scan outputs (service detection, HTTP headers)
- Phishing research sources documented in Module2_Plan.md

**Code Quality Indicators:**
- Conventional commit messages (feat/doc/chore prefixes)
- Inline code comments explaining logic
- Consistent naming conventions
- No console errors in deployed site
- Responsive design tested on desktop + mobile

---

### Week 2 vs Week 0 Comparison

**Similarities:**
- Consistent daily progress
- Transparent documentation
- Balance of coding + content
- Portfolio-first mindset

**Differences:**
- **Week 0:** Pure building sprint (8 hrs straight, Friday-Sunday)
- **Week 2:** Distributed learning + building (10.5 hrs over 6 days)
- **Week 2** included certification study alongside coding
- **Week 2** feels more sustainable long-term—no burnout signs

**Growth Indicators:**
- More confident with Git workflow (branching still unused, but commits are clean)
- Better at estimating content creation time (3x multiplier now expected)
- Clearer separation of planning vs execution
- Comfortable asking for help when stuck (quiz button debugging)
- Screenshots taken proactively instead of retroactively

**Momentum Status:** 🟢 Green — Ahead of roadmap timeline, energy levels sustainable, quality standards maintained

---

## Week 3 Preview (Nov 11–17, 2025)

**Phase:** Maintenance Mode + Course 2 Start  
**Time Budget:** 6 hours max (1 hr/day average)

**Goals:**
- Begin Course 2: Play It Safe - Manage Security Risks (Module 1)
- Write Lesson 2 draft: Types of Phishing (email, spear, smishing, vishing)
- Add basic scoring system to Module 2 quiz navigator
- Update homepage `index.html` to link Module 2 (once Lesson 2 complete)

**Success Criteria:**
- Course 2 Module 1 completed
- Lesson 2 has same quality bar as Lesson 1 (250 words + Aarav's Note)
- Quiz shows score/total at completion (e.g., "You scored 2/3")
- All commits follow conventional format (feat/doc/fix/chore)

**Stretch Goals (if time permits):**
- Add quiz retry button
- Write Lesson 3 outline (How to Spot Phishing)
- Create Module 2 progress tracker (% complete indicator)

**Known Constraints:**
- Week 3 intentionally lighter to prevent burnout
- School workload increasing (midterms approaching)
- Thanksgiving week follows (Week 4) = minimal dev time expected

---

**Status:** Week 2 Complete ✅  
**Shipped:** 
- Google Cert Course 1 certificate
- Module 2 Lesson 1 (Phishing basics - 250 words)
- Module 2 Quiz Navigator (3 questions, no scoring yet)
- 8 lab screenshots
- Comprehensive documentation

**Next Milestone:** Lesson 2 draft (Types of Phishing) + Quiz scoring by Nov 17, 2025  
**Momentum:** 🟢 Green — On track, sustainable pace, ahead of schedule, no burnout signs

---

*Last Updated: November 8, 2025 (Saturday evening)*  
*Total Project Hours: 18.5*  
*Lessons Shipped: 5 (Module 1: 4, Module 2: 1)*  
*Certifications Earned: 1 (Google Cybersecurity Course 1)*  
*Code Quality: Clean commits, documented code, no console errors*  
*Portfolio Readiness: High (live demos, real content, cert proof)*
