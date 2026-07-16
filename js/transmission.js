/* ==========================================================
   OBRINT TRANSMISSIÓ
========================================================== */

async function startTransmission(panel){

    panel.innerHTML = `

<div class="transmission-screen">

    <div class="transmission-box">

        <div class="panel-title glow transmission-title">

            OBRINT TRANSMISSIÓ

        </div>

        <div
            id="transmissionBar">

        </div>

        <div
            id="transmissionStatus">

            Inicialitzant canal...

        </div>

    </div>

</div>

`;

    const status =
        document.getElementById("transmissionStatus");

    const bar =
        document.getElementById("transmissionBar");

    const steps = [

        { percent:18, text:"Localitzant origen del senyal..." },

        { percent:42, text:"Verificant coherència temporal..." },

        { percent:67, text:"Estabilitzant finestra de transmissió..." },

        { percent:88, text:"Descodificant seqüència..." },

        { percent:100, text:"Preparant reproducció..." }

    ];

    let stepIndex = 0;

    for(let i=0;i<=100;i++){

        const total = 28;

        const filled = Math.floor(i/100*total);

        bar.innerHTML =

            "["+

            "<span class='transmission-fill'>"+

            "█".repeat(filled)+

            "</span>"+

            "<span class='transmission-empty'>"+

            "░".repeat(total-filled)+

            "</span>"+

            "] "+

            i+

            "%";

        if(stepIndex<steps.length && i>=steps[stepIndex].percent){

            status.textContent=steps[stepIndex].text;

            stepIndex++;

        }

        let speed=18;

        if(i>25) speed=28;
        if(i>50) speed=45;
        if(i>70) speed=70;
        if(i>90) speed=120;

        await pause(speed);

    }

    await pause(250);

    status.className="transmission-ok";

    status.innerHTML = `
    <div class="transmission-success">
        CANAL ESTABILITZAT
    </div>
`;

    await pause(1200);

    panel.classList.add("panel-authorized");

    transmissionSound.currentTime = 0;

    transmissionSound.play().catch(()=>{});

    await pause(1800);

    panel.classList.remove("panel-authorized");

    startVideo();

}