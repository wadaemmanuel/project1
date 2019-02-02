console.log("audio");
soundManager.setup({
    url:'audio/soundmanager2.swf',
    debugMode:false
});

soundManager.onready(function() {
    console.log("audio2");


    // you win or loose
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

    
    

});
