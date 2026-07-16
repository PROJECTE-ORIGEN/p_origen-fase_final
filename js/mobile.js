/* ==========================================================
   PROJECTE ORIGEN
   MOBILE
========================================================== */

const MOBILE = window.matchMedia("(max-width: 900px)").matches;

function isMobile(){

    return MOBILE;

}

function mobileDelay(){

    return MOBILE ? 250 : 0;

}

function focusMobileInput(input){

    if(!MOBILE) return;

    setTimeout(()=>{

        input.focus();

        input.click();

    },150);

}

/* ==========================================================
   INPUT MÒBIL
========================================================== */

function createMobileInput(onChange, onEnter){

    if(!isMobile()) return null;

    const input = document.createElement("input");

    input.type = "text";

    input.autocomplete = "off";
    input.autocorrect = "off";
    input.autocapitalize = "characters";
    input.spellcheck = false;

    input.style.position = "fixed";
    input.style.left = "-9999px";
    input.style.opacity = "0";

    document.body.appendChild(input);

    input.addEventListener("input",()=>{

        onChange(input.value);

    });

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            onEnter(input.value);

        }

    });

    focusMobileInput(input);

    return input;

}