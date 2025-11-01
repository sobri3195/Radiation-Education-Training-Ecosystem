'use client';

import React from 'react';
import { FlaskConical, Trophy, Clock } from 'lucide-react';

const exercises = [
  {
    id: 1,
    title: 'Perhitungan Dosis Radiasi',
    questions: 10,
    duration: '15 menit',
    difficulty: 'Beginner',
    avgScore: 85,
  },
  {
    id: 2,
    title: 'Target Volume Delineation',
    questions: 15,
    duration: '20 menit',
    difficulty: 'Intermediate',
    avgScore: 72,
  },
  {
    id: 3,
    title: 'Treatment Planning',
    questions: 12,
    duration: '25 menit',
    difficulty: 'Advanced',
    avgScore: 68,
  },
];

export default function MiniLabPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Mini-Lab Radioterapi
        </h1>
        <p className="text-slate-600 mt-1">Latihan Soal Klinik Interaktif</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <FlaskConical className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">
              {exercises.length}
            </span>
          </div>
          <p className="text-slate-600">Total Latihan</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">456</span>
          </div>
          <p className="text-slate-600">Total Attempts</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">75%</span>
          </div>
          <p className="text-slate-600">Avg. Score</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Daftar Latihan</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-radiate-purple to-radiate-blue rounded-lg">
                    <FlaskConical className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {exercise.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {exercise.title}
                </h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Soal</span>
                    <span className="font-medium text-slate-900">
                      {exercise.questions} pertanyaan
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Durasi</span>
                    <span className="font-medium text-slate-900 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exercise.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Rata-rata Skor</span>
                    <span className="font-bold text-emerald-600">
                      {exercise.avgScore}%
                    </span>
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Mulai Latihan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-radiate-purple to-radiate-blue rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Fitur Mini-Lab</h3>
        <ul className="space-y-2 text-sm text-blue-100">
          <li>✓ Skor otomatis setelah menyelesaikan latihan</li>
          <li>✓ Hasil disimpan ke Google Sheets untuk evaluasi</li>
          <li>✓ Tracking progress dan performance history</li>
          <li>✓ Pembahasan detail untuk setiap soal</li>
        </ul>
      </div>
    </div>
  );
}
