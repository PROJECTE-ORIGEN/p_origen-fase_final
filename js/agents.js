let AGENTS = [];

let AGENT = null;

async function loadAgents(){

    const response = await fetch("data/agents.json");

    AGENTS = await response.json();

}

function findAgentByCredential(code){

    return AGENTS.find(agent =>

        agent.codiCredencial.toUpperCase() ===
        code.toUpperCase()

    );

}