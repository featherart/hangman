var word = {
  // This is an attribute of the object word.
  secretWord: "zeitgeist",
  wordList: ['ephemeral', 'glow', 'sunset', 'bloom', 'egg', 'rainbow', 'girl', 'diamond', 'verse', 'idiot', 'granny', 'sock', 'tulip', 'jasmine', 'cache', 'dollar', 'quarter', 'pebble', 'bird', 'cowboy', 'panda', 'umbrella', 'blood'],

  setSecretWord: function(){
    console.log("in setter");
    return this.secretWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    //this.secretWord = this.wordList[_.random(this.wordList.length - 1)];
    console.log("in secret word: " + this.secretWord);
  },

  checkLetters: function(guessedLetters){
    // an array of guessed letters is passed in
    var correct_letters = _.intersection(this.secretWord, guessedLetters);
    var wrongLetters = [];
    for(var i = 0; i < guessedLetters.length; i++) {
      for(var n = 0; n < this.secretWord.length; n++) {
        if(guessedLetters[i] !== this.secretWord[n]) {
          wrongLetters.push(guessedLetters[i]);
        }
      }
    }
    return ['m____',wrongLetters];
  }
};

var player = {
  MAX_GUESSES: 8,
  guessedLetters: [],

  // Takes a new letter as input and updates the game
  makeGuess: function(letter){
    var letters = word.secretWord.split("");
    this.guessedLetters.push(letter);
    console.log("in make guess: " + this.guessedLetters);
    if(this.checkLose(this.guessedLetters) === true) {
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
    //$("#wordString").append(secretWordWithBlanks);
    //$("#guessedLetters").append(guessedLetters);
    //$("#guessesLeft").append(guessesLeft);

  }
};

window.onload = function(){
  console.log(word.checkLetters(['m', 'q'])[1]);

  // Created a losing scenario
  // console.log(player.checkLose(wrongLettersArray));

  // Created a not yet losing scenario
  // console.log(player.checkLose(wrongLettersArray));
  // Start a new game
  game.resetGame();
  console.log(word.secretWord);
  //  console.log("here's letters " + letters);

  // Add event listener to the letter input field to grab letters that are guessed
  $("#letterField").on("keyup", function() {
    var letter = $("#letterField").val();
    $("#guessedLetters").append(letter);
    player.makeGuess(letter);
    $("#letterField").val("");
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
