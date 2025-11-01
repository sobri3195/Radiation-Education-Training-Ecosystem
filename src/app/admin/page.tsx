'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Database,
  ExternalLink,
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Pengguna',
    value: '1,234',
    change: '+12.5%',
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Kasus Klinik',
    value: '89',
    change: '+5.2%',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Modul Edukasi',
    value: '10',
    change: '100%',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Engagement Rate',
    value: '87.3%',
    change: '+3.1%',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-orange-500 to-orange-600',
  },
];

const recentActivities = [
  {
    id: 1,
    user: 'Dr. Ahmad Rizki',
    action: 'Menambahkan kasus klinik baru',
    module: 'OncoCase Trainer',
    time: '2 jam yang lalu',
  },
  {
    id: 2,
    user: 'Dr. Sarah Putri',
    action: 'Update data organ dosis',
    module: 'OncoMap',
    time: '5 jam yang lalu',
  },
  {
    id: 3,
    user: 'Dr. Budi Santoso',
    action: 'Menambahkan mitos baru',
    module: 'MythBuster',
    time: '1 hari yang lalu',
  },
  {
    id: 4,
    user: 'Dr. Rina Wijaya',
    action: 'Update data kanker regional',
    module: 'Kanker di Sekitarku',
    time: '2 hari yang lalu',
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Selamat datang di RADIATE Admin Panel
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/demo"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm font-medium">Lihat Demo</span>
          </Link>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
              <span className="text-sm font-semibold text-emerald-600">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-sm text-slate-600 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-radiate-purple" />
            <h2 className="text-xl font-bold text-slate-900">
              Aktivitas Terkini
            </h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-radiate-purple to-radiate-blue flex items-center justify-center text-white font-semibold text-sm">
                  {activity.user.charAt(4)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-radiate-purple font-medium">
                      {activity.module}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-radiate-blue" />
            <h2 className="text-xl font-bold text-slate-900">
              Status Google Sheets
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Clinical Cases', status: 'connected', records: 89 },
              { name: 'Myths Database', status: 'connected', records: 45 },
              { name: 'Organ Doses', status: 'connected', records: 32 },
              { name: 'Cancer Data', status: 'connected', records: 156 },
              { name: 'Patient Journey', status: 'connected', records: 12 },
              { name: 'Side Effects', status: 'connected', records: 67 },
              { name: 'Therapy Modalities', status: 'connected', records: 78 },
            ].map((sheet, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium text-slate-900">
                    {sheet.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">
                    {sheet.records} records
                  </span>
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                    {sheet.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-radiate-purple to-radiate-blue rounded-2xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Mulai Mengelola Konten</h2>
        <p className="text-blue-100 mb-6">
          Pilih modul dari sidebar untuk mulai mengelola konten edukasi dan
          pelatihan radiasi onkologi
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <BookOpen className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">Konten Edukasi</h3>
            <p className="text-sm text-blue-100">
              Kelola materi edukasi publik
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <Activity className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">Kasus Klinik</h3>
            <p className="text-sm text-blue-100">
              Tambah & edit kasus pelatihan
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <Database className="w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-1">Data Management</h3>
            <p className="text-sm text-blue-100">
              Sinkronisasi Google Sheets
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
