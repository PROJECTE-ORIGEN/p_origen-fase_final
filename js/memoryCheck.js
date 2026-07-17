/* ==========================================================
   PROJECTE ORIGEN
   VERIFICACIÓ DE MEMÒRIA
========================================================== */

const UNITATS_CORRECTES = [

    "CORROCOCÓ",
    "SKATE&GO",
    "LES NITS FOSQUES",
    "LES ROQUETES DE LA IAIA",
    "SANTILLANA",
    "LAS GUERRERAS DEL BAIXLLO"

];

async function startMemoryCheck(){

    clearScreen();

    setHeader("PROJECTE ORIGEN");

    setStatus("INACTIU");

    setTimeline("");

    const ordre = [...UNITATS_CORRECTES]
        .sort(()=>Math.random()-0.5);

    screen.innerHTML = `

        <div id="memoryCheck">

            <div class="panel-title glow">

                PROJECTE ORIGEN - FASE FINAL

            </div>

            <div class="memory-text">

                Benvolgut agent,

            </div>

            <div class="memory-text">

                Només els que heu participat al
                <strong>PROJECTE ORIGEN</strong>
                podreu continuar.

            </div>

            <div class="memory-text">

                Ordena les Unitats de més jove a més veterana
                i demostra que has format part de la missió.

            </div>

            <div class="memory-help">

                Toca una unitat per fer-la pujar a la posició superior.
                Si cliques la de dalt de tot, anirà al final...
                Quan creguis que l'ordre és correcte, prem
                <strong>VALIDAR</strong>.

            </div>

            <div id="memoryList"></div>

            <div class="memory-actions">

                <button id="memoryCheckButton">

                    VALIDAR

                </button>

            </div>

            <div id="memoryMessage"></div>

        </div>

    `;

    const list = document.getElementById("memoryList");

    let unlocked = false;

    function render(){

        list.innerHTML = "";

        ordre.forEach((nom,index)=>{

            const card = document.createElement("div");

            card.className = "memory-card";

            card.textContent = nom;

            card.onclick = async ()=>{

                if(!unlocked){

                    unlocked = true;

                    if(typeof unlockMedia === "function"){

                        unlockMedia();

                    }

                }

                if(index===0){

                    ordre.push(ordre.shift());

                }else{

                    [ordre[index],ordre[index-1]]=[

                        ordre[index-1],
                        ordre[index]

                    ];

                }

                render();

                document
                    .getElementById("memoryCheckButton")
                    .onclick = comprova;

            };

            list.appendChild(card);

        });

    }

    async function comprova(){

        const correcte =
            ordre.every((u,i)=>u===UNITATS_CORRECTES[i]);

        const button =
            document.getElementById("memoryCheckButton");

        const message =
            document.getElementById("memoryMessage");

        if(!correcte){

    button.classList.add("memory-button-error");

    message.className = "memory-error";

    message.style.opacity = "0";

    await pause(300);

    message.innerHTML = `
        LES DADES NO COINCIDEIXEN AMB L'ARXIU ORIGEN.
        <br>
        TORNA-HO A INTENTAR.
    `;

    message.style.opacity = "1";

    await pause(2000);

    message.style.opacity = "0";

    await pause(300);

    message.innerHTML = "";

    message.className = "";

    message.style.opacity = "1";

    button.classList.remove("memory-button-error");

    return;

}
        button.disabled = true;

        button.classList.add("memory-button-success");

        button.textContent = "VALIDAT";

        message.className = "memory-success";

        message.textContent = "MEMÒRIA VERIFICADA";

        await pause(900);

        correcteMissio();

    }

    async function correcteMissio(){

        await terminalVisualGlitch();

        await pause(300);

        showIncomingCall();

    }

    render();

}