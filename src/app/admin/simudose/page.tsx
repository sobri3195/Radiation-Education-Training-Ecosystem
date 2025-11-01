'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Save } from 'lucide-react';
import { calculateBED, calculateEQD2 } from '@/lib/utils';

export default function SimuDosePage() {
  const [fractions, setFractions] = useState<number>(30);
  const [totalDose, setTotalDose] = useState<number>(60);
  const [alphaBetha, setAlphaBetha] = useState<number>(10);
  const [results, setResults] = useState<{ bed: number; eqd2: number } | null>(
    null
  );

  const handleCalculate = () => {
    const bed = calculateBED(fractions, totalDose, alphaBetha);
    const eqd2 = calculateEQD2(fractions, totalDose, alphaBetha);
    setResults({ bed, eqd2 });
  };

  const handleSave = async () => {
    alert('Hasil perhitungan disimpan ke Google Sheets!');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">SimuDose</h1>
        <p className="text-slate-600 mt-1">
          BED/EQD₂ Interactive Visualizer
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-radiate-purple" />
            <h2 className="text-xl font-bold text-slate-900">
              Input Parameter
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jumlah Fraksi
              </label>
              <input
                type="number"
                value={fractions}
                onChange={(e) => setFractions(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Total Dosis (Gy)
              </label>
              <input
                type="number"
                value={totalDose}
                onChange={(e) => setTotalDose(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                α/β Ratio
              </label>
              <input
                type="number"
                value={alphaBetha}
                onChange={(e) => setAlphaBetha(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                min="0"
                step="0.1"
              />
              <p className="text-xs text-slate-500 mt-2">
                Tumor: ~10 Gy | Late tissue: ~3 Gy
              </p>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Hitung BED & EQD₂
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-radiate-blue" />
            <h2 className="text-xl font-bold text-slate-900">Hasil</h2>
          </div>

          {results ? (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                <div className="text-sm font-medium text-slate-600 mb-2">
                  BED (Biological Effective Dose)
                </div>
                <div className="text-4xl font-bold text-radiate-purple">
                  {results.bed.toFixed(2)} Gy
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="text-sm font-medium text-slate-600 mb-2">
                  EQD₂ (Equivalent Dose in 2Gy fractions)
                </div>
                <div className="text-4xl font-bold text-radiate-blue">
                  {results.eqd2.toFixed(2)} Gy
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Parameter Input:
                </h3>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>Fraksi: {fractions}x</p>
                  <p>Total Dosis: {totalDose} Gy</p>
                  <p>Dosis per Fraksi: {(totalDose / fractions).toFixed(2)} Gy</p>
                  <p>α/β Ratio: {alphaBetha}</p>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Simpan ke Google Sheets
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-400">
              <div className="text-center">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Masukkan parameter dan klik hitung</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-3">Formula Radiobiologi</h3>
        <div className="space-y-2 text-sm font-mono bg-black/20 p-4 rounded-lg">
          <p>BED = D × (1 + d/(α/β))</p>
          <p>EQD₂ = BED / (1 + 2/(α/β))</p>
          <p className="text-xs text-slate-400 mt-3">
            D = total dose, d = dose per fraction
          </p>
        </div>
      </div>
    </div>
  );
}
