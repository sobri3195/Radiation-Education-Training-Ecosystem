'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, Plus, Download, Edit, Trash2 } from 'lucide-react';
import DataTableWithExport from '@/components/DataTableWithExport';

export default function Data_ValidationPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'dataset', label: 'Dataset' }, { key: 'status', label: 'Status' }, { key: 'record_valid', label: 'Record Valid' }, { key: 'record_dianonimkan', label: 'Record Dianonimkan' }
  ];

  const sampleData: any[] = [
    // Sample data - connect to Google Sheets or backend API
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Anonimisasi & Validasi Data</h1>
          <p className="text-slate-600 mt-1">Validasi dan anonimisasi data pasien</p>
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
          title="Anonimisasi & Validasi Data"
          exportFileName="data-validation"
        />
      </div>
    </div>
  );
}
