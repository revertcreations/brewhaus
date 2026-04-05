# Brewhaus

A brewery discovery app built with Vue 3, Node.js, GraphQL, and Tailwind CSS. Powered by the [Open Brewery DB](https://www.openbrewerydb.org/) API.

**Live demo:** https://brewhaus.revertcreations.com

## Tech Stack

- **Frontend:** Vue 3 (Composition API), Vue Router, Apollo Client, Tailwind CSS 4
- **Backend:** Node.js, Apollo Server 5 (GraphQL)
- **Tooling:** TypeScript, Vite, Docker

## Features

- Browse breweries with infinite scroll
- Fuzzy search with debounced input
- Brewery detail pages with location and contact info
- Responsive grid layout

## Local Development

Requires Docker and Docker Compose.

```bash
git clone <repo-url>
cd brewhaus
docker compose -f docker-compose.dev.yml up --build
```

- Frontend: http://localhost:5173
- GraphQL API: http://localhost:4000

Source files are volume-mounted — edits to `client/src/` and `server/src/` hot-reload automatically.

## Production Build

```bash
GRAPHQL_URL=https://your-api-url docker compose up --build
```

Serves the client on port 80 via nginx and the GraphQL API on port 4000.

## Project Structure

```
brewhaus/
├── client/          # Vue 3 frontend
│   └── src/
│       ├── components/    # SearchBar, BreweryCard
│       ├── views/         # HomeView, DetailView
│       ├── graphql/       # Query definitions
│       └── router/        # Vue Router config
├── server/          # Node.js GraphQL backend
│   └── src/
│       ├── schema.ts      # GraphQL type definitions
│       ├── resolvers.ts   # Query resolvers
│       └── datasources/   # REST API wrapper
└── docker-compose.yml
```
