'use client';

import React, { useState } from 'react';
import { FileText, Search, Plus, Download, Edit, Trash2 } from 'lucide-react';
import DataTableWithExport from '@/components/DataTableWithExport';

export default function Journey_Pre_TreatmentPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'judul', label: 'Judul' }, { key: 'jenis_kanker', label: 'Jenis Kanker' }, { key: 'format', label: 'Format' }, { key: 'status', label: 'Status' }
  ];

  const sampleData: any[] = [
    // Sample data - connect to Google Sheets or backend API
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Materi Pre-Treatment</h1>
          <p className="text-slate-600 mt-1">Kelola materi edukasi sebelum treatment</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          Tambah Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
            />
          </div>
        </div>

        <DataTableWithExport
          columns={columns}
          data={sampleData}
          title="Materi Pre-Treatment"
          exportFileName="journey-pre-treatment"
        />
      </div>
    </div>
  );
}
