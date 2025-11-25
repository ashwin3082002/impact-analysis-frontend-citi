# Impact Analysis Frontend Citi

### Demo Video : [Click Me](https://drive.google.com/file/d/1WRqV0LVgbGJZOpASpK9KudCNrzZFyqlb/view?usp=drive_link)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🧩 High-Level Architecture
```pgsql
           +--------------------------------------+
           |  (REACT UI)   Functional Requirement |
           +-------------+------------------------+
                         |
                         v
              +----------+----------+
              |     AI Reasoning    |
              |   (GLM-4.6 + Ollama)|
              +----------+----------+
                         |
                         v
              +----------+----------+
              |   PyCodeCompass     |
              |   Microservice      |
              +----------+----------+
                         |
       +-----------------+----------------+
       |                 |                |
       v                 v                v
+------+-----+   +-------+------+  +------+-------+
| CodeQL DB  |   |  DTO Scanner |  | Impact Graph |
| Generation |   | (Java Source)|  |  (NetworkX)  |
+------+-----+   +-------+------+  +------+-------+
       |                 |                |
       +-----------------+----------------+
                         |
                         v
               +---------+---------+
               |   Neo4j Storage   |
               |  Versioned Graphs |
               +-------------------+
```
