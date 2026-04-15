# RentBBSR — Room Rent Posting App

Production-ready full-stack app where house owners post rooms and tenants find rooms near them.

**Stack:** React + TypeScript (Vite) · Redux Toolkit · Tailwind CSS · Spring Boot 3 · PostgreSQL · Docker.

---

## 🚀 Quick Start (Docker — recommended)

```bash
docker compose up --build
```

- Frontend → http://localhost:3000
- Backend API → http://localhost:8080/api
- Postgres → localhost:5432 (user/pass `postgres`)

## 🛠 Local Dev

### Backend
```bash
cd backend
cp .env.example .env           # edit if needed
./mvnw spring-boot:run         # or: mvn spring-boot:run
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev                    # http://localhost:5173
```

The Vite dev server proxies `/api` → `http://localhost:8080`, so no CORS fuss.

---

## 📡 API Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| POST   | `/api/rooms` | Create a room listing (validated) |
| GET    | `/api/rooms` | List rooms — filters: `city`, `minRent`, `maxRent`, `available`, pagination `page`/`size`/`sort` |
| GET    | `/api/rooms/{id}` | Room details |
| GET    | `/api/rooms/nearby?lat=&lng=&radiusKm=&maxRent=&available=` | Find rooms by Haversine distance |
| PATCH  | `/api/rooms/{id}/availability` | Body `{ "isAvailable": true }` |
| GET    | `/api/rooms/stats` | Free-tier usage info |

### Example — create room
```bash
curl -X POST http://localhost:8080/api/rooms \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"Ramesh","phone":"+919876543210","rent":6500,
    "city":"Bhubaneswar","latitude":20.2961,"longitude":85.8245,
    "isAvailable":true,"description":"1BHK near KIIT"
  }'
```

### Example — find nearby
```bash
curl "http://localhost:8080/api/rooms/nearby?lat=20.30&lng=85.82&radiusKm=3"
```

---

## 🧩 Architecture

```
backend/
├── controller/    # REST endpoints
├── service/       # Business logic (free-tier cap, Haversine)
├── repository/    # Spring Data JPA
├── entity/        # Room (with indexes on city, lat/lng, is_available)
├── dto/           # Request / Response / ApiResponse wrapper
├── config/        # CORS + per-IP rate limit filter
├── exception/     # @RestControllerAdvice
└── util/          # DistanceCalculator (Haversine + bounding box)

frontend/
├── components/    # Navbar, RoomCard, Loader
├── pages/         # Home, PostRoom, FindRoom, RoomDetails
├── redux/         # store + roomSlice + uiSlice
└── services/      # axios API client
```

### Design notes
- **Haversine with bounding-box pre-filter:** queries hit the `(lat, lng)` index first, then refine in-memory — avoids full-table scans.
- **Free-tier gate:** `RoomServiceImpl.create` checks `repository.count()` against `app.listing.free-limit` (default 2000). 402 Payment Required when exceeded.
- **Caching:** Spring `@Cacheable` on list queries; invalidated on writes. Swap to Redis via `spring-boot-starter-data-redis`.
- **Rate limiting:** in-memory per-IP token bucket (`RateLimitFilter`). Replace with Bucket4j + Redis for multi-instance.
- **Validation:** Bean Validation annotations in `RoomRequestDTO`; `GlobalExceptionHandler` returns structured errors.

---

## 🔐 Auth (optional)

JWT hook points are wired in the axios interceptor (`frontend/src/services/roomApi.ts` reads `localStorage.jwt`). To enable:
1. Add `spring-boot-starter-security` + `io.jsonwebtoken` to `pom.xml`.
2. Create a `SecurityConfig` with `JwtAuthFilter` — secure `POST /api/rooms` and `PATCH /api/rooms/*/availability`.
3. Add `/api/auth/login` & `/api/auth/register` endpoints.

---

## 🗺️ Google Maps

- Room lat/lng open directly in Google Maps via `https://www.google.com/maps/search/?api=1&query=lat,lng` (no API key required).
- For embedded maps or autocomplete, set `VITE_GOOGLE_MAPS_API_KEY` in `frontend/.env`.

---

## 📦 Deliverables checklist

- [x] Spring Boot backend (controller / service / repository / entity / dto / exception)
- [x] React + TS + Tailwind + Redux Toolkit frontend
- [x] Haversine distance + pagination + filters
- [x] 2000 free-listing cap
- [x] Dockerfiles for FE/BE + docker-compose with Postgres
- [x] .env examples
- [x] API docs (this file)
- [x] Dark mode, WhatsApp button, click-to-call

## Bonus ideas to extend
- Admin panel (`/admin`) to toggle availability & moderate.
- S3/Cloudinary image upload (swap `imageUrl` for multipart upload).
- ElasticSearch for city search / fuzzy match.
- PostGIS for native geo-queries.
