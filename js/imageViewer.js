/* ==========================================================
   PROJECTE ORIGEN
   IMAGE VIEWER
========================================================== */

function openImage(file){

    const viewer = document.getElementById("viewerContent");

    viewer.innerHTML = `

<div class="image-viewer">

    <img
        class="viewer-image"
        src="${MANIFEST.basePath}${file.file}"
        alt="${file.title}">

</div>

`;

}