'use client';

import React, { useState } from 'react';
import { Shield, Plus, CheckCircle, XCircle, Edit2, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';

interface Myth {
  id: number;
  myth: string;
  fact: string;
  reference: string;
  status: 'published' | 'draft';
}

const initialMyths: Myth[] = [
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
  const [myths, setMyths] = useState<Myth[]>(initialMyths);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMyth, setEditingMyth] = useState<Myth | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Myth, 'id'>>({
    myth: '',
    fact: '',
    reference: '',
    status: 'published',
  });

  const handleOpenModal = (myth?: Myth) => {
    if (myth) {
      setEditingMyth(myth);
      setFormData({
        myth: myth.myth,
        fact: myth.fact,
        reference: myth.reference,
        status: myth.status,
      });
    } else {
      setEditingMyth(null);
      setFormData({
        myth: '',
        fact: '',
        reference: '',
        status: 'published',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMyth(null);
    setFormData({
      myth: '',
      fact: '',
      reference: '',
      status: 'published',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMyth) {
      setMyths(myths.map(m => 
        m.id === editingMyth.id 
          ? { ...editingMyth, ...formData }
          : m
      ));
    } else {
      const newMyth: Myth = {
        id: Math.max(...myths.map(m => m.id), 0) + 1,
        ...formData,
      };
      setMyths([...myths, newMyth]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setMyths(myths.filter(m => m.id !== deletingId));
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">MythBuster Radiasi</h1>
          <p className="text-slate-600 mt-1">
            Melawan Mitos dengan Fakta Ilmiah
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-2 text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingMyth ? 'Edit Mitos' : 'Tambah Mitos Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mitos
            </label>
            <textarea
              value={formData.myth}
              onChange={(e) => setFormData({ ...formData, myth: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              rows={3}
              required
              placeholder="Masukkan pernyataan mitos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fakta
            </label>
            <textarea
              value={formData.fact}
              onChange={(e) => setFormData({ ...formData, fact: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              rows={4}
              required
              placeholder="Masukkan fakta ilmiah yang benar..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Referensi
            </label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              required
              placeholder="Contoh: ASTRO Patient Education Guidelines 2023"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-3 justify-end pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              {editingMyth ? 'Simpan Perubahan' : 'Tambah Mitos'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Mitos?"
        message="Apakah Anda yakin ingin menghapus mitos ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
}
