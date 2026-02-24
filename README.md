# KodBank Frontend

Frontend project scaffolded with Vite + React.

## Stack

- React
- React Router DOM
- Axios
- Tailwind CSS (via `@tailwindcss/vite`)
- react-confetti

## Project Structure

```text
src/
├── pages/
│   ├── Register.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
├── components/
├── api/
│   └── axios.js
├── App.jsx
└── main.jsx
```

## Setup Status

- [x] Created Vite React project: `kodbank-frontend`
- [x] Installed dependencies: `react-router-dom`, `axios`, `tailwindcss`, `@tailwindcss/vite`
- [x] Configured Tailwind in Vite and imported Tailwind in `src/index.css`
- [x] Added Axios instance with:
  - `baseURL: "http://localhost:5000"`
  - `withCredentials: true`
- [x] Added route skeleton for:
  - `/register`
  - `/login`
  - `/dashboard`
- [x] Created page skeletons: `Register`, `Login`, `Dashboard`
- [x] Implemented Register page UI + required validation + API call + redirect to `/login`
- [x] Improved Register error feedback for backend connectivity/CORS issues
- [x] Implemented Login page UI + POST `/login` + redirect to `/dashboard`
- [x] Implemented Dashboard page with balance check via GET `/check-balance`
- [x] Enhanced Dashboard with confetti celebration + animated gradient background
- [x] Redesigned Dashboard with premium visual theme and polished interaction states
- [x] Refined Dashboard to luxury-style layout with premium typography and card hierarchy
- [x] Verified build with `npm run build`
- [x] Initialized Git repository and linked remote

## Development

```bash
npm install
npm run dev
```

## Progress Log

- 2026-02-24: Initial project scaffold and routing/API/Tailwind setup completed.
- 2026-02-24: README updated with step-by-step completion checklist.
- 2026-02-24: Git initialized on `main` and remote `origin` linked.
- 2026-02-24: Register page implemented with Tailwind form, required field validation, and `POST /register` flow.
- 2026-02-24: Register page now shows explicit backend connectivity/CORS error when API is unreachable.
- 2026-02-24: Login page implemented with Tailwind form, API integration, error handling, and dashboard redirect.
- 2026-02-24: Dashboard page implemented with centered card, check balance action, and session-expired error handling.
- 2026-02-24: Dashboard enhanced with `react-confetti`, success celebration message, and animated gradient background.
- 2026-02-24: Dashboard redesigned with premium layout, dynamic lighting effects, and modern CTA styling.
- 2026-02-24: Dashboard visual quality improved again with high-end banking layout and typography system.

## Rule For Next Steps

For each completed task, add one checklist entry in `Setup Status` and one dated line in `Progress Log`.
