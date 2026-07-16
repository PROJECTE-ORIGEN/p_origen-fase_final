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

    },150);

}