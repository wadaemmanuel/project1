$(document).ready(function () {


    
    console.log("start");
    var player;

    var p1Health = 150;
    var p2Health = 150;

    var p1Pos;
    var p1 = $('.playerOne');

    var p2Pos;
    var p2 = $('.playerTwo');

    // p1Pos = p1.offset();
    // p2Pos = p2.offset();
    var p1keyRev;
    var p2keyRev;


    function Colision() {
        p1Pos = p1.offset();
        p2Pos = p2.offset();
        if (p2Pos.left - p1Pos.left <= 50 && p2Pos.left - p1Pos.left >= -50) {

        } else {
            console.log(false);

            return (false);

        }
        console.log(true);

        return (true);


    }

    function isBehind() {
        p1Pos = p1.offset();
        p2Pos = p2.offset();
        if (p2Pos.left < p1Pos.left) {
            p1.addClass('walking').css({
                transform: 'scale(-1, 1)'
            });
            p2.addClass('walking').css({
                transform: 'scale(1, 1)'
            });
        } else {
            p1.addClass('walking').css({
                transform: 'scale(1, 1)'
            });
            p2.addClass('walking').css({
                transform: 'scale(-1, 1)'
            });

        }



    }

    function playerSel(player) {
        if (player === 2) {
            p1 = $('.bob');
            p2 = $('.ken');
            p1keyRev = sessionStorage.getItem("playerKey2");
            p2keyRev = sessionStorage.getItem("playerKey1");
            console.log("p1 has key " + p1keyRev);
            console.log("p2 has key " + p2keyRev);
        } else {
            p2 = $('.bob');
            p1 = $('.ken');
            p1keyRev = sessionStorage.getItem("playerKey1");
            p2keyRev = sessionStorage.getItem("playerKey2");
            console.log("p1 has key " + p1keyRev);
            console.log("p2 has key " + p2keyRev);


        }


    }

    // -----moves------

    function punch(player) {
        console.log("punch");
        //check if function is called by player 1 or 2 
        if (player === 2) {
            p2.addClass("punch");
            soundManager.play('huh1');
            if (Colision() == true) {
                soundManager.play('hit1');
                p1.addClass('p1hit');
                // p1Health -= 10;
                setTimeout(function () {
                    p1.removeClass('p1hit');
                }, 500);
            }
            setTimeout(function () {
                p2.removeClass('punch');
            }, 150);
        } else {
            
            p1.addClass("punch");
            soundManager.play('huh1');
            if (Colision() == true) {
                soundManager.play('hit1');
                p2.addClass('p2hit');

                // reference = $("#player2").attr("player");
                // health = parseInt($("#player2" + "Health").text());
                // player = "player2";

                reference = $("#" + sessionStorage.getItem('playerName')).attr("player");
                health = parseInt($("#" + sessionStorage.getItem('playerName') + "Health").text());
                player = sessionStorage.getItem('playerName');
                updateHealth(player, reference, health);

                setTimeout(function () {
                    p2.removeClass('p2hit');
                }, 500);
            }
            setTimeout(function () {
                p1.removeClass('punch');
                p1.addClass('stance');
            }, 150);
        }


    }

    function kick(player) {
        console.log("kick");
        //check if function is called by player 1 or 2 
        if (player === 2) {
            p2.addClass("kick");
            soundManager.play('huh3');
            if (Colision() == true) {
                soundManager.play('hit1');
                p1.addClass('p1hit');
                p1Health -= 10;
                setTimeout(function () {
                    p1.removeClass('p1hit');
                }, 500);
            }
            setTimeout(function () {
                p2.removeClass('kick');
            }, 500);
        } else {
            p1.addClass("kick");
            soundManager.play('huh3');
            if (Colision() == true) {
                soundManager.play('hit1');
                p2.addClass('p2hit');
                p2Health -= 10;
                setTimeout(function () {
                    p2.removeClass('p2hit');
                }, 500);
            }
            setTimeout(function () {
                p1.removeClass('kick');
            }, 500);
        }


    }


        // Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDG341Lm7hpD2X1Yf1Lvm3RO3VeSl5Ap84",
    authDomain: "street-fighter-emulator.firebaseapp.com",
    databaseURL: "https://street-fighter-emulator.firebaseio.com",
    projectId: "street-fighter-emulator",
    storageBucket: "street-fighter-emulator.appspot.com",
    messagingSenderId: "906826297493"
  };
  firebase.initializeApp(config);


//Fullscreen API 
var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var es_opera  = navigator.userAgent.toLowerCase().indexOf('opera ') > -1;
var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

function toggleFullScreen() {
    if((es_chrome)||(es_opera)){
        if (!document.webkitFullscreenElement) {
            document.documentElement.webkitRequestFullscreen();
        } else {
            if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen(); 
            }
        }
    }
    if(es_firefox){          
        if (!document.mozFullScreenElement) {
            document.documentElement.mozRequestFullScreen();
        } else {
            if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen(); 
            }
        }
    }
} 

document.addEventListener("keypress", function(e) {
    console.log(e.keyCode );
    if (e.keyCode === 13) {//Enter
        toggleFullScreen();
    }
}, false);  

$(".playerOne").attr("hidden", true);//change
$(".playerTwo").attr("hidden", true);//change

// var countStart = 300;
var countStart = 10;
var health = 100;
var minutes, seconds, downloadTimer, playerName, playerRef, reference, playerCount, position, player1Key, player1Name;
var database = firebase.database();

//Timer function
function countdown(){
    downloadTimer = setInterval(function () {
        minutes = parseInt(countStart / 60, 10)
        seconds = parseInt(countStart % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#timer").text(minutes + ":" + seconds);

        if (--countStart < 0) {
            clearInterval(downloadTimer);
            $(".playerOne").attr("hidden", true);//change
            $(".playerTwo").attr("hidden", true);//change
            if(parseInt($("#player2Health").text()) === parseInt($("#player1Health").text())){
                console.log("tie");
            }else{
                var config = {
                    apiKey: "AIzaSyDg0VnCHvsgikUIDpR2bhuZBw-hbWssgYg",
                    authDomain: "score-d3360.firebaseapp.com",
                    databaseURL: "https://score-d3360.firebaseio.com",
                    projectId: "score-d3360",
                    storageBucket: "score-d3360.appspot.com",
                    messagingSenderId: "965419957157"
                };
                firebase.initializeApp(config);
    
                var database1 = firebase.database();
                if(parseInt($("#player1Health").text()) > parseInt($("#player2Health").text())){
                    console.log("Player 1 wins");
                    
                    database1.ref().push({
                        playerName: "player1",
                        score: parseInt($("#player1Health").text())
                    });
                }else{
                    console.log("Player 2 wins");
                    database1.ref().push({
                        playerName: "player2",
                        score: parseInt($("#player2Health").text())
                    });
                }
            }
        }
    }, 1000);
}

  $("#play").on("click", function () {
    countdown();
    $("#player1").attr("disabled", false);
    $("#player2").attr("disabled", false);
    $("#play").attr("disabled", true);
  });

//Add players in firebase
function addPlayer(playerName) {
    position = 10;

    database.ref().push({
        playerName: playerName,
        health: health,
        position: position
    });
}

$("#addPlayer").on("click", function () {
    addPlayer(playerName);
    sessionStorage.setItem('playerName', "player1");
});

$("#addPlayer2").on("click", function () {
    addPlayer(playerName);
    sessionStorage.setItem('playerName', "player2");
});

database.ref().on("value", function(snapshot) {
    playerCount = snapshot.numChildren();
    console.log(playerCount);
    switch(playerCount){
        case 0://0 players, insert player1, start button inactive
            playerName = "player1";
            $("#playerName").attr("value", playerName);
            $("#addPlayer").attr("disabled", false);
            $("#addPlayer2").attr("disabled", true);
            $("#play").attr("disabled", true);
            $("#player1").attr("disabled", true);
            $("#player2").attr("disabled", true);
            $("#reset").attr("disabled", true);
            break;
        case 1://1 player, insert 2nd player, start button inactive
            $("#playerName").attr("value", playerName);
            $("#play").attr("disabled", true);
            $("#player1").attr("disabled", true);
            $("#player2").attr("disabled", true);
            $("#reset").attr("disabled", false);
            break;
        case 2://2 players, start button active
            $("#playerName").attr("value", "");
            $("#addPlayer").attr("disabled", true);
            $("#addPlayer2").attr("disabled", true);
            $("#play").attr("disabled", false);
            $("#reset").attr("disabled", false);
            break;
    }   
});

database.ref().on("child_added", function(snapshot) {
    health = snapshot.val().health;
    console.log(snapshot.val().playerName);
    if(snapshot.val().playerName === "player1"){
        playerName = "player2";
        $("#addPlayer").attr("disabled", true);
        $("#addPlayer2").attr("disabled", false);
        // $(".playerOne").append("<img src = 'assets/images/player1.jpg' alt='player1' id = 'player1'>");//change
        $("#player1").addClass("player");
        $(".playerOne").attr("hidden", false);//change
        $("#player1").attr("player", snapshot.key);
        $("#player1Health").text(snapshot.val().health);
    }else{
        $("#addPlayer").attr("disabled", false);
        $("#addPlayer2").attr("disabled", true);
        // $(".playerTwo").append("<img src = 'assets/images/player2.jpg' alt='player2' id = 'player2'>");//change
        $("#player2").addClass("player");
        $(".playerTwo").attr("hidden", false);//change
        $("#player2").attr("player", snapshot.key);
        //hide the divs
        $("#player2Health").text(snapshot.val().health);
    }
    console.log(snapshot.key);
    console.log(snapshot.val().health);
    console.log(snapshot.val().position);   
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  database.ref().on("child_changed", function(snapshot) {
    if(snapshot.val().playerName === "player1"){
        $("#player1Health").text(snapshot.val().health);
    }else{
        $("#player2Health").text(snapshot.val().health);
    }
});
//Update health in firebase
function updateHealth(player, reference, health) {
    health = health - 10;

    playerRef = database.ref(reference);

    playerRef.update ({
        "health": health
    });

    if(player === "player1"){
        console.log("player1" + player);
        $("#player1Health").text(health);
    }else{
        console.log("player2" + player);
        $("#player2Health").text(health);
    }

    if(health <= 0){
        console.log("game over");
        $("#player1").attr("disabled", true);
        $("#player2").attr("disabled", true);
    }
    
}

    //Update position in firebase
    function updatePosition(player, reference, position) { 
        playerRef = database.ref(reference);

        playerRef.update ({
            "position": position
        });            
    }

//Update position in firebase
$("#updatePositionPlayer1").on("click", function () {
    reference = $("#player1").attr("player");
    console.log(reference);
    leftPosition = 10;
    topPosition = 10;

    playerRef = database.ref(reference);

    playerRef.update ({
        "leftPosition": leftPosition,
        "topPosition": topPosition
    });
    
});

$("#updatePositionPlayer2").on("click", function () {
    reference = $("#player2").attr("player");
    console.log(reference);
    leftPosition = 20;
    topPosition = 20;

    playerRef = database.ref(reference);

    playerRef.update ({
        "leftPosition": leftPosition,
        "topPosition": topPosition
    });
    
});

$("#reset").on("click", function () {
    database.ref().remove();
    clearInterval(downloadTimer);
    $("#timer").text("0:00");
    $("#player2Health").text("");
    $("#player1Health").text("");
    health = 100;
});

  window.onunload = function () {
    database.ref().remove();
    sessionStorage.clear();
  }

  $(document).on('keydown', function(e) {
    if (e.keyCode === 68) { // 68 is the letter D on the keyboard
        reference = $("#" + sessionStorage.getItem('playerName')).attr("player");
        health = parseInt($("#" + sessionStorage.getItem('playerName') + "Health").text());
        player = sessionStorage.getItem('playerName');
        updateHealth(player, reference, health);
    }
});

$(document).on('keydown', function(e) {
    if (e.keyCode === 74) { // 74 is the letter J on the keyboard
        reference = $("#" + sessionStorage.getItem('playerName')).attr("player");
        position = ($("#" + sessionStorage.getItem('playerName')).offset().left);
        player = sessionStorage.getItem('playerName');
        updatePosition(player, reference, position);
    }
});

$("#score").on("click", function () {
    window.open('score.html','popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
});

    //Keybord
    $(document).on('keydown', function (e) {

        //moves
        if (e.keyCode === 39) {
            p1.addClass('walking').css({
                marginLeft: '+=8px'
            });
            isBehind();


        }
        // if (e.keyCode === 38) {
        //     // $('.playerOne').addClass('jump');
        //     // setTimeout(function () {
        //     //     $('.playerOne').removeClass('jump');
        //     // }, 150);
        //     $('.playerOne').addClass('jump').css({
        //         bottom: '+=8px'
        //     });
        //     // setTimeout(function() { $('.playerOne').css({bottom: '=60px'}) }, 100); 
        // }
        if (e.keyCode === 37) {
            p1.addClass('walking').css({
                marginLeft: '-=8px'
            });
            isBehind();
        }

        // a - punch
        if (e.keyCode === 65) {
            punch(1);
        }

        // s - Kick
        if (e.keyCode === 83) {
            kick();
        }

        //music
        if (e.keyCode === 80) {
            var backgroundMusic = soundManager.createSound({
                id: 'music',
                url: 'audio/musics/Guile.mp3'
            });

            backgroundMusic.pause();

        }
        if (e.keyCode === 79) {
            var backgroundMusic = soundManager.createSound({
                id: 'music',
                url: 'audio/musics/Guile.mp3'
            });

            backgroundMusic.resume();

        }


    });
    $(document).on('keyup', function (e) {
        p1.removeClass('walking jump');
        p1.addClass('stance');
    });


});