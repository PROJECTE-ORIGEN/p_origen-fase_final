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
   CREDENCIAL MÒBIL
========================================================== */

async function mobileCredentialInput(log, question){

    return new Promise(async resolve=>{

        if(question){

            await authWrite(log, question);

        }

        const wrapper = document.createElement("div");
        wrapper.className = "mobile-auth";

        const input = document.createElement("input");
        input.className = "mobile-auth-input";

        input.type = "text";
        input.placeholder = "Credencial";

        input.autocomplete = "off";
        input.autocorrect = "off";
        input.autocapitalize = "characters";
        input.spellcheck = false;

        const button = document.createElement("button");
        button.className = "mobile-auth-button";
        button.textContent = "VALIDAR";

        wrapper.appendChild(input);
        wrapper.appendChild(button);

        log.appendChild(wrapper);

        setTimeout(()=>{

            input.focus();

        },100);

        function finish(){

            const value = input.value.trim().toUpperCase();

            wrapper.remove();

            resolve(value);

        }

        button.addEventListener("click",finish);

        input.addEventListener("keydown",(event)=>{

            if(event.key==="Enter"){

                finish();

            }

        });

    });

}

/* ==========================================================
   UNLOCK ÀUDIO / VÍDEO IOS
========================================================== */

let mediaUnlocked = false;

function unlockMedia(){

    if(mediaUnlocked) return;

    mediaUnlocked = true;

    const medias = document.querySelectorAll("audio, video");

    medias.forEach(media=>{

        const promise = media.play();

        if(promise){

            promise.then(()=>{

                media.pause();

                media.currentTime = 0;

            }).catch(()=>{});

        }

    });

}