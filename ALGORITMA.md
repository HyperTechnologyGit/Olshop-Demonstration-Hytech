# Runtutan Algoritma Sistem Marketplace Samudra

## 1. Struktur file

- `index.html` — struktur halaman dan komponen UI.
- `style.css` — tampilan, layout, responsif, modal, kartu produk.
- `app.js` — logika marketplace demo: katalog, pencarian, kategori, keranjang, checkout, login/daftar, seller, tracking.
- `index-original.html` — salinan desain HTML awal yang dikirim.

## 2. Algoritma umum sistem

1. Sistem membuka `index.html`.
2. `app.js` memuat daftar kategori dan data produk.
3. Sistem membaca isi keranjang dari `localStorage`.
4. Sistem menampilkan kategori, Flash Sale, dan rekomendasi produk.
5. Pengguna dapat memilih kategori atau memasukkan kata kunci pencarian.
6. Sistem melakukan filter berdasarkan kategori dan/atau kata kunci.
7. Pengguna memilih `+ Keranjang` pada produk.
8. Sistem mencari produk berdasarkan ID.
9. Jika produk sudah ada di keranjang, jumlah (`qty`) ditambah 1; jika belum, produk dimasukkan sebagai item baru.
10. Keranjang disimpan kembali ke `localStorage`.
11. Pengguna membuka keranjang dan mengubah jumlah atau menghapus item.
12. Sistem menghitung total = Σ(harga produk × qty).
13. Pengguna memilih Checkout.
14. Sistem menampilkan form nama penerima, alamat, pengiriman, dan pembayaran.
15. Setelah form valid, sistem membuat nomor pesanan `SAM-XXXXXXXX`.
16. Sistem menyimpan data pesanan terakhir di `localStorage`.
17. Keranjang dikosongkan.
18. Sistem menampilkan status awal `Menunggu pembayaran`.
19. Pengguna dapat menggunakan fitur Lacak Pesanan untuk membaca pesanan terakhir.

## 3. Algoritma pencarian produk

**Input:** kata kunci.

1. Ambil nilai dari `searchInput`.
2. Ubah kata kunci menjadi huruf kecil.
3. Bandingkan kata kunci dengan nama produk, kategori, dan lokasi.
4. Produk yang cocok dimasukkan ke hasil pencarian.
5. Jika tidak ada hasil, tampilkan pesan produk tidak ditemukan.

## 4. Algoritma kategori

**Input:** nama kategori.

1. Pengguna memilih kategori.
2. Simpan kategori ke `activeCategory`.
3. Filter seluruh produk dengan kondisi `product.category === activeCategory`.
4. Render hasil ke `productGrid`.
5. Jika memilih `Semua`, seluruh produk ditampilkan.

## 5. Algoritma keranjang

**Tambah:**
- Cari item berdasarkan ID.
- Jika ditemukan → `qty = qty + 1`.
- Jika tidak ditemukan → buat `{id, qty: 1}`.
- Simpan ke localStorage.

**Kurangi:**
- Cari item berdasarkan ID.
- Kurangi `qty` satu.
- Jika `qty <= 0`, hapus item.
- Simpan kembali.

**Total:**
`total = Σ(price × qty)`

## 6. Algoritma checkout

1. Pastikan keranjang tidak kosong.
2. Hitung total belanja.
3. Tampilkan form checkout.
4. Validasi field wajib.
5. Buat ID pesanan.
6. Simpan data order.
7. Kosongkan keranjang.
8. Tampilkan konfirmasi order.

## 7. Algoritma status pesanan untuk pengembangan backend

Urutan status yang disarankan:

`Menunggu Pembayaran → Dibayar → Diproses Seller → Dikemas → Dikirim → Dalam Perjalanan → Diterima → Selesai`

Jika pembayaran gagal:

`Menunggu Pembayaran → Pembayaran Gagal → Bayar Ulang / Batalkan`

## 8. Algoritma Seller

1. Seller login.
2. Sistem memverifikasi akun seller.
3. Seller dapat menambah, mengedit, atau menghapus produk.
4. Seller mengatur stok dan harga.
5. Saat order masuk, sistem membuat notifikasi seller.
6. Seller menerima order.
7. Seller menyiapkan dan mengemas barang.
8. Seller memasukkan nomor resi.
9. Sistem mengubah status menjadi `Dikirim`.
10. Setelah pembeli menerima barang, order dapat ditandai `Selesai`.

## 9. Algoritma Admin

1. Admin login.
2. Sistem memverifikasi hak akses admin.
3. Admin dapat mengelola user.
4. Admin dapat memverifikasi atau menonaktifkan seller.
5. Admin mengelola kategori dan moderasi produk.
6. Admin memonitor transaksi dan pembayaran.
7. Admin memonitor status pesanan.
8. Admin membuat laporan penjualan, pengguna, dan produk.

## 10. Catatan implementasi

Versi yang diberikan adalah **frontend prototype yang sudah interaktif**. Login, pembayaran, stok, seller, dan admin masih bersifat simulasi browser. Untuk menjadi marketplace produksi, modul tersebut perlu dihubungkan ke backend, database, autentikasi, payment gateway, dan API pengiriman.

## 10. ADMIN PANEL

### 10.1 File
- `admin.html` — struktur dashboard admin
- `admin.css` — tampilan admin
- `admin.js` — logika CRUD dan laporan demo

### 10.2 Modul
1. Dashboard
2. User
3. Seller
4. Produk
5. Kategori
6. Pesanan
7. Laporan
8. Pengaturan

### 10.3 Alur Admin
1. Admin membuka `admin.html`.
2. Sistem membuat session demo `samudra_admin_session`.
3. Data demo dibaca dari `localStorage`.
4. Dashboard menghitung user, seller aktif, produk aktif, dan nilai order.
5. Admin dapat CRUD produk/kategori/user.
6. Admin dapat approve/reject seller.
7. Admin dapat mengubah status order.
8. Perubahan disimpan kembali ke localStorage.

> Catatan: session ini hanya simulasi frontend. Untuk production, admin wajib memakai authentication dan authorization di backend.
