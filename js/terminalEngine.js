/* ==========================================================
   PROJECTE ORIGEN
   TERMINAL ENGINE
========================================================== */

const PERSONATGES = {

    narax:{
        nom:"NARAX-83",
        classe:"narax"
    },

    zyn:{
        nom:"ZYN_33",
        classe:"zyn"
    }

};

let output;


/* ==========================================================
   CREAR TERMINAL
========================================================== */

function createTerminalOutput(){

    screen.innerHTML = `
        <div id="output"></div>
    `;

    output = document.getElementById("output");

}


/* ==========================================================
   SCROLL
========================================================== */

function terminalScroll(){

    if(!output) return;

    requestAnimationFrame(()=>{

        output.scrollIntoView(false);

        screen.scrollTop = screen.scrollHeight;

    });

}


/* ==========================================================
   ESPAI
========================================================== */

function espai(height=16){

    const div=document.createElement("div");

    div.style.height=height+"px";

    output.appendChild(div);

    terminalScroll();

}


/* ==========================================================
   ESCRIURE
========================================================== */

async function terminalWrite(text,speed=18,className=""){

    const line=document.createElement("div");

    line.className="terminal-line "+className;

    output.appendChild(line);

    for(const letter of text){

        line.textContent+=letter;

        terminalScroll();

        await pause(speed);

    }

}


/* ==========================================================
   SISTEMA
========================================================== */

async function sistema(text){

    await terminalWrite(text,15,"system-text");

}


/* ==========================================================
   DIÀLEG
========================================================== */

async function dialogue(personatge,...frases){

    const info=PERSONATGES[personatge];

    const block=document.createElement("div");

    block.className="blocDialeg";

    output.appendChild(block);

    const speaker=document.createElement("div");

    speaker.className=`speaker ${info.classe}`;

    speaker.textContent="> "+info.nom;

    block.appendChild(speaker);

    await pause(350);

    for(const frase of frases){

        const line=document.createElement("div");

        line.className=`dialogue ${info.classe}`;

        block.appendChild(line);

        for(const letter of frase){

            line.textContent+=letter;

            terminalScroll();

            await pause(18);

        }

        await pause(350);

    }

}


/* ==========================================================
   PROCÉS
========================================================== */

async function terminalProcess(processText, successText = null){

    const line = document.createElement("div");

    line.className = "terminal-line system-text";

    output.appendChild(line);

    for(let c=0;c<3;c++){

        for(let i=1;i<=3;i++){

            line.textContent = processText + ".".repeat(i);

            terminalScroll();

            await pause(220);

        }

    }

    if(successText){

        line.innerHTML = `<span class="access-ok">✓ ${successText}</span>`;

    }else{

        line.innerHTML = processText +
            ' <span class="access-ok">✓</span>';

    }

    terminalScroll();

}


/* ==========================================================
   FITXER OK
========================================================== */

async function fitxerOK(name){

    const line=document.createElement("div");

    line.className="terminal-line";

    line.innerHTML=`▶ ${name} <span class="success">✓ OK</span>`;

    output.appendChild(line);

    terminalScroll();

    await pause(180);

}

/* ==========================================================
   INSERIR HTML
========================================================== */

async function terminalHTML(html){

    const div = document.createElement("div");

    div.innerHTML = html;

    output.appendChild(div);

    terminalScroll();

}

/* ==========================================================
   LOADING (sense final)
========================================================== */

async function terminalLoading(text){

    const line = document.createElement("div");

    line.className = "system-text";

    output.appendChild(line);

    for(let c=0;c<2;c++){

        for(let i=1;i<=3;i++){

            line.textContent = text + ".".repeat(i);

            terminalScroll();

            await pause(900);

        }

    }

}

/* ==========================================================
   PROCÉS SENSE FINAL
========================================================== */

async function terminalLoading(processText){

    const line = document.createElement("div");

    line.className = "system-text";

    output.appendChild(line);

    for(let c=0;c<4;c++){

        for(let i=1;i<=3;i++){

            line.textContent =
                processText +
                ".".repeat(i);

            terminalScroll();

            await pause(220);

        }

    }

}

/* ==========================================================
   LOADING
========================================================== */

async function terminalLoadingDots(){

    const line = document.createElement("div");

    line.className = "system-text";

    output.appendChild(line);

    terminalScroll();

    /* ------------------------------------------------------
       PUNTS
    ------------------------------------------------------ */

    for(let i=1;i<=4;i++){

        line.textContent = ".".repeat(i) + "▌";

        terminalScroll();

        await pause(550);

    }

    await pause(700);

    /* ------------------------------------------------------
       ESBORRAR
    ------------------------------------------------------ */

    line.textContent = "";

    const text = "[CANAL 7 · ESTABLE I SEGUR]";

    /* ------------------------------------------------------
       ESCRIPTURA
    ------------------------------------------------------ */

    for(let i=1;i<=text.length;i++){

        line.textContent =
            text.substring(0,i) + "▌";

        terminalScroll();

        await pause(65);

    }

    line.textContent = text;

    line.className = "system-success";

    await pause(1200);

}