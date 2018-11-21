// ==============================================================================
// Global Variables
// ==============================================================================

// ****Determine how the game will be played- what words used, how to guess the words, 
// ****what stats will be taken, and display what will be right and wrong guesses

// How many times a letter can be pressed
var doubleWord = ['a','b','c',
				  'd','e','f',
				  'g','h','i',
				  'j','k','l',
				  'm','n','o',
				  'p','q','r',
				  's','t','u',
				  'v','w','x',
				  'y','z'];

// Create Array of Words
var wordBank = ["leonardo", "michelangelo", "donatello", "raphael", "splinter", "shredder", "april", "casey",];
// Chosen Word
var chosenWord = "";
// Holds letters in word
var lettersInWord = [];
// Holds number of blanks in word
var numBlanks = 0;
// Holds Blanks and Successes
var blanksAndSuccesses = [];
// Holds Wrong Guesses
var wrongLetters = [];
// Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;
var rightGuessCounter = 0; 

// ==============================================================================
//  Functions
// ==============================================================================

function reset () {
    // Chooses word randomly from the wordBank
    chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    // Splits the chosen word into individual letters
    lettersInWord = chosenWord.split("");
    // Get the number of blanks
    numBlanks = lettersInWord.length;

    // Reset
    // ===================================================
    lettersGuessed = 0;
    rightGuessCounter = 0;
    guessesLeft = 9;
    wrongLetters =[];
    blanksAndSuccesses =[];
    doubleWord = ['a','b','c',
    'd','e','f',
    'g','h','i',
    'j','k','l',
    'm','n','o',
    'p','q','r',
    's','t','u',
    'v','w','x',
    'y','z'];

    test=false;
    startGame();
}

function startGame() {
    // Chooses word randomly from the wordBank
    chosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    // Splits the chosen word into individual letters
    lettersInWord =chosenWord.split("");
    // Get the number of blanks
    numBlanks = lettersInWord.length;

    // Reset
    // ===================================================
    lettersGuessed = 0;
    rightGuessCounter = 0;
    guessesLeft = 9;
    wrongLetters =[];
    blanksAndSuccesses =[];
    doubleWord = ['a','b','c',
    'd','e','f',
    'g','h','i',
    'j','k','l',
    'm','n','o',
    'p','q','r',
    's','t','u',
    'v','w','x',
    'y','z'];

    // Populate Blanks
    for(var i =0; i<numBlanks; i++) {
        blanksAndSuccesses.push("");
        document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses;
    }

    // Changes HTML
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCount").innerHTML = lossCount;
    document.getElementById("wrongGuesses").innerHTML = wrongLetters;

    // Testing / Debugging
    console.log(chosenWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function compareLetters(userKey) {
    console.log("Working!");
    // If user key exist in chosen word then perform this function
    if(chosenWord.indexOf(userKey) > -1) {
        // Loops depending on the amount of blanks
        for(var i = 0; i < numBlanks; i++) {
            // Fills in right index with user key
            if(lettersInWord[i] === userKey) {
                rightGuessCounter++;
                blanksAndSuccesses[i] = userKey;
                document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("");

            }
        }

        // Testing / Debugging
        console.log(blanksAndSuccesses);
    }

    // Wrong Keys
    else {
        wrongLetters.push(userKey);
        guessesLeft--;
        // Changes HTML
        document.getElementById("numGuesses").innerHTML = guessesLeft;
        document.getElementById("wrongGuesses").innerHTML = wrongLetters;

        // Testing / Debugging

        console.log("Wrong Letters = " + wrongLetters);
        console.log("Guesses left are " + guessesLeft);
    }
}

function winLose() {
    // When number blanks filled in with right words then you win
    if(rightGuessCounter === numBlanks) {
        // Count Wins
        winCount++;
        // Changes HTML
        document.getElementById("winCounter").innerHTML = winCount;
        alert("You Win");
        reset();
    }

    // When number of Guesses reches 0 then you lose
    else if (guessesLeft === 0) {
        // Count loses
        lossCount++;
        // Chnges HTML
        document.getElementById("lossCounter").innerHTML = lossCount;
        alert("You lose");
        reset ();
    }
}

// ==============================================================================
//  Main Process
// ==============================================================================

// Initiates the Code


document.onkeyup = function(event) {
    test = true;
    var lettersGuessed = event.key;
    for(var i = 0; i < doubleWord.length; i++) {
        if(lettersGuessed === doubleWord[i] && test === true) {
            var spliceDword = doubleWord.splice(i,1);
            // Testing / Debug
            console.log("Double word is = " + doubleWord[i]);
            console.log("Spliced Word is " + spliceDword);

            compareLetters(lettersGuessed);
            winLose();
        }
    }
}


