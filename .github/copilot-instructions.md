<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Repo Overview & Agent Guidance

This mono-repo collects Full Stack Open exercise projects (multiple independent "parts"). Each part is mostly self-contained and follows one of two common patterns:

- Frontend (Vite + React): `part_*` folders such as `part_6_voting`, `part_5_frontend`, `part_2`.
- Backend (Express + Mongoose/Jest): `part_3`, `part_4`, `part_5_backend`.

Key entry files and examples to inspect when reasoning about behavior:

- Backend server: `part_5_backend/index.js` (starts server) and `part_5_backend/app.js` (Express app, routes mounted at `/api/*`).
- Backend config: `part_5_backend/utils/config.js` (reads `MONGODB_URI`, `TEST_MONGODB_URI`, `PORT`).
- Frontend entry: `part_6_voting/src/App.jsx` and package manifests like `part_6_voting/package.json` (scripts: `dev`, `build`, `preview`).

Developer workflows and exact commands

- Install and run a frontend part (Vite):

  cd into the part folder, then:

  ```powershell
  cd part_6_voting
  npm install
  npm run dev
  ```

- Install and run a backend part (Express/Mongoose):

  ```powershell
  cd part_5_backend
  npm install
  npm run dev    # uses nodemon or similar (development)
  npm start      # production (NODE_ENV=prod)
  ```

- Tests: many backend parts use Node's test runner via `node --test` (see `package.json` scripts). Run `npm test` inside the part directory.

Important project-specific details and patterns

- Parts are independent: treat each `part_*` folder as a separate project. Do not assume a single top-level build or script.

- Node engine constraint: some server parts declare `engines.node` (e.g. `>=24 <25`) in their `package.json`. Avoid suggesting older Node runtimes when proposing fixes.

- Environment variables: backends use `dotenv` and `utils/config.js`. Typical env vars: `PORT`, `MONGODB_URI`, `TEST_MONGODB_URI`. Use `process.env.NODE_ENV === 'test'` to detect test mode.

- Database: backends use Mongoose. When proposing integration changes, reference `app.js` (connection logic) and ensure migrations/connection options match `clientOptions` usage.

- Testing & test-only routes: during tests, a `/api/testing` router is mounted (see `app.js` guarded by `NODE_ENV === 'test'`). Use this for test isolation when adding or modifying tests.

Conventions and code patterns to follow

- Routing: controllers live in `controllers/` (e.g., `controllers/blogs.js`, `controllers/users.js`). Use `app.use('/api/<resource>', router)` patterns.
- Static build: backends often serve a `dist` folder using `express.static('dist')`.
- Middleware: logging and error handlers live in `utils/middleware.js`. Prefer using the same middleware style when adding new endpoints.

When editing code, prefer minimal, targeted changes

- Keep changes isolated to the relevant `part_*` folder unless the user asks to refactor across parts.
- Preserve existing project scripts and config unless there is a concrete reason to change them (e.g., fix wrong env var name or Node engine). When suggesting new scripts, show exact `package.json` diff.

Examples (how to reference code in PRs or suggestions)

- To add a new API route to the backend: modify `part_5_backend/controllers/<new>.js`, then mount it in `part_5_backend/app.js` with `app.use('/api/<new>', newRouter)`.
- To debug failing frontend UI: run `npm run dev` in the relevant `part_*`, open `src/App.jsx` (or `main.jsx`) and reproduce with the browser tooling.

What not to assume

- Do not assume centralized CI or uniform package versions across parts — each part has its own `package.json` and dependencies.
- Do not assume a database is available — tests use `TEST_MONGODB_URI` and some parts include a testing-only router.

If anything is unclear or you want deeper guidance (e.g. recommended test fixtures, environment sample `.env`), tell me which part to expand and I'll add examples or merge with an existing `.github` policy.

-- End of file
