'use client';

import React, { useState } from 'react';
import { FileText, Search, Plus, Edit2, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';

interface Template {
  id: number;
  nama_template: string;
  jenis_kanker: string;
  fraksi: number;
  dosis_per_fraksi: number;
  total_dosis: number;
  alpha_beta: number;
}

const initialTemplates: Template[] = [
  {
    id: 1,
    nama_template: 'Nasofaring Standard',
    jenis_kanker: 'Karsinoma Nasofaring',
    fraksi: 35,
    dosis_per_fraksi: 2.0,
    total_dosis: 70,
    alpha_beta: 10,
  },
  {
    id: 2,
    nama_template: 'Mammae Konvensional',
    jenis_kanker: 'Ca Mammae',
    fraksi: 25,
    dosis_per_fraksi: 2.0,
    total_dosis: 50,
    alpha_beta: 4,
  },
  {
    id: 3,
    nama_template: 'SBRT Paru',
    jenis_kanker: 'Ca Paru NSCLC',
    fraksi: 4,
    dosis_per_fraksi: 12.5,
    total_dosis: 50,
    alpha_beta: 10,
  },
];

export default function SimudoseTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Template, 'id' | 'total_dosis'>>({
    nama_template: '',
    jenis_kanker: '',
    fraksi: 0,
    dosis_per_fraksi: 0,
    alpha_beta: 10,
  });

  const handleOpenModal = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        nama_template: template.nama_template,
        jenis_kanker: template.jenis_kanker,
        fraksi: template.fraksi,
        dosis_per_fraksi: template.dosis_per_fraksi,
        alpha_beta: template.alpha_beta,
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        nama_template: '',
        jenis_kanker: '',
        fraksi: 0,
        dosis_per_fraksi: 0,
        alpha_beta: 10,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTemplate(null);
    setFormData({
      nama_template: '',
      jenis_kanker: '',
      fraksi: 0,
      dosis_per_fraksi: 0,
      alpha_beta: 10,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const total_dosis = formData.fraksi * formData.dosis_per_fraksi;
    
    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { ...editingTemplate, ...formData, total_dosis }
          : t
      ));
    } else {
      const newTemplate: Template = {
        id: Math.max(...templates.map(t => t.id), 0) + 1,
        ...formData,
        total_dosis,
      };
      setTemplates([...templates, newTemplate]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setTemplates(templates.filter(t => t.id !== deletingId));
      setDeletingId(null);
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.nama_template.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.jenis_kanker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Template Skema Fraksi</h1>
          <p className="text-slate-600 mt-1">Kelola template skema fraksinasi untuk berbagai jenis kanker</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Tambah Template
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-slate-700">Nama Template</th>
                <th className="text-left py-4 px-4 font-bold text-slate-700">Jenis Kanker</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Fraksi</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Dosis/Fraksi (Gy)</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Total Dosis (Gy)</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">α/β</th>
                <th className="text-center py-4 px-4 font-bold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900">{template.nama_template}</td>
                  <td className="py-4 px-4 text-slate-700">{template.jenis_kanker}</td>
                  <td className="py-4 px-4 text-center">{template.fraksi}x</td>
                  <td className="py-4 px-4 text-center">{template.dosis_per_fraksi} Gy</td>
                  <td className="py-4 px-4 text-center font-semibold text-radiate-purple">{template.total_dosis} Gy</td>
                  <td className="py-4 px-4 text-center">{template.alpha_beta}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(template)}
                        className="p-2 text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(template.id)}
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTemplate ? 'Edit Template' : 'Tambah Template Baru'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nama Template
              </label>
              <input
                type="text"
                value={formData.nama_template}
                onChange={(e) => setFormData({ ...formData, nama_template: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: Nasofaring Standard"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jenis Kanker
              </label>
              <input
                type="text"
                value={formData.jenis_kanker}
                onChange={(e) => setFormData({ ...formData, jenis_kanker: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                placeholder="Contoh: Karsinoma Nasofaring"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jumlah Fraksi
              </label>
              <input
                type="number"
                value={formData.fraksi || ''}
                onChange={(e) => setFormData({ ...formData, fraksi: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                min="1"
                placeholder="35"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dosis per Fraksi (Gy)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.dosis_per_fraksi || ''}
                onChange={(e) => setFormData({ ...formData, dosis_per_fraksi: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                min="0.1"
                placeholder="2.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                α/β Ratio
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.alpha_beta || ''}
                onChange={(e) => setFormData({ ...formData, alpha_beta: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
                required
                min="0.1"
                placeholder="10"
              />
            </div>
          </div>

          {formData.fraksi > 0 && formData.dosis_per_fraksi > 0 && (
            <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
              <p className="text-sm text-slate-600 mb-1">Total Dosis (preview)</p>
              <p className="text-2xl font-bold text-radiate-purple">
                {(formData.fraksi * formData.dosis_per_fraksi).toFixed(2)} Gy
              </p>
            </div>
          )}

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
              {editingTemplate ? 'Simpan Perubahan' : 'Tambah Template'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Template?"
        message="Apakah Anda yakin ingin menghapus template ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
}
