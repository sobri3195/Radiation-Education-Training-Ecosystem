'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import PageTemplate from '@/components/PageTemplate';
import { addXP } from '@/lib/localStorage';

export default function MachineTourPage() {
  const [currentMachine, setCurrentMachine] = useState(0);

  const machines = [
    {
      name: 'Linear Accelerator (LINAC)',
      image: '🏥',
      description: 'Mesin utama untuk radioterapi eksternal yang menghasilkan sinar-X atau elektron berenergi tinggi',
      components: [
        'Gantry - dapat berputar 360° mengelilingi pasien',
        'Treatment couch - meja pasien yang dapat bergerak dalam 6 dimensi',
        'Multi-leaf collimator (MLC) - membentuk area radiasi',
        'Imaging system - CBCT untuk image-guided radiotherapy',
      ],
      usage: 'Digunakan untuk 90% kasus radioterapi eksternal',
    },
    {
      name: 'CT-Simulator',
      image: '📸',
      description: 'CT scan khusus untuk perencanaan radioterapi dengan laser positioning system',
      components: [
        'CT scanner - mengambil gambar detail area treatment',
        'Laser positioning system - penanda posisi pasien',
        'Flat treatment couch - sama dengan couch di LINAC',
        'Immobilization devices - alat fiksasi posisi pasien',
      ],
      usage: 'Untuk simulasi dan perencanaan treatment sebelum radioterapi',
    },
    {
      name: 'Brachytherapy Unit',
      image: '💎',
      description: 'Sistem untuk terapi radiasi jarak dekat menggunakan sumber radioisotop',
      components: [
        'Remote afterloader - menempatkan sumber radiasi secara otomatis',
        'Applicators - alat aplikasi yang dimasukkan ke dalam/dekat tumor',
        'Shielded room - ruangan dengan pelindung radiasi',
        'Treatment planning computer - perhitungan dosis real-time',
      ],
      usage: 'Untuk kanker serviks, prostat, payudara (boost), dan soft tissue sarcoma',
    },
  ];

  const handleNext = () => {
    setCurrentMachine((prev) => (prev + 1) % machines.length);
    addXP(3);
  };

  const handlePrev = () => {
    setCurrentMachine((prev) => (prev - 1 + machines.length) % machines.length);
  };

  const machine = machines[currentMachine];

  return (
    <PageTemplate
      title="Virtual Radiation Machine Tour"
      description="Tour virtual mesin-mesin radioterapi dan fungsinya"
      icon={Clock}
      iconColor="text-blue-600"
      gradientFrom="from-blue-50"
      gradientTo="to-cyan-50"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {currentMachine + 1} / {machines.length}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMachine}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="p-8"
          >
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{machine.image}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{machine.name}</h3>
              <p className="text-lg text-gray-600">{machine.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Komponen Utama:</h4>
                <ul className="space-y-2">
                  {machine.components.map((component, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="text-sm">{component}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900">Penggunaan Klinis:</h4>
                <p className="text-gray-700 text-sm">{machine.usage}</p>
                
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="text-xs font-semibold text-gray-600 mb-1">Pro Tip:</div>
                  <div className="text-xs text-gray-700">
                    {currentMachine === 0 && 'LINAC modern dilengkapi dengan IGRT untuk akurasi positioning < 2mm'}
                    {currentMachine === 1 && 'CT-Sim menggunakan setting yang sama dengan LINAC untuk konsistensi geometri'}
                    {currentMachine === 2 && 'Brachytherapy memberikan dosis tinggi ke target dengan minimal dosis ke OAR'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {machines.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMachine(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === currentMachine ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">💡 Tahukah Anda?</h3>
        <p className="text-sm opacity-90">
          LINAC modern dapat memberikan dosis radiasi dengan presisi submillimeter dan menyesuaikan treatment berdasarkan pergerakan real-time organ pasien (tracking)
        </p>
      </div>
    </PageTemplate>
  );
}
