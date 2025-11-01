'use client';

import React from 'react';
import { BookOpen, Users, TrendingUp, Eye } from 'lucide-react';

const educationContent = [
  {
    id: 1,
    title: 'Apa itu Terapi Radiasi?',
    description: 'Pengenalan dasar tentang radioterapi dan cara kerjanya',
    views: 1245,
    engagement: '87%',
    status: 'published',
  },
  {
    id: 2,
    title: 'Keamanan Radioterapi',
    description: 'Mitos dan fakta tentang keamanan terapi radiasi',
    views: 892,
    engagement: '82%',
    status: 'published',
  },
  {
    id: 3,
    title: 'Bagaimana Radiasi Menargetkan Sel Kanker',
    description: 'Animasi interaktif mekanisme kerja radiasi',
    views: 1567,
    engagement: '91%',
    status: 'published',
  },
  {
    id: 4,
    title: 'Statistik Kanker di Indonesia',
    description: 'Data insidensi dan outcome terapi kanker',
    views: 723,
    engagement: '76%',
    status: 'draft',
  },
];

export default function EduRadiPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">EduRadi</h1>
          <p className="text-slate-600 mt-1">Pusat Edukasi Publik</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-radiate-purple to-radiate-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all">
          + Tambah Konten
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">4</span>
          </div>
          <p className="text-slate-600">Total Konten</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">4.4K</span>
          </div>
          <p className="text-slate-600">Total Views</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">84%</span>
          </div>
          <p className="text-slate-600">Avg. Engagement</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Konten Edukasi</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {educationContent.map((content) => (
              <div
                key={content.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {content.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {content.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {content.views} views
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {content.engagement} engagement
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      content.status === 'published'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {content.status}
                  </span>
                  <button className="px-4 py-2 text-sm font-medium text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
