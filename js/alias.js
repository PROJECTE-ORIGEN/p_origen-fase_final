/* ==========================================================
   VERIFICACIÓ D'ÀLIES
========================================================== */

async function startAliasSelection(panel){

    panel.innerHTML = `

<div class="alias-screen">

    <div class="alias-box">

        <div class="panel-title glow">

            VERIFICACIÓ D'IDENTITAT

        </div>

        <div id="aliasLog"></div>

    </div>

</div>

`;

    const log = document.getElementById("aliasLog");

    await authWrite(
    log,
    `Benvingut de nou, <strong>Agent ${AGENT.id}</strong>.`,
    "system-text"
);

await pause(500);

await authWrite(
    log,
    "Per confirmar que ets tu al 100%, selecciona el teu àlies operatiu.",
    "system-text"
);

    await pause(400);

    await authWrite(
        log,
        "Consultant base de dades...",
        "system"
    );

    await pause(700);

    const grid = document.createElement("div");

    grid.id = "aliasGrid";

    log.appendChild(grid);

    showAliasOptions(grid);

}

/* ==========================================================
   MOSTRAR OPCIONS
========================================================== */

function showAliasOptions(grid){

    const aliases = AGENTS.map(a => a.alias);

    const others = aliases.filter(a => a !== AGENT.alias);

    others.sort(() => Math.random() - 0.5);

    const options = [

        AGENT.alias,

        ...others.slice(0,3)

    ];

    options.sort(() => Math.random() - 0.5);

    options.forEach((alias,index)=>{

        setTimeout(()=>{

            const card = document.createElement("div");

            card.className = "alias-card";

            card.innerHTML = `

                <div class="alias-name">

                    ${alias}

                </div>

            `;

            card.onclick = () => checkAlias(alias,card);

            grid.appendChild(card);

        },index*150);

    });

}

/* ==========================================================
   VALIDAR ÀLIES
========================================================== */

async function checkAlias(alias,card){

    if(alias !== AGENT.alias){

        card.classList.add("alias-error");

        await pause(600);

        card.classList.remove("alias-error");

        return;

    }

    card.classList.add("alias-success");

    if(isMobile()){

    unlockMedia();

}
// Fem desaparèixer les incorrectes

const others = [...document.querySelectorAll(".alias-card")];

others.forEach(c=>{

    if(c!==card){

        c.classList.add("alias-fade");

    }

});

await pause(300);

// Eliminem-les

await pause(350);

others.forEach(c=>{

    if(c!==card){

        c.classList.add("alias-hide");

    }

});

// Deixem només la correcta al centre

const grid = document.getElementById("aliasGrid");

grid.classList.add("alias-confirmed");

card.classList.add("alias-selected");

await pause(500);

    const log = document.getElementById("aliasLog");

    await authWrite(
    log,
    ""
);

const separator = document.createElement("div");
separator.className = "terminal-line separator-line";
separator.textContent = "────────────────────────────";

log.appendChild(separator);

await pause(250);

await authWrite(
    log,
    ""
);

    await authWrite(
    log,
    "✓ IDENTITAT CONFIRMADA · ACCÉS AUTORITZAT",
    "access-ok"
);

    const panel = document.querySelector(".incoming-panel");

    panel.classList.add("panel-authorized");

    accessSound.currentTime = 0;

    accessSound.play().catch(()=>{});

    await pause(700);

    await startTransmission(panel);

}