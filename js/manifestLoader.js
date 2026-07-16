/* ==========================================================
   PROJECTE ORIGEN
   MANIFEST LOADER
========================================================== */

let MANIFEST = null;

async function loadManifest(){

    // Ruta de la carpeta del grup
    const basePath = `media/groups/${AGENT.unitat}/`;

    // Ruta del manifest
    const manifestPath = `${basePath}manifest.json`;

    const response = await fetch(manifestPath);

    if(!response.ok){

        throw new Error(`No s'ha trobat el manifest: ${manifestPath}`);

    }

    MANIFEST = await response.json();

    // Guardem la ruta base perquè la resta del sistema
    // pugui construir els camins dels fitxers.
    MANIFEST.basePath = basePath;

    return MANIFEST;

}