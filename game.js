var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColorChosen = buttonColor[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#" + randomColorChosen).fadeOut(50).fadeIn(50);
    playSound(randomColorChosen);
}



$(".btn").click(function (event) {
    $(event.target).fadeOut(50).fadeIn(50);
    var UserChoosenColor = event.target.id;
    userClickedPattern.push(UserChoosenColor);
    playSound(UserChoosenColor);
    animatePress(UserChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(key) {
    var playsound = new Audio("sounds/" + key + ".mp3");
    playsound.play();
}

function animatePress(currentColour) {
    var activeButton = $("#" + currentColour);
    activeButton.addClass("pressed");
    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press F5 Key to Restart");
        startOver;
    }
}

function startOver()
{
    started = false;
    gamePattern = [];
    level = 0;
}

