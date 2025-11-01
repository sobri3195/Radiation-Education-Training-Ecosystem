# RADIATE - Interactive Educational Platform Features

## 🎯 Overview

RADIATE telah ditransformasi menjadi pusat pembelajaran interaktif mandiri untuk edukasi radioterapi dengan:
- 🏆 **100% Offline** - Berjalan sepenuhnya di browser tanpa backend
- 🤖 **AI Lokal** - Asisten AI yang berjalan di device tanpa API eksternal  
- 🎮 **Gamifikasi** - Sistem XP, leveling, dan achievement badges
- 📊 **Data Lokal** - Semua progress tersimpan di localStorage/IndexedDB
- 🚀 **Easy Deploy** - Siap deploy ke Vercel/Netlify/GitHub Pages

## 📚 Fitur Utama

### 1️⃣ Edukasi & Pembelajaran

#### 🔬 Interactive 3D Anatomy Viewer
- **Path:** `/learn/anatomy-3d`
- **Fitur:**
  - Model tubuh 3D interaktif yang dapat diputar
  - Visualisasi dosis radiasi dengan color mapping
  - Informasi dose constraint untuk setiap organ (berdasarkan QUANTEC)
  - Organ at Risk (OAR) dengan batas dosis maksimum
  - Sistem poin XP untuk eksplorasi organ

#### 🎮 Case-Based Simulation Game
- **Path:** `/learn/case-simulation`
- **Fitur:**
  - Kasus klinik nyata dengan data pasien lengkap
  - Pertanyaan multiple choice dengan feedback otomatis
  - Sistem poin berdasarkan kebenaran jawaban
  - Penjelasan detail untuk setiap pertanyaan
  - Tracking progress dengan learning log

#### ⚛️ Radiation Physics Visualizer
- **Path:** `/learn/physics`
- **Fitur:**
  - Animasi partikel radiasi (photon, electron, proton)
  - Visualisasi interaksi radiasi dengan jaringan
  - Penjelasan photoelectric effect, Compton scattering, pair production
  - Perbandingan karakteristik berbagai jenis partikel
  - Animasi real-time dengan Framer Motion

#### 📝 Mini Quiz Generator (Offline)
- **Path:** `/learn/quiz`
- **Fitur:**
  - Bank soal lokal dalam format JSON
  - Filter berdasarkan difficulty (easy, medium, hard)
  - Pertanyaan acak untuk setiap sesi
  - Penjelasan lengkap untuk setiap jawaban
  - Sistem scoring dan achievement badges
  - Progress tracking dengan progress bar

#### 🏥 Virtual Radiation Machine Tour
- **Path:** `/learn/machine-tour`
- **Fitur:**
  - Tour virtual 3 mesin utama: LINAC, CT-Simulator, Brachytherapy
  - Penjelasan komponen dan fungsi setiap mesin
  - Penggunaan klinis dan indikasi
  - Navigasi interaktif dengan animasi slide
  - Tips profesional untuk setiap mesin

### 2️⃣ AI & Interaktif Frontend

#### 🧠 Local AI Tutor (Embedded Model)
- **Path:** `/ai/tutor`
- **Fitur:**
  - Knowledge base lokal tentang radioterapi
  - Chat interface interaktif
  - Confidence score untuk setiap jawaban
  - Quick questions untuk pembelajaran cepat
  - Text-to-speech integration (Web Speech API)
  - Sistem XP untuk setiap pertanyaan

#### 🎴 Question-to-Flashcard Converter
- **Path:** `/ai/flashcards`
- **Fitur:**
  - Generator otomatis flashcard dari teks
  - Flip card animation
  - Sistem review dengan spaced repetition
  - Kategori dan tags untuk organisasi
  - Export/import flashcards
  - Progress tracking

#### 🔧 Fitur AI Lainnya (Coming Soon)
- **Prompt Builder** (`/ai/prompt-builder`) - Template pertanyaan kustom
- **AI Image Annotator** (`/ai/annotator`) - Markup DICOM/CT images
- **Speech Narration** (`/ai/speech`) - Narasi audio untuk konten

### 3️⃣ Gamifikasi

#### 🏆 XP & Leveling System
- **Path:** `/game/progress`
- **Fitur:**
  - Earn XP dari setiap aktivitas (quiz, case simulation, eksplorasi)
  - Level calculation: `level = floor(sqrt(xp / 100)) + 1`
  - XP required for next level: `(level^2) * 100`
  - Real-time progress tracking
  - Visual progress bar dengan animasi

#### 🎖️ Achievement Badges
- **Path:** `/game/badges`
- **Fitur:**
  - 8+ achievement badges dengan unlock conditions
  - Badge categories: Quiz Master, RadBio Master, Safety Hero, etc.
  - Visual showcase dengan unlock animations
  - Progress tracking (unlocked vs locked)
  - Timestamp untuk setiap unlock

#### 🎯 Daily Challenge Mode
- **Path:** `/game/daily-challenge`
- **Fitur:**
  - Satu kasus klinik unik setiap hari
  - Bonus XP untuk completion (+25 XP)
  - Check untuk prevent multiple completions per day
  - Randomized questions berdasarkan date seed
  - Streak tracking untuk consecutive days

#### 🏅 Interactive Leaderboard (Coming Soon)
- **Path:** `/game/leaderboard`
- Ranking lokal disimpan di localStorage
- Score comparison antar pengguna
- Monthly competitions

#### 📊 Animated Progress Tracker (Coming Soon)
- **Path:** `/game/tracker`
- Learning analytics dashboard
- Time spent tracking per module
- Topic mastery visualization
- Growth charts dengan Recharts

### 4️⃣ Visual & UX Enhancement

#### 📜 Timeline of Radiotherapy History (Coming Soon)
- **Path:** `/explore/history`
- Infografik interaktif 1895-sekarang
- Key discoveries dan milestones
- Historical figures
- Technology evolution

#### 🎨 Custom Theme & Accessibility Panel (Coming Soon)
- **Path:** `/explore/themes`
- Light/dark mode
- Custom color themes
- Font size control (small, medium, large)
- High contrast mode untuk accessibility

#### 🗺️ Guided Learning Path (Coming Soon)
- **Path:** `/explore/learning-path`
- Step-by-step curriculum
- Progress checkpoints
- Recommended learning order
- Module dependencies

#### 🔖 Smart Bookmarking (Coming Soon)
- **Path:** `/explore/bookmarks`
- Quick save halaman favorit
- Organize dengan tags
- Search functionality
- Export bookmark list

#### 💝 Story Mode "From Diagnosis to Healing" (Coming Soon)
- **Path:** `/explore/story-mode`
- Simulasi perjalanan pasien
- Interactive narrative dengan branching dialogue
- Decision points dengan consequences
- Multiple endings

### 5️⃣ Profesional & Riset

#### 📔 Journal Reflection Mode (Coming Soon)
- **Path:** `/pro/journal`
- Markdown editor untuk refleksi kasus
- Tags dan categories
- Search dan filter
- Private dan secure (localStorage)

#### 📈 Learning Log Dashboard (Coming Soon)
- **Path:** `/pro/learning-log`
- Study time analytics
- Topic mastery tracking
- Learning trends visualization
- Weekly/monthly reports

#### 👥 Peer Review Simulator (Coming Soon)
- **Path:** `/pro/peer-review`
- AI-generated feedback untuk kasus
- Evaluation criteria
- Best practices guidelines
- Case review templates

#### 🔬 Research Idea Generator (Coming Soon)
- **Path:** `/pro/research`
- Topic suggestions berdasarkan cancer type
- Research templates
- Literature keywords
- Methodology guidance

#### ⚖️ Ethical Decision Trainer (Coming Soon)
- **Path:** `/pro/ethics`
- Real-world ethical scenarios
- Multiple perspectives
- Consequence analysis
- Expert commentary

## 💾 Data Storage & Architecture

### LocalStorage Structure

```typescript
// User Progress
radiate_user_progress: {
  xp: number,
  level: number,
  badges: string[],
  completedChallenges: string[],
  completedModules: string[],
  learningPath: string[],
  bookmarks: string[],
  reflections: Journal[],
  learningLog: LearningEntry[],
  customTheme: ThemeSettings,
  lastDailyChallenge: string
}

// Flashcards
radiate_flashcards: Flashcard[]

// Quiz Bank
radiate_quiz_bank: QuizQuestion[]

// Clinical Cases
radiate_clinical_cases: ClinicalCase[]

// Achievements
radiate_achievements: Achievement[]
```

### AI Knowledge Base

Local AI tutor menggunakan embedded knowledge base dengan topik:
- Radioterapi Dasar
- Linear Accelerator (LINAC)
- Fraksinasi dan Dosis
- IMRT dan Teknik Canggih
- Efek Samping
- BED dan EQD2 (Radiobiologi)
- CT Simulation
- Brachytherapy
- Organ at Risk (OAR)
- Target Volume (GTV, CTV, PTV)

## 🎮 Gamification System

### XP Sources
- Complete quiz: +10 XP per correct answer
- Perfect quiz score: +50 XP bonus
- Case simulation: +10-15 XP per question
- Perfect case score: +25 XP bonus
- Daily challenge: +25 XP
- Explore anatomy: +5 XP per organ
- AI questions: +5 XP per question
- Create flashcard: +10 XP

### Achievement Badges

1. **Peserta Pertama** 🎯 - Complete first quiz
2. **Quiz Master** 🏆 - Complete 10 quizzes with perfect score
3. **RadBio Master** 🧬 - Master all radiobiology concepts
4. **Radiation Safety Hero** 🛡️ - Complete all safety modules
5. **OncoPlanner** 📋 - Successfully plan 5 clinical cases
6. **Daily Learner** 📅 - Complete daily challenge 7 days in a row
7. **Case Solver** 💼 - Complete 10 clinical cases
8. **Physics Expert** ⚛️ - Master radiation physics visualization

## 🚀 Deployment

### Build & Deploy
```bash
npm install
npm run build
```

### Deployment Platforms
- **Vercel:** Push ke GitHub, auto-deploy
- **Netlify:** Connect repository, auto-build
- **GitHub Pages:** Build manually, deploy ke `gh-pages` branch

### Environment Variables
Tidak ada environment variables yang diperlukan! Platform berjalan 100% client-side.

## 🎓 Untuk Demo LPDP

### Highlight Features:
1. **Inovasi Teknologi:**
   - 100% offline, tidak bergantung pada koneksi internet
   - AI lokal tanpa API eksternal
   - Data privacy dengan localStorage

2. **Edukasi Interaktif:**
   - 3D visualization dan animasi
   - Gamification untuk engagement
   - Case-based learning untuk praktisi

3. **Aksesibilitas:**
   - Dapat diakses dari browser apapun
   - Tidak perlu instalasi aplikasi
   - Responsive untuk mobile dan desktop

4. **Sustainability:**
   - Mudah di-maintain (frontend-only)
   - Scalable dengan menambah konten di JSON
   - Low-cost hosting (static site)

## 📄 License & Credits

Platform ini dikembangkan untuk tujuan edukasi dan pelatihan medis di Indonesia, khususnya dalam bidang onkologi radiasi.

**Developed for LPDP Demonstration**
**Inovasi Edukasi Digital Radioterapi Indonesia**

---

© 2024 RADIATE Platform - Radiation Education & Training Ecosystem
