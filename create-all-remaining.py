#!/usr/bin/env python3

import os

# Simple template for pages
def create_page(path, title, description, has_table=True):
    component_name = path.replace('/', '_').replace('-', '_').title().replace('_', '')
    
    if has_table:
        content = f"""'use client';

import React, {{ useState }} from 'react';
import {{ BookOpen, Search, Plus, Download }} from 'lucide-react';
import DataTableWithExport from '@/components/DataTableWithExport';

export default function {component_name}Page() {{
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {{ key: 'id', label: 'ID' }},
    {{ key: 'title', label: 'Judul' }},
    {{ key: 'status', label: 'Status' }},
  ];

  const sampleData = [];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-600 mt-1">{description}</p>
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
              value={{searchTerm}}
              onChange={{(e) => setSearchTerm(e.target.value)}}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
            />
          </div>
        </div>

        <DataTableWithExport
          columns={{columns}}
          data={{sampleData}}
          title="{title}"
          exportFileName="{path.replace('/', '-')}"
        />
      </div>
    </div>
  );
}}
"""
    else:
        content = f"""'use client';

import React from 'react';
import {{ BookOpen }} from 'lucide-react';

export default function {component_name}Page() {{
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-600 mt-1">{description}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="prose prose-slate max-w-none">
          <h2>Informasi</h2>
          <p>
            Konten untuk {title.lower()} akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </div>
  );
}}
"""
    
    file_path = f"src/app/admin/{path}/page.tsx"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as f:
        f.write(content)
    print(f"✓ Created: {file_path}")

# Create all missing pages
pages = [
    ("sheets/validation", "Validasi Kolom & Data", "Validasi struktur dan integritas data Google Sheets"),
    ("sheets/templates", "Impor/Ekspor Template", "Template Google Sheets untuk berbagai modul"),
    ("users", "Daftar Pengguna", "Kelola pengguna platform RADIATE"),
    ("users/roles", "Peran & Akses", "Kelola peran dan hak akses pengguna"),
    ("users/audit", "Audit Log", "Log aktivitas dan perubahan sistem"),
    ("settings/branding", "Branding & Tema", "Kustomisasi branding dan tema platform", False),
    ("settings/localization", "Bahasa & Lokalisasi", "Pengaturan bahasa dan format lokalisasi", False),
    ("settings/privacy", "Privasi & Anonimisasi", "Pengaturan privasi dan anonimisasi data", False),
    ("settings/integrations", "Integrasi", "Kelola integrasi dengan layanan eksternal"),
    ("settings/backup", "Cadangan & Restore", "Backup dan restore data platform"),
    ("help", "Panduan Admin", "Dokumentasi dan panduan penggunaan admin panel", False),
    ("help/sop", "SOP Kurasi Konten", "Standard Operating Procedure untuk kurasi konten", False),
    ("help/ethics", "Kebijakan Etik & Disclaimer", "Kebijakan etika dan disclaimer medis", False),
]

for page_info in pages:
    if len(page_info) == 3:
        create_page(page_info[0], page_info[1], page_info[2])
    else:
        create_page(page_info[0], page_info[1], page_info[2], page_info[3])

print(f"\n✅ Successfully created {len(pages)} pages!")
