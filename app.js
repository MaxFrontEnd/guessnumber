//Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    gussesLeft = 3;
console.log(winningNum);
// UI Elements

const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

// Assign min and max in UI

UIminNum.textContent = min;
UImaxNum.textContent = max;


// Play again addEventListener
UIgame.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})
// Listen for Guess
UIguessBtn.addEventListener('click', function() {
  let guess = parseInt(UIguessInput.value);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number beetween ${min} and ${max}`, 'red');
  } else {
    //Check if is winnig number
    if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct, YOU WIN`);
    } else {
      // Wrong number
      gussesLeft -= 1;
      if (gussesLeft === 0) {
        gameOver(false,`No guesses left,
          YOU LOSE, the correct number was ${winningNum} - try again!`);
      } else {
        // Games continues guess is wrong
        setMessage(` ${guess} is not correct,
          you have ${gussesLeft} guesses remains`, 'red');
        UIguessInput.style.borderColor = 'red';
        UIguessInput.value = '';
      }
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  UIguessInput.disabled = true;
  // Change border color
  UImessage.style.color = color;
  UIguessInput.style.borderColor = color;
  // Set setMessage
  setMessage(msg);

  // Play again
  UIguessBtn.value = 'Play Again'
  UIguessBtn.className += 'play-again';

}
// Set message
function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}

//Get random wining number

function getRandomNum(min, max){
  return(Math.floor(Math.random() * (max-min + 1) + min));
}
