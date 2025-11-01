'use client';

import React, { useState } from 'react';
import { Plus, Upload, Image as ImageIcon, FileText, Save, X } from 'lucide-react';

export default function AddContentPage() {
  const [formData, setFormData] = useState({
    title: '',
    type: 'article',
    category: '',
    tags: '',
    content: '',
    author: '',
    status: 'draft',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting content:', formData);
    alert('Konten berhasil disimpan!');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tambah Konten Baru</h1>
          <p className="text-slate-600 mt-1">Buat artikel atau infografik edukatif baru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Informasi Dasar</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Judul Konten
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                placeholder="Masukkan judul konten..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipe Konten
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                >
                  <option value="article">Artikel</option>
                  <option value="infographic">Infografik</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                  required
                >
                  <option value="">Pilih kategori...</option>
                  <option value="basic">Dasar Radiasi</option>
                  <option value="technique">Teknik Radioterapi</option>
                  <option value="safety">Keamanan Radiasi</option>
                  <option value="patient-care">Perawatan Pasien</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tags (pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                placeholder="radiasi, kanker, terapi..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Penulis
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                placeholder="Nama penulis..."
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Konten</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Isi Konten
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                placeholder="Tulis konten di sini..."
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Gambar
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Upload File
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Publikasi</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Terbitkan</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            Simpan Konten
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
