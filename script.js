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
}

loadScenario();

document
    .getElementById("generate-button")
    .addEventListener("click", generateCharacter);

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

    const randomName =
        names[Math.floor(Math.random() * names.length)];

    const randomSurname =
        scenarioData["surnames"][
            Math.floor(Math.random() * scenarioData["surnames"].length)
        ];

    const randomProfession =
        professions[Math.floor(Math.random() * professions.length)];

    document.getElementById("character-output").innerHTML = `
        <p><strong>Name:</strong> ${randomName} ${randomSurname}</p>
        <p><strong>Gender:</strong> ${selectedGender}</p>
        <p><strong>Profession:</strong> ${randomProfession}</p>
    `;
}