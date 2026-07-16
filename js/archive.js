/* ==========================================================
   PROJECTE ORIGEN
   ARCHIVE
========================================================== */

/* ==========================================================
   ENTRADA TERMINAL
========================================================== */

async function startSecureChannel(){

    createTerminalOutput();

    await terminalWrite(
        "•",
        10,
        "system-text"
    );

    await pause(180);

    await terminalWrite(
        "••",
        10,
        "system-text"
    );

    await pause(180);

    await terminalWrite(
        "•••",
        10,
        "system-text"
    );

    await pause(180);

    await terminalWrite(
        "••••",
        10,
        "system-text"
    );

    await pause(450);

    await terminalWrite(
        "CANAL SEGUR",
        25,
        "system-success"
    );

    await pause(450);

    startArchive();

}

/* ==========================================================
   CANAL SEGUR
========================================================== */

async function startSecureChannel(){

    createTerminalOutput();

    await terminalLoadingDots();

    setHeader("📡 CANAL SEGUR");

setStatus(
    "<span class='online'>CONNECTAT</span>"
);

setTimeline(
    "TEMPORALITAT · 2026"
);

    startArchive();

}

/* ==========================================================
   ARXIU
========================================================== */

async function startArchive(){

    createTerminalOutput();

    await dialogue(
        "narax",
        `Agent ${AGENT.id}...`,
        "T'ha arribat correctament la transmissió?"
    );

    espai(15);

    await dialogue(
        "zyn",
        "Esperem que sí.",
        "Ens feia molta il·lusió compartir-ho amb tu."
    );

    espai(15);

    await dialogue(
        "narax",
        "Gràcies a tota la feina que heu fet durant aquesta missió,",
        "hem pogut recuperar gran part del nostre patrimoni."
    );

    espai(15);

    await dialogue(
        "zyn",
        "No volem que aquesta informació es torni a perdre mai més."
    );

    espai(15);

    await dialogue(
        "narax",
        "Per això hem preparat una còpia de seguretat",
        "perquè el vostre grup també la pugui conservar."
    );

    espai(15);

    await dialogue(
        "zyn",
        "T'enviem el directori amb tot el material recuperat!"
    );

    espai(8);

    showTransferButton();

}

/* ==========================================================
   NOM VISIBLE DE LA UNITAT
========================================================== */

function getVisibleUnitat(unitat){

    switch(unitat){

        case "Corrococo":
            return "Corrococó";

        default:
            return unitat;

    }

}

/* ==========================================================
   BOTÓ TRANSFERÈNCIA
========================================================== */

function showTransferButton(){

    const output = document.getElementById("output");

    const container = document.createElement("div");

    container.className = "transfer-container";

    container.innerHTML = `

        <button class="terminal-button transfer-button">

            ACCEPTAR TRANSFERÈNCIA

        </button>

    `;

    output.appendChild(container);

    terminalScroll();

    const button = container.querySelector("button");

    button.onclick = async()=>{

    button.disabled = true;

    button.innerHTML = "✓ TRANSFERÈNCIA ACCEPTADA";

    button.classList.add("transfer-ok");

    await pause(500);

    espai(22);

    await terminalProcess(
        "Verificant identitat",
        "IDENTITAT CONFIRMADA"
    );

    espai(34);

    await terminalHTML(`

<div class="agent-card">

    <div class="agent-card-header">

        PERFIL D'AGENT

    </div>

    <div class="agent-card-grid">

        <div class="label">ID</div>
        <div>${AGENT.id}</div>

        <div class="label">ÀLIES</div>
        <div>${AGENT.alias}</div>

        <div class="label">UNITAT</div>
        <div>${getVisibleUnitat(AGENT.unitat)}</div>

        <div class="label">ESTAT</div>
        <div class="agent-status">✓ AUTORITZAT</div>

    </div>

</div>

`);

    espai(26);

    await terminalLoading("Transferint directori");

    await terminalWrite("");
    await terminalWrite("");

    startDirectory();

};

}