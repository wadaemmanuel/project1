$(document).ready(function () {
    console.log("start");



    var p1Pos;
    var p1 = $('.player1');

    var p2Pos;
    var p2 = $('.player2');

    p1Pos = p1.offset();
    p2Pos = p2.offset();


    var Colision = function () {
        if (p2Pos.left - p1Pos.left <= 80 && p2Pos.left - p1Pos.left >= -80) {

        } else {
            console.log(false);

            return (false);

        }
        console.log(true);

        return (true);

    };
    // -----moves------

    function punch() {
        console.log("punch");
        p1.addClass(className);
        soundManager.play('huh1');
        if (Colision() == true) {
            soundManager.play('hit1');
            p2.addClass('hit1');
            setTimeout(function () {
                p2.removeClass('hit1');
            }, 500);
        }
        setTimeout(function () {
            p1.removeClass('punch');
        }, 150);

    }

    function kick() {
        p1.addClass(className);
        soundManager.play('huh3');

    }

    function rekick() {
        p1.addClass(className);
        soundManager.play('huh2');

    }

    function hadoken() {
        p1.addClass(className);
    }



});