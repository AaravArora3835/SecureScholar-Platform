class AdaptiveQuiz {
  constructor(questions) {
    this.maxHints = 3;
    this.questions = questions;
    this.userLevel = "beginner";
    this.consecutiveRight = 0;
    this.consecutiveWrong = 0;
    this.hintsUsed = 0;
  }

  evaluatePerformance(isCorrect) {
    if (isCorrect) {
      this.consecutiveRight++;
      this.consecutiveWrong = 0;
      if (this.consecutiveRight >= 3 && this.userLevel === "beginner") {
        this.userLevel = "intermediate";
        this.showMessage("🎯 Great job! Unlocking intermediate questions.");
      } else if (this.consecutiveRight >= 3 && this.userLevel === "intermediate") {
        this.userLevel = "advanced";
        this.showMessage("🔥 You’ve reached advanced difficulty!");
      }
    } else {
      this.consecutiveWrong++;
      this.consecutiveRight = 0;
      if (this.consecutiveWrong >= 2 && this.hintsUsed < this.maxHints) {
        this.offerHint();
      }
    }
  }

  getNextQuestion() {
    const pool = this.questions.filter(q => q.difficulty === this.userLevel);
    if (pool.length === 0) return this.randomQuestion();
    return pool[Math.floor(Math.random() * pool.length)];
  }

  randomQuestion() {
    return this.questions[Math.floor(Math.random() * this.questions.length)];
  }

  showMessage(msg) {
    const note = document.createElement("div");
    note.className = "adaptive-msg";
    note.textContent = msg;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 2500);
  }

  offerHint() {
    this.hintsUsed++;
    const hintBox = document.createElement("div");
    hintBox.className = "hint-modal";
    hintBox.innerHTML = `
      <h3>Need a hint? 🤔</h3>
      <p>You’ve missed two in a row. Here’s a small nudge:</p>
      <button id="hint-ok">Thanks</button>
    `;
    document.body.appendChild(hintBox);
    const btn = document.getElementById("hint-ok");
    if (btn) btn.addEventListener("click", () => hintBox.remove());
  }
}
