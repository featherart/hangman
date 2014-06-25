var word = {
  secretWord: "zeitgeist",
  wordList: ['x-ray', 'glow', 'sunrise', 'blame', 'urchin', 'rainbow', 'girl', 'ruby', 'vile', 'dog', 'cat', 'sock', 'tulip', 'jasmine', 'cache', 'horse', 'chicken', 'goat', 'bird', 'cow', 'zebra', 'glide', 'wine', 'water'],

  setSecretWord: function(){
    // for now we are only handling words with all unique letters!
    return this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
  },

  checkLetters: function(guessedLetters){
    // an array of guessed letters is passed in
    // intersection finds common letters
    console.log("in guessed letters: " + guessedLetters.length);
    var blanks = _.range(this.secretWord.length).map(function () { return '_' })
    console.log("blanks: " + blanks);
    var correctLetters = _.intersection(this.secretWord, guessedLetters);
    var wrongLetters = [];

    console.log("here's correct_letters: " + correctLetters);
    for(var i = 0; i < guessedLetters.length; i++) {
      for(var n = 0; n < this.secretWord.length; n++) {
        if(guessedLetters[i] === this.secretWord[n]) {
          console.log("in if guessedLetters[i]: " + guessedLetters[i]);
          // this only works for first letter though
          blanks.shift()
          blanks.unshift(guessedLetters[i]); // unshift
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
    //var letters = word.secretWord.split("");
    this.guessedLetters.push(letter);
    console.log("in make guess: " + this.guessedLetters);

    // use checkLetters to get blanks and see if they won
    var results = word.checkLetters(this.guessedLetters);
    console.log("here is blanks: " + results[0]);
    console.log("here is the right letter: " + results[1]);

    game.updateDisplay(results[0], letter, (this.MAX_GUESSES - this.guessedLetters.length));

    if(this.checkLose(this.guessedLetters) === true) {
      game.resetGame();
      game.updateDisplay(this.guessedLetters, word.secretWord, 0);
      console.log("lose game");
    };

  },

  // Check if the player has won and end the game if so
  checkWin: function(wordString){
    if(wordString === word.secretWord) {
      game.resetGame();
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
    player.guessedLetters = [];
    word.setSecretWord();
  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){},

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  updateDisplay: function(secretWordWithBlanks, guessedLetters, guessesLeft){
    $("#wordString").val("");
    $("#wordString").append(secretWordWithBlanks);
    $("#guessedLetters").append(guessedLetters);
    $("#guessesLeft").val("");
    $("#guessesLeft").append(guessesLeft);

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
  });

};
