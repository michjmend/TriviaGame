//start with choosing your TV show and assign an object for questions/options/answer/gifs
var questions = [
{question: "In S1E1: Who started their first day at Dunder Mifflin Scranton?",
  options: ["Jim Halpert", "Ryan Howard", "Michael Scott", "Erin Hannon"],
  answer: "Ryan Howard",
  gif:"assets/images/question1.gif"},
{question: "In S1E2: What famous comedian's stand up routine does Michael imitate?",
  options: ["Chris Rock", "Richard Pryor", "Robin Williams", "George Carlin"],
  answer: "Chris Rock",
  gif:"assets/images/question2.gif"},
{question: "In S1E3: Which of these is NOT one of Jim and Pam's made up diseases?",
  options: ["Killer nanorobots", "Hot dog fingers", "Spontaneous dental hydroplosion", "Hair cancer"],
  answer: "Hair cancer",
  gif:"assets/images/question3.gif"},
{question: "In S1E4: How much money does Michael donate to Oscar's nephew's charity, not realizing it is a walk-a-thon and the amount is per mile?",
  options: ["$40", "$10", "$25", "$100"],
  answer: "$25",
  gif:"assets/images/question4.gif"},
{question: "In S1E5: What small appliance of Pam's breaks down? (It was given to her at her engagement party three years earlier)",
  options: ["Juicer", "Microwave", "Blender", "Toaster Oven"],
  answer: "Toaster Oven",
  gif:"assets/images/question5.gif"},
{question: "In S1E6: What is the Hot Girl's name?",
  options: ["Amy", "Christy", "Kelly", "Katy"],
  answer: "Katy",
  gif:"assets/images/question6.gif"},
{question: "In S2E1: What Dundie award does Phyllis take home?",
  options: ["The Busiest Beaver Dundie", "The Busy Bee Dundie", "The Bushiest Beaver Dundie", "The Bumble Beaver Dundie"],
  answer: "The Bushiest Beaver Dundie",
  gif:"assets/images/question7.gif"},
{question: "In S2E2: What is on Todd Packer's vanity license plate?",
  options: ["LUVMKR", "WLHUNG", "TODPKR", "BGDADY"],
  answer: "WLHUNG",
  gif:"assets/images/question8.gif"},
{question: 'In S2E3 "Office Olympics": What does Pam name "Box of paper snowshoe racing"?',
  options: ["Flonkerton", "Icelandic Snowshoe Racing", "Bixing", "Pegerhosen"],
  answer: "Flonkerton",
  gif:"assets/images/question9.gif"},
{question: 'In S2E4 "The Fire": What are Merediths five DVD choices for the game "Desert Island"?',
  options: ["The Shawshank Redemption, 40 Year Old Virgin, Gentlemen Prefer Blondes, Disney's Sleeping Beauty, Life of Pi", "Gone With The Wind, The Burbs, Clerks II, Sense & Sensibility, Chronicles of Riddick", "Legends of the Fall, Legally Blonde, Bridges of Madison County, My Big Fat Greek Wedding, Ghost (but just that one scene)", "Fargo, Edward Scissor-hands, The Breakfast Club, Dazed and Confused, The Princess Bride"],
  answer: "Gone With The Wind, The Burbs, Clerks II, Sense & Sensibility, Chronicles of Riddick",
  gif:"assets/images/question10.gif"}
];
var trivia = $('#trivia-section');//id from html page
var time = 15;//seconds
var game = {//actual game object will be used to define the functions of the rest of the game.
  correct:0,
  incorrect:0,
  questions:questions,
  presentQ:0,
  counter:time,

  countdown: function(){//timer function
    game.counter--;
    $('#startCountDown').html(game.counter);
    //set conditional statement to run what happens when the time runs out
    if (game.counter === 0){
      game.outOfTime();
    }
  },

  showQ: function(){
    timer = setInterval(game.countdown, 1000);
    trivia.html('<h3>' + questions[this.presentQ].question + '</h3>' );

    for (var i = 0; i<questions[this.presentQ].options.length; i++){
      trivia.append('<button class="answerButton" id="button"' + 'data-name="' + questions[this.presentQ].options[i] + '">' + questions[this.presentQ].options[i]+ '</button>');
    }
  },

  nextQ: function(){
    game.counter = time;
    $('#startCountDown').html(game.counter);
    game.presentQ++;
    game.showQ();
  },

  outOfTime: function (){
    clearInterval(timer);
    $('#startCountDown').html(game.counter);
//transfer timeout js content to html and append the correct answer(if user answered incorrectly) along with the image
    trivia.html('<h2>You are out of time!</h2>');
    trivia.append('<h3>Correct answer: ' + questions[this.presentQ].answer);
    trivia.append('<img src="' + questions[this.presentQ].gif + '" />');
//load the gif page to last 3 seconds
    if (game.presentQ === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQ, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);
    $("p").hide();
//when you finish your trivia, this is what is transferred into DOM
    trivia.html('<h2>Here are your results!</h2>');
    trivia.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    trivia.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    trivia.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    trivia.append('<br><button id="resetGame">Reset!</button>');
  },

  wrong: function() {
    game.incorrect++;
    clearInterval(timer);
    trivia.html('<h2>Wrong!</h2>');
    trivia.append('<h3>Correct answer: ' + questions[game.presentQ].answer + '</h3>');
    trivia.append('<img src="' + questions[game.presentQ].gif + '" />');

    if (game.presentQ === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQ, 3 * 1000);
    }
  },
  right: function(){
    clearInterval(timer);
    game.correct++;
    trivia.html('<h2>Right!</h2>');
    trivia.append('<img src="' + questions[game.presentQ].gif + '" />');

    if (game.presentQ === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQ, 3 * 1000);
    }
  },

  clicked: function(begin) {
    clearInterval(timer);

    if ($(begin.target).data("name") === questions[this.presentQ].answer){
      this.right();
    } else {
      this.wrong();
    }
  },

  reset: function(){
    this.correct = 0;
    this.incorrect = 0;
    this.presentQ = 0;
    this.counter = time;
    this.showQ();
    $("p").show();

  }
};

$(document).on('click', '#resetGame', function() {
  game.reset();
});

$(document).on('click', '.answerButton', function(begin) {
  game.clicked(begin);
});

$(document).on('click', '#startButton', function() {
  $('#everything').prepend('<p>Remaining Time: <span id="startCountDown">15</span> Seconds</p>');
  game.showQ();
});
