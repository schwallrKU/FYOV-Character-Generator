let character = null;

function normalizeCharacter(character = {}) {

    const validStatuses = [
        "active",
        "checked",
        "lost",
        "forgotten"
    ];

    function normalizeTraitArray(items) {

        if (!Array.isArray(items)) {
            return [];
        }

        return items
            .filter(item => item)
            .map(item => ({
                text:
                    typeof item.text === "string"
                        ? item.text
                        : "",

                status:
                    validStatuses.includes(
                        item.status
                    )
                        ? item.status
                        : "active"
            }));
    }

    function normalizeTextArray(items) {

        if (!Array.isArray(items)) {
            return [];
        }

        return items
            .filter(item =>
                typeof item === "string"
            )
            .map(item => item.trim())
            .filter(item => item.length > 0);
    }

    return {

        firstName:
            typeof character.firstName === "string"
                ? character.firstName
                : "",

        surname:
            typeof character.surname === "string"
                ? character.surname
                : "",

        gender:
            typeof character.gender === "string"
                ? character.gender
                : "",

        profession:
            typeof character.profession === "string"
                ? character.profession
                : "",

        looks:
            normalizeTraitArray(
                character.looks
            ),

        skills:
            normalizeTraitArray(
                character.skills
            ),

        resources:
            normalizeTraitArray(
                character.resources
            ),

        connections:
            normalizeTraitArray(
                character.connections
            ),

        supernaturalMarks:
            normalizeTraitArray(
                character.supernaturalMarks
            ),

        relationships:
            normalizeTextArray(
                character.relationships
            ),

        memories:
            normalizeTextArray(
                character.memories
            ),

        notes:
            typeof character.notes === "string"
                ? character.notes
                : ""
    };
}

document
    .getElementById("import-json")
    .addEventListener(
        "change",
        loadCharacter
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
    .getElementById("export-json")
    .addEventListener(
        "click",
        exportCharacter
    );

document
    .getElementById("print-sheet")
    .addEventListener(
        "click",
        () => {

            character =
                normalizeCharacter(
                    character
                );

            localStorage.setItem(
                "character",
                JSON.stringify(character)
            );

            window.open(
                "sheet.html",
                "_blank"
            );
        }
    );

function createEditorRows() {

    createRows(
        "looks-editor",
        "look",
        [
            "active",
            "forgotten"
        ]
    );

    createRows(
        "skills-editor",
        "skill",
        [
            "active",
            "checked",
            "lost",
            "forgotten"
        ]
    );

    createRows(
        "resources-editor",
        "resource",
        [
            "active",
            "lost",
            "forgotten"
        ]
    );

    createRows(
        "connections-editor",
        "connection",
        [
            "active",
            "lost",
            "forgotten"
        ]
    );

    createRows(
        "marks-editor",
        "mark",
        [
            "active",
            "lost",
            "forgotten"
        ]
    );

}

function createRows(
    containerId,
    prefix,
    statuses
) {

    const container =
        document.getElementById(
            containerId
        );

    for (let i = 1; i <= 6; i++) {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "item-row";

        const input =
            document.createElement(
                "input"
            );

        input.type = "text";

        input.id =
            `${prefix}-text-${i}`;

        const select =
            document.createElement(
                "select"
            );

        select.id =
            `${prefix}-status-${i}`;

        statuses.forEach(
            status => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    status;

                option.textContent =
                    status;

                select.appendChild(
                    option
                );

            }
        );

        row.appendChild(input);
        row.appendChild(select);

        container.appendChild(row);

    }

}

function loadCharacter(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = e => {

        try {

            character =
                normalizeCharacter(
                    JSON.parse(
                        e.target.result
                    )
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

function renderCategory(
    prefix,
    items
) {

    for (let i = 0; i < 6; i++) {

        document.getElementById(
            `${prefix}-text-${i + 1}`
        ).value =
            items[i]?.text || "";

        document.getElementById(
            `${prefix}-status-${i + 1}`
        ).value =
            items[i]?.status || "active";

    }

}

function renderCharacter(
    character
) {

    document.getElementById(
        "first-name"
    ).value =
        character.firstName || "";

    document.getElementById(
        "surname"
    ).value =
        character.surname || "";

    document.getElementById(
        "gender"
    ).value =
        character.gender || "";

    document.getElementById(
        "profession"
    ).value =
        character.profession || "";

    renderCategory(
        "look",
        character.looks
    );

    renderCategory(
        "skill",
        character.skills
    );

    renderCategory(
        "resource",
        character.resources
    );

    renderCategory(
        "connection",
        character.connections
    );

    renderCategory(
        "mark",
        character.supernaturalMarks
    );

    for (let i = 0; i < 6; i++) {

        document.getElementById(
            `relationship-${i + 1}`
        ).value =
            character.relationships[i] || "";

        document.getElementById(
            `memory-${i + 1}`
        ).value =
            character.memories[i] || "";

    }

    document.getElementById(
        "notes"
    ).value =
        character.notes || "";

}

createEditorRows();

function collectCategory(prefix) {

    const results = [];

    for (let i = 1; i <= 6; i++) {

        const text =
            document.getElementById(
                `${prefix}-text-${i}`
            ).value.trim();

        const status =
            document.getElementById(
                `${prefix}-status-${i}`
            ).value;

        if (text) {

            results.push({
                text,
                status
            });

        } else {

            results.push(null);

        }

    }

    return results;

}

function exportCharacter() {

    character = {

        firstName:
            document.getElementById(
                "first-name"
            ).value.trim(),

        surname:
            document.getElementById(
                "surname"
            ).value.trim(),

        gender:
            document.getElementById(
                "gender"
            ).value,

        profession:
            document.getElementById(
                "profession"
            ).value.trim(),

        looks:
            collectCategory("look"),

        skills:
            collectCategory("skill"),

        resources:
            collectCategory("resource"),

        connections:
            collectCategory("connection"),

        supernaturalMarks:
            collectCategory("mark"),

        relationships: [],

        memories: [],

        notes:
            document.getElementById(
                "notes"
            ).value.trim()

    };

    for (let i = 1; i <= 6; i++) {

        const relationship =
            document.getElementById(
                `relationship-${i}`
            ).value.trim();

        character.relationships.push(
            relationship || null
        );

        const memory =
            document.getElementById(
                `memory-${i}`
            ).value.trim();

        character.memories.push(
            memory || null
        );

    }

    character =
        normalizeCharacter(
            character
        );

    const blob =
        new Blob(
            [
                JSON.stringify(
                    character,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        `${character.firstName}-${character.surname}`
            .replace(/\s+/g, "-") +
        ".json";

    a.click();

    URL.revokeObjectURL(url);

}