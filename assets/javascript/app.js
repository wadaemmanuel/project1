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
                p2Health -= 10;
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






    // });





    // $(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCA4Lzktcmg3jy4g8wClIYjppqD8AVYDOU",
        authDomain: "tabrawl.firebaseapp.com",
        databaseURL: "https://tabrawl.firebaseio.com",
        projectId: "tabrawl",
        storageBucket: "tabrawl.appspot.com",
        messagingSenderId: "43689640589"
    };
    firebase.initializeApp(config);

    var countStart = 300;
    var health = 100;
    var minutes, seconds, downloadTimer, playerName, caracterName, playerRef, reference, playerCount, topPosition, leftPosition;
    var database = firebase.database();



    function countdown() {
        downloadTimer = setInterval(function () {
            minutes = parseInt(countStart / 60, 10)
            seconds = parseInt(countStart % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            $("#timer").text("Time remaining: " + minutes + ":" + seconds);

            if (--countStart < 0) {
                clearInterval(downloadTimer);
                $("#timer").text("All done!");
            }
        }, 1000);
    }

    function addPlayer(playerName, caracterName) {

        leftPosition = 10;
        topPosition = 20;

        database.ref().push({
            playerName: playerName,
            health: health,
            caracterName: caracterName,
            topPosition: topPosition,
            leftPosition: leftPosition
        });
    }

    $(".addPlayer").on("click", function () {
        addPlayer(playerName, caracterName);
        var x = $(this).val();
        playerSel(x);
    });

    $("#player1").on("click", function () {
        reference = $(this).attr("player");
        console.log(reference);
        health = $("#player1Health").val() - 10;
        console.log(health);

        if (health <= 0) {
            playerRef.update({
                "health": health
            });
            $("#player1Health").val(health);
            $("#player1").attr("disabled", true);
            $("#player2").attr("disabled", true);
            console.log("game over");
            console.log("Player 2 wins");
        } else {
            playerRef = database.ref(reference);

            playerRef.update({
                "health": health
            });
            $("#player1Health").val(health);
        }

    });

    $("#player2").on("click", function () {
        reference = $(this).attr("player");
        console.log(reference);
        health = $("#player2Health").val() - 10;
        console.log(health);

        if (health <= 0) {
            playerRef.update({
                "health": health
            });
            $("#player2Health").val(health);
            $("#player1").attr("disabled", true);
            $("#player2").attr("disabled", true);
            console.log("game over");
            console.log("Player 1 wins");
        } else {
            playerRef = database.ref(reference);

            playerRef.update({
                "health": health
            });
            $("#player2Health").val(health);
        }

    });

    $("#updatePosition").on("click", function () {
        reference = $("#playerUpdate").val().trim();
        //Less 10 if is fireball or less 5 if is phisic
        leftPosition = 20;
        topPosition = 30;

        playerRef = database.ref(reference);

        playerRef.update({
            "leftPosition": leftPosition,
            "topPosition": topPosition
        });

    });

    $("#deletePlayer").on("click", function () {
        reference = $("#playerDelete").val().trim();
        playerRef = database.ref(reference);

        playerRef.remove();
    });

    database.ref().on("value", function (snapshot) {
        playerCount = snapshot.numChildren();
        console.log(playerCount);
        switch (playerCount) {
            case 0: //0 players, insert player1, start button inactive
                playerName = "player1";
                caracterName = "carcter1";
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
                // $("#player1").attr("disabled", true);
                // $("#player2").attr("disabled", true);
                $("#reset").attr("disabled", false);
                break;
        }
    });

    database.ref().on("child_added", function (snapshot) {

        health = snapshot.val().health;
        console.log(snapshot.val().playerName);
        if (snapshot.val().playerName === "player1") {
            playerName = "player2";
            caracterName = "carcter2";
            $("#addPlayer").attr("disabled", true);
            $("#addPlayer2").attr("disabled", false);
            $("#player1").addClass("player");
            $("#player1").attr("player", snapshot.key);
            $("#player1Health").val(snapshot.val().health);
            sessionStorage.setItem('playerKey1', snapshot.key);
            sessionStorage.setItem('playerNeame1', snapshot.val().playerName);

        } else {
            playerName = "player1";
            caracterName = "carcter1";
            $("#addPlayer").attr("disabled", false);
            $("#addPlayer2").attr("disabled", true);
            $("#player2").addClass("player");
            $("#player2").attr("player", snapshot.key);
            $("#player2Health").val(snapshot.val().health);
            sessionStorage.setItem('playerKey2', snapshot.key);
            sessionStorage.setItem('playerNeame2', snapshot.val().playerName);
        }
        console.log(snapshot.key);
        // localStorage.setItem('playerKey', snapshot.key);
        // localStorage.setItem('playerNeame', snapshot.val().playerName);
        console.log(snapshot.val().health);
        console.log(snapshot.val().caracterName);
        console.log(snapshot.val().topPosition);
        console.log(snapshot.val().leftPosition);
        $("#health").text(health);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    $("#reset").on("click", function () {
        database.ref().remove();
    });

    window.onunload = function () {
        database.ref().remove();
    }

    $("#play").on("click", function () {
        countdown();
        $("#player1").attr("disabled", false);
        $("#player2").attr("disabled", false);
    });

    // Set
    // sessionStorage.setItem('algo', 'Guarde algo');


    // // Get
    // console.log(sessionStorage['algo']);

    // Delete
    // sessionStorage.removeItem('algo');
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