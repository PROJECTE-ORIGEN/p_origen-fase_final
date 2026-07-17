/* ==========================================================
   PROJECTE ORIGEN
   CALL.JS
========================================================== */

const incomingSound =
    document.getElementById("incomingSound");

const accessSound =
    document.getElementById("accessSound");

const transmissionSound =
    document.getElementById("transmissionSound");

const glitchSound =
    document.getElementById("glitchSound");
    
const successSound =
    document.getElementById("successSound");

async function showIncomingCall(){

    clearScreen();

    incomingSound.loop = true;

    incomingSound.currentTime = 0;

    incomingSound.play().catch(()=>{});

    setHeader("SENYAL DESCONEGUDA");

    setStatus("INACTIU");

    setTimeline("");

    screen.innerHTML = `

        <div class="incoming-panel">

            <div class="panel-title glow">

                COMUNICACIÓ ENTRANT

            </div>

            <div class="panel-subtitle">

                Algú està intentant contactar amb tu

            </div>

            <div class="panel-divider"></div>

            <div class="terminal-center participants">

            <span class="call-narax">NARAX-83</span>

            <span class="separator">●</span>

            <span class="call-zyn">ZYN_33</span>

            </div>

            <div class="terminal-center warning blink">

                PRIORITAT MÀXIMA

            </div>

            <button
                id="acceptButton"
                class="terminal-button"
                style="display:none;">

                ACCEPTAR COMUNICACIÓ

            </button>

        </div>

    `;

    const panel = document.querySelector(".incoming-panel");

panel.classList.add("panel-ringing");

document
    .getElementById("acceptButton")
    .style.display = "block";

    document
        .getElementById("acceptButton")
        .style.display = "block";

    document
        .getElementById("acceptButton")
        .onclick = startCommunication;

}

/* ==========================================================
   ACCEPTAR COMUNICACIÓ
========================================================== */

async function startCommunication(){

    if(isMobile()){

        await unlockMedia();

    }
    
    incomingSound.pause();

    incomingSound.currentTime = 0;

    const panel = document.querySelector(".incoming-panel");

panel.classList.remove("panel-ringing");

document
    .getElementById("acceptButton")
    .remove();

// Comença el boot
panel.classList.add("boot-mode");

startBoot(panel);

}