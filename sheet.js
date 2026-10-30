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

const storedCharacter =
    localStorage.getItem(
        "character"
    );

if (storedCharacter) {

    character =
        normalizeCharacter(
            JSON.parse(
                storedCharacter
            )
        );

    renderCharacter(
        character
    );
}

document
    .getElementById("import-json")
    .addEventListener(
        "change",
        loadCharacter
    );

function loadCharacter(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

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

function renderList(
    prefix,
    items
) {

    for (let i = 0; i < 6; i++) {

        const element =
            document.getElementById(
                `${prefix}-${i + 1}`
            );

        if (!element) continue;

        const item =
            items?.[i];

        if (!item) {

            element.textContent = "";

            continue;

        }

        let text =
            item.text;

        if (
            item.status ===
            "checked"
        ) {

            text =
                `✓ ${text}`;

        }

        element.textContent =
            text;

        element.classList.remove(
            "lost",
            "forgotten",
            "checked"
        );

        if (
            item.status ===
            "lost"
        ) {

            element.classList.add(
                "lost"
            );

        }

        if (
            item.status ===
            "forgotten"
        ) {

            element.classList.add(
                "forgotten"
            );

        }

        if (
            item.status ===
            "checked"
        ) {

            element.classList.add(
                "checked"
            );

        }

    }

}

function renderSimpleList(
    prefix,
    items
) {

    for (let i = 0; i < 6; i++) {

        const element =
            document.getElementById(
                `${prefix}-${i + 1}`
            );

        if (!element) continue;

        element.textContent =
            items?.[i] || "";

    }

}

function renderCharacter(
    character
) {

    document.getElementById(
        "character-name"
    ).textContent =
        `${character.firstName} ${character.surname}`;

    document.getElementById(
        "gender"
    ).textContent =
        character.gender || "";

    document.getElementById(
        "profession"
    ).textContent =
        character.profession || "";

    renderList(
        "look",
        character.looks
    );

    renderList(
        "skill",
        character.skills
    );

    renderList(
        "resource",
        character.resources
    );

    renderList(
        "connection",
        character.connections
    );

    renderList(
        "mark",
        character.supernaturalMarks
    );

    renderSimpleList(
        "relationship",
        character.relationships
    );

    renderSimpleList(
        "memory",
        character.memories
    );

    document.getElementById(
        "notes"
    ).textContent =
    character.notes || "";

}