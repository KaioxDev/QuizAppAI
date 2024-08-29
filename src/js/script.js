const questions = [
  { question: "Qual a capital da França?", choices: ["Paris", "Londres", "Roma", "Berlim"], correct: 0 },
  { question: "Qual é o maior planeta do sistema solar?", choices: ["Terra", "Marte", "Júpiter", "Saturno"], correct: 2 },
  { question: "Quem pintou a Mona Lisa?", choices: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correct: 2 },
  { question: "Qual é o elemento químico mais abundante no universo?", choices: ["Oxigênio", "Carbono", "Hidrogênio", "Nitrogênio"], correct: 2 },
  { question: "Qual é a moeda do Japão?", choices: ["Dólar", "Euro", "Iene", "Yuan"], correct: 2 },
  { question: "Em que ano o homem pisou na Lua?", choices: ["1969", "1972", "1965", "1980"], correct: 0 }
];

let currentPage = 0;
const questionsPerPage = 3;
let timeLeft = 30; // Tempo em segundos
const totalTime = 30; // Tempo total em segundos
let timerInterval;

function loadQuiz() {
  clearInterval(timerInterval);
  startTimer();

  const quizForm = document.getElementById('quizForm');
  quizForm.innerHTML = ''; // Limpar perguntas atuais

  const start = currentPage * questionsPerPage;
  const end = start + questionsPerPage;
  const paginatedQuestions = questions.slice(start, end);

  paginatedQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    
    questionDiv.innerHTML = `
      <h4>${start + index + 1}. ${q.question}</h4>
      ${q.choices.map((choice, i) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="question${start + index}" id="q${start + index}_${i}" value="${i}">
          <label class="form-check-label" for="q${start + index}_${i}">${choice}</label>
        </div>
      `).join('')}
    `;
    quizForm.appendChild(questionDiv);
  });

  document.querySelector('.btn-prev').disabled = currentPage === 0;
  document.querySelector('.btn-next').disabled = (end >= questions.length);
}

function startTimer() {
  timeLeft = totalTime;
  const timerDisplay = document.getElementById('timer');
  const progressBar = document.getElementById('progressBar');

  timerInterval = setInterval(() => {
    timeLeft--;

    const progressPercentage = (timeLeft / totalTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);

    timerDisplay.textContent = `Tempo restante: ${timeLeft} segundos`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeUp();
    }
  }, 1000);
}

function timeUp() {
  const timesUpSound = document.getElementById('timesUpSound');
  timesUpSound.play();

  const modalBodyContent = document.getElementById('modal-body-content');
  modalBodyContent.innerHTML = 'O tempo acabou! Tente novamente na próxima vez.';
  
  const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
  resultModal.show();

  document.querySelector('.btn-submit').disabled = true;
  document.querySelector('.btn-next').disabled = true;
  document.querySelector('.btn-prev').disabled = true;
}

function nextPage() {
  currentPage++;
  loadQuiz();
}

function prevPage() {
  currentPage--;
  loadQuiz();
}

function submitQuiz() {
  clearInterval(timerInterval);

  let score = 0;
  questions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption && parseInt(selectedOption.value) === q.correct) {
      score++;
    }
  });

  const modalBodyContent = document.getElementById('modal-body-content');
  modalBodyContent.innerHTML = `Você acertou ${score} de ${questions.length} perguntas.`;

  const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
  resultModal.show();
}

window.onload = function() {
  loadQuiz();
  startTimer(); // Iniciar o cronômetro assim que o quiz for carregado
}
