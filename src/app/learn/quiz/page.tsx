'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Award, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';
import { getQuizBank, addXP, unlockAchievement, getUserProgress } from '@/lib/localStorage';

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  const loadQuestions = () => {
    const allQuestions = getQuizBank();
    const filtered = filterDifficulty === 'all' 
      ? allQuestions 
      : allQuestions.filter(q => q.difficulty === filterDifficulty);
    
    setQuestions(filtered.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setCompleted(false);
  };

  useEffect(() => {
    setMounted(true);
    loadQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDifficulty]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const currentQuestion = questions[currentIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
      addXP(10);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      
      const progress = getUserProgress();
      if (score === questions.length && !progress.badges.includes('first-quiz')) {
        unlockAchievement('first-quiz');
      }
      
      if (score === questions.length) {
        addXP(50);
      }
    }
  };

  if (!mounted || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading Quiz...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (completed) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <Trophy className="w-24 h-24 mx-auto text-amber-500 mb-6" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Quiz Selesai!
            </h1>

            <div className="text-6xl font-bold mb-4">
              <span className={percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-amber-600' : 'text-red-600'}>
                {percentage.toFixed(0)}%
              </span>
            </div>

            <p className="text-xl text-gray-700 mb-8">
              Anda menjawab {score} dari {questions.length} pertanyaan dengan benar
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Benar</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
                <div className="text-sm text-gray-600">Salah</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  +{score * 10 + (percentage === 100 ? 50 : 0)}
                </div>
                <div className="text-sm text-gray-600">XP</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={loadQuestions}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                <RotateCcw className="w-5 h-5" />
                Coba Lagi
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </motion.div>
        </div>
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mini Quiz</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{currentIndex + 1} / {questions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {['all', 'easy', 'medium', 'hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filterDifficulty === diff
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {diff === 'all' ? 'Semua' : diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold opacity-90">
                  Pertanyaan {currentIndex + 1}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-500' :
                  currentQuestion.difficulty === 'medium' ? 'bg-amber-500' :
                  'bg-red-500'
                }`}>
                  {currentQuestion.difficulty.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="p-6 space-y-3">
              {currentQuestion.options.map((option: string, idx: number) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                      showCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : showWrong
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : isSelected
                        ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                        : 'bg-gray-50 border-2 border-gray-200 text-gray-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                      {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-gradient-to-r from-blue-50 to-purple-50"
              >
                <h3 className="font-bold text-gray-900 mb-2">Penjelasan:</h3>
                <p className="text-gray-700">{currentQuestion.explanation}</p>
                
                <button
                  onClick={handleNext}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  {currentIndex < questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
