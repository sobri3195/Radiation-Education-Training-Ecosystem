'use client';

import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

export default function Edu_Faq_NewPage() {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    alert('Data berhasil disimpan!');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tambah Pertanyaan Baru</h1>
        <p className="text-slate-600 mt-1">Tambahkan pertanyaan dan jawaban baru ke FAQ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Form Data</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Judul
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                placeholder="Masukkan judul..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deskripsi
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                placeholder="Masukkan deskripsi..."
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            Simpan
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <X className="w-5 h-5" />
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
