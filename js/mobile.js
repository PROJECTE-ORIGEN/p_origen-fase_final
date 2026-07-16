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

function focusMobileInput(input){

    if(!MOBILE) return;

    requestAnimationFrame(()=>{

        input.focus();

    });

}

function createMobileInput(){

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

    focusMobileInput(input);

    return input;

}

/* ==========================================================
   INPUT CREDENCIAL MÒBIL
========================================================== */

function mobileCredentialInput(log){

    return new Promise(resolve=>{

        const wrapper=document.createElement("div");

        wrapper.className="mobile-auth";

        wrapper.innerHTML=`

            <input
                id="mobileCredential"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="characters"
                spellcheck="false"
                placeholder="CREDENCIAL">

            <button>VALIDAR</button>

        `;

        log.appendChild(wrapper);

        const input=wrapper.querySelector("input");
        const button=wrapper.querySelector("button");

        input.focus();

        button.onclick=()=>{

            wrapper.remove();

            resolve(input.value.trim().toUpperCase());

        };

        input.addEventListener("keydown",(e)=>{

            if(e.key==="Enter"){

                button.click();

            }

        });

    });

}