# ServeLink

Platform Jual Beli & Booking Jasa Online

## Fitur Utama
- Register/Login (JWT, role: buyer/seller/admin)
- CRUD Layanan (seller)
- Booking layanan (buyer)
- Review & Rating
- Admin Panel (opsional)
- UI responsif (Chakra UI)
- API RESTful (Express + Prisma)
- PostgreSQL

## Teknologi
- Backend: Node.js, Express, Prisma, PostgreSQL
- Frontend: React, Vite, Chakra UI, Axios

## Struktur Folder
```
server/   # Backend
client/   # Frontend
```

## Setup Backend
1. `cd server`
2. `cp .env.example .env` dan edit sesuai kebutuhan
3. `npm install`
4. `npx prisma migrate dev --name init`
5. `npm run dev`

## Setup Frontend
1. `cd client`
2. `npm install`
3. `npm run dev`

## Dokumentasi API
Lihat file `swagger.yaml` (opsional) atau dokumentasi di folder server. 