# Star Wars Project

A Star Wars API client built with React, MobX, and Material-UI. Fetches and displays data from the SWAPI (Star Wars API), allowing users to interact with entities like characters, planets, and starships.

## Features

- Display Star Wars entities (people, starships, planets, etc.)
- Search entities by name or title
- Create, remove & edit entities
- Detailed entity modal view
- Dynamic form rendering for new entities

## Tech Stack

- **Frontend**: React, MobX, Material-UI
- **API**: SWAPI
- **Styling**: Material-UI `sx` prop , CSS, StyledComponent

## Installation

1. Clone the repo:
    ```bash
    git clone https://github.com/galbenshushan/starwars.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the app:
    ```bash
    npm start
    ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Entities

Entities are categorized into:
- **People**: Star Wars characters
- **Planets**: Star Wars planets
- **Films**: Star Wars movies
- **Species**: Star Wars species
- **Starships**: Star Wars starships
- **Vehicles**: Star Wars vehicles

### Viewing and Searching
Entities are listed by category, with search functionality to filter by name or title.

### Adding and Removing Entities
- **Add**: Use the form to create new entities.
- **Remove**: Click the delete button to remove an entity.
- **Update**: Click the Edit button to open an entity edit modal.


## Code Structure

- **components/**: React components 
- **stores/**: MobX store 
- **services/**: API interaction 
- **types/**: TypeScript types
- **enums/**: Enum definitions

