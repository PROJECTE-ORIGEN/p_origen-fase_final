/* ==========================================================
   PROJECTE ORIGEN
   AUDIO VIEWER
========================================================== */

function openAudio(file){

    const viewer =
        document.getElementById("viewerContent");

    viewer.innerHTML = `

<div class="audio-viewer">

    <div class="audio-icon">

        🎵

    </div>

    <audio controls>

        <source
            src="${MANIFEST.basePath}${file.file}">

    </audio>

</div>

`;

}