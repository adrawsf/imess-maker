# iMessage AU Maker

Tool buat bikin konten **sosmed AU** (cerita fiksi di Twitter/X) dalam bentuk fake chat iMessage bergaya **iOS 26 Liquid Glass**.
Prinsip utamanya: user harus ngerasa kayak lagi chat beneran di aplikasi Messages, bukan ngisi form editor. Hasil akhirnya di-export jadi PNG (393×852 @3x = 1179×2556).

## Stack
- HTML + CSS + JavaScript biasa, **tanpa build step**. Buka `index.html` langsung, atau jalankan server statis (lihat README).
- Library: `html-to-image` 1.11.11 dari cdnjs (dipakai buat export PNG), dan `telegram-web-app.js` dari telegram.org (buat Mini App, aman dimuat di luar Telegram).
- Bisa jalan sebagai Telegram Mini App. Di app.js, `TG` berisi `Telegram.WebApp` kalau dibuka di Telegram, atau `null` kalau nggak. Semua kode khusus Telegram dicek pakai `if(TG)`, dan `<html>` dapat class `tg`.
- Satu-satunya kode server: `api/send.js` (Vercel Function, butuh env `BOT_TOKEN`). Isinya ngecek `initData`, terus `sendDocument` hasil export ke user.
- Font UI di luar HP: Plus Jakarta Sans (Google Fonts). Di dalam layar HP pakai font sistem (SF Pro di Apple).
- Data disimpan di `localStorage` dengan key `imsg-au-v4` (masih bisa baca data lama dari `imsg-au-v3`).

## Struktur
- `index.html`: markup layar HP (`#screen`), dengan view daftar chat (`#vList`), view chat (`#vChat`), keyboard (`#kb`), dan layer popup (`#layer`). Kontrol di luar HP ada di bawahnya.
- `src/style.css`: token warna halaman di `:root` (terang dan gelap). Token warna HP ada di `.ph-light` dan `.ph-dark` (prefix `--p-*`, `--g-*`, `--kb-*`).
- `src/app.js`: semua logika dalam satu IIFE.

## Konsep penting di app.js
- **State `S`**: `{time, batt, mode, kbOn, open, chats:[...]}`.
  - Tiap chat punya: `id, name, avatar, group, members[], pinned, unread, wall, wallImg, status, statusText, typing, silenced, sms, at, msgs[]`.
  - Tiap pesan punya: `id, from ('me'|'them'|'time'), text, t, who (id anggota grup), imgs[], voice{dur}, react, replyTo, edited, unsent`.
- **Render**:
  - `renderList()`: daftar chat.
  - `renderChatChrome()`: header, latar, dan tombol back.
  - `renderThread(scroll)`: isi chat. Argumen `scroll` bisa `'bottom'`, `'keep'`, atau kosong.
  - `renderFocus()`: mode Balas.
  - `renderKb()`: keyboard.
  - `syncInput()`: kolom ketik, tray foto, dan bar edit.
- **Pengelompokan bubble**: pesan berurutan dari pengirim yang sama dihitung satu kelompok. Ekor bubble (`I.tail`) cuma muncul di pesan terakhir tiap kelompok.
- **Pengirim aktif `as`**: bisa `'me'`, `'them'`, atau id anggota grup. Diganti lewat Tab atau tombol di bawah HP.
- **Layer di dalam HP** (`sheet()`, `openCtx()`, menu plus) dirender ke `#layer`, jadi ikut ke-export. Popup halaman (`openPop()`) ada di luar HP dan nggak ikut ke-export.
- **Skala layar**: `#screen` selalu 393×852 lalu di-`scale` pakai variabel `K`. Kalau menghitung posisi, pakai `rel(el)`, yang udah mengoreksi skala.
- **Export**: posisi scroll diganti sementara jadi `translateY`, karena `html-to-image` nggak ikut posisi scroll.

## Konvensi
- Semua teks UI pakai Bahasa Indonesia santai, dengan istilah yang sama kayak iOS versi Indonesia (Balas, Salin, Batalkan Kirim, Dibaca, Terkirim).
- Kalau nambah warna, tambahin ke token di kedua tema. Jangan tulis warna langsung di komponen.
- Konfirmasi hapus pakai pola "ketuk lagi", karena `confirm()` sengaja nggak dipakai.
- `backdrop-filter` nggak ikut ke hasil export. Itu batasan `html-to-image`.

## Ide fitur berikutnya
- Polling di chat dan Apple Cash di grup (fitur iOS 26).
- Stiker, Memoji, dan efek pesan (slam, invisible ink).
- Export beberapa layar sekaligus buat satu thread.
- Pilih latar chat dari foto, dengan efek blur yang ikut ke-export (dengan membuat versi blur gambarnya sendiri lewat canvas).
