/* ==========================================================
   VÍDEO
========================================================== */

async function startVideo(){

    const panel = document.querySelector(".incoming-panel");

    panel.classList.remove("boot-mode");
    panel.classList.add("video-mode");

    panel.innerHTML = `

        <div class="video-frame">

            <video
                id="originVideo"
                autoplay
                playsinline>

                <source
                    src="media/video/IMG_0399.MOV"
                    type="video/mp4">

            </video>

            <div class="video-noise"></div>

            <div class="video-scan"></div>

            <div class="video-footer">

                <span class="live-dot"></span>

                <span>EN DIRECTE</span>

                <span class="footer-separator"></span>

                <span>CANAL ORIGEN</span>

            </div>

        </div>

    `;

    const video = document.getElementById("originVideo");

    video.volume = 1;

    video.onended = async ()=>{

        await signalTransition();

        clearScreen();

        await pause(250);

        await startSecureChannel();

    };

}