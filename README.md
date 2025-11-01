# RADIATE - Radiation Education & Training Ecosystem

**Tagline:** Edukasi Publik, Pelatihan Dokter, dan Literasi Radiasi dalam Satu Platform Digital Interaktif

## 🎯 Tujuan Utama

RADIATE bertujuan menjadi ekosistem digital edukasi dan pelatihan onkologi radiasi berbasis data dan simulasi, yang:

- Meningkatkan literasi masyarakat terhadap terapi radiasi dan kanker
- Mendukung pembelajaran klinik dokter muda/residen
- Membuka partisipasi dokter di seluruh Indonesia dalam mengedukasi publik lewat data terstandar di Google Sheet

## 🧩 Konsep Inti

Frontend-only platform yang terhubung langsung dengan **Google Sheet sebagai database dinamis**, tanpa memerlukan backend server. Setiap modul dalam RADIATE menarik data edukatif, kasus, atau simulasi dari Sheet untuk divisualisasikan secara interaktif.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Database:** Google Sheets API
- **Data Fetching:** SWR

## 🧱 Modul Platform

### 1️⃣ EduRadi — Pusat Edukasi Publik
Infografik interaktif tentang terapi radiasi, statistik dinamis dari Google Sheet, dan animasi visual interaktif.

### 2️⃣ SimuDose — BED/EQD₂ Interactive Visualizer
Kalkulator radiobiologi dengan visualisasi grafik BED dan EQD₂ secara real-time.

### 3️⃣ OncoCase Trainer
Kumpulan kasus klinik nyata dengan skor otomatis untuk pembelajaran berbasis kasus.

### 4️⃣ MythBuster Radiasi
Quiz interaktif tentang mitos umum radioterapi dengan jawaban berbasis literatur.

### 5️⃣ OncoMap — Peta Pengetahuan Anatomi dan Dosis
Peta tubuh interaktif dengan rekomendasi dosis maksimum berdasarkan guideline QUANTEC.

### 6️⃣ Kanker di Sekitarku
Visualisasi peta interaktif data kanker per provinsi.

### 7️⃣ Mini-Lab Radioterapi
Sesi latihan virtual berbasis soal klinik dengan skor otomatis.

### 8️⃣ Patient Journey
Timeline visual dari diagnosis hingga follow-up.

### 9️⃣ Panduan Efek Samping & Perawatan Rumah
Modul interaktif dengan panduan perawatan mandiri.

### 🔟 OncoTheraTable — Tabel Modalitas Terapi
Tabel interaktif kanker dan modalitas terapi berbasis bukti.

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

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create credentials (API Key)
5. Add the API key to your `.env` file

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

## 🎨 Features

- ✅ Modern, responsive admin panel
- ✅ Interactive sidebar navigation
- ✅ Real-time data from Google Sheets
- ✅ BED/EQD₂ calculator with live results
- ✅ Clinical case management
- ✅ Myth-busting module
- ✅ Organ dose guidelines
- ✅ Regional cancer data visualization
- ✅ Patient journey timeline
- ✅ Side effects management
- ✅ Therapy modalities table

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

Contributions are welcome! This platform is designed to be collaboratively maintained by radiation oncology professionals.

## 📄 License

This project is created for educational and medical training purposes.

## 👥 Target Users

- **Masyarakat Umum:** Edukasi dan literasi radiasi
- **Dokter Muda/Residen:** Pembelajaran klinik dan pelatihan
- **Dokter Spesialis:** Kontributor konten edukatif
- **Mahasiswa Kedokteran:** Referensi dan latihan

## 🌟 Vision

Menjadikan RADIATE sebagai platform rujukan utama untuk edukasi dan pelatihan onkologi radiasi di Indonesia.
