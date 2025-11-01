'use client';

import React, { useState } from 'react';
import { Table2, Filter, CheckCircle, XCircle } from 'lucide-react';

interface TherapyData {
  cancerType: string;
  stage: string;
  surgery: boolean;
  radiation: boolean;
  chemotherapy: boolean;
  evidence: string;
}

const therapyData: TherapyData[] = [
  {
    cancerType: 'Karsinoma Nasofaring',
    stage: 'I-IVB',
    surgery: false,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    cancerType: 'Ca Mammae',
    stage: 'I-II',
    surgery: true,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    cancerType: 'Ca Cervix',
    stage: 'IB-IVA',
    surgery: false,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    cancerType: 'Ca Paru NSCLC',
    stage: 'III',
    surgery: false,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    cancerType: 'Ca Prostat',
    stage: 'Localized',
    surgery: true,
    radiation: true,
    chemotherapy: false,
    evidence: 'NCCN Category 1',
  },
];

export default function TherapyTablePage() {
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">OncoTheraTable</h1>
        <p className="text-slate-600 mt-1">
          Tabel Modalitas Terapi Kanker
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Table2 className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">
              {therapyData.length}
            </span>
          </div>
          <p className="text-slate-600">Total Entries</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">100%</span>
          </div>
          <p className="text-slate-600">Evidence-Based</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Filter className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">5</span>
          </div>
          <p className="text-slate-600">Filter Options</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Table2 className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">1.8K</span>
          </div>
          <p className="text-slate-600">Total Views</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Tabel Modalitas Terapi
          </h2>
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
            >
              <option value="all">Semua Kanker</option>
              <option value="radiation">Dengan Radiasi</option>
              <option value="surgery">Dengan Bedah</option>
              <option value="chemo">Dengan Kemoterapi</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-700">
                    Jenis Kanker
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-700">
                    Stadium
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-700">
                    Bedah
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-700">
                    Radiasi
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-slate-700">
                    Kemoterapi
                  </th>
                  <th className="text-left py-4 px-4 font-bold text-slate-700">
                    Evidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {therapyData.map((therapy, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {therapy.cancerType}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                        {therapy.stage}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {therapy.surgery ? (
                        <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="w-6 h-6 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {therapy.radiation ? (
                        <CheckCircle className="w-6 h-6 text-radiate-purple mx-auto" />
                      ) : (
                        <XCircle className="w-6 h-6 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {therapy.chemotherapy ? (
                        <CheckCircle className="w-6 h-6 text-radiate-blue mx-auto" />
                      ) : (
                        <XCircle className="w-6 h-6 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                        {therapy.evidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-3">Tentang OncoTheraTable</h3>
        <p className="text-sm text-slate-300 mb-4">
          Tabel ini menunjukkan modalitas terapi berbasis bukti untuk berbagai
          jenis kanker. Semua rekomendasi mengacu pada guideline internasional
          (NCCN, ESMO, ASTRO).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-sm">= Terapi direkomendasikan</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-slate-400" />
            <span className="text-sm">= Bukan terapi utama</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-emerald-600 rounded text-xs">
              NCCN Cat. 1
            </span>
            <span className="text-sm">= Evidence level tertinggi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
