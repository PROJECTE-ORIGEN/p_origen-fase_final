/* ==========================================================
   VERIFICACIÓ D'IDENTITAT
========================================================== */

async function startAuthentication(panel) {

    panel.innerHTML = `

    <div class="panel-title glow">
        VERIFICACIÓ D'IDENTITAT
    </div>

    <div id="authLog"></div>

`;

    const log = document.getElementById("authLog");

    await authWrite(
    log,
    "Per accedir a la transmissió, cal verificar la teva identitat.",
    "system-text"
);

    await pause(600);

    while (true) {

    const credencial = isMobile()

    ? await mobileCredentialInput(log)

    : await authInput(
        log,
        "Introdueix la credencial assignada:"
    );

    await authWrite(log, "");
    await authWrite(log, "Verificant credencial...");

    await pause(1000);

    const lines = log.querySelectorAll(".terminal-line");

    lines[lines.length - 1].remove();

    AGENT = findAgentByCredential(credencial);

    if (AGENT) {

        await authWrite(
            log,
            "✓ Credencial validada",
            "auth-success"
        );

        break;

    }

    await authWrite(
        log,
        "✗ Credencial incorrecta.",
        "error"
    );

    await pause(700);

}

await pause(2000);

// petita dissolució
panel.style.opacity = "0";

await pause(250);

panel.style.opacity = "1";

startAliasSelection(panel);

}

async function authWrite(log, text, className = "") {

    const line = document.createElement("div");

    line.className = "terminal-line " + className;

    line.innerHTML = text;

    log.appendChild(line);

    await pause(18 * text.length);

}

/* ==========================================================
   INPUT DINS DEL PANELL
========================================================== */

function authInput(log, question = "") {

    return new Promise(async resolve => {

        if (question) {

            await authWrite(log, question);

        }

        const line = document.createElement("div");
        line.className = "terminal-line";

        const prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "> ";

        const text = document.createElement("span");

        const cursor = document.createElement("span");
        cursor.className = "cursor";

        line.appendChild(prompt);
        line.appendChild(text);
        line.appendChild(cursor);

        log.appendChild(line);

        let value = "";

        function refresh() {

            text.textContent = value;

            log.scrollTop = log.scrollHeight;

        }

        function handler(event) {

            if (event.key === "Backspace") {

                event.preventDefault();

                value = value.slice(0, -1);

                refresh();

                return;

            }

            if (event.key === "Enter") {

                document.removeEventListener("keydown", handler);

                cursor.remove();

                resolve(value.trim());

                return;

            }

            if (event.key.length === 1) {

                value += event.key;

                refresh();

            }

        }

        document.addEventListener("keydown", handler);

    });

}