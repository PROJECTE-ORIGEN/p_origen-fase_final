/* ==========================================================
   PROJECTE ORIGEN
   VIEW MANAGER
========================================================== */

async function showView(html){

    screen.style.opacity = "0";

    await pause(180);

    screen.innerHTML = html;

    screen.style.opacity = "1";

}