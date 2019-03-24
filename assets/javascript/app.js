var trivia = $('#trivia-section');
var time = 15;

$(document).on('click', '#resetGame', function(e) {
  game.reset();
});

$(document).on('click', '.answerButton', function(e) {
  game.clicked(e);
});

$(document).on('click', '#startButton', function(e) {
  $('#everything').prepend('<p>Time Remaining: <span id="startCountDown">15</span> Seconds</p>');
  game.loadQuestion();
});

var questions = [
  {
  question: "In S1E1: Who started their first day at Dunder Mifflin Scranton?",
  answers: ["Jim Halpert", "Ryan Howard", "Michael Scott", "Erin Hannon"],
  correctAnswer: "Ryan Howard",
  image:"assets/images/question1.gif"
}, {
  question: "In S1E2: What famous comedian's stand up routine does Michael imitate?",
  answers: ["Chris Rock", "Richard Pryor", "Robin Williams", "George Carlin"],
  correctAnswer: "Chris Rock",
  image:"assets/images/question2.gif"
}, {
  question: "In S1E3: Which of these is NOT one of Jim and Pam's made up diseases?",
  answers: ["Killer nanorobots", "Hot dog fingers", "Spontaneous dental hydroplosion", "Hair cancer"],
  correctAnswer: "Hair cancer",
  image:"assets/images/question3.gif"
}, {
  question: "In S1E4: How much money does Michael donate to Oscar's nephew's charity, not realizing it is a walk-a-thon and the amount is per mile?",
  answers: ["$40", "$10", "$25", "$100"],
  correctAnswer: "$25",
  image:"assets/images/question4.gif"
}, {
  question: "In S1E5: What small appliance of Pam's breaks down? (It was given to her at her engagement party three years earlier)",
  answers: ["Juicer", "Microwave", "Blender", "Toaster Oven"],
  correctAnswer: "Toaster Oven",
  image:"assets/images/question5.gif"
}, {
  question: "In S1E6: What is the Hot Girl's name?",
  answers: ["Amy", "Christy", "Kelly", "Katy"],
  correctAnswer: "Katy",
  image:"assets/images/question6.gif"
}, {
  question: "In S2E1: What Dundie award does Phyllis take home?",
  answers: ["The Busiest Beaver Dundie", "The Busy Bee Dundie", "The Bushiest Beaver Dundie", "The Bumble Beaver Dundie"],
  correctAnswer: "The Bushiest Beaver Dundie",
  image:"assets/images/question7.gif"
}, {
  question: "In S2E2: What is on Todd Packer's vanity license plate?",
  answers: ["LUVMKR", "WLHUNG", "TODPKR", "BGDADY"],
  correctAnswer: "WLHUNG",
  image:"assets/images/question8.gif"
}, {
  question: 'In S2E3 "Office Olympics": What does Pam name "Box of paper snowshoe racing"?',
  answers: ["Flonkerton", "Icelandic Snowshoe Racing", "Bixing", "Pegerhosen"],
  correctAnswer: "Flonkerton",
  image:"assets/images/question9.gif"
}, {
  question: 'In S2E4 "The Fire": What are Merediths five DVD choices for the game "Desert Island"?',
  answers: ["The Shawshank Redemption, 40 Year Old Virgin, Gentlemen Prefer Blondes, Disney's Sleeping Beauty, Life of Pi", "Gone With The Wind, The Burbs, Clerks II, Sense & Sensibility, Chronicles of Riddick", "Legends of the Fall, Legally Blonde, Bridges of Madison County, My Big Fat Greek Wedding, Ghost (but just that one scene)", "Fargo, Edward Scissor-hands, The Breakfast Club, Dazed and Confused, The Princess Bride"],
  correctAnswer: "Gone With The Wind, The Burbs, Clerks II, Sense & Sensibility, Chronicles of Riddick",
  image:"assets/images/question10.gif"
}
];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:time,
  correct:0,
  incorrect:0,

  countdown: function(){
    game.counter--;
    $('#startCountDown').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    trivia.html('<h3>' + questions[this.currentQuestion].question + '</h3>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      trivia.append('<button class="answerButton" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){
    game.counter = time;
    $('#startCountDown').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function (){
    clearInterval(timer);
    $('#startCountDown').html(game.counter);

    trivia.html('<h2>You are out of time!</h2>');
    trivia.append('<h3>Correct answer: ' + questions[this.currentQuestion].correctAnswer);
    trivia.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);
    $("p").hide();

    trivia.html('<h2>All done, heres how you did!</h2>');
    trivia.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    trivia.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    trivia.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    trivia.append('<br><button id="resetGame">Reset!</button>');
  },

  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    trivia.html('<h2>Wrong!</h2>');
    trivia.append('<h3>Correct answer: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    trivia.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    trivia.html('<h2>Correct!</h2>');
    trivia.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = time;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
    $("p").show();

  }
};
