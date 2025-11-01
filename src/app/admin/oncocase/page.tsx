'use client';

import React, { useState } from 'react';
import { BriefcaseMedical, Plus, FileText, Edit2, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';

interface ClinicalCase {
  id: number;
  diagnosis: string;
  technique: string;
  dose: string;
  toxicity: string;
  outcome: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const initialClinicalCases: ClinicalCase[] = [
  {
    id: 1,
    diagnosis: 'Karsinoma Nasofaring T3N2M0',
    technique: 'IMRT',
    dose: '70 Gy/35 fraksi',
    toxicity: 'Grade 2 Mucositis',
    outcome: 'Complete Response',
    difficulty: 'intermediate',
  },
  {
    id: 2,
    diagnosis: 'Ca Mammae T2N1M0',
    technique: '3D-CRT',
    dose: '50 Gy/25 fraksi + boost 10 Gy',
    toxicity: 'Grade 1 Dermatitis',
    outcome: 'Partial Response',
    difficulty: 'beginner',
  },
  {
    id: 3,
    diagnosis: 'Ca Cervix IIIB',
    technique: 'EBRT + Brachytherapy',
    dose: '50 Gy EBRT + 28 Gy HDR',
    toxicity: 'Grade 2 Proctitis',
    outcome: 'Complete Response',
    difficulty: 'advanced',
  },
];

const difficultyColors = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function OncoCasePage() {
  const [clinicalCases, setClinicalCases] = useState<ClinicalCase[]>(initialClinicalCases);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<ClinicalCase | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<ClinicalCase, 'id'>>({
    diagnosis: '',
    technique: '',
    dose: '',
    toxicity: '',
    outcome: '',
    difficulty: 'beginner',
  });

  const handleOpenModal = (caseItem?: ClinicalCase) => {
    if (caseItem) {
      setEditingCase(caseItem);
      setFormData({
        diagnosis: caseItem.diagnosis,
        technique: caseItem.technique,
        dose: caseItem.dose,
        toxicity: caseItem.toxicity,
        outcome: caseItem.outcome,
        difficulty: caseItem.difficulty,
      });
    } else {
      setEditingCase(null);
      setFormData({
        diagnosis: '',
        technique: '',
        dose: '',
        toxicity: '',
        outcome: '',
        difficulty: 'beginner',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCase(null);
    setFormData({
      diagnosis: '',
      technique: '',
      dose: '',
      toxicity: '',
      outcome: '',
      difficulty: 'beginner',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCase) {
      setClinicalCases(clinicalCases.map(c => 
        c.id === editingCase.id 
          ? { ...editingCase, ...formData }
          : c
      ));
    } else {
      const newCase: ClinicalCase = {
        id: Math.max(...clinicalCases.map(c => c.id), 0) + 1,
        ...formData,
      };
      setClinicalCases([...clinicalCases, newCase]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setClinicalCases(clinicalCases.filter(c => c.id !== deletingId));
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">OncoCase Trainer</h1>
          <p className="text-slate-600 mt-1">Kumpulan Kasus Klinik</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Kasus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <BriefcaseMedical className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">
              {clinicalCases.length}
            </span>
          </div>
          <p className="text-slate-600">Total Kasus</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">156</span>
          </div>
          <p className="text-slate-600">Total Percobaan</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <BriefcaseMedical className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">82%</span>
          </div>
          <p className="text-slate-600">Avg. Score</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Daftar Kasus Klinik</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {clinicalCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {caseItem.diagnosis}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        difficultyColors[caseItem.difficulty as keyof typeof difficultyColors]
                      }`}
                    >
                      {caseItem.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenModal(caseItem)}
                      className="p-2 text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(caseItem.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Teknik</p>
                    <p className="font-medium text-slate-900">
                      {caseItem.technique}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Dosis</p>
                    <p className="font-medium text-slate-900">{caseItem.dose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Toksisitas</p>
                    <p className="font-medium text-slate-900">
                      {caseItem.toxicity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Outcome</p>
                    <p className="font-medium text-slate-900">
                      {caseItem.outcome}
                    </p>
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
        title={editingCase ? 'Edit Kasus Klinik' : 'Tambah Kasus Klinik Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Diagnosis
            </label>
            <input
              type="text"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              required
              placeholder="Contoh: Karsinoma Nasofaring T3N2M0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Teknik
              </label>
              <input
                type="text"
                value={formData.technique}
                onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: IMRT"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dosis
              </label>
              <input
                type="text"
                value={formData.dose}
                onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: 70 Gy/35 fraksi"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Toksisitas
              </label>
              <input
                type="text"
                value={formData.toxicity}
                onChange={(e) => setFormData({ ...formData, toxicity: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: Grade 2 Mucositis"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Outcome
              </label>
              <input
                type="text"
                value={formData.outcome}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: Complete Response"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tingkat Kesulitan
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
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
              {editingCase ? 'Simpan Perubahan' : 'Tambah Kasus'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Kasus?"
        message="Apakah Anda yakin ingin menghapus kasus klinik ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
}
