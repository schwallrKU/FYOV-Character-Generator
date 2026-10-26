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
