# 🚀 Quick Start Guide - RADIATE Platform

## Instalasi dan Menjalankan

### 1. Clone Repository
```bash
git clone <repository-url>
cd radiate-platform
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

### 4. Build untuk Production
```bash
npm run build
npm start
```

## 🎯 Navigasi Platform

### Halaman Utama (/)
Dashboard utama dengan 5 kategori fitur:
1. 🎓 **Edukasi & Pembelajaran** - Educational modules
2. 🤖 **AI & Interaktif** - AI-powered features
3. 🏆 **Gamifikasi** - XP, badges, challenges
4. 🎨 **Visual & UX** - Themes, history, learning path
5. 🔬 **Profesional & Riset** - Advanced tools

### Quick Links

#### Untuk Pemula:
1. Start dengan **Mini Quiz** (`/learn/quiz`) - Uji pengetahuan dasar
2. Explore **3D Anatomy Viewer** (`/learn/anatomy-3d`) - Visualisasi organ
3. Try **AI Tutor** (`/ai/tutor`) - Tanya jawab interaktif

#### Untuk Dokter Muda:
1. **Case Simulation** (`/learn/case-simulation`) - Praktik kasus klinik
2. **Machine Tour** (`/learn/machine-tour`) - Kenali peralatan radioterapi
3. **Physics Visualizer** (`/learn/physics`) - Pahami fisika radiasi

#### Untuk Advanced Learners:
1. **Daily Challenge** (`/game/daily-challenge`) - Challenge harian
2. **Badges** (`/game/badges`) - Unlock achievements
3. **Flashcards** (`/ai/flashcards`) - Buat kartu belajar kustom

## 💡 Tips Penggunaan

### Mendapatkan XP:
- ✅ Complete quiz questions (+10 XP per correct)
- ✅ Perfect quiz score (+50 XP bonus)
- ✅ Complete case simulations (+10-15 XP per question)
- ✅ Daily challenge completion (+25 XP)
- ✅ Explore anatomy viewer (+5 XP per organ)
- ✅ Ask AI tutor questions (+5 XP)
- ✅ Create flashcards (+10 XP)

### Unlock Badges:
1. **Peserta Pertama** - Complete your first quiz
2. **Quiz Master** - Get perfect score on 10 quizzes
3. **RadBio Master** - Explore spinal cord in anatomy viewer
4. **OncoPlanner** - Successfully complete clinical cases
5. **Daily Learner** - Complete 7 daily challenges in a row

### Best Learning Path:
```
Week 1: Basics
├── Mini Quiz (Dasar Radioterapi)
├── AI Tutor (Basic concepts)
└── 3D Anatomy Viewer

Week 2: Clinical Application
├── Case Simulation
├── Machine Tour
└── Physics Visualizer

Week 3: Advanced
├── Daily Challenge
├── Flashcards
└── Complete all badges
```

## 🔧 Troubleshooting

### Data tidak tersimpan?
- Pastikan browser mengizinkan localStorage
- Jangan gunakan mode incognito/private
- Check browser console untuk errors

### Build gagal?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Page tidak loading?
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- Check browser console untuk errors

## 📱 Mobile Support

Platform fully responsive dan dapat diakses dari:
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (Chrome Mobile, Safari Mobile)
- ✅ Tablet devices

## 🎓 Untuk Demonstrasi LPDP

### Demo Flow Recommended:

**1. Introduction (2 min)**
- Show main dashboard
- Explain 100% offline capability
- Demonstrate localStorage data persistence

**2. Educational Features (3 min)**
- Interactive 3D Anatomy with dose visualization
- Case simulation with auto-feedback
- Quiz system with explanations

**3. AI Capabilities (2 min)**
- Local AI tutor (no API needed)
- Flashcard generator
- Speech narration

**4. Gamification (2 min)**
- XP and leveling system
- Achievement badges
- Daily challenges

**5. Technical Highlights (1 min)**
- Show browser DevTools → localStorage data
- Demonstrate offline functionality (disconnect internet)
- Show responsive design on mobile

### Key Talking Points:
- ✨ **Innovation:** Local AI, offline-first, gamification
- 📚 **Education:** Interactive learning, case-based, self-paced
- 🌐 **Accessibility:** Browser-based, no installation, free
- 🇮🇩 **Local Context:** Indonesian language, relevant cases
- 💰 **Sustainability:** Low-cost hosting, easy maintenance

## 🤝 Kontribusi

Untuk menambahkan konten:

### Tambah Quiz Questions:
Edit `src/lib/localStorage.ts` → `getDefaultQuizBank()`

### Tambah Clinical Cases:
Edit `src/lib/localStorage.ts` → `getDefaultClinicalCases()`

### Tambah AI Knowledge:
Edit `src/lib/aiHelper.ts` → `medicalKnowledgeBase`

### Tambah Achievements:
Edit `src/lib/localStorage.ts` → `getDefaultAchievements()`

## 📞 Support

Untuk pertanyaan atau issues:
1. Check documentation: `INTERACTIVE_FEATURES.md`
2. Review code comments
3. Check browser console for errors

---

**Happy Learning! 🎓**

*RADIATE Platform - Transforming Radiation Oncology Education in Indonesia*
