# Support CRM — Customer Support Ticketing System

A full-stack MERN application for managing customer support tickets: create, list, search, filter, view, and update tickets with status tracking and notes.

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas) with Mongoose

## Features

1. **Create Tickets** — customer name, email, issue title, description, auto-generated ticket ID (e.g. `TKT-1001`) and timestamp.
2. **List All Tickets** — clean table view showing ID, Name, Title, Status, Date.
3. **Search** — real-time search across customer name, email, ticket ID, title, and description.
4. **Filter by Status** — Open / In Progress / Closed.
5. **View & Update** — detailed ticket view, update status, add notes/comments.

## Project Structure

```
support-crm/
├── backend/     # Express API + MongoDB
└── frontend/    # React (Vite) client
```

## Local Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your MongoDB Atlas connection string in .env
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL should point to your backend (local or deployed)
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| POST   | `/api/tickets`       | Create a new ticket                   |
| GET    | `/api/tickets`       | Get all tickets (`?search=&status=`)  |
| GET    | `/api/tickets/:id`   | Get a single ticket                   |
| PUT    | `/api/tickets/:id`   | Update status / add note              |

## Deployment

- **Backend:** Deploy to Railway or Render. Set `MONGO_URI` and `PORT` as environment variables. **Important:** In MongoDB Atlas → Network Access, whitelist `0.0.0.0/0` so the host's dynamic IPs aren't blocked.
- **Frontend:** Deploy to Vercel. Set `VITE_API_URL` to your deployed backend URL (e.g. `https://your-backend.onrender.com/api`).

## Approach

Built as a MERN full-stack ticketing system with a clean separation between API (Express + Mongoose) and client (React + Vite). Focused on shipping all 5 core features reliably — auto-generated ticket IDs, debounced search, live status filtering, and a notes/comments trail — over adding polish that wasn't required.
