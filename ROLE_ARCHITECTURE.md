# Samudra v8 — Role Architecture

## Prinsip utama
Satu akun Samudra dapat menjadi Customer dan Seller sekaligus.

```text
USER ACCOUNT
├── Customer — selalu tersedia setelah registrasi
└── Seller — aktif setelah memiliki toko dengan status ACTIVE

ADMIN ACCOUNT
└── Terpisah dari akun marketplace
```

## Status toko
`none` → belum punya toko
`pending` → menunggu verifikasi Admin
`active` → Seller Center aktif
`rejected` → pengajuan ditolak
`suspended` → toko dinonaktifkan Admin

## Hak akses
- Customer: belanja, cart, checkout, order, profil, alamat, wishlist.
- Seller aktif: semua kemampuan Customer + Seller Center untuk toko miliknya.
- Admin: mengelola marketplace dan seluruh seller/user/order/product.

## Keamanan production
Frontend redirect hanya untuk UX. Semua permission wajib diverifikasi server-side berdasarkan session/token dan ownership `shop_id`.
