# Samudra v11 — Admin Login Isolation

Perbaikan utama:
- Admin login dan Admin Console dipisahkan secara eksplisit dengan inline display state.
- Sebelum autentikasi, sidebar Admin Console dipaksa `display:none`.
- Setelah login Admin valid, login screen dipaksa tersembunyi dan console ditampilkan.
- Logout mengembalikan login screen dan menyembunyikan console.
- CSS juga melindungi state `hidden` untuk mencegah aturan layout `display:flex` menimpanya.

Demo: admin@samudra.local / samudra123
