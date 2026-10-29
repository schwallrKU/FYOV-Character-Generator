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
  "firstName": "",
  "surname": "",
  "gender": "",
  "profession": "",

  "looks": [
    {
      "text": "",
      "status": "active"
    }
  ],

  "skills": [
    {
      "text": "",
      "status": "active"
    }
  ],

  "resources": [
    {
      "text": "",
      "status": "active"
    }
  ],

  "connections": [
    {
      "text": "",
      "status": "active"
    }
  ],

  "supernaturalMarks": [
    {
      "text": "",
      "status": "active"
    }
  ],

  "relationships": [
    null, null, null, null, null, null
  ],

  "memories": [
    null, null, null, null, null, null
  ],

  "notes": ""
}
```

### Status Values

Character traits may contain a status value.

Supported statuses:

- active
- checked
- lost
- forgotten

checked is currently used primarily for skills.

lost indicates the item has been lost.

forgotten indicates the item has been forgotten.


## Design Principles

- Scenario content lives in JSON files.
- Historical data remains separate from application code.
- HTML provides structure.
- CSS provides presentation.
- JavaScript handles loading, display, randomization, and saving.
- Character records will eventually be stored separately from scenario files.