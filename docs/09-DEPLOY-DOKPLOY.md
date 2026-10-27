# Deploy frontend demo ke Dokploy

## Kesimpulan audit

Frontend saat ini tidak membutuhkan backend Django atau database untuk menjalankan demo.
Backend memang sudah memiliki model, migrasi, dan endpoint DRF (`backend/config/urls.py`), tetapi belum dipakai layar frontend. Dokumen fase M0 bukan bukti bahwa folder backend masih kosong.

Bukti jalur aktif:

- `frontend/src/app/(app)/layout.tsx`: seluruh aplikasi dibungkus `DemoProvider`.
- `frontend/src/lib/demo/store.tsx`: data awal dari seed; perubahan disimpan di `sessionStorage` dengan key `pantara-demo-v1`, bukan API/database.
- `frontend/src/app/(auth)/masuk/page.tsx`: masuk hanya tautan peran demo; tidak ada autentikasi nyata.
- `frontend/src/lib/demo/mock-dna.ts`: analisis kebutuhan memakai kata kunci, bukan LLM. Angka confidence dan lima sampel di UI adalah simulasi.
- `frontend/src/lib/engine/score.ts`, `whatif.ts`, `batch.ts`: perhitungan ranking, konflik, dan alokasi benar-benar berjalan di TypeScript; bukan hasil gambar/statis. Batch frontend bukan OR-Tools.
- Klien `frontend/src/lib/api.ts` tidak memiliki pemanggil (dibuktikan Knip), lalu dihapus sebagai dead code. Backend tidak dihapus atau diubah.

Ini prototipe interaktif: logika perhitungan nyata, data contoh dan layanan akun/AI disimulasikan. Bukan aplikasi kolaborasi produksi.

Batas penting:

- Reload tab mempertahankan perubahan. Menutup sesi tab, membersihkan storage, atau reset demo dapat menghapusnya. Tidak ada backup server atau sinkronisasi lintas perangkat/pengguna.
- Peran demo dan halaman 403 bukan kontrol akses server. Siapa pun yang membuka URL dapat mencoba demo. Jangan masukkan data pribadi, kredensial asli, atau data kerja rahasia.
- Waktu/tenggat memakai periode seed, bukan kalender operasional berjalan.
- Landing `/` masih sementara; masuk demo lewat `/masuk`.
- Produk nyata membutuhkan backend untuk autentikasi, otorisasi per organisasi, data bersama, validasi penugasan bersamaan, audit permanen, email, dan panggilan LLM yang menyimpan secret di server. Kesiapan backend yang ada belum diaudit end-to-end di pekerjaan ini.

## Unit deployment

Satu container Next.js standalone, tanpa Django, PostgreSQL, Redis, Compose, atau Nginx tambahan. Dokploy/Traefik menangani domain dan HTTPS.

Frontend-only tidak berarti static export: rute `/tugas/[id]` menerima ID baru yang dibuat saat demo, sementara `cacheComponents` juga memerlukan runtime Node.js. Static export saat ini akan membatasi/mematahkan alur tersebut. Image menjalankan `node server.js` pada `0.0.0.0:3000` sebagai user non-root.

`frontend/.dockerignore` memakai allowlist source frontend, mengabaikan `.env*`, private key, test, dependency lokal, dan output build. Build context wajib `frontend`, bukan root repo. Image final hanya berisi hasil standalone, aset statis, dan `public`.

## Pengaturan dashboard

1. Buat Application, pilih Git provider/repository `Orang2-BU/PANTARA-v1`.
2. Pilih branch `hadooyy` (branch yang diperiksa). Perubahan lokal perlu masuk remote dahulu dengan persetujuan pemilik; Dokploy tidak membaca working tree komputer ini. Jika memilih branch lain, pastikan semua file deployment ada di branch tersebut.
3. Atur:

   | Field | Nilai |
   |---|---|
   | Build Path / direktori checkout | `/` (root repository) |
   | Build Type | `Dockerfile` |
   | Dockerfile Path | `frontend/Dockerfile` |
   | Docker Context Path | `frontend` |
   | Docker Build Stage | `runner` (atau kosong untuk stage terakhir) |
   | Container / Target Port di Domains | `3000` |
   | Domain Path | `/` |
   | HTTPS | Aktifkan Let's Encrypt setelah DNS domain mengarah ke VPS |
   | Replicas | `1` untuk awal demo |
   | Command override | Kosong; gunakan CMD image |
   | Volumes, database, cache | Tidak diperlukan |

4. Environment dan build arguments tidak perlu diisi. Image sudah mengatur `NODE_ENV=production`, `NEXT_TELEMETRY_DISABLED=1`, `HOSTNAME=0.0.0.0`, `PORT=3000`. Tidak perlu `NEXT_PUBLIC_API_URL`, `BACKEND_INTERNAL_URL`, secret Django, atau API key LLM. Jangan menambahkan flag mode mock yang tidak dibaca kode.
5. Deploy dilakukan pemilik. Setelah rollout, cek `https://<domain>/health` mengembalikan HTTP 200 dan `{"status":"ok","service":"pantara-frontend","mode":"demo"}`. Buka `/masuk`, jalankan alur inti. Health hanya membuktikan frontend, bukan koneksi backend/DB.

Build memerlukan akses registry npm dan Google Fonts (`next/font/google`). Font disajikan lokal setelah build. Foto demo memakai sumber eksternal `randomuser.me`; kegagalan foto tidak berarti backend aplikasi dibutuhkan.

## Verifikasi lokal

Dari root repository:

```sh
docker build -t pantara-frontend:local -f frontend/Dockerfile frontend
docker run --rm --name pantara-frontend-check -p 127.0.0.1:32187:3000 pantara-frontend:local
```

Dari terminal lain:

```sh
curl --fail http://127.0.0.1:32187/health
```

Buka `http://127.0.0.1:32187/masuk`. Hentikan container dengan Ctrl+C setelah selesai.

Bukti pengujian 27 Oktober 2026:

- Unit test: 90 lulus, 10 file, termasuk health route; test health gagal sebelum implementasi, lulus setelahnya.
- Lint, typecheck, dan Knip: lulus; klien API yatim dihapus, tidak disembunyikan lewat ignore.
- Build produksi native dan image Linux: lulus. Instalasi `npm ci` di image melaporkan 0 vulnerabilities; ada peringatan dukungan ESLint 9 dari dependency lama, tidak di-upgrade dalam scope ini.
- Container: health `healthy`, user UID 1000, tidak berisi `.env.local`, folder backend, atau SQLite.
- Browser Chrome terhadap image produksi: masuk manajer, buat TGS-0173, tinjau kebutuhan, kandidat, simulasi, tetapkan ke Bima 3 jam, riwayat 17 menjadi 18, alokasi aktif 292 menjadi 295 jam. Reload mempertahankan keputusan; state sama di Dashboard, Tim, Kapasitas.
- Tiga halaman tersebut tidak overflow pada lebar 375/768/1440. Tidak ada page error atau panggilan API backend selama alur.

Belum dilakukan: commit/push, perubahan dashboard Dokploy, rollout VPS, pengujian kapasitas 1000 pengguna, atau uji backend. Hasil lokal bukan bukti kapasitas/keamanan produksi multiuser.

Rujukan: [Dokploy Build Type](https://docs.dokploy.com/docs/core/applications/build-type), dokumentasi Next.js yang terpasang di `frontend/node_modules/next/dist/docs/01-app/` (output standalone, self-hosting, static exports, cacheComponents).
