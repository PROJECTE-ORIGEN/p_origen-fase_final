/* ==========================================================
   BOOT DEL SISTEMA
========================================================== */

async function startBoot(panel){

    panel.innerHTML = `

    <div class="boot-screen">

        <div class="boot-box">

            <div class="boot-title">

                ESTABLINT CANAL SEGUR

            </div>

            <div id="bootLog"></div>

        </div>

    </div>

`;

    const log = document.getElementById("bootLog");

    await bootStep(
        log,
        "Inicialitzant Protocol ORIGEN..."
    );

    await bootStep(
        log,
        "Carregant mòduls del sistema..."
    );

    await bootStep(
        log,
        "Verificant integritat del terminal..."
    );

    await bootStep(
        log,
        "Sintonitzant canal segur..."
    );

    const ok = document.createElement("div");

    ok.className = "boot-ok";

    await authWrite(
    log,
    "✓ CANAL SEGUR ESTABLERT",
    "access-ok"
);

    log.appendChild(ok);

    successSound.currentTime = 0;

    successSound.play().catch(()=>{});

    setHeader("📡 CANAL SEGUR");

    setStatus("<span class='online'>CONNECTAT</span>");

    setTimeline("TEMPORALITAT · 2026");

    await pause(2300);

    await startAuthentication(panel);

}


/* ==========================================================
   PAS
========================================================== */

async function bootStep(container,text){

    const line=document.createElement("div");

    line.className="boot-line";

    line.textContent=text;

    container.appendChild(line);

    await pause(450);

    await bootBar(container);

    await pause(340);

}


/* ==========================================================
   BARRA
========================================================== */

async function bootBar(container){

    const bar=document.createElement("div");

    bar.className="boot-progress";

    container.appendChild(bar);

    const total=24;

    for(let i=0;i<=total;i++){

        bar.innerHTML=

            "["+

            "<span class='boot-fill'>"+

            "█".repeat(i)+

            "</span>"+

            "<span class='boot-empty'>"+

            "░".repeat(total-i)+

            "</span>"+

            "] "+

            Math.floor(i/total*100)+

            "%";

        await pause(42);

    }

    bar.innerHTML += " <span class='boot-check'>✓</span>";

}