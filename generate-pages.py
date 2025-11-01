#!/usr/bin/env python3

import os

# Define all pages with their metadata
pages = [
    # KONTEN EDUKASI
    {
        'path': 'edu/categories',
        'title': 'Kategori & Tag',
        'description': 'Kelola kategori dan tag untuk konten edukasi',
        'icon': 'Tag',
        'has_table': True,
        'table_columns': ['Nama Kategori', 'Jumlah Konten', 'Status', 'Aksi'],
    },
    {
        'path': 'edu/faq',
        'title': 'FAQ Publik',
        'description': 'Kelola pertanyaan dan jawaban yang sering ditanyakan',
        'icon': 'MessageCircleQuestion',
        'has_table': True,
        'table_columns': ['Pertanyaan', 'Kategori', 'Status', 'Aksi'],
    },
    {
        'path': 'edu/faq/new',
        'title': 'Tambah Pertanyaan Baru',
        'description': 'Tambahkan pertanyaan dan jawaban baru ke FAQ',
        'icon': 'Plus',
        'is_form': True,
    },
    {
        'path': 'mythbuster/new',
        'title': 'Tambah Mitos Baru',
        'description': 'Tambahkan entri mitos vs fakta baru',
        'icon': 'Plus',
        'is_form': True,
    },
    {
        'path': 'edu/references',
        'title': 'Referensi Literatur',
        'description': 'Kelola database referensi literatur dan publikasi',
        'icon': 'FileStack',
        'has_table': True,
        'table_columns': ['Judul', 'Penulis', 'Tahun', 'Jurnal', 'Aksi'],
    },
    
    # SIMULASI & PELATIHAN
    {
        'path': 'simudose/history',
        'title': 'Riwayat Perhitungan SimuDose',
        'description': 'Lihat riwayat perhitungan BED/EQD₂ yang telah dilakukan',
        'icon': 'History',
        'has_table': True,
        'table_columns': ['Tanggal', 'User', 'Jenis Kanker', 'Dosis', 'Hasil'],
    },
    {
        'path': 'simudose/templates',
        'title': 'Template Skema Fraksi',
        'description': 'Kelola template skema fraksinasi untuk berbagai jenis kanker',
        'icon': 'FileText',
        'has_table': True,
        'table_columns': ['Nama Template', 'Jenis Kanker', 'Fraksi', 'Dosis/Fraksi'],
    },
    {
        'path': 'oncocase/new',
        'title': 'Editor Skenario Kasus',
        'description': 'Buat kasus klinik baru untuk pelatihan',
        'icon': 'Plus',
        'is_form': True,
    },
    {
        'path': 'oncocase/keys',
        'title': 'Kunci Jawaban & Skor',
        'description': 'Kelola kunci jawaban dan sistem penskoran kasus',
        'icon': 'Key',
        'has_table': True,
        'table_columns': ['Kasus', 'Pertanyaan', 'Jawaban Benar', 'Poin'],
    },
    {
        'path': 'oncocase/analytics',
        'title': 'Analitik Kinerja Peserta',
        'description': 'Dashboard analitik kinerja peserta dalam menyelesaikan kasus',
        'icon': 'BarChart3',
        'has_chart': True,
    },
    {
        'path': 'minilab/packages',
        'title': 'Paket Ujian',
        'description': 'Kelola paket soal dan ujian Mini-Lab',
        'icon': 'Package',
        'has_table': True,
        'table_columns': ['Nama Paket', 'Jumlah Soal', 'Durasi', 'Status'],
    },
    {
        'path': 'minilab/results',
        'title': 'Hasil & Sertifikat',
        'description': 'Lihat hasil ujian dan kelola sertifikat peserta',
        'icon': 'Award',
        'has_table': True,
        'table_columns': ['Peserta', 'Paket', 'Skor', 'Status', 'Sertifikat'],
    },
    
    # PETA PENGETAHUAN (OncoMap)
    {
        'path': 'oncomap/side-effects',
        'title': 'Efek Samping Terkait OAR',
        'description': 'Kelola data efek samping terkait organ at risk',
        'icon': 'AlertCircle',
        'has_table': True,
        'table_columns': ['Organ', 'Efek Samping', 'Grade', 'Dosis Threshold'],
    },
    {
        'path': 'map/techniques',
        'title': 'Teknik & Modalitas Radiasi',
        'description': 'Database teknik radioterapi: IMRT, VMAT, 3D-CRT, SBRT',
        'icon': 'Target',
        'has_table': True,
        'table_columns': ['Teknik', 'Indikasi', 'Keunggulan', 'Keterbatasan'],
    },
    {
        'path': 'map/clinical-notes',
        'title': 'Catatan Klinis & Tips',
        'description': 'Catatan praktis dan tips klinis untuk praktisi',
        'icon': 'Lightbulb',
        'has_table': True,
        'table_columns': ['Topik', 'Kategori', 'Catatan', 'Penulis'],
    },
    
    # PERJALANAN PASIEN
    {
        'path': 'journey/pre-treatment',
        'title': 'Materi Pre-Treatment',
        'description': 'Kelola materi edukasi sebelum treatment',
        'icon': 'FileText',
        'has_table': True,
        'table_columns': ['Judul', 'Jenis Kanker', 'Format', 'Status'],
    },
    {
        'path': 'journey/follow-up',
        'title': 'Edukasi Follow-up',
        'description': 'Materi edukasi untuk follow-up pasien',
        'icon': 'ClipboardList',
        'has_table': True,
        'table_columns': ['Judul', 'Timeline', 'Target', 'Status'],
    },
    {
        'path': 'side-effects/care',
        'title': 'Anjuran Perawatan',
        'description': 'Panduan perawatan mandiri untuk efek samping',
        'icon': 'Heart',
        'has_table': True,
        'table_columns': ['Efek Samping', 'Anjuran', 'Kontraindikasi'],
    },
    {
        'path': 'side-effects/red-flags',
        'title': 'Red Flags & Kapan ke RS',
        'description': 'Tanda bahaya dan indikasi untuk kembali ke rumah sakit',
        'icon': 'AlertTriangle',
        'has_table': True,
        'table_columns': ['Gejala', 'Tingkat Urgensi', 'Tindakan', 'Status'],
    },
    
    # DATA & VISUALISASI
    {
        'path': 'data/outcomes',
        'title': 'Outcome & Tren',
        'description': 'Analisis outcome terapi dan tren data',
        'icon': 'TrendingUp',
        'has_chart': True,
    },
    {
        'path': 'data/validation',
        'title': 'Anonimisasi & Validasi Data',
        'description': 'Validasi dan anonimisasi data pasien',
        'icon': 'ShieldCheck',
        'has_table': True,
        'table_columns': ['Dataset', 'Status', 'Record Valid', 'Record Dianonimkan'],
    },
    {
        'path': 'therapy-table/combinations',
        'title': 'Kombinasi Terapi',
        'description': 'Database kombinasi terapi radiasi dengan modalitas lain',
        'icon': 'GitMerge',
        'has_table': True,
        'table_columns': ['Jenis Kanker', 'Radiasi', 'Kombinasi', 'Evidens'],
    },
    
    # LAPORAN
    {
        'path': 'reports/education',
        'title': 'Laporan Edukasi',
        'description': 'Laporan aktivitas dan engagement konten edukasi',
        'icon': 'FileText',
        'has_chart': True,
    },
    {
        'path': 'reports/training',
        'title': 'Laporan Pelatihan',
        'description': 'Laporan progress pelatihan dan kasus klinik',
        'icon': 'GraduationCap',
        'has_chart': True,
    },
    {
        'path': 'reports/simulation',
        'title': 'Laporan Simulasi',
        'description': 'Laporan penggunaan SimuDose dan Mini-Lab',
        'icon': 'Activity',
        'has_chart': True,
    },
    {
        'path': 'reports/export',
        'title': 'Ekspor Laporan',
        'description': 'Ekspor laporan ke format PDF atau CSV',
        'icon': 'Download',
        'has_table': False,
    },
    
    # GOOGLE SHEETS MAPPING
    {
        'path': 'sheets/mapping/eduradi',
        'title': 'Mapping: EduRadi Content',
        'description': 'Pemetaan kolom Google Sheet untuk konten edukasi',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/mythbuster',
        'title': 'Mapping: MythBuster DB',
        'description': 'Pemetaan kolom Google Sheet untuk MythBuster',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/simudose',
        'title': 'Mapping: SimuDose Presets',
        'description': 'Pemetaan kolom Google Sheet untuk preset SimuDose',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/oncocase',
        'title': 'Mapping: OncoCase Bank',
        'description': 'Pemetaan kolom Google Sheet untuk bank kasus',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/oar',
        'title': 'Mapping: OAR Dose Limits',
        'description': 'Pemetaan kolom Google Sheet untuk batas dosis OAR',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/journey',
        'title': 'Mapping: Patient Journey',
        'description': 'Pemetaan kolom Google Sheet untuk patient journey',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/side-effects',
        'title': 'Mapping: Side Effects Guide',
        'description': 'Pemetaan kolom Google Sheet untuk panduan efek samping',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/cancer',
        'title': 'Mapping: Cancer Incidence',
        'description': 'Pemetaan kolom Google Sheet untuk data insidensi kanker',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/mapping/therapy',
        'title': 'Mapping: Therapy Modalities',
        'description': 'Pemetaan kolom Google Sheet untuk modalitas terapi',
        'icon': 'FileSpreadsheet',
        'is_mapping': True,
    },
    {
        'path': 'sheets/validation',
        'title': 'Validasi Kolom & Data',
        'description': 'Validasi struktur dan integritas data Google Sheets',
        'icon': 'CheckCircle',
        'has_table': True,
        'table_columns': ['Sheet', 'Status', 'Kolom Valid', 'Error'],
    },
    {
        'path': 'sheets/templates',
        'title': 'Impor/Ekspor Template',
        'description': 'Template Google Sheets untuk berbagai modul',
        'icon': 'Download',
        'has_table': True,
        'table_columns': ['Template', 'Modul', 'Versi', 'Aksi'],
    },
    
    # PENGGUNA & PERAN
    {
        'path': 'users',
        'title': 'Daftar Pengguna',
        'description': 'Kelola pengguna platform RADIATE',
        'icon': 'Users',
        'has_table': True,
        'table_columns': ['Nama', 'Email', 'Peran', 'Status', 'Terakhir Login'],
    },
    {
        'path': 'users/roles',
        'title': 'Peran & Akses',
        'description': 'Kelola peran dan hak akses pengguna',
        'icon': 'Shield',
        'has_table': True,
        'table_columns': ['Peran', 'Deskripsi', 'Jumlah User', 'Aksi'],
    },
    {
        'path': 'users/audit',
        'title': 'Audit Log',
        'description': 'Log aktivitas dan perubahan sistem',
        'icon': 'FileText',
        'has_table': True,
        'table_columns': ['Waktu', 'User', 'Aksi', 'Modul', 'Detail'],
    },
    
    # PENGATURAN
    {
        'path': 'settings/branding',
        'title': 'Branding & Tema',
        'description': 'Kustomisasi branding dan tema platform',
        'icon': 'Palette',
        'is_form': True,
    },
    {
        'path': 'settings/localization',
        'title': 'Bahasa & Lokalisasi',
        'description': 'Pengaturan bahasa dan format lokalisasi',
        'icon': 'Globe',
        'is_form': True,
    },
    {
        'path': 'settings/privacy',
        'title': 'Privasi & Anonimisasi',
        'description': 'Pengaturan privasi dan anonimisasi data',
        'icon': 'Lock',
        'is_form': True,
    },
    {
        'path': 'settings/integrations',
        'title': 'Integrasi',
        'description': 'Kelola integrasi dengan layanan eksternal',
        'icon': 'Plug',
        'has_table': True,
        'table_columns': ['Layanan', 'Status', 'Terakhir Sync', 'Aksi'],
    },
    {
        'path': 'settings/backup',
        'title': 'Cadangan & Restore',
        'description': 'Backup dan restore data platform',
        'icon': 'Database',
        'has_table': True,
        'table_columns': ['Tanggal', 'Ukuran', 'Status', 'Aksi'],
    },
    
    # BANTUAN
    {
        'path': 'help',
        'title': 'Panduan Admin',
        'description': 'Dokumentasi dan panduan penggunaan admin panel',
        'icon': 'HelpCircle',
        'is_doc': True,
    },
    {
        'path': 'help/sop',
        'title': 'SOP Kurasi Konten',
        'description': 'Standard Operating Procedure untuk kurasi konten',
        'icon': 'FileText',
        'is_doc': True,
    },
    {
        'path': 'help/ethics',
        'title': 'Kebijakan Etik & Disclaimer',
        'description': 'Kebijakan etika dan disclaimer medis',
        'icon': 'AlertCircle',
        'is_doc': True,
    },
]

def generate_table_page(page):
    return f"""'use client';

import React, {{ useState }} from 'react';
import {{ {page['icon']}, Search, Plus, Download, Edit, Trash2 }} from 'lucide-react';
import DataTableWithExport from '@/components/DataTableWithExport';

export default function {page['path'].replace('/', '_').replace('-', '_').title()}Page() {{
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {', '.join([f"{{ key: '{col.lower().replace(' ', '_')}', label: '{col}' }}" for col in page['table_columns']])}
  ];

  const sampleData = [
    // Sample data - connect to Google Sheets or backend API
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{page['title']}</h1>
          <p className="text-slate-600 mt-1">{page['description']}</p>
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
          title="{page['title']}"
          exportFileName="{page['path'].replace('/', '-')}"
        />
      </div>
    </div>
  );
}}
"""

def generate_form_page(page):
    return f"""'use client';

import React, {{ useState }} from 'react';
import {{ {page['icon']}, Save, X }} from 'lucide-react';

export default function {page['path'].replace('/', '_').replace('-', '_').title()}Page() {{
  const [formData, setFormData] = useState({{}});

  const handleSubmit = (e: React.FormEvent) => {{
    e.preventDefault();
    console.log('Submitting:', formData);
    alert('Data berhasil disimpan!');
  }};

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{page['title']}</h1>
        <p className="text-slate-600 mt-1">{page['description']}</p>
      </div>

      <form onSubmit={{handleSubmit}} className="space-y-6">
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
                rows={{4}}
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
            onClick={{() => window.history.back()}}
            className="flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <X className="w-5 h-5" />
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}}
"""

def generate_chart_page(page):
    return f"""'use client';

import React from 'react';
import {{ {page['icon']}, Download, Calendar }} from 'lucide-react';

export default function {page['path'].replace('/', '_').replace('-', '_').title()}Page() {{
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{page['title']}</h1>
          <p className="text-slate-600 mt-1">{page['description']}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Pilih Periode
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all">
            <Download className="w-4 h-4" />
            Ekspor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {{[
          {{ title: 'Total', value: '1,234', change: '+12%', color: 'from-blue-500 to-blue-600' }},
          {{ title: 'Aktif', value: '456', change: '+8%', color: 'from-green-500 to-green-600' }},
          {{ title: 'Selesai', value: '789', change: '+15%', color: 'from-purple-500 to-purple-600' }},
        ].map((stat, idx) => (
          <div key={{idx}} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={{`p-3 rounded-xl bg-gradient-to-br ${{stat.color}} text-white`}}>
                <{page['icon']} className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-green-600">{{stat.change}}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{{stat.value}}</h3>
            <p className="text-sm text-slate-600 mt-1">{{stat.title}}</p>
          </div>
        ))}}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Grafik & Analisis</h2>
        <div className="h-96 flex items-center justify-center bg-slate-50 rounded-lg">
          <p className="text-slate-500">Chart akan ditampilkan di sini</p>
        </div>
      </div>
    </div>
  );
}}
"""

def generate_mapping_page(page):
    return f"""'use client';

import React, {{ useState }} from 'react';
import {{ {page['icon']}, Save, RefreshCw, CheckCircle }} from 'lucide-react';

export default function {page['path'].replace('/', '_').replace('-', '_').title()}Page() {{
  const [mapping, setMapping] = useState({{}});

  const handleSave = () => {{
    console.log('Saving mapping:', mapping);
    alert('Mapping berhasil disimpan!');
  }};

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{page['title']}</h1>
          <p className="text-slate-600 mt-1">{page['description']}</p>
        </div>
        <button
          onClick={{handleSave}}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Save className="w-5 h-5" />
          Simpan Mapping
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Sheet Information</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sheet ID / URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              placeholder="Masukkan ID atau URL Google Sheet..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sheet Name / Tab
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent"
              placeholder="Nama sheet/tab..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Column Mapping</h2>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
            <RefreshCw className="w-4 h-4" />
            Detect Columns
          </button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Field Aplikasi
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kolom Google Sheet
              </label>
            </div>
          </div>
          {{['ID', 'Title', 'Description', 'Status', 'Created Date'].map((field, idx) => (
            <div key={{idx}} className="grid grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">{{field}}</span>
              </div>
              <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent">
                <option value="">Pilih kolom...</option>
                <option value="A">Column A</option>
                <option value="B">Column B</option>
                <option value="C">Column C</option>
              </select>
            </div>
          ))}}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          ✓ Mapping siap digunakan. Klik "Simpan Mapping" untuk menyimpan konfigurasi.
        </p>
      </div>
    </div>
  );
}}
"""

def generate_doc_page(page):
    return f"""'use client';

import React from 'react';
import {{ {page['icon']}, BookOpen, Download }} from 'lucide-react';

export default function {page['path'].replace('/', '_').replace('-', '_').title()}Page() {{
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{page['title']}</h1>
          <p className="text-slate-600 mt-1">{page['description']}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="prose prose-slate max-w-none">
          <h2>Pendahuluan</h2>
          <p>
            Dokumen ini berisi panduan dan informasi penting terkait {page['title'].lower()}.
          </p>

          <h2>Tujuan</h2>
          <ul>
            <li>Memberikan panduan lengkap untuk administrator</li>
            <li>Menjelaskan prosedur standar operasional</li>
            <li>Memastikan konsistensi dalam pengelolaan konten</li>
          </ul>

          <h2>Konten</h2>
          <p>
            Konten dokumentasi akan ditampilkan di sini. Anda dapat menambahkan:
          </p>
          <ul>
            <li>Panduan step-by-step</li>
            <li>Best practices</li>
            <li>Tips dan trik</li>
            <li>FAQ</li>
          </ul>

          <h2>Kontak</h2>
          <p>
            Untuk pertanyaan lebih lanjut, hubungi tim administrator RADIATE.
          </p>
        </div>
      </div>
    </div>
  );
}}
"""

# Generate all pages
for page in pages:
    path = f"src/app/admin/{page['path']}/page.tsx"
    
    # Generate content based on page type
    if page.get('is_form'):
        content = generate_form_page(page)
    elif page.get('is_mapping'):
        content = generate_mapping_page(page)
    elif page.get('is_doc'):
        content = generate_doc_page(page)
    elif page.get('has_chart'):
        content = generate_chart_page(page)
    elif page.get('has_table', False):
        content = generate_table_page(page)
    else:
        content = generate_table_page(page)
    
    # Write file
    with open(path, 'w') as f:
        f.write(content)
    
    print(f"✓ Created: {path}")

print(f"\n✅ Successfully generated {len(pages)} admin pages!")
