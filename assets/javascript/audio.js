console.log("audio");
soundManager.setup({
    url:'audio/soundmanager2.swf',
    debugMode:false
});

soundManager.onready(function() {
    console.log("audio2");
    var backgroundMusic = soundManager.createSound({
        id:'music',
        url:'./assets/audio/musics/Guile.mp3'
    });
    // backgroundMusic.play({ volume:70 });
    // $('.pause').on('click', function(){
    //     var $this = $(this);
    //     if ($this.hasClass('play')) {
    //         $this.removeClass('play');
    //         backgroundMusic.resume();
    //     } else {
    //         $this.addClass('play');
    //         backgroundMusic.pause();
    //     }
    // });

    // hado/shoryu ken
    // ------------------------------- /
    soundManager.createSound({
        id:'hado',
        url:'./assets/audio/hado-shoryu_ken/hado.wav'
    });
    soundManager.createSound({
        id:'shoryu',
        url:'./assets/audio/hado-shoryu_ken/shoryu.wav'
    });
    soundManager.createSound({
        id:'ken',
        url:'./assets/audio/hado-shoryu_ken/ken.wav'
    });

    // tatsumaki senpuu kyaku
    // ------------------------------- /
    soundManager.createSound({
        id:'tatsumaki',
        url:'./assets/audio/tatsumaki-senpuu-kyaku.wav'
    });

    // you win/loose
    // ------------------------------- /
    soundManager.createSound({
        id:'you',
        url:'./assets/audio/commentator/you.wav'
    });
    soundManager.createSound({
        id:'win',
        url:'./assets/audio/commentator/win.wav'
    });
    soundManager.createSound({
        id:'loose',
        url:'./assets/audio/commentator/loose.wav'
    });
    

    // huhs
    // ------------------------------- /
    soundManager.createSound({
        id:'huh1',
        url:'./assets/audio/huhs/huh1.wav'
    });
    soundManager.createSound({
        id:'huh2',
        url:'./assets/audio/huhs/huh2.wav'
    });
    soundManager.createSound({
        id:'huh3',
        url:'./assets/audio/huhs/huh3.wav'
    });

    // hits
    // ------------------------------- /
    soundManager.createSound({
        id:'hit1',
        url:'./assets/audio/hits/1.wav'
    });
    soundManager.createSound({
        id:'hit2',
        url:'./assets/audio/hits/2.wav'
    });
    soundManager.createSound({
        id:'hit3',
        url:'./assets/audio/hits/3.wav'
    });
    soundManager.createSound({
        id:'hit4',
        url:'./assets/audio/hits/4.wav'
    });
    soundManager.createSound({
        id:'hit5',
        url:'./assets/audio/hits/5.wav'
    });
    soundManager.createSound({
        id:'hit6',
        url:'./assets/audio/hits/6.wav'
    });
    soundManager.createSound({
        id:'hit7',
        url:'./assets/audio/hits/7.wav'
    });
    soundManager.createSound({
        id:'punch',
        url:'./assets/audio/hits/kung_fu_punch-Mike_Koenig-2097967259.mp3'
    });

    // swooshes
    // ------------------------------- /
    soundManager.createSound({
        id:'swooch1',
        url:'./assets/audio/swooshes/Swoosh 1-SoundBible.com-231145780.mp3'
    });
    soundManager.createSound({
        id:'swooch2',
        url:'./assets/audio/swooshes/Swoosh 3-SoundBible.com-1573211927.mp3'
    });
    soundManager.createSound({
        id:'swooch3',
        url:'./assets/audio/swooshes/Swooshing-SoundBible.com-1214884243.mp3'
    });
    

});

var youWin = function(){
    soundManager.play('you', {
        multiShotEvents: true, 
        onfinish:function() {
            soundManager.play('win');
        }
    });
};
var youLoose = function(){
    soundManager.play('you', {
        multiShotEvents: true, 
        onfinish:function() {
            soundManager.play('loose');
        }
    });
};