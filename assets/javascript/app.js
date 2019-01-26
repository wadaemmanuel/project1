$(document).ready(function () {
    console.log("start");



    var p1PosLeft;
    var p1PosTop;
    var p1 = $('.player1');
    // -----moves------

    function punch() {
        p1.addClass(className);
        soundManager.play('huh1');

    }

    function kick() {
        p1.addClass(className);
        soundManager.play('huh3');

    }

    function rkick() {
        p1.addClass(className);
        soundManager.play('huh2');

    }

    function hadoken() {
        p1.addClass(className);
    }



});