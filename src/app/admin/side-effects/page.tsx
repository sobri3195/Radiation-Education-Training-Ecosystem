'use client';

import React from 'react';
import { Heart, AlertCircle, Plus } from 'lucide-react';

const sideEffects = [
  {
    id: 1,
    name: 'Fatigue (Kelelahan)',
    description: 'Rasa lelah yang berlebihan selama dan setelah terapi',
    severity: 'mild',
    management: 'Istirahat cukup, olahraga ringan, nutrisi seimbang',
    frequency: 'Sangat Umum (>80%)',
  },
  {
    id: 2,
    name: 'Dermatitis Radiasi',
    description: 'Kemerahan dan iritasi kulit di area terapi',
    severity: 'moderate',
    management: 'Pelembab khusus, hindari sabun keras, pakaian longgar',
    frequency: 'Umum (60-70%)',
  },
  {
    id: 3,
    name: 'Mucositis',
    description: 'Luka dan peradangan pada mukosa mulut/tenggorokan',
    severity: 'severe',
    management: 'Obat kumur khusus, diet lunak, analgesik',
    frequency: 'Umum pada radiasi H&N (50-80%)',
  },
  {
    id: 4,
    name: 'Mual dan Muntah',
    description: 'Gangguan pencernaan terutama pada radiasi abdomen',
    severity: 'moderate',
    management: 'Antiemetik, makan porsi kecil tapi sering',
    frequency: 'Sedang (30-50%)',
  },
];

const severityConfig = {
  mild: {
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    label: 'Ringan',
  },
  moderate: {
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    label: 'Sedang',
  },
  severe: {
    color: 'bg-red-100 text-red-700 border-red-200',
    label: 'Berat',
  },
};

export default function SideEffectsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Panduan Efek Samping
          </h1>
          <p className="text-slate-600 mt-1">
            Manajemen & Perawatan Rumah
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tambah Efek Samping
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">
              {sideEffects.length}
            </span>
          </div>
          <p className="text-slate-600">Total Efek Samping</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">2.1K</span>
          </div>
          <p className="text-slate-600">Total Views</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">94%</span>
          </div>
          <p className="text-slate-600">Helpful Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Daftar Efek Samping & Manajemen
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {sideEffects.map((effect) => (
              <div
                key={effect.id}
                className={`border-2 rounded-xl p-6 ${
                  severityConfig[effect.severity as keyof typeof severityConfig]
                    .color
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {effect.name}
                      </h3>
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">
                        {
                          severityConfig[
                            effect.severity as keyof typeof severityConfig
                          ].label
                        }
                      </span>
                    </div>
                    <p className="text-slate-700 mb-2">{effect.description}</p>
                    <span className="text-sm text-slate-600">
                      Frekuensi: {effect.frequency}
                    </span>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-300">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">
                    💡 Manajemen & Perawatan:
                  </h4>
                  <p className="text-slate-800">{effect.management}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <AlertCircle className="w-8 h-8 mb-3" />
          <h3 className="font-bold mb-2">Efek Ringan</h3>
          <p className="text-sm text-emerald-100">
            Dapat dikelola di rumah dengan perawatan mandiri
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <AlertCircle className="w-8 h-8 mb-3" />
          <h3 className="font-bold mb-2">Efek Sedang</h3>
          <p className="text-sm text-yellow-100">
            Memerlukan konsultasi dengan tim medis
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <AlertCircle className="w-8 h-8 mb-3" />
          <h3 className="font-bold mb-2">Efek Berat</h3>
          <p className="text-sm text-red-100">
            Perlu penanganan medis segera
          </p>
        </div>
      </div>
    </div>
  );
}
