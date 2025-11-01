'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ZoomIn, ZoomOut, Eye, Home, Award } from 'lucide-react';
import Link from 'next/link';
import { addXP, unlockAchievement } from '@/lib/localStorage';

export default function Anatomy3DPage() {
  const [selectedOrgan, setSelectedOrgan] = useState('whole-body');
  const [rotation, setRotation] = useState(0);
  const [doseView, setDoseView] = useState(true);
  const [xpEarned, setXpEarned] = useState(false);

  const organs = [
    { id: 'whole-body', name: 'Whole Body', maxDose: '50 Gy', constraint: 'Total body irradiation' },
    { id: 'brain', name: 'Brain', maxDose: '60 Gy', constraint: 'Brainstem < 54 Gy' },
    { id: 'spinal-cord', name: 'Spinal Cord', maxDose: '50 Gy', constraint: 'Max point dose' },
    { id: 'parotid', name: 'Parotid Gland', maxDose: '26 Gy', constraint: 'Mean dose' },
    { id: 'heart', name: 'Heart', maxDose: '35 Gy', constraint: 'Mean dose' },
    { id: 'lung', name: 'Lungs', maxDose: '20 Gy', constraint: 'Mean dose, V20 < 30%' },
    { id: 'liver', name: 'Liver', maxDose: '30 Gy', constraint: 'Mean dose' },
    { id: 'kidney', name: 'Kidneys', maxDose: '23 Gy', constraint: 'Mean dose (bilateral)' },
    { id: 'bladder', name: 'Bladder', maxDose: '65 Gy', constraint: 'Max dose' },
    { id: 'rectum', name: 'Rectum', maxDose: '60 Gy', constraint: 'V50 < 50%' },
  ];

  const selectedOrganData = organs.find(o => o.id === selectedOrgan) || organs[0];

  const handleOrganClick = (organId: string) => {
    setSelectedOrgan(organId);
    if (!xpEarned) {
      addXP(5);
      setXpEarned(true);
      if (organId === 'spinal-cord') {
        unlockAchievement('radBio-master');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive 3D Anatomy Viewer
          </h1>
          <p className="text-lg text-gray-600">
            Eksplorasi model tubuh 3D dengan visualisasi dosis radiasi
          </p>
          {xpEarned && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mt-4"
            >
              <Award className="w-5 h-5" />
              <span>+5 XP Earned!</span>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white">
                <h2 className="text-xl font-bold">3D Model Viewer</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDoseView(!doseView)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setRotation(rotation + 45)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-square bg-gradient-to-br from-slate-900 to-blue-900 p-8">
                <motion.div
                  animate={{ rotate: rotation }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 200 400"
                    className="w-full h-full"
                    style={{ maxHeight: '500px' }}
                  >
                    <rect
                      x="75"
                      y="20"
                      width="50"
                      height="60"
                      rx="25"
                      fill={selectedOrgan === 'brain' ? '#ef4444' : '#94a3b8'}
                      opacity={doseView ? 0.8 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('brain')}
                    />
                    <ellipse
                      cx="100"
                      cy="120"
                      rx="60"
                      ry="70"
                      fill={selectedOrgan === 'lung' ? '#ef4444' : '#94a3b8'}
                      opacity={doseView ? 0.7 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('lung')}
                    />
                    <ellipse
                      cx="100"
                      cy="140"
                      rx="30"
                      ry="20"
                      fill={selectedOrgan === 'heart' ? '#dc2626' : '#64748b'}
                      opacity={doseView ? 0.9 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('heart')}
                    />
                    <rect
                      x="70"
                      y="180"
                      width="60"
                      height="50"
                      rx="10"
                      fill={selectedOrgan === 'liver' ? '#ef4444' : '#94a3b8'}
                      opacity={doseView ? 0.6 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('liver')}
                    />
                    <ellipse
                      cx="80"
                      cy="210"
                      rx="15"
                      ry="20"
                      fill={selectedOrgan === 'kidney' ? '#f59e0b' : '#94a3b8'}
                      opacity={doseView ? 0.7 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('kidney')}
                    />
                    <ellipse
                      cx="120"
                      cy="210"
                      rx="15"
                      ry="20"
                      fill={selectedOrgan === 'kidney' ? '#f59e0b' : '#94a3b8'}
                      opacity={doseView ? 0.7 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('kidney')}
                    />
                    <rect
                      x="80"
                      y="250"
                      width="40"
                      height="40"
                      rx="10"
                      fill={selectedOrgan === 'bladder' ? '#3b82f6' : '#94a3b8'}
                      opacity={doseView ? 0.7 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('bladder')}
                    />
                    <rect
                      x="85"
                      y="290"
                      width="30"
                      height="50"
                      rx="10"
                      fill={selectedOrgan === 'rectum' ? '#8b5cf6' : '#94a3b8'}
                      opacity={doseView ? 0.7 : 1}
                      className="cursor-pointer hover:opacity-100 transition"
                      onClick={() => handleOrganClick('rectum')}
                    />
                    <line
                      x1="100"
                      y1="80"
                      x2="100"
                      y2="250"
                      stroke={selectedOrgan === 'spinal-cord' ? '#fbbf24' : '#475569'}
                      strokeWidth="6"
                      opacity={doseView ? 0.8 : 1}
                      className="cursor-pointer"
                      onClick={() => handleOrganClick('spinal-cord')}
                    />
                  </svg>
                </motion.div>

                {doseView && (
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                    <div className="text-xs font-semibold mb-2">Dose Color Map</div>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded" />
                        <span>High Dose (&gt; 50 Gy)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-amber-500 rounded" />
                        <span>Medium Dose (30-50 Gy)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded" />
                        <span>Low Dose (&lt; 30 Gy)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {selectedOrganData.name}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Maximum Dose</div>
                  <div className="text-2xl font-bold text-red-600">{selectedOrganData.maxDose}</div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Dose Constraint</div>
                  <div className="text-sm text-gray-900">{selectedOrganData.constraint}</div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Clinical Note</div>
                  <div className="text-xs text-gray-700">
                    Dose constraints are based on QUANTEC guidelines. Always consider individual patient factors and institutional protocols.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Select Organ</h3>
              <div className="grid grid-cols-2 gap-2">
                {organs.slice(1).map((organ) => (
                  <button
                    key={organ.id}
                    onClick={() => handleOrganClick(organ.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition ${
                      selectedOrgan === organ.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {organ.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
