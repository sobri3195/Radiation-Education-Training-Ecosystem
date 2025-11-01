# 🚀 Quick Start Guide - RADIATE Admin Panel

## Instalasi dan Menjalankan

### 1. Clone Repository
```bash
git clone <repository-url>
cd radiate-admin-panel
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Buka browser dan akses: `http://localhost:3000`

Aplikasi akan otomatis redirect ke `/admin` - Dashboard Admin Panel

### 4. Build untuk Production
```bash
npm run build
npm start
```

## 🎯 Navigasi Admin Panel

### Dashboard Utama (/admin)
Dashboard dengan overview lengkap:
- 📊 **Statistik Platform** - Pengguna, konten, engagement
- 📝 **Aktivitas Terkini** - Log aktivitas dari semua modul
- 🔗 **Status Google Sheets** - Koneksi dan jumlah records
- 🚀 **Quick Actions** - Akses cepat ke modul populer

### Struktur Sidebar Navigation

#### 📊 DASHBOARD
- **Overview** - Dashboard utama dengan statistik

#### 📚 KONTEN EDUKASI (EduRadi)
- **Artikel & Infografik** - Kelola konten edukasi publik
- **FAQ Publik** - Database pertanyaan umum
- **MythBuster Radiasi** - Mitos vs fakta
- **Referensi Literatur** - Database referensi

#### 🎓 SIMULASI & PELATIHAN
- **SimuDose (BED/EQD₂)** - Konfigurasi kalkulator radiobiologi
- **OncoCase Trainer** - Bank kasus klinik dan editor skenario
- **Mini-Lab Radioterapi** - Soal latihan dan paket ujian

#### 🗺️ PETA PENGETAHUAN (OncoMap)
- **Organ-at-Risk (OAR)** - Batas dosis QUANTEC
- **Teknik & Modalitas** - IMRT/VMAT/3D-CRT/SBRT

#### 🏥 PERJALANAN PASIEN
- **Patient Journey** - Timeline tahapan perawatan
- **Panduan Efek Samping** - Gejala dan perawatan rumah

#### 📈 DATA & VISUALISASI
- **Kanker di Sekitarku** - Peta insidensi regional
- **Tabel Modalitas Terapi** - Indikasi dan kombinasi

#### 📊 LAPORAN
- **Laporan Edukasi** - Analytics konten edukasi
- **Laporan Pelatihan** - Statistik pelatihan
- **Laporan Simulasi** - Data penggunaan simulasi
- **Ekspor PDF/CSV** - Export semua data

#### 🔗 GOOGLE SHEETS
- **Koneksi & Kredensial** - Konfigurasi API
- **Pemetaan Sheet ↔ Modul** - Mapping data sources
- **Validasi Kolom & Data** - Data integrity checks
- **Impor/Ekspor Template** - Template management

#### 👥 PENGGUNA & PERAN
- **Daftar Pengguna** - User management
- **Peran & Akses** - Role-based access control
- **Audit Log** - Activity logging

#### ⚙️ PENGATURAN
- **Branding & Tema** - Customization
- **Bahasa & Lokalisasi** - i18n settings
- **Privasi & Anonimisasi** - Data privacy
- **Integrasi** - Third-party integrations
- **Cadangan & Restore** - Backup management

#### ❓ BANTUAN
- **Panduan Admin** - Documentation
- **SOP Kurasi Konten** - Content guidelines
- **Kebijakan Etik & Disclaimer** - Ethics policy

## 💡 Tips Penggunaan Admin Panel

### Workflow Content Management:

**1. Setup Awal (First Time)**
```
1. Konfigurasi Google Sheets Connection
   └── /admin/gsheet-data
2. Verifikasi Pemetaan Sheet ↔ Modul
   └── /admin/sheets/mapping/*
3. Setup Peran & Akses User
   └── /admin/users/roles
```

**2. Manajemen Konten Harian**
```
1. Review Aktivitas Terkini
   └── Dashboard /admin
2. Update Konten Edukasi
   └── /admin/eduradi
3. Tambah/Edit Kasus Klinik
   └── /admin/oncocase
4. Review Laporan
   └── /admin/reports/*
```

**3. Maintenance Rutin**
```
Weekly:
├── Validasi data Google Sheets
├── Review audit log
└── Update konten FAQ

Monthly:
├── Export backup data
├── Review statistik engagement
└── Update referensi literatur
```

## 🎨 Fitur UI/UX

### Sidebar Navigation:
- **Collapsible sections** - Klik untuk expand/collapse
- **Active indicator** - Highlight halaman aktif
- **Mobile responsive** - Hamburger menu untuk mobile
- **Dark theme** - Slate 900 background dengan gradient

### Data Tables:
- **Sorting** - Klik header kolom untuk sort
- **Search** - Filter data real-time
- **Pagination** - Navigasi halaman data
- **Export** - PDF dan Excel export buttons

### Dashboard Widgets:
- **Stat cards** - Overview metrics dengan icons
- **Activity feed** - Real-time activity log
- **Status indicators** - Color-coded status badges

## 🔧 Troubleshooting

### Build gagal?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Sidebar tidak muncul di mobile?
- Klik hamburger menu (☰) di kiri atas
- Pastikan viewport meta tag ada di HTML

### Data tidak tersimpan?
- Check browser localStorage permissions
- Verify Google Sheets API credentials
- Check browser console untuk errors

### Page styling rusak?
```bash
# Rebuild Tailwind CSS
npm run dev
# Hard refresh browser: Ctrl+Shift+R
```

## 📱 Responsive Design

Admin Panel fully responsive:
- ✅ **Desktop** (1024px+) - Full sidebar + content
- ✅ **Tablet** (768px-1023px) - Collapsible sidebar
- ✅ **Mobile** (< 768px) - Hamburger menu + overlay sidebar

## 🎓 Untuk Demonstrasi

### Demo Flow Recommended (10 menit):

**1. Dashboard Overview (2 min)**
- Show main admin dashboard
- Highlight statistik real-time
- Explain Google Sheets integration

**2. Content Management (3 min)**
- Navigate through sidebar modules
- Demo edit konten edukasi
- Show MythBuster management
- Quick add clinical case

**3. Data Management (2 min)**
- Show Google Sheets connection
- Demonstrate CSV import
- Export data to PDF/Excel

**4. Reporting & Analytics (2 min)**
- Navigate to laporan section
- Show visualization charts
- Export report demo

**5. Technical Highlights (1 min)**
- Responsive design (resize browser)
- Dark sidebar theme
- Smooth animations

### Key Talking Points:
- 🎨 **Modern UI/UX:** Clean, responsive, professional admin interface
- 📊 **Data-Driven:** Real-time statistics and analytics
- 🔗 **Google Sheets Integration:** No database needed, easy collaboration
- 📤 **Export Capabilities:** PDF and Excel export for all data
- 🚀 **Easy Deployment:** Static site, deploy to Netlify/Vercel
- 🇮🇩 **Localized:** Full Indonesian language interface

## 🛠️ Development

### Menambah Modul Baru:

**1. Create Page**
```bash
# Create new page di src/app/admin/
touch src/app/admin/new-module/page.tsx
```

**2. Add to Sidebar**
```typescript
// Edit src/components/Sidebar.tsx
// Tambah item baru di navSections array
```

**3. Implement UI**
```typescript
// Use PageTemplate component
import PageTemplate from '@/components/PageTemplate';
```

### Menambah Route Google Sheets:

**1. Edit googleSheets.ts**
```typescript
// src/lib/googleSheets.ts
// Tambah function fetch data baru
```

**2. Use SWR for Data Fetching**
```typescript
import useSWR from 'swr';
const { data, error } = useSWR('/api/endpoint', fetcher);
```

## 📞 Support

Untuk pertanyaan atau issues:
1. Check documentation files (*.md)
2. Review component code comments
3. Check browser console untuk errors
4. Review Google Sheets API documentation

---

**Happy Managing! 🎉**

*RADIATE Admin Panel - Professional Content Management for Radiation Oncology Education*
