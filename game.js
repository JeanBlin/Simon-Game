// Setting environment
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var playerPattern = [];

var started = false;
var level = 0;

// Button display change + sound on click or PC selection
function buttonAnimation(colorClass) {
  switch (colorClass) {
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;

    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;

    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;

    default:
      alert(
        "Sorry a little bug crossed the road! Please refresh the page (F5)"
      );
      break;
  }
  var activeButton = document.querySelector("." + colorClass);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
}

// Button event listener
$(".btn").click(function () {
  var whoCalled = this.id;
  buttonAnimation(whoCalled);
  playerPattern.push(this.id);
  checkAnswer(playerPattern.length - 1);
});

// press a key to start
$(document).keydown(startOfGame);

// Pre-Game message + Start
function startOfGame() {
  $("#level-title").text("Level " + level);
  setTimeout(nextSequence, 2000);
  $(document).off("keydown");
}

// PC's turn
function nextSequence() {
  playerPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonAnimation(gamePattern[gamePattern.length - 1]);
}

// Player's answer check
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === playerPattern[currentLevel]) {
    if (playerPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    restart();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function restart (){
    level = 0;
    gamePattern = [];
    $(document).keydown(startOfGame);
}