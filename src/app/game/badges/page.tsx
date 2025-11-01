'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Award, Lock, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getAchievements, getUserProgress } from '@/lib/localStorage';

export default function BadgesPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const allAchievements = getAchievements();
    const progress = getUserProgress();
    
    setAchievements(allAchievements);
    setUserBadges(progress.badges);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  const unlockedCount = userBadges.length;
  const totalCount = achievements.length;
  const progress = (unlockedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-12 h-12 text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-900">Achievement Badges</h1>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Kumpulkan semua badge dengan menyelesaikan berbagai aktivitas pembelajaran
          </p>

          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-gray-900">Progress</span>
              <span className="text-lg font-bold text-amber-600">
                {unlockedCount} / {totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, idx) => {
            const isUnlocked = userBadges.includes(achievement.id);
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`relative rounded-2xl shadow-xl overflow-hidden ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-100 to-orange-100'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`text-6xl ${
                        isUnlocked ? 'grayscale-0 opacity-100' : 'grayscale opacity-50'
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    {!isUnlocked && (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${
                    isUnlocked ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>

                  <p className={`text-sm mb-4 ${
                    isUnlocked ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>

                  {isUnlocked && achievement.unlockedAt && (
                    <div className="flex items-center gap-2 text-xs text-amber-700">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  )}

                  {!isUnlocked && (
                    <div className="text-xs text-gray-500 italic">
                      Badge terkunci - selesaikan aktivitas untuk membuka
                    </div>
                  )}
                </div>

                {isUnlocked && (
                  <div className="absolute top-0 right-0 p-2">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: idx * 0.05 + 0.3, type: 'spring' }}
                    >
                      <Award className="w-8 h-8 text-amber-500" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {unlockedCount === totalCount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-2xl p-8 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">🎉 Selamat!</h2>
            <p className="text-xl">
              Anda telah membuka semua achievement badges!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
