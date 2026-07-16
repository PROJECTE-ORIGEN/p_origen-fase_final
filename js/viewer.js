/* ==========================================================
   PROJECTE ORIGEN
   VIEWER
========================================================== */

let CURRENT_FOLDER = null;
let CURRENT_INDEX = 0;

/* ==========================================================
   OBRIR VISOR
========================================================== */

async function openViewer(folder,index){

    document.onkeydown = null;

    CURRENT_FOLDER = folder;
    CURRENT_INDEX = index;

    const file = folder.files[index];

    await showView(`

<div id="viewer">

    <div class="viewer-topbar">

        <button
            class="back-button"
            onclick="openFolder(CURRENT_FOLDER)">

            ← TORNAR

        </button>

        <div class="viewer-folder">

    <span class="viewer-folder-icon">

        ${getFolderIcon(folder.icon)}

    </span>

    ${folder.name}

</div>

        <div class="viewer-counter">

            ${index+1} / ${folder.files.length}

        </div>

    </div>

    <div id="viewerContent"></div>

    <div class="viewer-info">

        <div class="viewer-title"></div>

        <div class="viewer-author"></div>

        <div class="viewer-name"></div>

    </div>

    <div class="viewer-footer">

        <button id="previousButton">

            ← ANTERIOR

        </button>

        <button id="nextButton">

            SEGÜENT →

        </button>

    </div>

</div>

`);

    renderViewer(file);

    setupViewerButtons();

    setupViewerKeyboard();

}

/* ==========================================================
   BOTONS
========================================================== */

function setupViewerButtons(){

    const previous =
        document.getElementById("previousButton");

    const next =
        document.getElementById("nextButton");

    previous.onclick = previousFile;
    next.onclick = nextFile;

    previous.style.visibility =
        CURRENT_INDEX === 0
            ? "hidden"
            : "visible";

    next.style.visibility =
        CURRENT_INDEX ===
        CURRENT_FOLDER.files.length - 1
            ? "hidden"
            : "visible";

}

/* ==========================================================
   TECLAT
========================================================== */

function setupViewerKeyboard(){

    document.onkeydown = (event)=>{

        switch(event.key){

            case "ArrowLeft":

                previousFile();

                break;

            case "ArrowRight":

                nextFile();

                break;

            case "Escape":

                openFolder(CURRENT_FOLDER);

                break;

        }

    };

}

/* ==========================================================
   NAVEGACIÓ
========================================================== */

function previousFile(){

    if(CURRENT_INDEX===0)return;

    openViewer(
        CURRENT_FOLDER,
        CURRENT_INDEX-1
    );

}

function nextFile(){

    if(
        CURRENT_INDEX>=
        CURRENT_FOLDER.files.length-1
    )return;

    openViewer(
        CURRENT_FOLDER,
        CURRENT_INDEX+1
    );

}

/* ==========================================================
   RENDER
========================================================== */

function renderViewer(file){

    const title =
    document.querySelector(".viewer-title");

const author =
    document.querySelector(".viewer-author");

const name =
    document.querySelector(".viewer-name");

if(file.title){

    title.textContent = file.title;

    title.classList.remove("file-title-only");

    author.textContent = file.author || "";

    author.style.display = "block";

    name.textContent = file.name || "";

    name.style.display = "block";

}else{

    title.textContent = file.name;

    title.classList.add("file-title-only");

    author.style.display = "none";

    name.style.display = "none";

}

    switch(file.type){

        case "photo":
        case "image":

            openImage(file);

            break;

        case "video":

            openVideo(file);

            break;

        case "music":

            openAudio(file);

            break;

        case "zip":
        case "download":

            downloadFile(file);

            break;

    }

}