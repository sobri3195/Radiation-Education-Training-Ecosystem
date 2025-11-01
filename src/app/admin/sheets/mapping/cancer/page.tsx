'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Save, RefreshCw, CheckCircle } from 'lucide-react';

export default function MappingPage() {
  const [mapping, setMapping] = useState({});

  const handleSave = () => {
    console.log('Saving mapping:', mapping);
    alert('Mapping berhasil disimpan!');
  };

  const fields = ['ID', 'Title', 'Description', 'Status', 'Created Date', 'Modified Date'];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mapping: Cancer Incidence</h1>
          <p className="text-slate-600 mt-1">Pemetaan kolom Google Sheet untuk data insidensi kanker</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Save className="w-5 h-5" />
          Simpan Mapping
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Sheet Information</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sheet ID / URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              placeholder="Masukkan ID atau URL Google Sheet..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sheet Name / Tab
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              placeholder="Nama sheet/tab..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Column Mapping</h2>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
            <RefreshCw className="w-4 h-4" />
            Detect Columns
          </button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Field Aplikasi
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kolom Google Sheet
              </label>
            </div>
          </div>
          {fields.map((field, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">{field}</span>
              </div>
              <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent">
                <option value="">Pilih kolom...</option>
                <option value="A">Column A</option>
                <option value="B">Column B</option>
                <option value="C">Column C</option>
                <option value="D">Column D</option>
                <option value="E">Column E</option>
                <option value="F">Column F</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          ✓ Mapping siap digunakan. Klik Simpan Mapping untuk menyimpan konfigurasi.
        </p>
      </div>
    </div>
  );
}
