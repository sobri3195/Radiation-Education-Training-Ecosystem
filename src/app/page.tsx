'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, Brain, Trophy, Palette, Users, 
  Microscope, Gamepad2, Award, Map, Clock,
  Sparkles, Target, Zap, Heart, GraduationCap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserProgress, calculateLevel, getXPForNextLevel } from '@/lib/localStorage';

export default function HomePage() {
  const [progress, setProgress] = useState({ xp: 0, level: 1, badges: [] as string[] });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userProgress = getUserProgress();
    setProgress({
      xp: userProgress.xp,
      level: userProgress.level,
      badges: userProgress.badges,
    });
  }, []);

  const modules = [
    {
      category: '🎓 Edukasi & Pembelajaran',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      features: [
        { title: '3D Anatomy Viewer', href: '/learn/anatomy-3d', icon: Microscope, desc: 'Eksplorasi model tubuh 3D dengan visualisasi dosis radiasi' },
        { title: 'Case Simulation', href: '/learn/case-simulation', icon: Gamepad2, desc: 'Simulasi kasus klinik interaktif dengan feedback otomatis' },
        { title: 'Physics Visualizer', href: '/learn/physics', icon: Zap, desc: 'Animasi partikel radiasi dan interaksi jaringan' },
        { title: 'Mini Quiz', href: '/learn/quiz', icon: Target, desc: 'Bank soal offline untuk belajar kapan pun' },
        { title: 'Virtual Machine Tour', href: '/learn/machine-tour', icon: Clock, desc: 'Tour virtual LINAC, CT-Sim, dan Brachytherapy' },
      ],
    },
    {
      category: '🤖 AI & Interaktif',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      features: [
        { title: 'AI Tutor', href: '/ai/tutor', icon: Brain, desc: 'Asisten AI lokal untuk pertanyaan medis' },
        { title: 'Prompt Builder', href: '/ai/prompt-builder', icon: Sparkles, desc: 'Buat dan simpan pertanyaan radioterapi' },
        { title: 'Image Annotator', href: '/ai/annotator', icon: Microscope, desc: 'Tandai area tumor dan OAR pada CT/DICOM' },
        { title: 'Speech Narration', href: '/ai/speech', icon: BookOpen, desc: 'Penjelasan audio untuk konten edukasi' },
        { title: 'Flashcard Generator', href: '/ai/flashcards', icon: Target, desc: 'Konversi otomatis teks ke kartu belajar' },
      ],
    },
    {
      category: '🏆 Gamifikasi',
      icon: Trophy,
      color: 'from-amber-500 to-orange-500',
      features: [
        { title: 'XP & Level', href: '/game/progress', icon: Trophy, desc: 'Sistem poin pengalaman dan leveling' },
        { title: 'Badges', href: '/game/badges', icon: Award, desc: 'Koleksi achievement dan pencapaian' },
        { title: 'Daily Challenge', href: '/game/daily-challenge', icon: Target, desc: 'Tantangan harian untuk latihan cepat' },
        { title: 'Leaderboard', href: '/game/leaderboard', icon: Users, desc: 'Peringkat lokal dan kompetisi' },
        { title: 'Progress Tracker', href: '/game/tracker', icon: Clock, desc: 'Visualisasi progres pembelajaran' },
      ],
    },
    {
      category: '🎨 Visual & UX',
      icon: Palette,
      color: 'from-green-500 to-teal-500',
      features: [
        { title: 'History Timeline', href: '/explore/history', icon: Clock, desc: 'Sejarah radioterapi interaktif 1895-sekarang' },
        { title: 'Theme & Accessibility', href: '/explore/themes', icon: Palette, desc: 'Kustomisasi warna, font, dan kontras' },
        { title: 'Learning Path', href: '/explore/learning-path', icon: Map, desc: 'Panduan bertahap dari intro hingga mahir' },
        { title: 'Bookmarks', href: '/explore/bookmarks', icon: BookOpen, desc: 'Simpan halaman dan kasus favorit' },
        { title: 'Story Mode', href: '/explore/story-mode', icon: Heart, desc: 'Perjalanan pasien dari diagnosis ke healing' },
      ],
    },
    {
      category: '🔬 Profesional & Riset',
      icon: Users,
      color: 'from-indigo-500 to-violet-500',
      features: [
        { title: 'Journal Reflection', href: '/pro/journal', icon: BookOpen, desc: 'Tulis refleksi kasus pribadi (offline)' },
        { title: 'Learning Log', href: '/pro/learning-log', icon: Clock, desc: 'Dashboard waktu belajar dan penguasaan topik' },
        { title: 'Peer Review', href: '/pro/peer-review', icon: Users, desc: 'Simulasi evaluasi kasus antar pengguna' },
        { title: 'Research Ideas', href: '/pro/research', icon: Microscope, desc: 'Generator ide penelitian radioterapi' },
        { title: 'Ethics Trainer', href: '/pro/ethics', icon: Heart, desc: 'Skenario etika klinik dengan pilihan moral' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  const xpProgress = progress.level > 1 
    ? ((progress.xp - getXPForNextLevel(progress.level - 1)) / (getXPForNextLevel(progress.level) - getXPForNextLevel(progress.level - 1))) * 100
    : (progress.xp / getXPForNextLevel(1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            RADIATE
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Radiation Education & Training Ecosystem
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pusat pembelajaran interaktif mandiri untuk edukasi radioterapi dengan AI lokal dan gamifikasi
          </p>
          
          <div className="mt-8 max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold">Level {progress.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium">{progress.badges.length} Badges</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {progress.xp} / {getXPForNextLevel(progress.level)} XP
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {modules.map((module, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${module.color} p-6 text-white`}>
                <div className="flex items-center gap-3">
                  <module.icon className="w-8 h-8" />
                  <h2 className="text-3xl font-bold">{module.category}</h2>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {module.features.map((feature, featureIdx) => (
                  <Link
                    key={featureIdx}
                    href={feature.href}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-full bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${module.color}`}>
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">🌟 Nilai Tambah RADIATE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">100% Offline</h3>
              <p className="text-sm">Berjalan di browser tanpa backend atau koneksi internet</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">Data Lokal</h3>
              <p className="text-sm">Semua progress tersimpan di localStorage/IndexedDB</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">AI Lokal</h3>
              <p className="text-sm">Asisten AI berjalan di device tanpa API eksternal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">Easy Deploy</h3>
              <p className="text-sm">Deploy ke Vercel/Netlify/GitHub Pages dengan mudah</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Dikembangkan untuk LPDP · Inovasi Edukasi Digital Radioterapi Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}
