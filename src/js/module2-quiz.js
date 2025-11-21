// SecureScholar Module 2 Quiz Navigator
// Author: Aarav Arora
// Date: November 8, 2025
// Purpose: Display phishing defense questions one at a time

const module2Questions = [
  {
    id: 1,
    text: "What is the primary goal of a phishing attack?",
    options: [
      "To slow down your internet connection",
      "To trick you into revealing sensitive information",
      "To install antivirus software",
      "To improve email security"
    ],
    answer: 1 // index of correct answer (0-based)
  },
  {
    id: 2,
    text: "Which of these is a red flag in a phishing email?",
    options: [
      "Personalized greeting with your name",
      "Links matching the company's official domain",
      "Urgent threats about account closure",
      "Professional logo and formatting"
    ],
    answer: 2
  },
  {
    id: 3,
    text: "What should you do if you receive a suspicious email asking for your password?",
    options: [
      "Reply with your password to verify it's real",
      "Click the link to check if the site looks legitimate",
      "Delete it and report it to IT/parents",
      "Forward it to all your friends as a warning"
    ],
    answer: 2
  }
];

// State
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;

// Passing threshold (e.g., 75% of questions)
const passingScore = Math.ceil(module2Questions.length * 0.75);

// DOM elements
const questionContainer = document.getElementById('quiz-question');
const optionsContainer = document.getElementById('quiz-options');
const nextButton = document.getElementById('next-question');
const questionCounter = document.getElementById('question-counter');

// Render current question
function renderQuestion() {
  const q = module2Questions[currentQuestionIndex];

  // Reset selection state for the new question
  selectedOptionIndex = null;
  nextButton.disabled = true;

  // Update question text
  questionContainer.textContent = q.text;

  // Clear and rebuild options
  optionsContainer.innerHTML = '';
  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = option;
    button.onclick = () => selectOption(index);
    optionsContainer.appendChild(button);
  });

  // Update counter
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${module2Questions.length}`;

  // Update Next button
  if (currentQuestionIndex === module2Questions.length - 1) {
    nextButton.textContent = 'Finish Quiz';
  } else {
    nextButton.textContent = 'Next Question →';
  }
}

// Handle option selection
function selectOption(index) {
  const buttons = optionsContainer.querySelectorAll('.quiz-option');
  buttons.forEach(btn => btn.classList.remove('selected'));
  buttons[index].classList.add('selected');
  selectedOptionIndex = index;
  nextButton.disabled = false;
}

// Move to next question
function nextQuestion() {
  const currentQuestion = module2Questions[currentQuestionIndex];
  if (selectedOptionIndex === null) {
    return;
  }

  const isCorrect = selectedOptionIndex === currentQuestion.answer;
  if (isCorrect) {
    score += 1;
  }

  revealAnswerFeedback(isCorrect, currentQuestion.answer, selectedOptionIndex);

  // Prevent multiple submissions while showing feedback
  nextButton.disabled = true;

  const proceed = () => {
    if (currentQuestionIndex < module2Questions.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  };

  // Brief pause when incorrect so the learner can see the correct answer
  if (isCorrect) {
    proceed();
  } else {
    setTimeout(proceed, 650);
  }
}

// Highlight the correct answer and optionally the incorrect choice
function revealAnswerFeedback(isCorrect, correctIndex, selectedIndex) {
  const buttons = optionsContainer.querySelectorAll('.quiz-option');
  buttons.forEach((btn, index) => {
    if (index === correctIndex) {
      btn.classList.add('correct');
    }

    if (!isCorrect && index === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });
}

// Finish quiz (calculate and show score)
function finishQuiz() {
  const totalQuestions = module2Questions.length;
  const passed = score >= passingScore;
  const scoreMessage = `You scored ${score} / ${totalQuestions}`;
  const feedbackMessage = passed
    ? '✅ Nice work! You have a solid grasp on phishing defenses.'
    : '❗ Review Lesson 1 & 2 and try again to strengthen your phishing defenses.';

  questionContainer.textContent = 'Quiz complete! Here are your results:';
  optionsContainer.innerHTML = `
    <div class="quiz-results">
      <p class="quiz-score">${scoreMessage}</p>
      <p class="quiz-feedback">${feedbackMessage}</p>
    </div>
  `;
  nextButton.style.display = 'none';
  questionCounter.textContent = 'Done';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  nextButton.disabled = true;
  nextButton.addEventListener('click', nextQuestion);
  renderQuestion();
});
