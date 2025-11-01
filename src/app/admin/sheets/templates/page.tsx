'use client';

import React, { useState } from 'react';
import { BookOpen, Search, Plus, Download } from 'lucide-react';
import DataTableWithExport from '@/components/DataTableWithExport';

export default function SheetsTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Judul' },
    { key: 'status', label: 'Status' },
  ];

  const sampleData: any[] = [];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Impor/Ekspor Template</h1>
          <p className="text-slate-600 mt-1">Template Google Sheets untuk berbagai modul</p>
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
          title="Impor/Ekspor Template"
          exportFileName="sheets-templates"
        />
      </div>
    </div>
  );
}
