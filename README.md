# Mara Aster — Visual Stories in Light

Portfolio dan personal branding website untuk fotografer / visual director dengan art direction editorial, modern, minimalist, dan animated.

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

- React
- Vite
- Lucide React
- CSS custom dengan responsive breakpoints
- Unsplash sebagai placeholder image source

## Menjalankan project

```bash
npm install
npm run dev
```

Buka URL yang diberikan Vite, biasanya `http://localhost:5173`.

Untuk production build:

```bash
npm run build
npm run preview
```

## Studio CMS

Klik `Studio login` di footer untuk membuka panel management. Karya dapat ditambah menggunakan URL media atau upload file foto/video, lalu diatur judul, kategori, tahun, deskripsi, tipe, dan layout-nya.

Data CMS demo disimpan di `localStorage` browser. Untuk production, panel ini dapat dihubungkan ke storage/database seperti Supabase, Cloudinary, Sanity, atau CMS pilihan lainnya.

## Struktur utama

```text
src/
├── main.jsx       # App, pages, gallery, CMS, dan interactions
├── styles.css     # Visual system dan responsive layout
└── overrides.css  # Styling tambahan untuk uploaded media
```

## License

Dibuat untuk kebutuhan personal branding Mara Aster Studio.
