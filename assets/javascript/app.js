$(document).ready(function () {

    console.log("start");
    var player;
    var gamestart = false;
    var gameState = 'stop';
    var p1Pos;
    var p1;
    var attack = 'na';
    var backgroundMusic = soundManager.createSound({
        id: 'music',
        url: './assets/audio/musics/Guile.mp3'
    });
    // var p1 = $('.playerOne');

    // punch2();
    var p2Pos;
    var p2;
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

    // var countStart = 300;
    var countStart = 10;
    var health = 100;
    var minutes, seconds, downloadTimer, playerName, playerRef, reference, playerCount, position, position2, player1Key, player1Name;
    var database = firebase.database();
    //Fullscreen API 
    var es_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    var es_opera = navigator.userAgent.toLowerCase().indexOf('opera ') > -1;
    var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;


    // var p2 = $('.playerTwo');
    // you win/loose
    // ------------------------------- /
    soundManager.createSound({
        id: 'you',
        url: './assets/audio/commentator/you.wav'
    });
    soundManager.createSound({
        id: 'win',
        url: './assets/audio/commentator/win.wav'
    });
    soundManager.createSound({
        id: 'loose',
        url: './assets/audio/commentator/loose.wav'
    });


    var youWin = function () {
        soundManager.play('you', {
            multiShotEvents: true,
            onfinish: function () {
                soundManager.play('win');
            }
        });
    };
    var youLoose = function () {
        soundManager.play('you', {
            multiShotEvents: true,
            onfinish: function () {
                soundManager.play('loose');
            }
        });
    };

    function Colision() {
        p1Pos = $(".playerOne").offset();
        p2Pos = $(".playerTwo").offset();

        console.log(p1Pos.left);
        // p2.css({left: -p1Pos.left, position:'absolute'});

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
    // -----moves------

    function punch(player) {
        console.log("punch");
        $(".playerOne").addClass("punch");
        soundManager.play('huh1');
        if (Colision() == true) {
            soundManager.play('hit1');
            $(".playerTwo").addClass('p2hit');

            reference = $("#player2").attr("player");
            health = parseInt($("#player2" + "Health").text());
            player = "player2";
            updateHealth(player, reference, health);

            setTimeout(function () {
                $(".playerTwo").removeClass('p2hit');
            }, 500);
        }
        setTimeout(function () {
            $(".playerOne").removeClass('punch');
            $(".playerOne").addClass('stance');
        }, 150);

    }

    function kick(player) {
        console.log("kick");

        $(".playerOne").addClass("kick");
        soundManager.play('huh3');
        if (Colision() == true) {
            soundManager.play('hit1');
            $(".playerTwo").addClass('p2hit');

            reference = $("#player2").attr("player");
            health = parseInt($("#player2" + "Health").text());
            player = "player2";
            updateHealth(player, reference, health);

            setTimeout(function () {
                $(".playerTwo").removeClass('p2hit');
            }, 500);
        }
        setTimeout(function () {
            $(".playerOne").removeClass('kick');
        }, 500);



    }
    // $(".playerOne")
    // $(".playerTwo")
    function punch2(player) {
        console.log("punch");

        $(".playerTwo").addClass("punch");
        soundManager.play('huh1');
        if (Colision() == true) {
            soundManager.play('hit1');
            $(".playerOne").addClass('p1hit');
            reference = $("#player1").attr("player");
            health = parseInt($("#player1" + "Health").text());
            player = "player1";
            updateHealth(player, reference, health);

            setTimeout(function () {
                $(".playerOne").removeClass('p1hit');
            }, 500);
        }
        setTimeout(function () {
            $(".playerTwo").removeClass('punch');
        }, 150);


    }

    function kick2(player) {
        console.log("kick");
        //check if function is called by player 1 or 2 
        $(".playerTwo").addClass("kick");
        soundManager.play('huh3');
        if (Colision() == true) {
            soundManager.play('hit1');
            $(".playerOne").addClass('p1hit');
            // p1Health -= 10;
            reference = $("#player1").attr("player");
            health = parseInt($("#player1" + "Health").text());
            player = "player1";
            updateHealth(player, reference, health);

            setTimeout(function () {
                $(".playerOne").removeClass('p1hit');
            }, 500);
        }
        setTimeout(function () {
            $(".playerTwo").removeClass('kick');
        }, 500);

    }

    function toggleFullScreen() {
        if ((es_chrome) || (es_opera)) {
            if (!document.webkitFullscreenElement) {
                document.documentElement.webkitRequestFullscreen();
            } else {
                if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
        if (es_firefox) {
            if (!document.mozFullScreenElement) {
                document.documentElement.mozRequestFullScreen();
            } else {
                if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
            }
        }
    }

    document.addEventListener("keypress", function (e) {
        console.log(e.keyCode);
        if (e.keyCode === 13) { //Enter
            toggleFullScreen();
        }
    }, false);

    $(".playerOne").attr("hidden", true); //change
    $(".playerTwo").attr("hidden", true); //change

    //Timer function
    function countdown() {
        downloadTimer = setInterval(function () {
            minutes = parseInt(countStart / 60, 10)
            seconds = parseInt(countStart % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            $("#timer").text(minutes + ":" + seconds);

            if (--countStart < 0) {
                backgroundMusic.pause();
                clearInterval(downloadTimer);
                $(".playerOne").attr("hidden", true); //change
                $(".playerTwo").attr("hidden", true); //change
                if (parseInt($("#player2Health").text()) === parseInt($("#player1Health").text())) {
                    console.log("tie");
                } else {
                    var config = {
                        apiKey: "AIzaSyDg0VnCHvsgikUIDpR2bhuZBw-hbWssgYg",
                        authDomain: "score-d3360.firebaseapp.com",
                        databaseURL: "https://score-d3360.firebaseio.com",
                        projectId: "score-d3360",
                        storageBucket: "score-d3360.appspot.com",
                        messagingSenderId: "965419957157"
                    };
                    // firebase.initializeApp(config);

                    var database1 = firebase.database();
                    if (parseInt($("#player1Health").text()) > parseInt($("#player2Health").text())) {
                        console.log("Player 1 wins");
                        
                        if (sessionStorage.getItem('playerName') === "player1") {
                            youWin();
                        }
                        if (sessionStorage.getItem('playerName') === "player2") {
                            youLoose();
                        }

                        database1.ref().push({
                            playerName: "player1",
                            score: parseInt($("#player1Health").text())
                        });
                    } else {
                        console.log("Player 2 wins");
                        if (sessionStorage.getItem('playerName') === "player2") {
                            youWin();
                        }
                        if (sessionStorage.getItem('playerName') === "player1") {
                            youLoose();
                        }
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
        gamestart = true;
        backgroundMusic.play({
            volume: 70
        });


        reference = $("#player1").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "gameState": 'start'
                });
    });

    //Add players in firebase
    function addPlayer(playerName) {

        position = false;
        position2 = false;

        database.ref().push({
            playerName: playerName,
            health: health,
            attack: attack,
            gameState: gameState,
            position: position,
            position2: position2,
            // time: "00:00"//change
        });
    }

    $("#addPlayer").on("click", function () {

        addPlayer(playerName);
        sessionStorage.setItem('playerName', "player1");
        player = 1;
        p1 = $('.playerOne');
        p2 = $('.playerTwo');
    });

    $("#addPlayer2").on("click", function () {
        addPlayer(playerName);
        sessionStorage.setItem('playerName', "player2");
        player = 2;
        p1 = $('.playerOne');
        p2 = $('.playerTwo');
    });

    database.ref().on("value", function (snapshot) {
        playerCount = snapshot.numChildren();
        console.log(playerCount);
        switch (playerCount) {
            case 0: //0 players, insert player1, start button inactive
                playerName = "player1";
                $("#playerName").attr("value", playerName);
                $("#addPlayer").attr("disabled", false);
                $("#addPlayer2").attr("disabled", true);
                $("#play").attr("disabled", true);
                $("#player1").attr("disabled", true);
                $("#player2").attr("disabled", true);
                $("#reset").attr("disabled", true);
                break;
            case 1: //1 player, insert 2nd player, start button inactive
                $("#playerName").attr("value", playerName);
                $("#play").attr("disabled", true);
                $("#player1").attr("disabled", true);
                $("#player2").attr("disabled", true);
                $("#reset").attr("disabled", false);
                break;
            case 2: //2 players, start button active
                $("#playerName").attr("value", "");
                $("#addPlayer").attr("disabled", true);
                $("#addPlayer2").attr("disabled", true);
                $("#play").attr("disabled", false);
                $("#reset").attr("disabled", false);
                break;
        }
    });

    database.ref().on("child_added", function (snapshot) {
        health = snapshot.val().health;
        console.log(snapshot.val().playerName);
        if (snapshot.val().playerName === "player1") {
            playerName = "player2";
            $("#addPlayer").attr("disabled", true);
            $("#addPlayer2").attr("disabled", false);
            // $(".playerOne").append("<img src = 'assets/images/player1.jpg' alt='player1' id = 'player1'>");//change
            $("#player1").addClass("player");
            $(".playerOne").attr("hidden", false); //change
            $("#player1").attr("player", snapshot.key);
            $("#player1Health").text(snapshot.val().health);
        } else {
            $("#addPlayer").attr("disabled", false);
            $("#addPlayer2").attr("disabled", true);
            // $(".playerTwo").append("<img src = 'assets/images/player2.jpg' alt='player2' id = 'player2'>");//change
            $("#player2").addClass("player");
            $(".playerTwo").attr("hidden", false); //change
            $("#player2").attr("player", snapshot.key);
            //hide the divs
            $("#player2Health").text(snapshot.val().health);
        }
        console.log(snapshot.key);
        console.log(snapshot.val().health);
        console.log(snapshot.val().position);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });





    //Update health in firebase
    function updateHealth(player, reference, health) {
        health = health - 10;

        playerRef = database.ref(reference);

        playerRef.update({
            "health": health
        });

        if (player === "player1") {
            console.log("player1" + player);
            $("#player1Health").text(health);
        } else {
            console.log("player2" + player);
            $("#player2Health").text(health);
        }

        if (health <= 0) {
            console.log("game over");
            $("#player1").attr("disabled", true);
            $("#player2").attr("disabled", true);
        }

    }


  
    database.ref().on("child_changed", function (snapshot) {
        $("#timer").text(snapshot.val().time); //change

        
        if (snapshot.val().gameState === "start" && gamestart === false) {
            countdown();
            gamestart = true;
        }

     
        if (snapshot.val().playerName === "player1") {
            $("#player1Health").text(snapshot.val().health);
        } else {
            $("#player2Health").text(snapshot.val().health);
        }
    });





    $("#reset").on("click", function () {
        database.ref().remove();
        clearInterval(downloadTimer);
        $("#timer").text("0:00");
        $("#player2Health").text("");
        $("#player1Health").text("");
        health = 100;
        gamestart = false;
    });

    window.onunload = function () {
        database.ref().remove();
        sessionStorage.clear();
    }

    $("#score").on("click", function () {
        window.open('score.html', 'popUpWindow', 'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    });


    database.ref().on("child_changed", function (snapshot) {
        isBehind();

        if (snapshot.val().playerName === "player1") {

            if (snapshot.val().attack === "punch") {

                punch();

                setTimeout(function () {
                    reference = $("#player1").attr("player");
                    playerRef = database.ref(reference);
                    playerRef.update({
                        "attack": 'na'
                    });
                }, 150);
            }
            if (snapshot.val().attack === "kick") {

                kick();

                setTimeout(function () {
                    reference = $("#player1").attr("player");
                    playerRef = database.ref(reference);
                    playerRef.update({
                        "attack": 'na'
                    });
                }, 150);
            }
        

        

            console.log(snapshot.val().position === true);
            if (snapshot.val().position === true) {
                // console.log("wwwwww");
                p1.addClass('walking').css({
                    marginLeft: '+=8px'
                });
            }
            if (snapshot.val().position2 === true) {
                // console.log("wwwwww");
                p1.addClass('walking').css({
                    marginLeft: '-=8px'
                });
            }

        }


    });


    database.ref().on("child_changed", function (snapshot) {
        isBehind();
        if (snapshot.val().playerName === "player2") {

            if (snapshot.val().attack === "punch") {

                punch2();

                setTimeout(function () {
                    reference = $("#player2").attr("player");
                    playerRef = database.ref(reference);
                    playerRef.update({
                        "attack": 'na'
                    });
                }, 150);
            }
            if (snapshot.val().attack === "kick") {

                kick2();

                setTimeout(function () {
                    reference = $("#player2").attr("player");
                    playerRef = database.ref(reference);
                    playerRef.update({
                        "attack": 'na'
                    });
                }, 150);
            }
        }
        if (snapshot.val().playerName === "player2") {
            console.log("ho");
            if (snapshot.val().position === true) {
                // console.log("wwwwww");
                p2.addClass('walking').css({
                    marginLeft: '+=8px'
                });
            }
            if (snapshot.val().position2 === true) {
                // console.log("wwwwww");
                p2.addClass('walking').css({
                    marginLeft: '-=8px'
                });
            }
        }
    });

    //Keybord
    $(document).on('keydown', function (e) {
        if (player === 1) {

            //moves
            if (e.keyCode === 39) {
                p1.addClass('walking').css({
                    marginLeft: '+=8px'
                });
                reference = $("#player1").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "position": true
                });
                isBehind();
            }

            if (e.keyCode === 37) {
                p1.addClass('walking').css({
                    marginLeft: '-=8px'
                });
                reference = $("#player1").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "position2": true
                });
                isBehind();
            }


            // a - punch
            if (e.keyCode === 65) {
                reference = $("#player1").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "attack": 'punch'
                });
                punch();
            }

            // s - Kick
            if (e.keyCode === 83) {
                reference = $("#player1").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "attack": 'punch'
                });
                kick();
            }

            //music
            if (e.keyCode === 80) {

                backgroundMusic.pause();

            }
            if (e.keyCode === 79) {


                backgroundMusic.resume();

            }
        }

    });
    $(document).on('keydown', function (e) {
        if (player === 2 && gamestart === true) {
            //moves
            if (e.keyCode === 39) {
                $(".playerTwo").addClass('walking').css({
                    marginLeft: '+=8px'
                });
                reference = $("#player2").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "position": true
                });
                isBehind();
            }

            if (e.keyCode === 37) {
                $(".playerTwo").addClass('walking').css({
                    marginLeft: '-=8px'
                });
                reference = $("#player2").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "position2": true
                });
                isBehind();
            }


            // a - punch
            if (e.keyCode === 65) {
                reference = $("#player2").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "attack": 'punch'
                });
                punch2();
            }

            // s - Kick
            if (e.keyCode === 83) {
                reference = $("#player2").attr("player");
                playerRef = database.ref(reference);
                playerRef.update({
                    "attack": 'kick'
                });
                kick2();
            }

            //music
            if (e.keyCode === 80) {


                backgroundMusic.pause();

            }
            if (e.keyCode === 79) {


                backgroundMusic.resume();

            }

        }
    });
    $(document).on('keyup', function (e) {
        $("#" + sessionStorage.getItem('playerName')).removeClass('walking jump');
        $("#" + sessionStorage.getItem('playerName')).addClass('stance');

        reference = $("#" + sessionStorage.getItem('playerName')).attr("player");
        playerRef = database.ref(reference);
        playerRef.update({
            "position": false,
            "position2": false
        });
    });


});