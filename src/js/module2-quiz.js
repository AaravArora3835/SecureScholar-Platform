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

// DOM elements
const questionContainer = document.getElementById('quiz-question');
const optionsContainer = document.getElementById('quiz-options');
const nextButton = document.getElementById('next-question');
const questionCounter = document.getElementById('question-counter');

// Render current question
function renderQuestion() {
  const q = module2Questions[currentQuestionIndex];
  
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

// Handle option selection (visual feedback only, no scoring yet)
function selectOption(index) {
  const buttons = optionsContainer.querySelectorAll('.quiz-option');
  buttons.forEach(btn => btn.classList.remove('selected'));
  buttons[index].classList.add('selected');
  nextButton.disabled = false;
}

// Move to next question
function nextQuestion() {
  if (currentQuestionIndex < module2Questions.length - 1) {
    currentQuestionIndex++;
    nextButton.disabled = true;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

// Finish quiz (placeholder for now)
function finishQuiz() {
  questionContainer.textContent = 'Quiz complete! Scoring system coming in Week 3.';
  optionsContainer.innerHTML = '';
  nextButton.style.display = 'none';
  questionCounter.textContent = 'Done';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  nextButton.disabled = true;
  nextButton.addEventListener('click', nextQuestion);
  renderQuestion();
});
