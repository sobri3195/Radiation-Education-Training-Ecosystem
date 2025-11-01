'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';
import { addXP } from '@/lib/localStorage';

export default function PhysicsVisualizerPage() {
  const [particleType, setParticleType] = useState<'photon' | 'electron' | 'proton'>('photon');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimate = () => {
    setIsAnimating(true);
    addXP(5);
    setTimeout(() => setIsAnimating(false), 3000);
  };

  return (
    <PageTemplate
      title="Radiation Physics Visualizer"
      description="Visualisasi animasi partikel radiasi dan interaksi dengan jaringan"
      icon={Zap}
      iconColor="text-yellow-600"
      gradientFrom="from-yellow-50"
      gradientTo="to-orange-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Pilih Jenis Partikel</h2>
          <div className="space-y-3 mb-6">
            {[
              { type: 'photon' as const, name: 'Photon (X-ray)', color: 'from-blue-500 to-cyan-500', desc: 'Radiasi elektromagnetik, penetrasi tinggi' },
              { type: 'electron' as const, name: 'Electron', color: 'from-purple-500 to-pink-500', desc: 'Partikel bermuatan, penetrasi sedang' },
              { type: 'proton' as const, name: 'Proton', color: 'from-red-500 to-orange-500', desc: 'Partikel berat, Bragg peak' },
            ].map((particle) => (
              <button
                key={particle.type}
                onClick={() => setParticleType(particle.type)}
                className={`w-full p-4 rounded-lg text-left transition ${
                  particleType === particle.type
                    ? `bg-gradient-to-r ${particle.color} text-white shadow-lg`
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                <div className="font-bold">{particle.name}</div>
                <div className="text-sm opacity-90">{particle.desc}</div>
              </button>
            ))}
          </div>
          <button
            onClick={handleAnimate}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Mulai Animasi
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-xl p-6 min-h-[400px] relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-4">Visualisasi Interaksi</h2>
          
          <div className="relative h-80">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-64 bg-gradient-to-br from-pink-200 to-red-200 rounded-lg opacity-50 flex items-center justify-center">
                <span className="text-gray-700 font-semibold">Tissue</span>
              </div>
            </div>

            {isAnimating && (
              <>
                {[...Array(10)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: 0, y: idx * 30, opacity: 1 }}
                    animate={{ x: 400, opacity: 0 }}
                    transition={{ duration: 2, delay: idx * 0.2 }}
                    className={`absolute w-2 h-2 rounded-full ${
                      particleType === 'photon' ? 'bg-cyan-400' :
                      particleType === 'electron' ? 'bg-purple-400' :
                      'bg-red-400'
                    }`}
                  />
                ))}
              </>
            )}
          </div>

          <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
            <div className="font-semibold mb-1">Karakteristik {particleType.toUpperCase()}</div>
            <div className="text-xs opacity-90">
              {particleType === 'photon' && 'Penetrasi dalam, deposit energi gradual'}
              {particleType === 'electron' && 'Penetrasi terbatas, dosis superfisial tinggi'}
              {particleType === 'proton' && 'Deposit energi pada Bragg peak, sparing jaringan normal'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Photoelectric Effect', desc: 'Absorpsi photon lengkap, transfer energi ke elektron', energy: 'Low energy' },
          { title: 'Compton Scattering', desc: 'Photon tersebar, energi sebagian ditransfer', energy: 'Medium energy' },
          { title: 'Pair Production', desc: 'Photon berubah menjadi pasangan elektron-positron', energy: 'High energy (>1.02 MeV)' },
        ].map((interaction, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="font-bold text-lg mb-2">{interaction.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{interaction.desc}</p>
            <div className="text-xs font-semibold text-blue-600">{interaction.energy}</div>
          </motion.div>
        ))}
      </div>
    </PageTemplate>
  );
}
