/* ==========================================================
   PROJECTE ORIGEN
   FOLDER
========================================================== */

/* ==========================================================
   ICONES DELS FITXERS
========================================================== */

function getFileIcon(type){

    switch(type){

        case "photo":
        case "image":
            return "📷";

        case "video":
            return "🎬";

        case "music":
            return "🎵";

        case "dance":
            return "💃";

        case "basto":
            return "🥢";

        case "download":
            return "⬇️";

        case "zip":
            return "🗜️";

        default:
            return "📄";

    }

}


/* ==========================================================
   OBRIR CARPETA
========================================================== */

async function openFolder(folder){

    await showView(`

        <div id="folderView">

            <div class="folder-toolbar">

                <button
                    id="backButton"
                    class="back-button">

                    ← DIRECTORI RECUPERAT

                </button>

            </div>

            <div class="folder-title">

                ${folder.name}

            </div>

            <div class="folder-description">

                ${folder.description}

            </div>

            <div class="directory-separator"></div>

            <div id="fileList"></div>

        </div>

    `);

    document
        .getElementById("backButton")
        .onclick = renderDirectory;

    const list = document.getElementById("fileList");

    await pause(250);

    for(const file of folder.files){

        const item = document.createElement("div");

        item.className = "file";

        let info = "";

if(file.title){

    info += `

        <div class="file-title">

            ${file.title}

        </div>

    `;

    if(file.author){

        info += `

            <div class="file-author">

                ${file.author}

            </div>

        `;

    }

    info += `

        <div class="file-name">

            ${file.name}

        </div>

    `;

}else{

    info += `

        <div class="file-title">

            ${file.name}

        </div>

    `;

}

        item.innerHTML = `

            <div class="file-icon">

                ${getFileIcon(file.type)}

            </div>

            <div class="file-info">

                ${info}

            </div>

        `;

        item.onclick = () => {

    if(file.type === "zip"){

        downloadFile(file);

        return;

    }

    const index = folder.files.indexOf(file);

    openViewer(folder,index);

};
        list.appendChild(item);

        await pause(70);

    }

}