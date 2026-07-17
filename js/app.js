/* ==========================================================
   PROJECTE ORIGEN
   APP.JS
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    console.log("APP NOU");

    await loadAgents();

    resetTerminal();

    startMemoryCheck();

});