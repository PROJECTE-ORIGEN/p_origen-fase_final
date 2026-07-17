/* ==========================================================
   VÍDEO
========================================================== */

/* ==========================================================
   VÍDEO GLOBAL
========================================================== */

let originVideo = null;

function prepareVideo(){

    if(originVideo) return;

    originVideo = document.createElement("video");

    originVideo.id = "originVideo";

    originVideo.src = "media/video/IMG_0399.mp4";

    originVideo.playsInline = true;

    originVideo.preload = "auto";

    originVideo.style.display = "none";

    document.body.appendChild(originVideo);

}

async function startVideo(){

    const panel = document.querySelector(".incoming-panel");

    panel.classList.remove("boot-mode");
    panel.classList.add("video-mode");

    panel.innerHTML = `

        <div class="video-frame">

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

    const frame = document.querySelector(".video-frame");

const video = originVideo;

frame.prepend(video);

video.style.display = "";

video.volume = 1;

video.currentTime = 0;

video.addEventListener("loadeddata",()=>{

    console.log("VIDEO CARREGAT");

});

video.addEventListener("play",()=>{

    console.log("PLAY");

});

video.addEventListener("playing",()=>{

    console.log("PLAYING");

});

video.addEventListener("pause",()=>{

    console.log("PAUSE");

});

video.addEventListener("error",()=>{

    console.log("ERROR VIDEO");

    console.log(video.error);

});

video.play().catch(err=>{

    alert("VIDEO ERROR:\n" + err.name + "\n" + err.message);

});

video.onended = async ()=>{

    if(isMobile()){

        video.style.display = "none";

    }

    await signalTransition();

    clearScreen();

    await pause(250);

    await startSecureChannel();

};

}