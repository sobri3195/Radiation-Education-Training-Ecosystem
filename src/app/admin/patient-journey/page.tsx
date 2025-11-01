'use client';

import React from 'react';
import { Route, CheckCircle, Clock } from 'lucide-react';

const journeySteps = [
  {
    id: 1,
    stage: 'Diagnosis',
    duration: '1-2 minggu',
    description: 'Konsultasi awal, pemeriksaan fisik, dan biopsi',
    sideEffects: [],
    status: 'completed',
  },
  {
    id: 2,
    stage: 'Simulasi',
    duration: '1-2 hari',
    description: 'CT Simulation, pembuatan masker/mold, dan marking',
    sideEffects: [],
    status: 'completed',
  },
  {
    id: 3,
    stage: 'Treatment Planning',
    duration: '3-7 hari',
    description: 'Delineasi target, dosimetri, dan QA',
    sideEffects: [],
    status: 'active',
  },
  {
    id: 4,
    stage: 'Radioterapi',
    duration: '5-7 minggu',
    description: 'Terapi radiasi harian (Senin-Jumat)',
    sideEffects: ['Fatigue', 'Skin reaction', 'Mucositis (jika area H&N)'],
    status: 'upcoming',
  },
  {
    id: 5,
    stage: 'Follow-up',
    duration: 'Seumur hidup',
    description: 'Monitoring response dan deteksi rekurensi',
    sideEffects: ['Late effects monitoring'],
    status: 'upcoming',
  },
];

export default function PatientJourneyPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Patient Journey</h1>
        <p className="text-slate-600 mt-1">
          Timeline Perjalanan Pasien Radioterapi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Route className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">5</span>
          </div>
          <p className="text-slate-600">Total Tahapan</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">6-8</span>
          </div>
          <p className="text-slate-600">Minggu (Rata-rata)</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">92%</span>
          </div>
          <p className="text-slate-600">Completion Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Tahapan Perjalanan Pasien
        </h2>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <div key={step.id} className="relative flex gap-6">
                <div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-bold text-white ${
                    step.status === 'completed'
                      ? 'bg-emerald-500'
                      : step.status === 'active'
                      ? 'bg-radiate-purple'
                      : 'bg-slate-300'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <span className="text-xl">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        {step.stage}
                      </h3>
                      <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-slate-700 mb-4">{step.description}</p>

                    {step.sideEffects.length > 0 && (
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-sm font-semibold text-slate-600 mb-2">
                          Kemungkinan Efek Samping:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.sideEffects.map((effect, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                            >
                              {effect}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-radiate-purple to-radiate-blue rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Tujuan Patient Journey</h3>
        <p className="text-sm text-blue-100">
          Memberikan gambaran jelas tentang perjalanan pengobatan kepada pasien
          dan keluarga, mengurangi kecemasan, dan meningkatkan compliance
          terapi.
        </p>
      </div>
    </div>
  );
}
