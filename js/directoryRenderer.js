/* ==========================================================
   PROJECTE ORIGEN
   DIRECTORY RENDERER
========================================================== */

/* ==========================================================
   ICONES DE CARPETA
========================================================== */

function getFolderIcon(icon){

    switch(icon){

        case "photo":
            return "🖼️";

        case "image":
            return "📷";

        case "dance":
            return "💃";

        case "basto":
            return "🥢";

        case "music":
            return "🎵";

        case "video":
            return "🎥";

        case "download":
            return "⤓";

        case "zip":
            return "📦";

        default:
            return "📁";

    }

}

/* ==========================================================
   RENDER DIRECTORI
========================================================== */

async function renderDirectory(){

    await showView(`

        <div id="directory">

            <div class="directory-header">

                <span class="directory-title">

                    DIRECTORI RECUPERAT

                </span>

                <span class="directory-subtitle">

                    PROJECTE ORIGEN

                </span>

            </div>

            <div class="directory-info">

                REPOSITORI HISTÒRIC · ${MANIFEST.folders.length} CATEGORIES

            </div>

            <div class="directory-separator"></div>

            <div id="folderList"></div>

        </div>

    `);

    const list = document.getElementById("folderList");

    await pause(350);

    for(const folder of MANIFEST.folders){

        const item = document.createElement("div");

        item.className = "folder";

        item.dataset.id = folder.id;

        item.innerHTML = `

            <span class="folder-icon">

                ${getFolderIcon(folder.icon)}

            </span>

            <span class="folder-name">

                ${folder.name}

            </span>

        `;

        item.onclick = () => openFolder(folder);

        list.appendChild(item);

        await pause(120);

    }

    /* ==========================================================
   BOTÓ FINALITZAR TRANSMISSIÓ
========================================================== */

const close = document.createElement("div");

close.className = "directory-close";

close.innerHTML = `

    <button
        id="closeDirectory"
        class="terminal-button">

        SORTIR DEL DIRECTORI

    </button>

`;

list.after(close);

document
    .getElementById("closeDirectory")
    .onclick = closeDirectory;

}