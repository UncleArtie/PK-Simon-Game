var userRout = [];
var simon = [];
var id, color, level = 0;
var LEVEL_NUMBER = 20;
var userSeq;
var simonSeq;
var padSounds = [
    "https://www.soundjay.com/button/button-15.mp3", //green
    "https://www.soundjay.com/button/button-37.mp3", //red
    "https://www.soundjay.com/button/button-38.mp3", //blue
    "https://www.soundjay.com/button/button-44.mp3" //yellow
];


$(document).ready(function () {
    $(".start").click(function () {
        level++;
        startRoutine();



        //user pad inputs
        $(".pad").click(function () {
            id = $(this).attr("id");
            color = $("#" + id).attr("class").split(" ")[1];
            userRout.push(id);
            console.log(id + " " + color);
            addSoundClass(id, color);

            //check user pad inputs
            if (!userCheck()) {
                displayErr();
                userRout = [];

            }


            //check for end of routine play
            if (userRout.length == simon.length && userRout.length < LEVEL_NUMBER) {
                level++;
                userRout = [];
                startRoutine();
            }
            //winner winner chickendinner
            if (userRout.length == LEVEL_NUMBER) {
                $(".display").text("WIN");
                resetGame();
            }
        });
    });

    $(".strict").click(function () {
        level++;
        startStrict();

        //user pad inputs
        $(".pad").click(function () {
            id = $(this).attr("id");
            color = $("#" + id).attr("class").split(" ")[1];
            userRout.push(id);
            console.log(id + " " + color);
            addSoundClass(id, color);

            //check user pad inputs
            if (!userStrict()) {
                strictErr();
                userRout = [];
                simon = [];
                alert("Start over");
            }


            //check for end of routine play
            if (userRout.length == simon.length && userRout.length < LEVEL_NUMBER) {
                level++;
                userRout = [];
                startRoutine();
            }
            //winner winner chickendinner
            if (userRout.length == LEVEL_NUMBER) {
                $(".display").text("WIN");
                resetGame();
            }
        });
    });


});

//checking the user inputs
function userCheck() {
    var i;
    for (i = 0; i < userRout.length; i++) {
        if (userRout[i] != simon[i]) {
            return false;
        }
    }
    return true;
}

// checking strict inputs
function userStrict() {
    var i;
    for (i = 0; i < userRout.length; i++) {
        if (userRout[i] != simon[i]) {
            return false;
        }
    }
    return true;
}
//user is wrong!
function displayErr() {
    var counts = 0;
    var onError = setInterval(function () {
        $(".display").text("Err");
        counts++;
        if (counts == 3) {
            $(".display").text(level);
            clearInterval(onError);
            userRout = [];
            counts = 0;
        }
    }, 500);
}

//user is strictly wrong!
function strictErr() {
    var counts = 0;
    var onError = setInterval(function () {
        $(".display").text("Err");
        counts++;
        if (counts == 1) {
            $(".display").text("00");
            clearInterval(onError);
            userRout = [];
            counts = 0;
        }
    }, 500);
}

// simon start routine
function startRoutine() {
    $(".display").text(level);
    getRandom();
    var i = 0;
    var myInterval = setInterval(function () {
        id = simon[i];
        color = $("#" + id).attr("class").split(" ")[1];
        console.log(id + " " + color);
        addSoundClass(id, color);
        i++;
        if (i == simon.length) {
            clearInterval(myInterval);
        }
    }, 1000);
}

//simon strict start
function startStrict() {
    $(".display").text(level);
    getRandom();
    var i = 0;
    var myInterval = setInterval(function () {
        id = simon[i];
        color = $("#" + id).attr("class").split(" ")[1];
        console.log(id + " " + color);
        addSoundClass(id, color);
        i++;
        if (i == simon.length) {
            clearInterval(myInterval);
        }
    }, 1000);
}

// random function
function getRandom() {
    var random = Math.floor(Math.random() * 4);
    simon.push(random);
}

// sound call
function addSoundClass(id, color) {
    $("#" + id).addClass(color + "-active");
    playSound(id);
    setTimeout(function () {
        $("#" + id).removeClass(color + "-active");
    }, 500);
}

// play sound for computer choice
function playSound(id) {
    var sounds = new Audio(padSounds[id]);
    sounds.play();
}

function resetGame() {
    userSeq = [];
    simonSeq = [];
    level = 0;
    $(".display").text("00");
}