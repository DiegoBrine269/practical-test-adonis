# PracticalTestAngular

This project was generated using AdonisJS 7 https://adonisjs.com/

## Prerequisites

- Node.js ≥ 24.x
- npm ≥ 11.x

## Development server

To start a local development server, run:

```bash
npm run dev
```

Once the server is running, open your browser and navigate to `http://localhost:3333/`. The application will automatically reload whenever you modify any of the source files.


## Routes

| Path | Controller | Description |
|---|---|---|
| `/` | Video | Search and list videos |
| `/comments` | Video | Video comments |
| `/channel` | Video | Channel info |

## Analysis, design and architecture decisions

The /app folder contains the main code of this application divided into the following folders:
1. services
>Here you can find the video_service.ts, a file that contains function used to connect with the ytdl API. 

2. controllers
>This folder includes MVC controllers, the most relevant is videos_controller, which contains the methods that call the service.


### Key decisions

- **Axios** was installed to simplify HTTP requests to the external YouTube Data API
  (consumed via RapidAPI), instead of using Node's native `fetch` directly.

- **`video_service.ts`** was created to separate responsibilities: controllers only
  handle HTTP request/response concerns, while `VideoService` encapsulates all
  communication with the external API (search, comments, channel info).

- A shared **Axios instance** (`axios.create()`) with a preconfigured `baseURL` and
  headers (API key, host) is used across the service, avoiding repetition of
  authentication headers on every request.

- A private **`request()`** helper centralizes error handling (logging status and
  response body) for all outgoing calls, so each public method (`search`,
  `comments`, `channel`) stays a one-liner.

- **CORS** is explicitly configured (`config/cors.ts`) to only allow the deployed
  frontend origin in production, rather than allowing all origins.

  ## Deployment

Containerized with Docker and deployed via [Dokploy](https://dokploy.com) as a
Docker Compose service (environment variables are injected via Compose's
`environment:` block referencing Dokploy's generated `.env` file).