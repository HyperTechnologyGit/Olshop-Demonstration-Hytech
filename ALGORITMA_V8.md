# Algoritma Samudra v8 — Satu Akun Customer + Seller

## 1. Autentikasi
1. User membuka `auth.html`.
2. User memasukkan email dan password.
3. Sistem mencari akun.
4. Jika gagal, tampilkan `Email atau password salah`.
5. Jika berhasil, buat `samudra_session`.
6. User selalu kembali ke `index.html` sebagai Customer.
7. Jika user memiliki toko aktif, menu `Seller Center` otomatis tersedia.
8. Admin tidak memakai login ini; Admin memiliki `admin.html` sendiri.

## 2. Buka Toko / Upgrade Seller
1. User login.
2. User klik `Buka Toko Gratis`.
3. Sistem mengecek session.
4. Jika belum login, arahkan ke login.
5. Jika toko sudah aktif, arahkan ke Seller Center.
6. Jika belum punya toko, buka `buka-toko.html`.
7. User mengisi nama toko, domain, alamat, WhatsApp, dan dokumen identitas.
8. Sistem mengecek domain.
9. Sistem menyimpan toko dengan status `pending`.
10. Admin meninjau pengajuan.
11. Jika disetujui: status menjadi `active`.
12. Jika ditolak: status menjadi `rejected`.
13. Jika toko disuspend: status menjadi `suspended`.
14. Saat `active`, menu Seller Center muncul tanpa login ulang.

## 3. Routing Seller Center
1. `seller.html` membaca session.
2. Jika tidak ada session → `index.html`.
3. Jika toko `pending` → `buka-toko.html`.
4. Jika toko bukan `active` → Marketplace.
5. Jika toko `active` → Seller Center.
6. Produk Seller difilter menggunakan `sellerId/shopId` milik toko yang sedang login.
7. Edit/hapus produk memeriksa kembali pemilik produk.

## 4. Admin
1. Admin membuka link `Admin` di footer Marketplace.
2. Admin Login melalui `admin.html`.
3. Session Admin disimpan terpisah sebagai `samudra_admin_session`.
4. Admin dapat melihat pengajuan toko.
5. Admin dapat Approve, Reject, atau Suspend toko.
6. Admin dapat melihat dan mengelola seluruh produk, user, order, kategori, dan laporan.

> Prototype v8 masih menggunakan localStorage. Untuk production, authentication, password hashing, session/token, upload KTP, approval, dan authorization wajib dipindahkan ke backend/database.
