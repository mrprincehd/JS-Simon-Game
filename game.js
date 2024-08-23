
buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    };
});

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()}, 1000);
            }
        } else {
            console.log("wrong");

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();

            $("#level-title").text("Game Over, Press Any Key to Restart");

            startOver();
        };

    }

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    //Flash image
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //Play sound
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
  
};

//Sound for user clicks
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {$("#" + currentColour).removeClass("pressed");}, 200);
};

