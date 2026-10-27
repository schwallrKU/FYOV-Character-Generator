# Data Model

## Scenario

Each scenario is stored as a JSON file in `/scenarios`.

Required fields:

```json
{
  "slug": "seville-1510",
  "title": "FYOV Seville 1510"
}
```

### Setting

```json
"setting": {
  "continent": "Europe",
  "location": "Seville, Castilla",
  "date": "1510"
}
```

### Narrative Content

- scenario-notes
- character-creation-notes

### Character Generation Lists

Examples include:

- men-names
- women-names
- surnames
- genders
- men-professions
- women-professions
- looks
- skills
- resources
- supernatural_marks

These arrays provide selectable or randomizable options during character creation.

### Relationship Data

Connections are stored as arrays:

```json
["Your mother", "f"]
```

The first value is the relationship description.

The second value is a gender marker.

## Character

A generated character should contain:

```json
{
  "character_code": "",
  "scenario_slug": "",
  "name": "",
  "surname": "",
  "gender": "",
  "profession": "",
  "look": "",
  "skills": [],
  "resources": [],
  "connections": [],
  "supernatural_mark": ""
}
```

## Design Principles

- Scenario content lives in JSON files.
- Historical data remains separate from application code.
- HTML provides structure.
- CSS provides presentation.
- JavaScript handles loading, display, randomization, and saving.
- Character records will eventually be stored separately from scenario files.