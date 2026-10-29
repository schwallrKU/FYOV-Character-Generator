let scenarioData;

let character = null;

async function loadScenario() {
    const response = await fetch("scenarios/seville-1510.json");
    const scenario = await response.json();
    scenarioData = scenario;

    const genderSelect =
    document.getElementById("gender-select");

    scenarioData["genders"].forEach(gender => {

        genderSelect.innerHTML +=
            `<option value="${gender}">
                ${gender}
            </option>`;

    });

    const html = `
        <h2>${scenario.title}</h2>

        <p>
            <strong>Location:</strong>
            ${scenario.setting.location}
        </p>

        <p>
            <strong>Date:</strong>
            ${scenario.setting.date}
        </p>

        <h3>Scenario Notes</h3>

        <ul>
            ${scenario["scenario-notes"]
                .map(note => `<li>${note}</li>`)
                .join("")}
        </ul>

        <h3>Character Creation Notes</h3>

        <ul>
            ${scenario["character-creation-notes"]
                .map(note => `<li>${note}</li>`)
                .join("")}
        </ul>
    `;

    document.getElementById("scenario").innerHTML = html;
    populateNameOptions();
    populateSurnameOptions();
    populateProfessionOptions();
    populateLookOptions();
    populateSkillOptions();
    populateResourceOptions();
    populateConnectionOptions();
    populateMarkOptions();
}

function getRandomUnique(array, count) {

    const shuffled = [...array]
        .sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, count);
}

loadScenario();

document
    .getElementById("generate-button")
    .addEventListener(
        "click",
        generateCharacter
    );

document
    .getElementById("import-character")
    .addEventListener(
        "click",
        () => {
            document
                .getElementById("import-json")
                .click();
        }
    );

document
    .getElementById("reset-button")
    .addEventListener(
        "click",
        resetSelections
    );

document
    .getElementById("import-json")
    .addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file) return;

            const reader =
                new FileReader();

           reader.onload = e => {

                try {

                    character =
                        JSON.parse(
                            e.target.result
                        );

                    loadCharacterIntoForm(
                        character
                    );

                    renderCharacter(
                        character
                    );

                } catch {

                    alert(
                        "Invalid character file."
                    );

                }

            };
            reader.readAsText(file);

        }
    );

document
    .getElementById("gender-select")
    .addEventListener("change", () => {

        populateNameOptions();
        populateProfessionOptions();
        populateConnectionOptions();

    });

document
    .getElementById("lock-character")
    .addEventListener(
        "click",
        () => {

            if (!character) return;

            loadCharacterIntoForm(character);

        }
    );

document.getElementById("export-json").addEventListener("click", () => {
    if (!character) return;

    const blob = new Blob(
        [JSON.stringify(character, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
        `${character.firstName}-${character.surname}`
            .replace(/\s+/g, "-") + ".json";
    a.click();

    URL.revokeObjectURL(url);
});


function resetSelections() {

    character = null;

    document
        .querySelectorAll("input")
        .forEach(input => {
            input.value = "";
        });

    document
        .querySelectorAll("select")
        .forEach(select => {
            select.selectedIndex = 0;
        });
    
    character = null;

    document
        .getElementById("character-actions")
        .classList.add("hidden");

    document.getElementById("character-output").innerHTML =
    "No character generated yet.";

}

function populateNameOptions() {
    const selectedGender =
        document.getElementById("gender-select").value;

    let names;

    if (selectedGender.includes("woman")) {
        names = scenarioData["women-names"];
    } else {
        names = scenarioData["men-names"];
    }

    const nameSelect =
        document.getElementById("name-select");

    nameSelect.innerHTML = 
        '<option value="">Random</option>';

    names.forEach(name => {
        nameSelect.innerHTML +=
            `<option value="${name}">
                ${name}
            </option>`;
    }); 
}

function populateSurnameOptions() {

    const surnameSelect =
        document.getElementById("surname-select");

    surnameSelect.innerHTML =
        '<option value="">Random</option>';

    scenarioData["surnames"].forEach(surname => {

        surnameSelect.innerHTML += `
            <option value="${surname}">
                ${surname}
            </option>
        `;

    });

}

function populateProfessionOptions() {

    const selectedGender =
        document.getElementById("gender-select").value;

    let professions;

    if (selectedGender.includes("woman")) {

        professions =
            scenarioData["women-professions"];

    } else {

        professions =
            scenarioData["men-professions"];

    }

    const professionSelect =
        document.getElementById("profession-select");

    professionSelect.innerHTML =
        '<option value="">Random</option>';

    professions.forEach(profession => {

        professionSelect.innerHTML += `
            <option value="${profession}">
                ${profession}
            </option>
        `;

    });

}

function populateLookOptions() {

    for (let i = 1; i <= 3; i++) {

        const lookSelect =
            document.getElementById(
                `look${i}-select`
            );

        lookSelect.innerHTML =
            '<option value="">Random</option>';

        scenarioData["looks"].forEach(look => {

            lookSelect.innerHTML += `
                <option value="${look}">
                    ${look}
                </option>
            `;

        });

    }

}

function populateSkillOptions() {

    for (let i = 1; i <= 3; i++) {

        const skillSelect =
            document.getElementById(
                `skill${i}-select`
            );

        skillSelect.innerHTML =
            '<option value="">Random</option>';

        scenarioData["skills"].forEach(skill => {

            skillSelect.innerHTML += `
                <option value="${skill}">
                    ${skill}
                </option>
            `;

        });

    }

}

function populateResourceOptions() {

    for (let i = 1; i <= 3; i++) {

        const resourceSelect =
            document.getElementById(
                `resource${i}-select`
            );

        resourceSelect.innerHTML =
            '<option value="">Random</option>';

        scenarioData["resources"].forEach(resource => {

            resourceSelect.innerHTML += `
                <option value="${resource}">
                    ${resource}
                </option>
            `;

        });

    }

}

function populateConnectionOptions() {

    const selectedGender =
        document.getElementById("gender-select").value;

    const validConnections =
        scenarioData["connections"]
            .filter(connection => {

                if (selectedGender.includes("woman")) {
                    return connection[1] !== "f";
                }

                return connection[1] !== "m";

            });

    for (let i = 1; i <= 3; i++) {

        const connectionSelect =
            document.getElementById(
                `connection${i}-select`
            );

        connectionSelect.innerHTML =
            '<option value="">Random</option>';

        validConnections.forEach(connection => {

            connectionSelect.innerHTML += `
                <option value="${connection[0]}">
                    ${connection[0]}
                </option>
            `;

        });

    }

}

function populateMarkOptions() {

    const markSelect =
        document.getElementById("mark-select");

    markSelect.innerHTML =
        '<option value="">Random</option>';

    scenarioData["supernatural_marks"]
        .forEach(mark => {

            markSelect.innerHTML += `
                <option value="${mark}">
                    ${mark}
                </option>
            `;

        });

}

function generateCharacter() {

    const selectedGender =
        document.getElementById("gender-select").value;

    let names;
    let professions;

    if (selectedGender.includes("woman")) {
        names = scenarioData["women-names"];
        professions = scenarioData["women-professions"];
    } else {
        names = scenarioData["men-names"];
        professions = scenarioData["men-professions"];
    }

    const customName =
        document.getElementById("name-input")
            .value
            .trim();

    const selectedName =
        document.getElementById("name-select")
            .value;

    const randomName =
        customName ||
        selectedName ||
        getRandomUnique(names, 1)[0];

    const customSurname =
        document.getElementById("surname-input")
            .value
            .trim();

    const selectedSurname =
        document.getElementById("surname-select")
            .value;

    const randomSurname =
        customSurname ||
        selectedSurname ||
        getRandomUnique(
            scenarioData["surnames"],
            1
        )[0];

    const customProfession =
        document.getElementById("profession-input")
            .value
            .trim();

    const selectedProfession =
        document.getElementById("profession-select")
            .value;

    const randomProfession =
        customProfession ||
        selectedProfession ||
        getRandomUnique(
            professions,
            1
        )[0];

    const randomLooks =
        getRandomUnique(
            scenarioData["looks"],
            3
        );

    const look1 =
        document.getElementById("look1-input").value.trim() ||
        document.getElementById("look1-select").value ||
        randomLooks[0];

    const look2 =
        document.getElementById("look2-input").value.trim() ||
        document.getElementById("look2-select").value ||
        randomLooks[1];

    const look3 =
        document.getElementById("look3-input").value.trim() ||
        document.getElementById("look3-select").value ||
        randomLooks[2];


    const randomSkills =
        getRandomUnique(
            scenarioData["skills"],
            3
        );

    const skill1 =
        document.getElementById("skill1-input").value.trim() ||
        document.getElementById("skill1-select").value ||
        randomSkills[0];

    const skill2 =
        document.getElementById("skill2-input").value.trim() ||
        document.getElementById("skill2-select").value ||
        randomSkills[1];

    const skill3 =
        document.getElementById("skill3-input").value.trim() ||
        document.getElementById("skill3-select").value ||
        randomSkills[2];


    const randomResources =
        getRandomUnique(
            scenarioData["resources"],
            3
        );

    const resource1 =
        document.getElementById("resource1-input").value.trim() ||
        document.getElementById("resource1-select").value ||
        randomResources[0];

    const resource2 =
        document.getElementById("resource2-input").value.trim() ||
        document.getElementById("resource2-select").value ||
        randomResources[1];

    const resource3 =
        document.getElementById("resource3-input").value.trim() ||
        document.getElementById("resource3-select").value ||
        randomResources[2];


    const validConnections =
        scenarioData["connections"]
            .filter(connection => {

                if (selectedGender.includes("woman")) {
                    return connection[1] !== "f";
                }

                return connection[1] !== "m";

            });

    const randomConnections =
        getRandomUnique(
            validConnections,
            3
        );

    const connection1 =
        document.getElementById("connection1-input").value.trim() ||
        document.getElementById("connection1-select").value ||
        randomConnections[0][0];

    const connection2 =
        document.getElementById("connection2-input").value.trim() ||
        document.getElementById("connection2-select").value ||
        randomConnections[1][0];

    const connection3 =
        document.getElementById("connection3-input").value.trim() ||
        document.getElementById("connection3-select").value ||
        randomConnections[2][0];

    const customMark =
        document.getElementById("mark-input")
            .value
            .trim();

    const selectedMark =
        document.getElementById("mark-select")
            .value;

    const supernaturalMark =
        customMark ||
        selectedMark ||
        getRandomUnique(
            scenarioData["supernatural_marks"],
            1
        )[0];

    character = {
        firstName: randomName,
        surname: randomSurname,

        gender: selectedGender,
        profession: randomProfession,

        looks: [
            { text: look1, status: "active" },
            { text: look2, status: "active" },
            { text: look3, status: "active" },
            null,
            null,
            null
        ],

        skills: [
            { text: skill1, status: "active" },
            { text: skill2, status: "active" },
            { text: skill3, status: "active" },
            null,
            null,
            null
        ],

        resources: [
            { text: resource1, status: "active" },
            { text: resource2, status: "active" },
            { text: resource3, status: "active" },
            null,
            null,
            null
        ],

        connections: [
            { text: connection1, status: "active" },
            { text: connection2, status: "active" },
            { text: connection3, status: "active" },
            null,
            null,
            null
        ],

        supernaturalMarks: [
            {
                text: supernaturalMark,
                status: "active"
            },
            null,
            null,
            null,
            null,
            null
        ],

        relationships: [
            null,
            null,
            null,
            null,
            null,
            null
        ],

        memories: [
            null,
            null,
            null,
            null,
            null,
            null
        ],

        notes: ""
    };

    renderCharacter(character);
}

function renderCharacter(character) {

    document.getElementById("character-output").innerHTML = `
        <p>
            <strong>Name:</strong>
            ${character.firstName} ${character.surname}
        </p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Profession:</strong> ${character.profession}</p>

        <p><strong>Looks:</strong></p>
        <ul>
            ${character.looks
                .filter(item => item)
                .map(item => `<li>${item.text}</li>`)
                .join("")}
        </ul>

        <p><strong>Skills:</strong></p>
        <ul>
            ${character.skills
                .filter(item => item)
                .map(item => `<li>${item.text}</li>`)
                .join("")}
        </ul>

        <p><strong>Resources:</strong></p>
        <ul>
            ${character.resources
                .filter(item => item)
                .map(item => `<li>${item.text}</li>`)
                .join("")}
        </ul>

        <p><strong>Connections:</strong></p>
        <ul>
            ${character.connections
                .filter(item => item)
                .map(item => `<li>${item.text}</li>`)
                .join("")}
        </ul>

        <p>
            <strong>Supernatural Mark:</strong>
            ${character.supernaturalMarks
                .filter(item => item)
                .map(item => item.text)
                .join(", ")}
        </p>
    `;

    document
        .getElementById("character-actions")
        .classList.remove("hidden");
}

function loadCharacterIntoForm(character) {

    document.getElementById("gender-select").value =
        character.gender;

    populateNameOptions();
    populateProfessionOptions();
    populateConnectionOptions();

    document.getElementById("name-input").value =
        character.firstName || "";

    document.getElementById("surname-input").value =
        character.surname || "";

    document.getElementById("profession-input").value =
        character.profession;

    document.getElementById("look1-input").value =
        character.looks[0]?.text || "";

    document.getElementById("look2-input").value =
        character.looks[1]?.text || "";

    document.getElementById("look3-input").value =
        character.looks[2]?.text || "";

    document.getElementById("skill1-input").value =
        character.skills[0]?.text || "";

    document.getElementById("skill2-input").value =
        character.skills[1]?.text || "";

    document.getElementById("skill3-input").value =
        character.skills[2]?.text || "";

    document.getElementById("resource1-input").value =
        character.resources[0]?.text || "";

    document.getElementById("resource2-input").value =
        character.resources[1]?.text || "";

    document.getElementById("resource3-input").value =
        character.resources[2]?.text || "";

    document.getElementById("connection1-input").value =
        character.connections[0]?.text || "";

    document.getElementById("connection2-input").value =
        character.connections[1]?.text || "";

    document.getElementById("connection3-input").value =
        character.connections[2]?.text || "";

    document.getElementById("mark-input").value =
        character.supernaturalMarks[0]?.text || "";
}