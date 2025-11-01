'use client';

import React from 'react';
import { MapPin, TrendingUp, BarChart3 } from 'lucide-react';

const provincesData = [
  {
    province: 'DKI Jakarta',
    incidence: 45234,
    topCancer: 'Payudara',
    outcomeRate: '78%',
  },
  {
    province: 'Jawa Barat',
    incidence: 38921,
    topCancer: 'Cervix',
    outcomeRate: '72%',
  },
  {
    province: 'Jawa Timur',
    incidence: 42156,
    topCancer: 'Paru',
    outcomeRate: '65%',
  },
  {
    province: 'Jawa Tengah',
    incidence: 35678,
    topCancer: 'Payudara',
    outcomeRate: '75%',
  },
  {
    province: 'Sumatera Utara',
    incidence: 28934,
    topCancer: 'Nasofaring',
    outcomeRate: '70%',
  },
];

export default function CancerMapPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Kanker di Sekitarku
        </h1>
        <p className="text-slate-600 mt-1">
          Visualisasi Data Kanker Regional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <MapPin className="w-8 h-8 text-radiate-purple" />
            <span className="text-2xl font-bold text-slate-900">34</span>
          </div>
          <p className="text-slate-600">Provinsi Tercatat</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-radiate-blue" />
            <span className="text-2xl font-bold text-slate-900">190K</span>
          </div>
          <p className="text-slate-600">Total Kasus/Tahun</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-radiate-emerald" />
            <span className="text-2xl font-bold text-slate-900">72%</span>
          </div>
          <p className="text-slate-600">Avg. Success Rate</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Data Kanker per Provinsi
          </h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Provinsi
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Insidensi
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Kanker Terbanyak
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Success Rate
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {provincesData.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-radiate-purple" />
                        <span className="font-medium text-slate-900">
                          {data.province}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-900">
                      {data.incidence.toLocaleString('id-ID')}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {data.topCancer}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-emerald-600">
                        {data.outcomeRate}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="px-4 py-2 text-sm font-medium text-radiate-purple hover:bg-purple-50 rounded-lg transition-colors">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-3">Informasi Data</h3>
        <p className="text-sm text-slate-300">
          Data dianonimisasi untuk tujuan edukasi publik. Sumber: Kementerian
          Kesehatan RI dan Rumah Sakit Partner
        </p>
      </div>
    </div>
  );
}
