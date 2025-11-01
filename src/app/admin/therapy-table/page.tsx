'use client';

import React, { useState } from 'react';
import { Table2, Filter, CheckCircle, XCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';

interface TherapyData {
  id: number;
  cancerType: string;
  stage: string;
  surgery: boolean;
  radiation: boolean;
  chemotherapy: boolean;
  evidence: string;
}

const initialTherapyData: TherapyData[] = [
  {
    id: 1,
    cancerType: 'Karsinoma Nasofaring',
    stage: 'I-IVB',
    surgery: false,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    id: 2,
    cancerType: 'Ca Mammae',
    stage: 'I-II',
    surgery: true,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    id: 3,
    cancerType: 'Ca Cervix',
    stage: 'IB-IVA',
    surgery: false,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    id: 4,
    cancerType: 'Ca Paru NSCLC',
    stage: 'III',
    surgery: false,
    radiation: true,
    chemotherapy: true,
    evidence: 'NCCN Category 1',
  },
  {
    id: 5,
    cancerType: 'Ca Prostat',
    stage: 'Localized',
    surgery: true,
    radiation: true,
    chemotherapy: false,
    evidence: 'NCCN Category 1',
  },
];

export default function TherapyTablePage() {
  const [therapyData, setTherapyData] = useState<TherapyData[]>(initialTherapyData);
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTherapy, setEditingTherapy] = useState<TherapyData | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<TherapyData, 'id'>>({
    cancerType: '',
    stage: '',
    surgery: false,
    radiation: false,
    chemotherapy: false,
    evidence: '',
  });

  const handleOpenModal = (therapy?: TherapyData) => {
    if (therapy) {
      setEditingTherapy(therapy);
      setFormData({
        cancerType: therapy.cancerType,
        stage: therapy.stage,
        surgery: therapy.surgery,
        radiation: therapy.radiation,
        chemotherapy: therapy.chemotherapy,
        evidence: therapy.evidence,
      });
    } else {
      setEditingTherapy(null);
      setFormData({
        cancerType: '',
        stage: '',
        surgery: false,
        radiation: false,
        chemotherapy: false,
        evidence: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTherapy(null);
    setFormData({
      cancerType: '',
      stage: '',
      surgery: false,
      radiation: false,
      chemotherapy: false,
      evidence: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTherapy) {
      setTherapyData(therapyData.map(t => 
        t.id === editingTherapy.id 
          ? { ...editingTherapy, ...formData }
          : t
      ));
    } else {
      const newTherapy: TherapyData = {
        id: Math.max(...therapyData.map(t => t.id), 0) + 1,
        ...formData,
      };
      setTherapyData([...therapyData, newTherapy]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setTherapyData(therapyData.filter(t => t.id !== deletingId));
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">OncoTheraTable</h1>
          <p className="text-slate-600 mt-1">
            Tabel Modalitas Terapi Kanker
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Terapi
        </button>
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
                  <th className="text-center py-4 px-4 font-bold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {therapyData.map((therapy) => (
                  <tr
                    key={therapy.id}
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
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenModal(therapy)}
                          className="p-2 text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(therapy.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTherapy ? 'Edit Modalitas Terapi' : 'Tambah Modalitas Terapi Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jenis Kanker
              </label>
              <input
                type="text"
                value={formData.cancerType}
                onChange={(e) => setFormData({ ...formData, cancerType: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: Karsinoma Nasofaring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Stadium
              </label>
              <input
                type="text"
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: I-IVB"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Evidence Level
            </label>
            <input
              type="text"
              value={formData.evidence}
              onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              required
              placeholder="Contoh: NCCN Category 1"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Modalitas Terapi
            </label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="surgery"
                checked={formData.surgery}
                onChange={(e) => setFormData({ ...formData, surgery: e.target.checked })}
                className="w-5 h-5 text-radiate-purple focus:ring-radiate-purple"
              />
              <label htmlFor="surgery" className="text-slate-700">Bedah</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="radiation"
                checked={formData.radiation}
                onChange={(e) => setFormData({ ...formData, radiation: e.target.checked })}
                className="w-5 h-5 text-radiate-purple focus:ring-radiate-purple"
              />
              <label htmlFor="radiation" className="text-slate-700">Radiasi</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="chemotherapy"
                checked={formData.chemotherapy}
                onChange={(e) => setFormData({ ...formData, chemotherapy: e.target.checked })}
                className="w-5 h-5 text-radiate-purple focus:ring-radiate-purple"
              />
              <label htmlFor="chemotherapy" className="text-slate-700">Kemoterapi</label>
            </div>
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
              {editingTherapy ? 'Simpan Perubahan' : 'Tambah Terapi'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Modalitas Terapi?"
        message="Apakah Anda yakin ingin menghapus modalitas terapi ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
}
