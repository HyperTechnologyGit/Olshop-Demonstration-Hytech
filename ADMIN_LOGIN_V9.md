# Samudra v9 — Admin Login Terpisah

Admin sekarang mempunyai pintu login sendiri di `admin.html`.

## Customer/Seller
Masuk melalui `auth.html` dari tombol Masuk marketplace. Satu akun user dapat menjadi customer dan kemudian memiliki toko aktif untuk mengakses Seller Center.

## Admin
Masuk melalui footer marketplace:
`© 2026 Samudra. Semua hak dilindungi. | Admin`

Link Admin langsung menuju `admin.html`, bukan `auth.html`.

Session admin menggunakan key terpisah:
`samudra_admin_session`

Demo:
- Username: `admin`
- Email: `admin@samudra.local`
- Password: `samudra123`

UI Admin dibuat berbeda secara visual dari login Customer/Seller: dark administrator portal, label ADMIN ONLY, warning keamanan, dan dashboard Admin Console.
