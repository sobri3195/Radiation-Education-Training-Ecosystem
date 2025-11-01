# RADIATE Admin Panel - Radiation Education & Training Management System

**Tagline:** Panel Administrasi Komprehensif untuk Mengelola Edukasi Radiasi Onkologi

## 🎯 Tujuan Utama

RADIATE Admin Panel adalah sistem manajemen konten untuk platform edukasi dan pelatihan onkologi radiasi, yang memungkinkan administrator untuk:

- Mengelola konten edukasi publik tentang terapi radiasi dan kanker
- Mengatur kasus klinik dan modul pelatihan untuk dokter muda/residen
- Mengelola data dari Google Sheets sebagai database dinamis
- Memantau statistik pengguna dan aktivitas platform

## 🧩 Konsep Inti

Frontend-only platform yang terhubung langsung dengan **Google Sheet sebagai database dinamis**, tanpa memerlukan backend server. Setiap modul dalam RADIATE menarik data edukatif, kasus, atau simulasi dari Sheet untuk divisualisasikan secara interaktif.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **Database:** Google Sheets API
- **Data Fetching:** SWR
- **Data Export:** jsPDF, jspdf-autotable, xlsx
- **Deployment:** Netlify

## 🧱 Fitur Admin Panel

### 📊 Dashboard Utama
- Overview statistik platform (pengguna, konten, engagement)
- Aktivitas terkini dari semua modul
- Status koneksi Google Sheets
- Quick actions untuk modul populer

### 📚 Manajemen Konten Edukasi (EduRadi)
- Editor artikel dan infografik interaktif
- Manajemen FAQ publik
- MythBuster - kelola mitos vs fakta radiasi
- Database referensi literatur

### 🎓 Simulasi & Pelatihan
- **SimuDose**: Konfigurasi α/β ratio dan preset BED/EQD₂
- **OncoCase Trainer**: Bank kasus klinik dengan editor skenario
- **Mini-Lab**: Soal latihan dan paket ujian radioterapi

### 🗺️ Peta Pengetahuan (OncoMap)
- Manajemen batas dosis Organ-at-Risk (QUANTEC)
- Database teknik radiasi (IMRT/VMAT/3D-CRT/SBRT)
- Catatan klinis dan tips praktis

### 🏥 Perjalanan Pasien
- Editor timeline patient journey
- Materi edukasi pre-treatment dan follow-up
- Panduan efek samping dan perawatan rumah
- Red flags dan indikasi rujukan

### 📈 Data & Visualisasi
- **Kanker di Sekitarku**: Data insidensi kanker per wilayah
- **Tabel Modalitas Terapi**: Indikasi radiasi dan kombinasi terapi
- Anonimisasi dan validasi data

### 🔗 Integrasi Google Sheets
- Konfigurasi koneksi dan kredensial
- Pemetaan Sheet ↔ Modul
- Validasi struktur kolom dan data
- Import/Export template

### 👥 Manajemen Pengguna
- Daftar pengguna dan aktivitas
- Peran dan hak akses
- Audit log lengkap

### ⚙️ Pengaturan
- Branding dan tema
- Bahasa dan lokalisasi
- Privasi dan anonimisasi data
- Backup dan restore

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd radiate-platform
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

Edit `.env` file and add your Google Sheets API credentials.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Google Sheets API Setup

You can connect to Google Sheets in two ways:

#### Option 1: Direct Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create credentials (API Key)
5. Add the API key to your `.env` file

#### Option 2: Google Apps Script (Recommended)

1. Create a Google Apps Script web app
2. Deploy it with public access
3. Add the script URL to your `.env` file

For detailed setup instructions, see [GSHEET_APPS_SCRIPT_SETUP.md](./GSHEET_APPS_SCRIPT_SETUP.md)

### Google Sheets Structure

Each module requires a Google Sheet with specific columns. Example structure:

**Clinical Cases Sheet:**
- Column A: Diagnosis
- Column B: Technique
- Column C: Dose
- Column D: Toxicity
- Column E: Outcome

**Myths Sheet:**
- Column A: Myth
- Column B: Fact
- Column C: Reference
- Column D: Status

## ✨ Fitur Unggulan

### 🎨 UI/UX Modern
- ✅ Desain admin panel modern dan responsif
- ✅ Sidebar navigasi interaktif dengan struktur hierarkis
- ✅ Dashboard statistik real-time dengan chart dan grafik
- ✅ Smooth animations dengan Framer Motion
- ✅ Dark theme untuk sidebar, light theme untuk konten

### 📊 Manajemen Data
- ✅ Integrasi langsung dengan Google Sheets API
- ✅ Google Apps Script web app integration
- ✅ CSV upload dan import data bulk
- ✅ Export data ke format PDF & Excel
- ✅ Interactive DataTables dengan sorting, searching & pagination
- ✅ Validasi dan anonimisasi data otomatis

### 🛠️ Modul Administrasi
- ✅ BED/EQD₂ calculator dengan preset dan template
- ✅ Clinical case editor dengan skenario interaktif
- ✅ Myth-busting database management
- ✅ Organ dose guidelines (QUANTEC)
- ✅ Regional cancer data visualization
- ✅ Patient journey timeline builder
- ✅ Side effects & home care guide management
- ✅ Therapy modalities table editor

### 🚀 Technical Features
- ✅ Next.js 14 dengan App Router
- ✅ TypeScript untuk type safety
- ✅ Tailwind CSS untuk styling
- ✅ SWR untuk data fetching dan caching
- ✅ Client-side rendering (CSR) untuk performa optimal
- ✅ Netlify deployment ready dengan auto-configuration

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Netlify Deployment

This project is configured for easy deployment on Netlify:

1. **Connect your repository** to Netlify
2. Netlify will **automatically detect** the build settings from `netlify.toml`
3. **Set environment variables** in Netlify dashboard if needed:
   - Add your Google Sheets API credentials
   - Any other environment variables from `.env.example`
4. **Deploy!** Netlify will automatically build and deploy your site

### Build Settings (Auto-configured)
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 20

### Demo & Preview
- Visit the root `/` to see automatic redirect to admin panel
- Visit `/demo` to see animated DataTables with PDF/Excel export functionality
- Explore different admin modules from the sidebar navigation

## 🎯 Target Pengguna

- **Administrator Platform:** Mengelola seluruh konten dan konfigurasi
- **Content Curator:** Dokter spesialis yang mengelola konten edukatif
- **Data Manager:** Mengelola data statistik dan Google Sheets integration
- **Training Coordinator:** Mengatur modul pelatihan dan kasus klinik

## 🔐 Peran & Akses

Admin Panel mendukung beberapa tingkat akses:
- **Super Admin:** Full access ke semua modul
- **Content Manager:** Akses ke modul edukasi dan konten
- **Training Manager:** Akses ke modul simulasi dan pelatihan
- **Data Analyst:** Akses ke laporan dan visualisasi data
- **Editor:** Akses terbatas untuk edit konten tertentu

## 🤝 Contributing

Kontribusi sangat diterima! Platform ini dirancang untuk dikelola secara kolaboratif oleh profesional onkologi radiasi dan developer.

## 📄 License

Project ini dibuat untuk tujuan edukasi dan pelatihan medis.

## 🌟 Vision

Menjadikan RADIATE Admin Panel sebagai sistem manajemen konten terbaik untuk platform edukasi onkologi radiasi di Indonesia.
