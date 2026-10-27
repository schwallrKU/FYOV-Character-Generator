let scenarioData;

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
    .getElementById("reset-button")
    .addEventListener(
        "click",
        resetSelections
    );

document
    .getElementById("gender-select")
    .addEventListener("change", () => {

        populateNameOptions();
        populateProfessionOptions();
        populateConnectionOptions();

    });

function resetSelections() {

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

    const looks = [
        look1,
        look2,
        look3
    ];

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

    const skills = [
        skill1,
        skill2,
        skill3
    ];

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

    const resources = [
        resource1,
        resource2,
        resource3
    ];


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

    const connections = [
        connection1,
        connection2,
        connection3
    ];

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

    const character = {
        name: `${randomName} ${randomSurname}`,
        gender: selectedGender,
        profession: randomProfession,
        looks,
        skills,
        resources,
        connections,
        supernaturalMark
    };

    console.log(character);

    document.getElementById("character-output").innerHTML = `
        <p><strong>Name:</strong> ${randomName} ${randomSurname}</p>
        <p><strong>Gender:</strong> ${selectedGender}</p>
        <p><strong>Profession:</strong> ${randomProfession}</p>
        <p><strong>Looks:</strong></p>
        <ul>
            ${looks.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <p><strong>Skills:</strong></p>
        <ul>
            ${skills.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <p><strong>Resources:</strong></p>
        <ul>
            ${resources.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <p><strong>Connections:</strong></p>
        <ul>
            ${connections.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <p><strong>Supernatural Mark:</strong> ${supernaturalMark}</p>
    `;
}