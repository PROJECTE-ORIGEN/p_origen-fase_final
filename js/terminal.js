/* ==========================================================
   PROJECTE ORIGEN
   TERMINAL
========================================================== */

/* ---------- Elements del terminal ---------- */

const headerRight = document.querySelector(".header-right");

const footerLeft = document.querySelector("#terminal-footer div:first-child");

const footerRight = document.querySelector("#terminal-footer div:last-child");


/* ==========================================================
   CANVIAR EL CONTINGUT DE LA PANTALLA
========================================================== */

function setScreen(html){

    screen.innerHTML = html;

}


/* ==========================================================
   CANVIAR EL TEXT DEL HEADER
========================================================== */

function setHeader(text){

    headerRight.textContent = text;

}


/* ==========================================================
   CANVIAR EL FOOTER
========================================================== */

function setFooter(left,right){

    footerLeft.innerHTML = left;

    footerRight.innerHTML = right;

}


/* ==========================================================
   RESTAURAR TERMINAL A L'ESTAT INICIAL
========================================================== */

function resetTerminal(){

    setHeader("SENYAL DESCONEGUDA");

    setFooter(

        "ESTAT · INACTIU",

        ""

    );

}


/* ==========================================================
   ACTIVAR CANAL SEGUR
========================================================== */

function activateSecureChannel(){

    setHeader("📡 CANAL SEGUR");

    setFooter(

        'ESTAT · <span class="online">CONNECTAT</span>',

        "TEMPORALITAT · 2026"

    );

}