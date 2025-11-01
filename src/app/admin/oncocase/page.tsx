'use client';

import React from 'react';
import { BriefcaseMedical, Plus, FileText } from 'lucide-react';

const clinicalCases = [
  {
    id: 1,
    diagnosis: 'Karsinoma Nasofaring T3N2M0',
    technique: 'IMRT',
    dose: '70 Gy/35 fraksi',
    toxicity: 'Grade 2 Mucositis',
    outcome: 'Complete Response',
    difficulty: 'intermediate',
  },
  {
    id: 2,
    diagnosis: 'Ca Mammae T2N1M0',
    technique: '3D-CRT',
    dose: '50 Gy/25 fraksi + boost 10 Gy',
    toxicity: 'Grade 1 Dermatitis',
    outcome: 'Partial Response',
    difficulty: 'beginner',
  },
  {
    id: 3,
    diagnosis: 'Ca Cervix IIIB',
    technique: 'EBRT + Brachytherapy',
    dose: '50 Gy EBRT + 28 Gy HDR',
    toxicity: 'Grade 2 Proctitis',
    outcome: 'Complete Response',
    difficulty: 'advanced',
  },
];

const difficultyColors = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function OncoCasePage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">OncoCase Trainer</h1>
          <p className="text-slate-600 mt-1">Kumpulan Kasus Klinik</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tambah Kasus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <BriefcaseMedical className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">
              {clinicalCases.length}
            </span>
          </div>
          <p className="text-slate-600">Total Kasus</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">156</span>
          </div>
          <p className="text-slate-600">Total Percobaan</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <BriefcaseMedical className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">82%</span>
          </div>
          <p className="text-slate-600">Avg. Score</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Daftar Kasus Klinik</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {clinicalCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {caseItem.diagnosis}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        difficultyColors[caseItem.difficulty as keyof typeof difficultyColors]
                      }`}
                    >
                      {caseItem.difficulty}
                    </span>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Teknik</p>
                    <p className="font-medium text-slate-900">
                      {caseItem.technique}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Dosis</p>
                    <p className="font-medium text-slate-900">{caseItem.dose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Toksisitas</p>
                    <p className="font-medium text-slate-900">
                      {caseItem.toxicity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Outcome</p>
                    <p className="font-medium text-slate-900">
                      {caseItem.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
