'use client';

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar } from 'lucide-react';

export default function ReportsExportPage() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const reportTypes = [
    { id: 'education', name: 'Laporan Edukasi', icon: <FileText className="w-5 h-5" /> },
    { id: 'training', name: 'Laporan Pelatihan', icon: <FileText className="w-5 h-5" /> },
    { id: 'simulation', name: 'Laporan Simulasi', icon: <FileText className="w-5 h-5" /> },
    { id: 'users', name: 'Laporan Pengguna', icon: <FileText className="w-5 h-5" /> },
    { id: 'analytics', name: 'Laporan Analitik', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ekspor Laporan</h1>
        <p className="text-slate-600 mt-1">Ekspor laporan ke format PDF atau CSV</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Pilih Jenis Laporan</h2>
          <div className="space-y-3">
            {reportTypes.map((report) => (
              <label key={report.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-radiate-purple rounded focus:ring-radiate-purple"
                  checked={selectedReports.includes(report.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedReports([...selectedReports, report.id]);
                    } else {
                      setSelectedReports(selectedReports.filter(id => id !== report.id));
                    }
                  }}
                />
                {report.icon}
                <span>{report.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Pengaturan Export</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Format
              </label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent">
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel (XLSX)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Periode
              </label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-radiate-purple focus:border-transparent">
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="quarter">Kuartal Ini</option>
                <option value="year">Tahun Ini</option>
                <option value="custom">Kustom</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                disabled={selectedReports.length === 0}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Ekspor {selectedReports.length} Laporan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
