/* ==========================================================
   PROJECTE ORIGEN
   VIDEO VIEWER
========================================================== */

function openVideo(file){

    const viewer =
        document.getElementById("viewerContent");

    viewer.innerHTML = `

<div class="video-viewer">

    <video
        id="viewerVideo"
        class="viewer-video"
        controls
        preload="auto">

        <source
            src="${MANIFEST.basePath}${file.file}"
            type="video/mp4">

    </video>

</div>

`;

    const video = document.getElementById("viewerVideo");

    video.play().catch(()=>{

        // Si el navegador bloqueja l'autoplay,
        // simplement es quedarà preparat.

    });

}