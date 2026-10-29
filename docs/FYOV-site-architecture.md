# Five Hundred Year Old Vampire Character Generator Site Architecture

## Goal

Build a GitHub Pages-hosted character generator for Five Hundred Year Old Vampire classroom simulations.

---

## Requirements

- Fixed scenario-specific character options curated by instructor
- Manual selection of options
- Random generation from option lists
- Custom write-in fields
- Character sheet export to PDF
- Persistent character storage
- Support for multiple scenarios

---

## Architecture

### Frontend

Hosted on GitHub Pages.

Technologies:

- HTML
- CSS
- JavaScript

### Scenario Data

Stored as static JSON files in the GitHub repository.

Example structure:

```text
/scenarios
    Seville-1510.json
    Mexico-1620.json

### Current Pages

index.html
Character creation and generation

manager.html
Character editing and status management

sheet.html
Printable character sheet rendering

### Current Workflow

index.html
    ↓
Generate Character
    ↓
Export JSON

manager.html
    ↓
Import JSON
    ↓
Edit Character
    ↓
Export Updated JSON

sheet.html
    ↓
Import JSON
    ↓
Render Character Sheet
    ↓
Print / Save PDF

## Current Status

Completed
- Scenario loading
- Character generation
- JSON export
- JSON import
- Character manager
- Character sheet renderer
- PDF printing workflow
- Status visualization on sheet renderer
    - checked → ✓
    - lost → strikethrough
    - forgotten → grey strikethrough


Next

- Manager validation
- Scenario switching
- Character codes
- Supabase persistence

Future
- Shared character storage
- Course integration
- Character retrieval by code