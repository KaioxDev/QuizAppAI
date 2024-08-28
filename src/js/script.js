const questions = [
    { question: "Qual a capital da França?", choices: ["Paris", "Londres", "Roma", "Berlim"], correct: 0 },
    { question: "Qual é o maior planeta do sistema solar?", choices: ["Terra", "Marte", "Júpiter", "Saturno"], correct: 2 },
    { question: "Quem pintou a Mona Lisa?", choices: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], correct: 2 },
    { question: "Qual é o elemento químico mais abundante no universo?", choices: ["Oxigênio", "Carbono", "Hidrogênio", "Nitrogênio"], correct: 2 },
    { question: "Qual é a moeda do Japão?", choices: ["Dólar", "Euro", "Iene", "Yuan"], correct: 2 },
    { question: "Em que ano o homem pisou na Lua?", choices: ["1969", "1972", "1965", "1980"], correct: 0 },
    { question: "Qual o país mais populoso do mundo?", choices: ["Índia", "Estados Unidos", "China", "Rússia"], correct: 2 },
    { question: "Quem foi o primeiro presidente dos EUA?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
    { question: "Qual é o oceano mais profundo?", choices: ["Atlântico", "Pacífico", "Índico", "Ártico"], correct: 1 },
    { question: "Qual é o animal mais rápido do mundo?", choices: ["Leopardo", "Falcão-peregrino", "Cavalo", "Tubarão-branco"], correct: 1 },
    { question: "Qual é a fórmula química da água?", choices: ["H2O", "CO2", "O2", "N2"], correct: 0 },
    { question: "Qual o maior deserto do mundo?", choices: ["Saara", "Gobi", "Antártida", "Kalahari"], correct: 2 },
    { question: "Quem descobriu a gravidade?", choices: ["Albert Einstein", "Isaac Newton", "Galileu Galilei", "Nikola Tesla"], correct: 1 },
    { question: "Quantos continentes existem?", choices: ["5", "6", "7", "8"], correct: 2 },
    { question: "Em qual continente fica o Brasil?", choices: ["América do Sul", "Ásia", "Europa", "África"], correct: 0 },
  ];
  
  function loadQuiz() {
    const quizForm = document.getElementById('quizForm');
    questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      
      questionDiv.innerHTML = `
        <h4>${index + 1}. ${q.question}</h4>
        ${q.choices.map((choice, i) => `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="question${index}" id="q${index}_${i}" value="${i}">
            <label class="form-check-label" for="q${index}_${i}">${choice}</label>
          </div>
        `).join('')}
      `;
      quizForm.appendChild(questionDiv);
    });
  }
  
  function submitQuiz() {
    let score = 0;
    questions.forEach((q, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption && parseInt(selectedOption.value) === q.correct) {
        score++;
      }
    });
    alert(`Você acertou ${score} de ${questions.length} perguntas.`);
  }
  
  window.onload = loadQuiz;
  