 # URL Shortener

A production-ready URL Shortener built with a focus on system design principles — caching, rate limiting, and analytics. Built with Node.js, Upstash Redis, and Neon DB (PostgreSQL), deployed on Render.

---

## Architecture

![System Architecture](./architecture.png)

- Client sends a long URL → API generates a short code → saved to Neon DB
- On redirect, request hits Rate Limiter → checks Upstash Redis first
  - **Cache HIT** → instant redirect
  - **Cache MISS** → queries Neon DB → stores in Redis with TTL → redirects
- Every redirect logs a click event to the Analytics table in Neon DB

---

## Features

- **URL Shortening** — generates a unique short code for any long URL using nanoid
- **Cache-Aside Pattern** — Redis sits in front of the database, a viral link hitting 1M clicks generates exactly one DB read
- **Rate Limiting** — middleware throttles requests per IP before they reach any business logic
- **Click Analytics** — every redirect is logged with a timestamp to track link performance

---

## Tech Stack

| Layer | Tool |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | Neon DB (Serverless PostgreSQL) |
| Cache | Upstash Redis |
| Deployment | Render |
| ID Generation | nanoid |

---

## API Reference

### Shorten a URL
```
POST /api/shorten/url
```
**Request Body**
```json
{
"url":"https://bytebytego.com/guides/what-does-a-typical-microservice-architecture-look-like/"
}
```
**Response**
```json
{
    "success": true,
    "data": {
        "id": 9,
        "original_url": "https://bytebytego.com/guides/what-does-a-typical-microservice-architecture-look-like/",
        "short_code": "-7IS1P",
        "created_at": "2026-06-07T10:44:18.061Z"
    }
}
```

---

### Redirect to Original URL
```
GET /api/:shortcode
```
Redirects the client to the original long URL. Logs a click event to the analytics table.

---

## Database Schema

### urls
| Column | Type | Description |
|---|---|---|
| id | SERIAL PRIMARY KEY | Auto-incremented ID |
| short_code | VARCHAR | Unique short code |
| long_url | TEXT | Original long URL |
| created_at | TIMESTAMP | Time of creation |

### clicks
| Column | Type | Description |
|---|---|---|
| id | SERIAL PRIMARY KEY | Auto-incremented ID |
| short_code | VARCHAR | Reference to short code |
| clicked_at | TIMESTAMP | Time of redirect |

---

## Getting Started

### Prerequisites
- Node.js v18+
- Neon DB account — [neon.tech](https://neon.tech)
- Upstash Redis account — [upstash.com](https://upstash.com)

### Installation

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_neon_db_connection_string
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token
PORT=3000
```

### Run Locally

```bash
npm start
```

Server runs at `http://localhost:3000`

## Folder Structure

```
url-shortener/
├── src/
│   ├── index.js          # Express server entry point
│   ├── db.js             # Neon DB connection
│   ├── cache.js          # Upstash Redis connection
│   └── routes/
│       └── url.js        # POST /shorten, GET /:shortcode
├── .env
├── .gitignore
└── package.json
```

---

## What I'd Improve at Scale

- Async analytics writes via a message queue to avoid synchronous DB inserts on every redirect
- Postgres read replica to separate redirect reads from write traffic
- Consistent hashing across multiple Redis nodes for distributed caching

---

## Live Demo

Base URL: `https://url-shortener-5kco.onrender.com`

---

## License

MIT
