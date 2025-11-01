'use client';

import React from 'react';
import { Shield, Plus, CheckCircle, XCircle } from 'lucide-react';

const myths = [
  {
    id: 1,
    myth: 'Radioterapi membuat tubuh menjadi radioaktif',
    fact: 'Radiasi eksternal tidak membuat tubuh radioaktif. Pasien aman untuk berinteraksi dengan orang lain segera setelah terapi.',
    reference: 'ASTRO Patient Education Guidelines 2023',
    status: 'published',
  },
  {
    id: 2,
    myth: 'Radioterapi menyebabkan kanker baru',
    fact: 'Risiko kanker sekunder sangat kecil (< 1%) dan manfaat terapi jauh lebih besar daripada risikonya.',
    reference: 'JAMA Oncology 2022',
    status: 'published',
  },
  {
    id: 3,
    myth: 'Radioterapi hanya untuk kanker stadium lanjut',
    fact: 'Radioterapi efektif untuk semua stadium kanker, bahkan sebagai terapi kuratif pada stadium awal.',
    reference: 'NCCN Guidelines 2023',
    status: 'published',
  },
];

export default function MythBusterPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">MythBuster Radiasi</h1>
          <p className="text-slate-600 mt-1">
            Melawan Mitos dengan Fakta Ilmiah
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tambah Mitos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">
              {myths.length}
            </span>
          </div>
          <p className="text-slate-600">Total Mitos</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <span className="text-2xl font-bold text-slate-900">2.3K</span>
          </div>
          <p className="text-slate-600">Total Quiz Selesai</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">89%</span>
          </div>
          <p className="text-slate-600">Avg. Correct Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Daftar Mitos & Fakta</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {myths.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">
                      MITOS
                    </h3>
                    <p className="text-lg font-bold text-slate-900">
                      {item.myth}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">
                      FAKTA
                    </h3>
                    <p className="text-slate-900">{item.fact}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Referensi:</span>
                    <span className="text-xs font-medium text-radiate-blue">
                      {item.reference}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                    <button className="px-4 py-2 text-sm font-medium text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors">
                      Edit
                    </button>
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
