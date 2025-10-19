// SecureScholar Module System (progress + points)
const SS_KEY = "securescholar__m1";
const initial = { lessonsCompleted: {}, quizScore: 0, points: 0, achievements: {} };

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(SS_KEY)) || initial;
  } catch {
    return initial;
  }
}

function saveState(s) {
  localStorage.setItem(SS_KEY, JSON.stringify(s));
}

function awardPoints(n) {
  const s = loadState();
  s.points += n;
  saveState(s);
}

function setQuizScore(score) {
  const s = loadState();
  s.quizScore = score;
  saveState(s);
}

function progressPercent() {
  const s = loadState();
  const total = 1; // only one module so far
  return Math.min(100, Math.round((s.quizScore > 0 ? 1 : 0) * 100 / total));
}

window.SS = { loadState, saveState, awardPoints, setQuizScore, progressPercent };
