'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, RotateCw, Trash2 } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';
import { getFlashcards, saveFlashcard, addXP, type Flashcard } from '@/lib/localStorage';
import { generateFlashcardFromText } from '@/lib/aiHelper';

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newText, setNewText] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadFlashcards();
  }, []);

  const loadFlashcards = () => {
    const cards = getFlashcards();
    if (cards.length === 0) {
      const defaultCards: Flashcard[] = [
        {
          id: '1',
          question: 'Apa itu radioterapi?',
          answer: 'Radioterapi adalah pengobatan kanker menggunakan radiasi berenergi tinggi untuk membunuh sel kanker atau menghentikan pertumbuhannya dengan merusak DNA sel.',
          category: 'Dasar',
        },
        {
          id: '2',
          question: 'Jelaskan konsep fraksinasi',
          answer: 'Fraksinasi adalah pembagian dosis total radiasi menjadi dosis-dosis kecil yang diberikan dalam beberapa sesi. Ini memberikan waktu bagi jaringan normal untuk pulih sambil tetap merusak sel kanker.',
          category: 'Radiobiologi',
        },
      ];
      defaultCards.forEach(card => saveFlashcard(card));
      setFlashcards(defaultCards);
    } else {
      setFlashcards(cards);
    }
  };

  const handleGenerate = () => {
    if (!newText.trim()) return;

    const { question, answer } = generateFlashcardFromText(newText, 'Custom');
    const newCard: Flashcard = {
      id: Date.now().toString(),
      question,
      answer,
      category: 'Custom',
    };

    saveFlashcard(newCard);
    setFlashcards([...flashcards, newCard]);
    setNewText('');
    setShowForm(false);
    addXP(10);
  };

  const handleDelete = (id: string) => {
    const updated = flashcards.filter(c => c.id !== id);
    setFlashcards(updated);
  };

  if (!mounted || flashcards.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentCard = flashcards[currentIndex];

  return (
    <PageTemplate
      title="Flashcard Generator"
      description="Buat dan pelajari dengan kartu flashcard interaktif"
      icon={Target}
      iconColor="text-green-600"
      gradientFrom="from-green-50"
      gradientTo="to-teal-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-gray-600">
                {currentIndex + 1} / {flashcards.length}
              </span>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
              >
                <RotateCw className="w-4 h-4" />
                Flip Card
              </button>
            </div>

            <motion.div
              key={`${currentIndex}-${isFlipped}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 min-h-[250px] flex flex-col items-center justify-center"
            >
              <div className="text-xs font-semibold text-gray-500 mb-4">
                {isFlipped ? 'JAWABAN' : 'PERTANYAAN'}
              </div>
              <p className="text-xl text-center text-gray-900">
                {isFlipped ? currentCard.answer : currentCard.question}
              </p>
            </motion.div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => {
                  setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
                  setIsFlipped(false);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                ← Sebelumnya
              </button>
              <button
                onClick={() => {
                  setCurrentIndex((currentIndex + 1) % flashcards.length);
                  setIsFlipped(false);
                  addXP(2);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-lg mb-4">Buat Flashcard Baru</h3>
            {showForm ? (
              <div className="space-y-3">
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Masukkan teks atau konsep yang ingin dibuat flashcard..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                  rows={5}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    className="flex-1 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Generate
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                <Plus className="w-5 h-5" />
                Tambah Flashcard
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 max-h-[400px] overflow-y-auto">
            <h3 className="font-bold text-lg mb-4">Semua Flashcard ({flashcards.length})</h3>
            <div className="space-y-2">
              {flashcards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsFlipped(false);
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    idx === currentIndex
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-gray-500 mb-1">{card.category}</div>
                      <div className="text-sm font-medium text-gray-900">{card.question}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(card.id);
                      }}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
