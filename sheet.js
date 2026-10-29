let character = null;

const storedCharacter =
    localStorage.getItem(
        "character"
    );

if (storedCharacter) {

    character =
        JSON.parse(
            storedCharacter
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
                JSON.parse(
                    e.target.result
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