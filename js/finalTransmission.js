/* ==========================================================
   PROJECTE ORIGEN
   FINAL TRANSMISSION
========================================================== */

const signalBeep = new Audio(
    "audio/signal_beeps.mp3"
);

const signalDisconnect = new Audio(
    "audio/signal_disconnect.mp3"
);

signalBeep.volume = 0.35;
signalDisconnect.volume = 0.55;

async function closeDirectory(){

    const button =
        document.getElementById("closeDirectory");

    button.disabled = true;

    button.innerHTML =
        "✓ TRANSMISSIÓ FINALITZADA";

    button.classList.add("transfer-ok");

    await pause(700);

    clearScreen();

    createTerminalOutput();

    await terminalLoading(
    "Recuperant connexió del terminal"
);

    await terminalWrite("");
    await terminalWrite("");

    await startFinalTransmission();

}

/* ==========================================================
   FINAL
========================================================== */

async function startFinalTransmission(){

    await dialogue(

        "narax",

        "Gràcies per haver completat aquesta missió.",

        "Sembla que, per fi, el vostre llegat artístic també formarà part de la nostra història."

    );

    await dialogue(

        "zyn",

        "Potser no ens tornarem a comunicar mai més...",

        "però sabem que ja no estarem sols."

    );

    await pause(300);

    await terminalGlitch();

    await pause(300);

    await waitFinalCommand();

}

/* ==========================================================
   ESPERAR ORDRE FINAL
========================================================== */

async function waitFinalCommand(){

    const preparat =

        AGENT.genere === "Noia"

            ? "preparada"

            : "preparat";

    await terminalWrite("");

    await dialogue(

        "narax",

        "Sembla que se'ns acaba el temps...",

    );

    await dialogue(

        "zyn",

        "Ens estan intentant intereceptar la connexió..."
    
    );

    await dialogue(

        "narax",  

        "Sembla que t'hem de deixar."
    
    );
    
    await dialogue(

        "zyn",

        "I probablement aquesta sigui l'última vegada que ens comuniquem..."
    
    );

    await dialogue(

        "narax",  

        `Quan estiguis ${preparat}...`,

        "Tanca el canal."

    );

    await pause(500);

    await terminalPrompt();

}

/* ==========================================================
   PROMPT
========================================================== */

async function terminalPrompt(){

    // ---------- MÒBIL ----------
    if(isMobile()){

        const wrapper = document.createElement("div");

        wrapper.className = "mobile-auth";

        wrapper.innerHTML = `

            <input
                class="mobile-auth-input"
                placeholder="ESCRIU: TANCAR"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="characters"
                spellcheck="false">

            <button
                class="mobile-auth-button">

                TANCAR CANAL

            </button>

        `;

        output.appendChild(wrapper);

        terminalScroll();

        const input = wrapper.querySelector("input");
        const button = wrapper.querySelector("button");

        input.focus();

        function validar(){

            if(input.value.trim().toUpperCase() !== "TANCAR"){

                input.focus();

                return;

            }

            wrapper.remove();

            finishCommand();

        }

        button.onclick = validar;

        input.addEventListener("keydown",(e)=>{

            if(e.key==="Enter"){

                validar();

            }

        });

        return;

    }

    // ---------- ORDINADOR ----------

    const line =
        document.createElement("div");

    line.className = "terminal-command";

    line.innerHTML = `

<span class="prompt-symbol">></span>

<span
    id="command"
    class="command-fixed">

    TANCAR CANAL

</span>

<span class="cursor">█</span>

`;

    output.appendChild(line);

    const hint =
        document.createElement("div");

    hint.className =
        "terminal-hint";

    hint.textContent =
        "Prem ENTER per confirmar.";

    output.appendChild(hint);

    terminalScroll();

    document.onkeydown = (event)=>{

        if(event.key !== "Enter") return;

        document.onkeydown = null;

        finishCommand();

    };

}

async function finishCommand(){

    document
        .getElementById("command")
        ?.classList.add("command-executed");

    const hint =
        document.querySelector(".terminal-hint");

    if(hint){

        hint.remove();

    }

    await pause(400);

    await beginTransmissionShutdown();

}

/* ==========================================================
   TANCAMENT DE LA TRANSMISSIÓ
========================================================== */

async function beginTransmissionShutdown(){

    setHeader(
        "📡 SENYAL INESTABLE"
    );

    setStatus(
        "<span class='offline'>INTERFERÈNCIES</span>"
    );

    setTimeline(
        "CANAL · INESTABLE"
    );

    signalDisconnect.currentTime = 0;

    signalDisconnect.play();

    await pause(350);

    document
        .querySelector(".cursor")
        ?.classList.add("cursor-fast");

    await pause(1800);

    await signalTransition();

    await endOrigen();

}

/* ==========================================================
   FINAL PROJECTE ORIGEN
========================================================== */

async function endOrigen(){

    clearScreen();

   screen.innerHTML = `

<div id="ending">

    <div class="ending-header">

        <img
            class="ending-logo"
            src="media/logo/origen-logo.png"
            alt="Projecte ORIGEN">

        <div class="ending-line"></div>

    </div>

    <div class="ending-content">

        <div class="ending-label">

            MISSIÓ COMPLETADA

        </div>

        <div class="ending-agent">

            AGENT ${AGENT.id}

        </div>

        <div class="ending-divider"></div>

<div class="ending-archive">

    LLEGAT PRESERVAT

</div>

        <div class="ending-bottom">

    <div class="ending-message">

        <p>
            Ha estat un honor compartir aquesta missió.
        </p>

        <p>
            Sempre formaràs part del Projecte ORIGEN.
        </p>

    </div>

    <img
        class="ending-signatures"
        src="media/signatures/narax i zyn.png"
        alt="Narax i Zyn">

</div>

</div>

`;

await pause(7000);

    document
        .getElementById("ending")
        .classList.add("ending-fade");

    await pause(1800);

    clearScreen();

    createTerminalOutput();

    setHeader(
        "📡 TRANSMISSIÓ INTERROMPUDA"
    );

    setStatus(
        "<span class='offline'>DESCONECTAT</span>"
    );

    setTimeline("—");

    await terminalWrite("");

await terminalWrite("CONNEXIÓ FINALITZADA");

await pause(700);

await terminalWrite("");

await terminalWrite("TRANSMISSIÓ INTERROMPUDA");

await pause(700);

const line = document.createElement("div");

line.className = "terminal-command";

line.innerHTML = `

<span class="prompt-symbol">></span>

<span class="system-text">

    CANAL TANCAT

</span>

<span class="cursor">█</span>

`;

output.appendChild(line);

terminalScroll();

}