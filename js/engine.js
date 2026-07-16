/* ==========================================================
   PROJECTE ORIGEN
   ENGINE V1.0
========================================================== */

const screen = document.getElementById("screen");

/* ==========================================================
   UTILITATS
========================================================== */

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}

async function pause(ms){

    await sleep(ms);

}

function clearScreen(){

    screen.innerHTML = "";

}

function scrollBottom(){

    screen.scrollTop = screen.scrollHeight;

}

/* ==========================================================
   HEADER
========================================================== */

function setHeader(text){

    document.querySelector(".header-right").textContent = text;

}

/* ==========================================================
   FOOTER
========================================================== */

function setStatus(text){

    document.querySelector(
        "#terminal-footer div:first-child"
    ).innerHTML = "ESTAT · " + text;

}

function setTimeline(text){

    document.querySelector(
        "#terminal-footer div:last-child"
    ).textContent = text;

}

/* ==========================================================
   CREAR LÍNIA
========================================================== */

function createLine(className="terminal-line"){

    const line=document.createElement("div");

    line.className=className;

    screen.appendChild(line);

    scrollBottom();

    return line;

}

/* ==========================================================
   CURSOR
========================================================== */

function createCursor(){

    const cursor=document.createElement("span");

    cursor.className="cursor";

    return cursor;

}

/* ==========================================================
   ESCRIURE UNA LÍNIA
========================================================== */

async function write(text, className = "") {

    const line = createLine("terminal-line " + className);

    const cursor = createCursor();

    line.appendChild(cursor);

    for (const letter of text) {

        cursor.remove();

        line.append(letter);

        line.appendChild(cursor);

        scrollBottom();

        await sleep(18);

    }

    cursor.remove();

}


/* ==========================================================
   ESCRIURE CENTRAT
========================================================== */

async function writeCenter(text, className = "") {

    const line = createLine("terminal-center " + className);

    const cursor = createCursor();

    line.appendChild(cursor);

    for (const letter of text) {

        cursor.remove();

        line.append(letter);

        line.appendChild(cursor);

        await sleep(18);

    }

    cursor.remove();

}


/* ==========================================================
   ESCRIURE MISSATGE D'AGENT
========================================================== */

async function writeAgent(agent, text, className = "") {

    const line = createLine("terminal-line");

    const name = document.createElement("span");

    name.className = className;

    name.textContent = agent + " ";

    line.appendChild(name);

    const cursor = createCursor();

    line.appendChild(cursor);

    for (const letter of text) {

        cursor.remove();

        line.append(letter);

        line.appendChild(cursor);

        scrollBottom();

        await sleep(18);

    }

    cursor.remove();

}


/* ==========================================================
   ESCRIURE NARAX
========================================================== */

async function narax(text){

    await writeAgent("NARAX-83 ▶", text, "narax");

}


/* ==========================================================
   ESCRIURE ZYN
========================================================== */

async function zyn(text){

    await writeAgent("ZYN_33 ▶", text, "zyn");

}

/* ==========================================================
   BOTONS
========================================================== */

function addButton(text, callback){

    const button = document.createElement("button");

    button.className = "terminal-button";

    button.textContent = text;

    button.onclick = callback;

    screen.appendChild(button);

    scrollBottom();

    return button;

}

function addCenterButton(text, callback){

    return addButton(text, callback);

}


/* ==========================================================
   BARRA DE PROGRÉS
========================================================== */

async function progressBar(){

    const line = document.createElement("div");

    line.className = "terminal-line progress";

    getPanel().appendChild(line);

    const total = 28;

    for(let i=0;i<=total;i++){

        const bar = "█".repeat(i);

        const empty = "░".repeat(total-i);

        const percent = Math.floor(i/total*100);

        line.innerHTML =
            "[" +
            "<span class='progress-fill'>" + bar + "</span>" +
            "<span class='progress-empty'>" + empty + "</span>" +
            "] " +
            percent +
            "%";

        scrollBottom();

        await sleep(50);

    }

    line.innerHTML +=
        " <span class='success'>✔</span>";

}

/* ==========================================================
   INPUT
========================================================== */

function terminalInput(question = ""){

    return new Promise(async resolve => {

        if(question){

            await write(question);

        }

        const line = createLine();

        const prompt = document.createElement("span");

        prompt.className = "prompt";

        prompt.textContent = "> ";

        const text = document.createElement("span");

        const cursor = createCursor();

        line.appendChild(prompt);

        line.appendChild(text);

        line.appendChild(cursor);

        let value = "";

        function refresh(){

            text.textContent = value;

            scrollBottom();

        }

        function handler(event){

            if(event.key === "Backspace"){

                event.preventDefault();

                value = value.slice(0, -1);

                refresh();

                return;

            }

            if(event.key === "Enter"){

                document.removeEventListener("keydown", handler);

                cursor.remove();

                resolve(value.trim());

                return;

            }

            if(event.key.length === 1){

                value += event.key;

                refresh();

            }

        }

        document.addEventListener("keydown", handler);

    });

}


/* ==========================================================
   CREDENCIAL
========================================================== */

async function createCredentialInput(){

    const value = await terminalInput("Introdueix la credencial:");

    checkCredential(value);

}

/* ==========================================================
   SEPARADOR
========================================================== */

function separator(){

    const line = document.createElement("div");

    line.className = "terminal-line";

    line.style.opacity = ".25";

    line.style.margin = "18px 0";

    line.textContent =
        "────────────────────────────────────────────";

    screen.appendChild(line);

}

/* ==========================================================
   LÍNIA EN BLANC
========================================================== */

function blank(lines = 1){

    for(let i=0;i<lines;i++){

        const div=document.createElement("div");

        div.className="terminal-line";

        div.innerHTML="&nbsp;";

        screen.appendChild(div);

    }

}

/* ==========================================================
   ESPERAR CLICK D'UN BOTÓ
========================================================== */

function waitButton(text){

    return new Promise(resolve=>{

        const button=document.createElement("button");

        button.className="terminal-button";

        button.textContent=text;

        button.onclick=()=>{

            button.remove();

            resolve();

        };

        screen.appendChild(button);

        scrollBottom();

    });

}

/* ==========================================================
   NETEJAR EVENTUALS INPUTS
========================================================== */

function removeInputs(){

    document.querySelectorAll(".terminal-input").forEach(input=>{

        input.remove();

    });

}

/* ==========================================================
   FINAL ENGINE V1.0
========================================================== */

console.log("ENGINE V1.0 carregat");