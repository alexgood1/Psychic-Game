var guessesLeft = 0;
var lettersUsed = [];
var losses = 0;
var max_guesses = 9;
var solution = '';
var wins = 0;

// returns a random letter from the alphabet
function getRandomLetter() {
    var code = Math.floor(Math.random() * (26)) + 97;
    return String.fromCharCode(code);
}

// user's guess - conditional code
function userGuess(guessedLetter) {
    // compare the user's letter with secret letter and previous guessed letters
    if (lettersUsed.indexOf(guessedLetter) > -1) {
        alert('You already used ' + guessedLetter + '.');
    } else if (guessedLetter === solution) {
        wins++;
        newRound();
    } else {
        guessesLeft--;
        lettersUsed.push(guessedLetter);
    }

    // all 9 guesses used, game is lost, game is over
    if (guessesLeft === 0) {
        losses++;
        newRound();
    }

    // update display
    updateView(wins, losses, guessesLeft, lettersUsed);
}

// resets values for new round
function newRound() {
    guessesLeft = max_guesses;
    solution = getRandomLetter();
    lettersUsed = [];
}

// updates data displayed on page
function updateView(wins, losses, remGuesses, arrLetters) {
    var lettersUsedElement = document.getElementById('letters-used');
    lettersUsedElement.innerHTML = '';
    arrLetters.forEach(function (letter) {
        appendLetterElement(letter, lettersUsedElement);
    });
    // document.querySelector('#letters-used').textContent = arrLetters.join(', ');
    document.querySelector('#wins').textContent = wins;
    document.querySelector('#losses').textContent = losses;
    document.querySelector('#guesses-left').textContent = remGuesses;
}

// appends letter element
function appendLetterElement(letter, container) {
    container.innerHTML = container.innerHTML + '<span class="letter label label-default text-uppercase">' + letter + '</span>';
}

// game starts when key is pressed
document.onkeyup = function (event) {
    // key pressed is a to z inclusive
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        userGuess (event.key.toLowerCase());
    }
};

// start new game
newRound();