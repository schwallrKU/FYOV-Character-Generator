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
    .getElementById("gender-select")
    .addEventListener(
        "change",
        populateNameOptions
    );

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

    const randomSurname =
        getRandomUnique(
            scenarioData["surnames"],
            1
        )[0];

    const randomProfession =
        getRandomUnique(
            professions,
            1
        )[0];

    const looks =
    getRandomUnique(
        scenarioData["looks"],
        3
    );

    const skills =
        getRandomUnique(
            scenarioData["skills"],
            3
        );

    const resources =
        getRandomUnique(
            scenarioData["resources"],
            3
        );

    const validConnections =
    scenarioData["connections"]
        .filter(connection => {

            if (selectedGender.includes("woman")) {
                return connection[1] !== "f";
            }

            return connection[1] !== "m";
        });

    const connections =
        getRandomUnique(
            validConnections,
            3
        );

    const supernaturalMark =
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
            ${connections.map(item => `<li>${item[0]}</li>`).join("")}
        </ul>

        <p><strong>Supernatural Mark:</strong> ${supernaturalMark}</p>
    `;
}