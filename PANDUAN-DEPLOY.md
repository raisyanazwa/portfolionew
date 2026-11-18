# Panduan Deploy ke Cloudflare Pages — raisyanzw.my.id

Folder siap deploy ada di **`dist/`** (berisi `index.html` + `assets/`).
Domain `raisyanzw.my.id` sudah menggunakan nameserver Cloudflare
(`james.ns.cloudflare.com`, `sneh.ns.cloudflare.com`), jadi **tidak perlu memindahkan nameserver** lagi.

---

## Opsi A — Lewat Dashboard (paling mudah, disarankan)

1. Buka https://dash.cloudflare.com → login.
2. Pilih **Workers & Pages** → **Create** → tab **Pages** → **Upload assets**.
3. Project name: `raisyanzw`
4. Upload **seluruh isi folder `dist/`**.
   - Pastikan yang ter-upload adalah **isi** folder (`index.html`, `assets/`),
     bukan folder `dist`-nya sendiri.
5. Klik **Deploy site**. Tunggu sampai selesai.
6. Setelah jadi, kamu dapat URL gratis: `https://raisyanzw.pages.dev`
7. Masuk ke project tersebut → **Custom domains** → **Set up a custom domain**.
8. Masukkan `raisyanzw.my.id` → **Add domain**.
   - Cloudflare akan otomatis membuat record CNAME dan sertifikat SSL.
9. Ulangi untuk `www.raisyanzw.my.id` agar kedua versi bisa diakses (opsional, disarankan).
10. Tunggustatus SSL aktif (biasanya beberapa menit), lalu cek `https://raisyanzw.my.id`.

---

## Opsi B — Lewat Wrangler CLI

Jalankan di PowerShell, dari folder project:

```powershell
cd "D:\PKL ACM 2026\PORTFOLIO RAISYA"
npx wrangler login
npx wrangler pages deploy dist --project-name raisyanzw
```

Setelah project terbuat, hubungkan domain:

```powershell
npx wrangler pages domain add raisyanzw.my.id --project-name raisyanzw
npx wrangler pages domain add www.raisyanzw.my.id --project-name raisyanzw
```

`wrangler.toml` sudah disiapkan dengan `pages_build_output_dir = "dist"`.

---

## Catatan DNS (jika ingin dicek manual)

Di Cloudflare → DNS → Records untuk `raisyanzw.my.id`, seharusnya ada:

| Type  | Name | Target                 | Proxy status |
|-------|------|------------------------|--------------|
| CNAME | @    | raisyanzw.pages.dev    | Proxied      |
| CNAME | www  | raisyanzw.pages.dev    | Proxied      |

Jangan menambahkan A record manual ke IP Pages — Cloudflare Pages memakai CNAME.

---

## Hal penting

- **SSL/TLS**: otomatis dari Cloudflare Pages. Mode disarankan: **Full**.
- **Tailwind CDN**: halaman memakai `https://cdn.tailwindcss.com`, jadi butuh koneksi internet saat dibuka (sudah sesuai desain saat ini).
- **Update konten**: setiap kali `index.html` diubah, salin lagi ke `dist/`:

  ```powershell
  Copy-Item ".\index.html" ".\dist\index.html" -Force
  ```

  lalu deploy ulang (drag folder `dist/` lagi atau `npx wrangler pages deploy dist --project-name raisyanzw`).

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| 404 setelah deploy | Pastikan `index.html` ada di **root** hasil upload, bukan di dalam folder `dist/dist/` |
| Domain belum aktif | Cek status di **Custom domains** (harus `Active`) dan record CNAME di DNS |
| SSL error | Tunggu beberapa menit, lalu di SSL/TLS → mode **Full** |
| Upload gagal | Compress folder `dist/` jadi zip, lalu upload zip-nya di Dashboard |
