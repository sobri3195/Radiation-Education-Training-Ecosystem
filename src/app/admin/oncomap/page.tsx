'use client';

import React from 'react';
import { User, AlertTriangle, BookOpen } from 'lucide-react';

const organs = [
  {
    id: 1,
    name: 'Brain',
    maxDose: '< 60 Gy',
    toxicity: 'Radionecrosis',
    guideline: 'QUANTEC',
    severity: 'high',
  },
  {
    id: 2,
    name: 'Spinal Cord',
    maxDose: '< 50 Gy',
    toxicity: 'Myelitis',
    guideline: 'QUANTEC',
    severity: 'critical',
  },
  {
    id: 3,
    name: 'Heart',
    maxDose: '< 40 Gy mean',
    toxicity: 'Cardiotoxicity',
    guideline: 'QUANTEC',
    severity: 'high',
  },
  {
    id: 4,
    name: 'Lung',
    maxDose: 'V20 < 30%',
    toxicity: 'Pneumonitis',
    guideline: 'QUANTEC',
    severity: 'moderate',
  },
  {
    id: 5,
    name: 'Kidney',
    maxDose: '< 23 Gy mean',
    toxicity: 'Nephropathy',
    guideline: 'QUANTEC',
    severity: 'high',
  },
];

const severityColors = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

export default function OncoMapPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">OncoMap</h1>
        <p className="text-slate-600 mt-1">
          Peta Pengetahuan Anatomi dan Dosis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-radiate-purple" />
            <h2 className="text-xl font-bold text-slate-900">
              Daftar Organ & Dosis
            </h2>
          </div>
          <div className="space-y-4">
            {organs.map((organ) => (
              <div
                key={organ.id}
                className={`border-2 rounded-xl p-6 ${
                  severityColors[organ.severity as keyof typeof severityColors]
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    {organ.name}
                  </h3>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">
                    {organ.severity.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      MAX DOSE
                    </p>
                    <p className="font-bold text-slate-900">{organ.maxDose}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      TOXICITY
                    </p>
                    <p className="font-bold text-slate-900">{organ.toxicity}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      GUIDELINE
                    </p>
                    <p className="font-bold text-slate-900">{organ.guideline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-lg font-bold text-slate-900">
                Severity Legend
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-slate-700">Critical</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-slate-700">High</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-slate-700">Moderate</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-radiate-purple to-radiate-blue rounded-2xl shadow-lg p-6 text-white">
            <BookOpen className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">QUANTEC Guidelines</h3>
            <p className="text-sm text-blue-100">
              Quantitative Analysis of Normal Tissue Effects in the Clinic
            </p>
          </div>

          <button className="w-full px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            + Tambah Organ
          </button>
        </div>
      </div>
    </div>
  );
}
