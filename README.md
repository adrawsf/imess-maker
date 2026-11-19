# iMessage AU Maker

Bikin fake chat iMessage gaya iOS 26 (Liquid Glass) buat thread sosmed AU, terus export jadi PNG.

## Menjalankan
Cara paling gampang: klik dua kali `index.html`.

Kalau mau pakai server lokal (disarankan, biar penyimpanan dan clipboard jalan normal):

```bash
npx serve .
# atau
python -m http.server 5173
```

Lalu buka `http://localhost:5173` (atau alamat yang muncul di terminal).

## Jalan di Telegram (Mini App)
App ini bisa dibuka sebagai Mini App dari bot Telegram. Di dalam Telegram, temanya ngikutin Telegram, tombol Back di header bisa dipakai, dan hasil export dikirim bot ke chat kamu sebagai file PNG. Ini perlu karena simpan gambar langsung dari dalam Telegram sering nggak bisa.

1. **Bikin bot.** Chat [@BotFather](https://t.me/BotFather), kirim `/newbot`, lalu simpan token yang dikasih.
2. **Deploy ke Vercel.** Upload folder ini ke GitHub, terus import repo-nya di [vercel.com](https://vercel.com/new) (nggak perlu build command). Di *Settings → Environment Variables*, tambahin `BOT_TOKEN` berisi token tadi, lalu deploy ulang. Hasilnya alamat HTTPS, misalnya `https://imessage-au-maker.vercel.app`.
3. **Sambungin ke bot.** Di @BotFather, kirim `/mybots`, pilih bot kamu, lalu *Bot Settings → Configure Mini App → Enable Mini App* dan masukin alamat Vercel tadi. Kalau mau ada tombol di chat bot, atur juga *Menu Button* ke alamat yang sama.
4. **Buka bot-nya di Telegram**, ketuk *Start*, lalu ketuk tombol menu atau *Open*.

Catatan:
- Server cuma ada di `api/send.js`. Isinya ngecek bahwa permintaan beneran datang dari Telegram (lewat `initData`), terus bot ngirim gambarnya ke kamu. Nggak ada yang disimpan di server.
- Kalau gambarnya lebih dari 4,3 MB (biasanya karena banyak foto), gambarnya dikirim sebagai JPEG kualitas tinggi, soalnya Vercel membatasi ukuran upload 4,5 MB.
- Data chat tetap disimpan di `localStorage` HP masing-masing. Di Telegram, data ini bisa hilang kalau cache Telegram dibersihin.
- Kalau dibuka di browser biasa, semuanya tetap jalan kayak sebelumnya. Server lokal nggak punya `api/send`, jadi tombol "Kirim ke chat" cuma muncul dan berfungsi di dalam Telegram.

## Fitur
- iMessage tampil layar penuh. Pengaturan ada di tombol kecil di pinggir kanan.
- Mode Edit: ada tombol buat ganti pengirim, dan status bar palsu tetap tampil biar export sama persis. Mode Pakai: bersih kayak iMessage beneran, cocok buat direkam.
- Daftar chat: chat yang disematkan, tanda belum dibaca, pencarian, chat baru, dan group chat.
- Keyboard iOS di dalam layar, lengkap dengan saran kata.
- Highlight bubble (tahan atau klik kanan) buat tapback, Balas, Edit, Batalkan Kirim, dan Hapus.
- Mode Balas: chat lain nge-blur, cuma bubble yang dibales yang tampil.
- Kirim foto dengan preview dulu di kolom ketik. Kalau lebih dari 1 foto, tampilannya jadi tumpukan kartu dan bisa dibuka sebagai galeri.
- Pesan suara, indikator "sedang mengetik", status Dibaca/Terkirim, info "menyenyapkan notifikasi", dan mode SMS hijau.
- Latar chat, mode terang/gelap, serta jam dan baterai di status bar yang bisa diatur.
- Export PNG di resolusi 1179×2556.

## Shortcut
- `Enter`: kirim
- `Shift`+`Enter`: baris baru
- `Tab`: ganti pengirim
- `Esc`: batal balas atau edit, dan tutup keyboard
