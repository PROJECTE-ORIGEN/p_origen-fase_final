/* ==========================================================
   PROJECTE ORIGEN
   SIGNAL TRANSITION
========================================================== */

async function signalTransition(){

    const frame =
        document.querySelector(".video-frame");

    if(!frame) return;

    /* ------------------------------------------------------
   BUSCANT CANAL
------------------------------------------------------ */

setHeader("📡 BUSCANT CANAL");

setStatus(
    "<span class='offline'>DESCONECTAT</span>"
);

    /* ------------------------------------------------------
       SONS
    ------------------------------------------------------ */

    const beeps = new Audio(
        "audio/signal_beeps.mp3"
    );

    const disconnect = new Audio(
        "audio/signal_disconnect.mp3"
    );

    beeps.volume = 0.75;
    disconnect.volume = 0.8;

    /* ------------------------------------------------------
       FREEZE
    ------------------------------------------------------ */

    frame.classList.add("signal-freeze");

    await pause(500);

    /* ------------------------------------------------------
   BEEPS CURTS
------------------------------------------------------ */

await new Promise(resolve=>{

    beeps.onended = resolve;

    beeps.play();

});

/* ------------------------------------------------------
   GLITCH
------------------------------------------------------ */

frame.classList.remove("signal-freeze");
frame.classList.add("signal-glitch");

/* ------------------------------------------------------
   BEEP LLARG
------------------------------------------------------ */

disconnect.play();

/* ------------------------------------------------------
   DEIXEM QUE EL GLITCH I EL SO
   CONVISQUIN UNA ESTONA
------------------------------------------------------ */

await pause(1700);

    /* ------------------------------------------------------
       FOS A NEGRE
    ------------------------------------------------------ */

    frame.classList.add("signal-black");

    await pause(300);

}

async function terminalGlitch(){

    const terminal =
        document.getElementById("terminal");

    if(!terminal) return;

    glitchSound.currentTime = 0;

    glitchSound.play().catch(()=>{});

    terminal.classList.add(
        "terminal-glitch"
    );

    await pause(350);

    terminal.classList.remove(
        "terminal-glitch"
    );

}