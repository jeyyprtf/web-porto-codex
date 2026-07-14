# Juan — Visual Stories in Light

Portfolio dan personal branding website untuk Juan, fotografer dan visual director berusia 19 tahun dengan pengalaman 4 tahun, menggunakan art direction editorial, modern, minimalist, dan animated.

## Highlights

- Home page dengan hero editorial, manifesto, selected work, approach, dan pricing.
- Archive/gallery dengan filter kategori: Portraits, Editorial, Still Life, dan Motion.
- Detail karya melalui modal interaktif.
- About page dengan positioning, point of view, dan studio details.
- Contact / Book page dengan enquiry form.
- Studio CMS lokal untuk menambah, mengedit, dan menghapus karya.
- Upload media lokal untuk foto dan video.
- Responsive layout, keyboard-friendly controls, smooth scroll, hover states, dan SEO metadata.

## Tech stack

- Next.js App Router
- React
- Lucide React
- CSS custom dengan responsive breakpoints
- Unsplash sebagai placeholder image source

## Menjalankan project

```bash
npm install
npm run dev
```

Buka URL yang diberikan Next.js, biasanya `http://localhost:3000`.

Untuk deployment, copy `.env.example` menjadi `.env.local` dan ubah `NEXT_PUBLIC_SITE_URL` ke domain production. Project ini siap dideploy ke Vercel, Netlify, atau server Node yang menjalankan `npm run start`.

Untuk production build:

```bash
npm run build
npm run start
```

## Studio CMS

Klik `Studio login` di footer untuk membuka panel management. Karya dapat ditambah menggunakan URL media atau upload file foto/video, lalu diatur judul, kategori, tahun, deskripsi, tipe, dan layout-nya.

Data CMS demo disimpan di `localStorage` browser. Ini aman untuk preview lokal, tetapi belum merupakan admin CMS production multi-device. Untuk production, hubungkan panel ini ke storage/database seperti Supabase + Storage, Cloudinary, Sanity, atau CMS pilihan lainnya, lalu tambahkan authentication sebelum membuka akses admin publik.

## Production checklist

- Set `NEXT_PUBLIC_SITE_URL` ke domain asli.
- Hubungkan CMS ke database dan object storage persisten.
- Tambahkan authentication/authorization untuk route admin.
- Ganti placeholder Unsplash dengan asset milik sendiri.
- Set email form ke endpoint email/CRM production.
- Jalankan `npm run build` sebelum deploy, lalu `npm run start` untuk self-hosting.

## Struktur utama

```text
src/
├── main.jsx       # App, pages, gallery, CMS, dan interactions
├── styles.css     # Visual system dan responsive layout
└── overrides.css  # Styling tambahan untuk uploaded media
app/
├── layout.jsx     # Root layout dan metadata SEO
└── page.jsx       # App route utama
```

## License

Dibuat untuk kebutuhan personal branding Juan Studio.
