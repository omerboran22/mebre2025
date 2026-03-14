/**
 * 
 * prev-btn ->Sorularda geri gitmek için kullanılır.
 * question-header -> Sorunun kaçıncı soru olduğunu gösterir.
 * next-btn -> Sorularda ileri gitmek için kullanılır.
 * question-text -> Sorunun kendisini gösterir.
 * options-list -> Sorunun seçeneklerini gösterir.
 */


class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timer = null;
    this.initialize();
  }

  initialize() {
    const timeDisplay = document.getElementById('question-time');
    this.startTimer(30, timeDisplay); // Her soru için 30 saniye
  }

  startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    // this.timer = setInterval(() => {
    //   minutes = parseInt(timer / 60, 10);
    //   seconds = parseInt(timer % 60, 10);
    //   display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    //   if (--timer < 0) {
    //     clearInterval(this.timer);
    //     alert('Süre doldu! Bir sonraki soruya geçiliyor.');
    //     this.nextQuestion();
    //   }
    // }, 1000);
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  questionComponent(currentQuestion,finished=false) {
    const questionCard = document.createElement('div');
    document.getElementById('question-header').textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
    const questionHeader = document.createElement('p');
    questionHeader.textContent = currentQuestion.text;
    questionCard.appendChild(questionHeader);
    const optionsList = document.createElement('ul');
    optionsList.classList.add('options');
    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement('li');
      optionElement.classList.add('option');
      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = `question${currentQuestion.questionKey}`;
      radioInput.id = `option${index}`;
      radioInput.checked = finished ? (index === currentQuestion.correctOptionIndex) : false; // Doğru cevabı işaretle
      const label = document.createElement('label');
      label.setAttribute('for', `option${index}`);
      label.textContent = option;
      optionElement.appendChild(radioInput);
      optionElement.appendChild(label);
      radioInput.addEventListener('change', () => {
        this.selectOption(index);
      });
      optionsList.appendChild(optionElement);
    });
    
    questionCard.appendChild(optionsList);
    const questionCardElement = document.getElementById('question-card');
    questionCardElement.appendChild(questionCard);
  }

  render() {
    const currentQuestion = this.getCurrentQuestion();
    const questionCardElement = document.getElementById('question-card');
    questionCardElement.innerHTML = '';
    this.questionComponent(currentQuestion);
  }

  selectOption(optionIndex){
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion.correctOptionIndex === optionIndex) {
      this.score++;
    }
  }

  hasNextQuestion() {
    return this.currentQuestionIndex + 1 < this.questions.length;
  }

  hasPreviousQuestion() {
    return this.currentQuestionIndex > 0;
  }

  previousQuestion() {
    if (this.hasPreviousQuestion()) {
      this.currentQuestionIndex--;
      this.score = Math.max(0, this.score - 1); // Geri gidildiğinde puanı azalt
      this.render(); // Soruyu yeniden render et
    }
  }

  nextQuestion() {
    if (this.hasNextQuestion()) {
      this.initialize(); // Yeni soru için timer'ı başlat
      this.currentQuestionIndex++;
      this.render(); // Soruyu yeniden render et
    }
    else {
      this.finish();
    }
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.currentQuestionIndex = 0;
    this.score = 0;
  }


  finish() {
    clearInterval(this.timer);
    const questionCardElement = document.getElementById('question-card');
    questionCardElement.innerHTML = '';
    this.questions.forEach((question, index) => {
      this.questionComponent(question, true);
    });
  }

}


// Örnek sorular
const questions = [
  {
    text: 'Türkiye’nin başkenti neresidir?',
    options: ['Ankara', 'İstanbul', 'İzmir', 'Bursa'],
    correctOptionIndex: 0,
    questionKey: 'capital_of_turkey',
  },
  {
    text: 'Dünyanın en büyük okyanusu hangisidir?',
    options: ['Atlantik Okyanusu', 'Hint Okyanusu', 'Pasifik Okyanusu', 'Arktik Okyanusu'],
    correctOptionIndex: 2,
    questionKey: 'largest_ocean',
  },
  {
    text: 'Hangi gezegen Güneş’e en yakın olanıdır?',
    options: ['Venüs', 'Merkür', 'Mars', 'Jüpiter'],
    correctOptionIndex: 1,
    questionKey: 'closest_planet_to_sun',
  },
];

const quiz = new Quiz(questions);
quiz.render();

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
prevBtn.addEventListener('click', () => {
  quiz.previousQuestion();
});

nextBtn.addEventListener('click', () => {
  quiz.nextQuestion();
});