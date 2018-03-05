
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

var Game = function(questions, numQuestions, questionTime) {
  this.questions = questions;
  this.numQuestions = numQuestions;
  this.questionTime = questionTime;
  this.counter = 0;
  this.answers = this.questions.map(function(item) {
    return item.answer;
  });
}

var game = new Game(questions, 5, 25);

console.log(game);
    