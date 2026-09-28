# Samudra Marketplace v8

Versi ini menerapkan arsitektur **satu akun Customer + Seller**.

## Flow
Marketplace → Masuk/Daftar → satu User Account → Customer.
Jika user membuka toko dan disetujui Admin → menu Seller Center muncul otomatis tanpa login ulang.

Admin memiliki login terpisah melalui footer `Admin`.

## Demo
Customer tanpa toko:
`customer@samudra.local` / `customer123`

User dengan toko aktif:
`seller@samudra.local` / `seller123`

Admin:
`admin@samudra.local` / `samudra123`

## File penting
- `index.html` — Marketplace
- `auth.html` — Login/Daftar User
- `buka-toko.html` — Pendaftaran toko
- `customer.html` — Area Customer
- `seller.html` — Seller Center
- `admin.html` — Admin Login + Admin Panel
- `ALGORITMA_V8.md` — Algoritma sistem
- `ROLE_ARCHITECTURE.md` — Arsitektur role

## Catatan
Ini masih prototype frontend. Data memakai localStorage. Untuk dijual sebagai aplikasi production, pindahkan autentikasi, password hashing, authorization, upload dokumen, database, dan API ke backend.
