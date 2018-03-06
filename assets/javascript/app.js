
var questions = [
  {
    answer: 'jason voorhees',
    question: 'Who is the main character from Friday the 13th?'
  },
  {
    answer: 'Freddy Krueger',
    question: 'Which character uses a razor-armed glove?'
  },
  {
    answer: 'Michael Myers',
    question: 'Which character is often referred to as "The Shape"?'
  },
  {
    answer: 'Chucky',
    question: 'Which character has a wife by the name of Tiffany?'
  },
  {
    answer: 'Jack Torrance',
    question: 'Which character has the famous line of "Here\'s Johnny!"'
  },
  {
    answer: 'Pennywise',
    question: 'Which character is from the It by Stephen King'
  },
  {
    answer: 'Ghostface',
    question: 'Which character is from the Scream series?'
  },
  {
    answer: 'Pinhead',
    question: 'Which character is from the movie The Hellbound Heart?'
  },
  {
    answer: 'Frankenstein',
    question: 'Which character was green with stitches in his head?'
  },
  {
    answer: 'Hannibal Lecter',
    question: 'Which character is from the movie The Silence of the Lambs?'
  },
];

//Game factory function
var Game = function(questions, numQuestions, questionTime) {
  this.questions = questions;
  this.randomQuestion = '';
  this.randomQuestionAnswer = '';
  this.numQuestions = numQuestions;
  this.questionTime = questionTime;
  this.questionTimer = 10;
  this.answerTimer = 10;
  this.questionCounter = 0;
  this.wrongAnswer = 0;
  this.correctAnswer = 0;
  this.questionPageActive = false;
  this.answers = this.questions.map(function(item) {
    return item.answer;
  });
}

//Game prototype methods
Game.prototype.setRandomQuestionAndAnswer = function() {
  var questionAnswerCombo = this.questions[Math.floor(Math.random() * this.questions.length)];
  this.randomQuestion = questionAnswerCombo.question;
  this.randomQuestionAnswer = questionAnswerCombo.answer;
};

Game.prototype.startTimer = function(timer) {

  var that = this,
    countdownStartValue = timer;
  this.handle = setInterval(function() {
    console.log(countdownStartValue, timer, game.handle);
    $('.timer').text(--countdownStartValue);
    if (countdownStartValue === 0) {
      clearInterval(game.handle);
      if (game.questionPageActive) {
        game.result = 'wrong answer';
        game.wrongAnswer++;
      }
      
      that.switchPage();
    }
  }, 1000);
};

Game.prototype.createQuestionPage = function() {
  this.setRandomQuestionAndAnswer();
  this.questionPageActive = true;
  this.questionCounter++;
  var html = '<h2 class="timer mb-5">' + this.questionTimer + '</h2>' +
             '<h2 class="mb-5">' + this.randomQuestion + '?</h2>' +
             '<h2 class="answer-choice">' + this.randomQuestionAnswer + '</h2>' +
             '<h2 class="answer-choice">' + this.answers[Math.floor(Math.random() * this.answers.length)] + '</h2>' +
             '<h2 class="answer-choice">' + this.answers[Math.floor(Math.random() * this.answers.length)] + '</h2>' +
             '<h2 class="answer-choice">' + this.answers[Math.floor(Math.random() * this.answers.length)] + '</h2>';

  
  $('.question-page').html(html);
  $('.question-page').on('click', '.answer-choice', this.chooseAnswer);
  this.startTimer(this.questionTimer);
  
};

Game.prototype.createAnswerPage = function() {

  var html = '<h2 class="timer mb-5">' + this.answerTimer + '</h2>' +
            '<h1 class="mb-5">' + this.randomQuestion + '?</h1>' +
            '<h1 class="mb-5">' + this.result + '</h1>' + 
            '<h1>' + this.randomQuestionAnswer + '</h1>';

  $('.answer-page').html(html);
  this.startTimer(this.answerTimer);
};

Game.prototype.createScorePage = function() {
  console.log('right answers: ' + this.correctAnswer, 'wrong answers: ' + this.wrongAnswer);
}

Game.prototype.switchPage = function() {
  if (this.questionPageActive) {
    $('.question-page').fadeOut();
    this.createAnswerPage();
    $('.answer-page').fadeIn();
    this.questionPageActive = false;
    console.log('answer page');
  } else {
    if (this.questionCounter === this.numQuestions) {
      $('.answer-page').fadeOut();
      this.createScorePage();
      $('.final-score').fadeIn();
    } else {
      $('.answer-page').fadeOut();
      this.createQuestionPage();
      $('.question-page').fadeIn();
      this.questionPageActive = true;
      console.log('question page');
    } 
  }
};

Game.prototype.chooseAnswer = function() {
  console.log(game.handle);
  clearInterval(game.handle);
  game.chosenAnswer = $(this).text();
  if (game.chosenAnswer === game.randomQuestionAnswer) {
    game.result = 'correct';
    game.correctAnswer++;
  } else {
    game.result = 'wrong answer';
    game.wrongAnswer++;
  }
  //setTimeout(function() {
    game.switchPage();
  //}, 500);
};

//instantiate game variable
var game;

//Event Handlers
$('.start-btn').click(startQuiz);
    

//Functions
function startQuiz() {
  game = new Game(questions, 5, 25);
  game.createQuestionPage();
  $('.start-page').fadeOut();
  $('main').addClass('transparent-bg');
  $('.question-page').fadeIn();
}
