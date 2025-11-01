'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Award, User, Activity, FileText, ArrowRight, CheckCircle, Trophy } from 'lucide-react';
import Link from 'next/link';
import { getClinicalCases, addXP, unlockAchievement, addLearningLog } from '@/lib/localStorage';

export default function CaseSimulationPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const clinicalCases = getClinicalCases();
    setCases(clinicalCases);
  }, []);

  const handleSelectCase = (caseItem: any) => {
    setSelectedCase(caseItem);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setTotalScore(0);
    
    const startTime = Date.now();
    addLearningLog({
      module: 'Case Simulation',
      duration: 0,
      topics: [caseItem.diagnosis],
    });
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    const currentQuestion = selectedCase.questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const newScore = totalScore + currentQuestion.points;
      setTotalScore(newScore);
      addXP(currentQuestion.points);
    }

    if (currentQuestionIndex < selectedCase.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowResult(true);
        
        const allCorrect = newAnswers.every((ans, idx) => ans === selectedCase.questions[idx].correctAnswer);
        if (allCorrect) {
          unlockAchievement('onco-planner');
          addXP(25);
        }
      }, 2000);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (showResult && selectedCase) {
    const maxScore = selectedCase.questions.reduce((sum: number, q: any) => sum + q.points, 0);
    const percentage = (totalScore / maxScore) * 100;

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
            <Trophy className="w-24 h-24 mx-auto text-amber-500 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Kasus Selesai!
            </h1>
            
            <div className="text-6xl font-bold mb-4">
              <span className={percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-amber-600' : 'text-red-600'}>
                {totalScore}/{maxScore}
              </span>
            </div>

            <p className="text-xl text-gray-700 mb-8">
              Anda mendapatkan {percentage.toFixed(0)}% dari total poin
            </p>

            <div className="space-y-4 mb-8">
              {selectedCase.questions.map((q: any, idx: number) => {
                const isCorrect = answers[idx] === q.correctAnswer;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg text-left ${
                      isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Award className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-semibold">{q.question}</span>
                    </div>
                    <p className="text-sm text-gray-700">{q.explanation}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedCase(null);
                  setShowResult(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Pilih Kasus Lain
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Case-Based Simulation
            </h1>
            <p className="text-lg text-gray-600">
              Pilih kasus klinik untuk memulai simulasi pembelajaran interaktif
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((caseItem, idx) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition cursor-pointer"
                onClick={() => handleSelectCase(caseItem)}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{caseItem.title}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {caseItem.patientAge}th, {caseItem.patientGender}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      {caseItem.stage}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">Diagnosis</div>
                    <div className="text-gray-900">{caseItem.diagnosis}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">Deskripsi</div>
                    <div className="text-sm text-gray-700">{caseItem.description}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">Imaging</div>
                    <div className="text-sm text-gray-700">{caseItem.imaging}</div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {caseItem.questions.length} Pertanyaan
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        {caseItem.questions.reduce((sum: number, q: any) => sum + q.points, 0)} Poin
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedCase.questions[currentQuestionIndex];
  const isLastAnswer = answers.length > currentQuestionIndex;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{selectedCase.title}</h2>
            <div className="flex items-center gap-4 text-sm">
              <span>{selectedCase.patientAge}th, {selectedCase.patientGender}</span>
              <span>•</span>
              <span>{selectedCase.diagnosis}</span>
              <span>•</span>
              <span>{selectedCase.stage}</span>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-4">{selectedCase.description}</p>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="font-semibold text-sm text-gray-700 mb-1">Imaging:</div>
              <div className="text-sm text-gray-700">{selectedCase.imaging}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1} / {selectedCase.questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              animate={{ width: `${((currentQuestionIndex + 1) / selectedCase.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Pertanyaan {currentQuestionIndex + 1}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                  {currentQuestion.points} Poin
                </span>
              </div>
              <h3 className="text-xl font-bold">{currentQuestion.question}</h3>
            </div>

            <div className="p-6 space-y-3">
              {currentQuestion.options.map((option: string, idx: number) => {
                const isSelected = isLastAnswer && answers[currentQuestionIndex] === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;
                const showFeedback = isLastAnswer;

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: isLastAnswer ? 1 : 1.02 }}
                    onClick={() => !isLastAnswer && handleAnswer(idx)}
                    disabled={isLastAnswer}
                    className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                      showFeedback && isCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : showFeedback && isSelected && !isCorrect
                        ? 'bg-red-100 border-2 border-red-500 text-red-800'
                        : 'bg-gray-50 border-2 border-gray-200 text-gray-800 hover:border-blue-300'
                    }`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {isLastAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-gradient-to-r from-blue-50 to-purple-50"
              >
                <h4 className="font-bold text-gray-900 mb-2">Penjelasan:</h4>
                <p className="text-gray-700 mb-4">{currentQuestion.explanation}</p>
                
                {answers[currentQuestionIndex] === currentQuestion.correctAnswer && (
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>+{currentQuestion.points} Poin!</span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 text-center">
          <div className="text-2xl font-bold text-gray-900">
            Score: {totalScore}
          </div>
        </div>
      </div>
    </div>
  );
}
