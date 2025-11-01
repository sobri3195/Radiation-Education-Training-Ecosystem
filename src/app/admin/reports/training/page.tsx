'use client';

import React from 'react';
import { GraduationCap, Download, Calendar } from 'lucide-react';

export default function Reports_TrainingPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Laporan Pelatihan</h1>
          <p className="text-slate-600 mt-1">Laporan progress pelatihan dan kasus klinik</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Pilih Periode
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all">
            <Download className="w-4 h-4" />
            Ekspor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total', value: '1,234', change: '+12%', color: 'from-blue-500 to-blue-600' },
          { title: 'Aktif', value: '456', change: '+8%', color: 'from-green-500 to-green-600' },
          { title: 'Selesai', value: '789', change: '+15%', color: 'from-purple-500 to-purple-600' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-sm text-slate-600 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Grafik & Analisis</h2>
        <div className="h-96 flex items-center justify-center bg-slate-50 rounded-lg">
          <p className="text-slate-500">Chart akan ditampilkan di sini</p>
        </div>
      </div>
    </div>
  );
}
