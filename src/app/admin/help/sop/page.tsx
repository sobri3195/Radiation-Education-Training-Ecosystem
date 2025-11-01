'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';

export default function HelpSopPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">SOP Kurasi Konten</h1>
        <p className="text-slate-600 mt-1">Standard Operating Procedure untuk kurasi konten</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="prose prose-slate max-w-none">
          <h2>Informasi</h2>
          <p>
            Konten untuk sop kurasi konten akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </div>
  );
}
