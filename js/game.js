var word = {
  secretWord: "zeitgeist",
  wordList: ['ray', 'glow', 'cache', 'sunrise', 'blame', 'urchin', 'rainbow', 'girl', 'ruby', 'vile', 'dog', 'cat', 'sock', 'tulip', 'jasmine', 'candy', 'horse', 'chicken', 'goat', 'bird', 'cow', 'zebra', 'glide', 'wine', 'water'],

  setSecretWord: function(){
    return this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
  },

  checkLetters: function(guessedLetters){

    var blanks = _.range(this.secretWord.length).map(function () { return '_' })
    var correctLetters = _.intersection(this.secretWord, guessedLetters);

    console.log("here's correct_letters: " + correctLetters);
    for(var i = 0; i < guessedLetters.length; i++) {
      for(var n = 0; n < this.secretWord.length; n++) {
        if(guessedLetters[i] === this.secretWord[n]) {
          blanks[n] = this.secretWord[n];
         }
      }
    }
    return [blanks,correctLetters];
  }
};

var player = {
  MAX_GUESSES: 8,
  guessedLetters: [],

  // Takes a new letter as input and updates the game
  makeGuess: function(letter){
    this.guessedLetters.push(letter);
    console.log("in make guess: " + this.guessedLetters);

    // use checkLetters to get blanks and see if they won
    var results = word.checkLetters(this.guessedLetters);
    console.log("results[0]: " + results[0]);
    console.log("results[1]: " + results[1]);

    game.updateDisplay(results[0], letter, (this.MAX_GUESSES - this.guessedLetters.length));

    if( this.checkWin(results[0].join('')) === true ) {
      game.updateDisplay(word.secretWord, this.guessedLetters , (this.MAX_GUESSES - this.guessedLetters.length));
      $('#wordString').css("color", "green");
      //game.resetGame();
      console.log("win game");
      return;
    }

    if(this.checkLose(this.guessedLetters) === true) {
      game.updateDisplay(word.secretWord, this.guessedLetters , (this.MAX_GUESSES - this.guessedLetters.length));
      $('#wordString').css('color', 'red');
      game.resetGame();
      console.log("lose game");
    };

  },

  // Check if the player has won
  checkWin: function(wordString){
    console.log("in checkwin: " + wordString);
    console.log("in checkwin: " + word.secretWord);
    if(wordString === word.secretWord) {
      return true;
    } else {
      return false;
    }
  },

  checkLose: function(wrongLetters){

    return wrongLetters.length >= this.MAX_GUESSES;
  }
};

var game = {
  // Resets the game
  resetGame: function(){
    //player.guessedLetters = [];
    word.setSecretWord();
  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){
    game.updateDisplay(word.secretWord, this.guessedLetters , 0);
    game.resetGame();
  },

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  updateDisplay: function(secretWordWithBlanks, guessedLetters, guessesLeft){
    $("#wordString").html(secretWordWithBlanks);
    $("#guessedLetters").append(guessedLetters);
    $("#guessesLeft").html(guessesLeft);

  }
};

window.onload = function(){
  // Created a losing scenario
  // console.log(player.checkLose(wrongLettersArray));

  // Created a not yet losing scenario
  // console.log(player.checkLose(wrongLettersArray));
  // Start a new game
  game.resetGame();
  console.log(word.secretWord);

  // Add event listener to the letter input field to grab letters that are guessed
  $("#letterField").on("keyup", function() {
    var letter = $("#letterField").val();
    $("#letterField").val("");

    player.makeGuess(letter);
  });

  // Add event listener to the reset button to reset the game when clicked
  $("#giveUpButton").on("click", function() {
    console.log("click giveup ");
    game.giveUp();
  });
  // Add event listener to the give up button to give up when clicked
  $("#resetButton").on("click", function() {
    console.log("click reset ");
    game.resetGame();
    location.reload();
  });

};
