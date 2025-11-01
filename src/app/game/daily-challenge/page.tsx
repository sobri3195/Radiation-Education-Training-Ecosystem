'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Target, Calendar, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getUserProgress, updateUserProgress, addXP, getClinicalCases } from '@/lib/localStorage';

export default function DailyChallengePageComponent() {
  const [challenge, setChallenge] = useState<any>(null);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toDateString();
    const progress = getUserProgress();
    
    if (progress.lastDailyChallenge === today) {
      setCompleted(true);
    }
    
    const cases = getClinicalCases();
    const todaySeed = new Date().getDate();
    const randomCase = cases[todaySeed % cases.length];
    const randomQuestion = randomCase.questions[todaySeed % randomCase.questions.length];
    
    setChallenge({
      case: randomCase,
      question: randomQuestion,
    });
  }, []);

  const handleComplete = (answerIdx: number) => {
    setSelectedAnswer(answerIdx);
    
    if (answerIdx === challenge.question.correctAnswer) {
      addXP(25);
      const today = new Date().toDateString();
      updateUserProgress({ lastDailyChallenge: today });
      setCompleted(true);
    }
  };

  if (!mounted || !challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
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
            <Target className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Daily Challenge</h1>
          </div>
          <p className="text-lg text-gray-600">
            Selesaikan satu kasus klinik setiap hari untuk mendapatkan bonus XP
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </motion.div>

        {completed && selectedAnswer === null ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <Award className="w-24 h-24 mx-auto text-green-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Challenge Hari Ini Sudah Selesai!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Kembali besok untuk challenge baru dan dapatkan XP tambahan
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Kembali ke Beranda
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{challenge.case.title}</h2>
                <p className="text-sm opacity-90">{challenge.case.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Daily Challenge Question</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                    +25 XP
                  </span>
                </div>
                <h3 className="text-xl font-bold">{challenge.question.question}</h3>
              </div>

              <div className="p-6 space-y-3">
                {challenge.question.options.map((option: string, idx: number) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === challenge.question.correctAnswer;
                  const showFeedback = selectedAnswer !== null;

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                      onClick={() => !showFeedback && handleComplete(idx)}
                      disabled={showFeedback}
                      className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                        showFeedback && isCorrect
                          ? 'bg-green-100 border-2 border-green-500 text-green-800'
                          : showFeedback && isSelected && !isCorrect
                          ? 'bg-red-100 border-2 border-red-500 text-red-800'
                          : 'bg-gray-50 border-2 border-gray-200 text-gray-800 hover:border-purple-300'
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-gradient-to-r from-blue-50 to-purple-50"
                >
                  <h4 className="font-bold text-gray-900 mb-2">Penjelasan:</h4>
                  <p className="text-gray-700 mb-4">{challenge.question.explanation}</p>
                  
                  {selectedAnswer === challenge.question.correctAnswer && (
                    <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                        <Award className="w-6 h-6" />
                        <span>Selamat! Challenge Hari Ini Selesai!</span>
                      </div>
                      <p className="text-sm text-green-700">Anda mendapatkan +25 XP bonus!</p>
                    </div>
                  )}

                  <Link
                    href="/"
                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Kembali ke Beranda
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
