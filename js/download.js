/* ==========================================================
   PROJECTE ORIGEN
   DOWNLOAD
========================================================== */

function downloadFile(file){

    const link = document.createElement("a");

    link.href =
        MANIFEST.basePath + file.file;

    link.download = "";

    document.body.appendChild(link);

    link.click();

    link.remove();

}