'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Send, Brain, Lightbulb, BookOpen, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { getAIResponse, speakText, stopSpeaking } from '@/lib/aiHelper';
import { addXP } from '@/lib/localStorage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya asisten AI lokal untuk membantu Anda belajar radioterapi. Silakan ajukan pertanyaan tentang radioterapi, dosis, teknik, atau topik terkait lainnya.',
      confidence: 1,
    },
  ]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const quickQuestions = [
    'Apa itu radioterapi?',
    'Bagaimana cara kerja LINAC?',
    'Apa itu fraksinasi?',
    'Jelaskan tentang IMRT',
    'Apa itu BED dan EQD2?',
    'Apa saja efek samping radioterapi?',
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse.response,
        confidence: aiResponse.confidence,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      if (aiResponse.confidence > 0.5) {
        addXP(5);
      }
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleSpeak = (text: string) => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
    } else {
      speakText(text);
      setSpeaking(true);
      setTimeout(() => setSpeaking(false), text.length * 50);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-5xl mx-auto">
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
            <Brain className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Tutor Lokal</h1>
          </div>
          <p className="text-lg text-gray-600">
            Asisten AI yang berjalan sepenuhnya di browser Anda untuk menjawab pertanyaan medis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px]">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Chat dengan AI</h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.role === 'assistant' && (
                            <Brain className="w-5 h-5 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            {message.role === 'assistant' && message.confidence !== undefined && (
                              <div className="mt-2 flex items-center gap-2">
                                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-400 rounded-full"
                                    style={{ width: `${message.confidence * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs opacity-75">
                                  {(message.confidence * 100).toFixed(0)}% confident
                                </span>
                                <button
                                  onClick={() => handleSpeak(message.content)}
                                  className="p-1 hover:bg-white/10 rounded transition"
                                >
                                  {speaking ? (
                                    <VolumeX className="w-4 h-4" />
                                  ) : (
                                    <Volume2 className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ketik pertanyaan Anda..."
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                <h3 className="font-bold text-gray-900">Pertanyaan Cepat</h3>
              </div>
              <div className="space-y-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 border border-gray-200 text-sm text-gray-700 hover:text-gray-900 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-gray-900">Tentang AI Tutor</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p>✅ Berjalan 100% offline di browser</p>
                <p>✅ Tidak ada data dikirim ke server</p>
                <p>✅ Response time cepat</p>
                <p>✅ Bank pengetahuan terintegrasi</p>
                <p>✅ Dapatkan XP untuk setiap pertanyaan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
