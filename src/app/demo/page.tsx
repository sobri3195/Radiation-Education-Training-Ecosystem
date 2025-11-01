'use client';

import { motion } from 'framer-motion';
import AnimatedHero from '@/components/AnimatedHero';
import DataTableWithExport from '@/components/DataTableWithExport';

const sampleClinicalData = [
  { id: 1, diagnosis: 'Breast Cancer', stage: 'II', dose: '50 Gy', fractions: 25, technique: 'IMRT', outcome: 'Complete Response' },
  { id: 2, diagnosis: 'Lung Cancer', stage: 'III', dose: '60 Gy', fractions: 30, technique: 'VMAT', outcome: 'Partial Response' },
  { id: 3, diagnosis: 'Prostate Cancer', stage: 'I', dose: '78 Gy', fractions: 39, technique: 'IMRT', outcome: 'Complete Response' },
  { id: 4, diagnosis: 'Head & Neck Cancer', stage: 'IV', dose: '70 Gy', fractions: 35, technique: 'IMRT', outcome: 'Stable Disease' },
  { id: 5, diagnosis: 'Cervical Cancer', stage: 'IIB', dose: '45 Gy', fractions: 25, technique: 'EBRT', outcome: 'Complete Response' },
  { id: 6, diagnosis: 'Rectal Cancer', stage: 'III', dose: '50.4 Gy', fractions: 28, technique: 'VMAT', outcome: 'Partial Response' },
  { id: 7, diagnosis: 'Brain Metastases', stage: 'IV', dose: '30 Gy', fractions: 10, technique: 'SRS', outcome: 'Stable Disease' },
  { id: 8, diagnosis: 'Nasopharyngeal Ca', stage: 'III', dose: '70 Gy', fractions: 33, technique: 'IMRT', outcome: 'Complete Response' },
  { id: 9, diagnosis: 'Esophageal Cancer', stage: 'II', dose: '50 Gy', fractions: 25, technique: 'VMAT', outcome: 'Partial Response' },
  { id: 10, diagnosis: 'Bladder Cancer', stage: 'II', dose: '64 Gy', fractions: 32, technique: 'IMRT', outcome: 'Complete Response' },
  { id: 11, diagnosis: 'Pancreatic Cancer', stage: 'III', dose: '54 Gy', fractions: 30, technique: 'VMAT', outcome: 'Stable Disease' },
  { id: 12, diagnosis: 'Skin Cancer', stage: 'I', dose: '50 Gy', fractions: 20, technique: 'Electrons', outcome: 'Complete Response' },
];

const patientData = [
  { id: 1, name: 'Ahmad Ridwan', age: 58, gender: 'L', diagnosis: 'Prostate Cancer', status: 'Dalam Perawatan' },
  { id: 2, name: 'Siti Nurhaliza', age: 45, gender: 'P', diagnosis: 'Breast Cancer', status: 'Follow-up' },
  { id: 3, name: 'Budi Santoso', age: 62, gender: 'L', diagnosis: 'Lung Cancer', status: 'Dalam Perawatan' },
  { id: 4, name: 'Dewi Kusuma', age: 51, gender: 'P', diagnosis: 'Cervical Cancer', status: 'Selesai' },
  { id: 5, name: 'Eko Prasetyo', age: 47, gender: 'L', diagnosis: 'Rectal Cancer', status: 'Dalam Perawatan' },
  { id: 6, name: 'Rina Wijaya', age: 39, gender: 'P', diagnosis: 'Brain Tumor', status: 'Follow-up' },
  { id: 7, name: 'Hendra Gunawan', age: 55, gender: 'L', diagnosis: 'Head & Neck Cancer', status: 'Dalam Perawatan' },
  { id: 8, name: 'Maya Sari', age: 43, gender: 'P', diagnosis: 'Ovarian Cancer', status: 'Follow-up' },
  { id: 9, name: 'Rudi Hartono', age: 60, gender: 'L', diagnosis: 'Esophageal Cancer', status: 'Dalam Perawatan' },
  { id: 10, name: 'Linda Pratiwi', age: 48, gender: 'P', diagnosis: 'Uterine Cancer', status: 'Selesai' },
];

const clinicalColumns = [
  { key: 'id', label: 'ID' },
  { key: 'diagnosis', label: 'Diagnosis' },
  { key: 'stage', label: 'Stage' },
  { key: 'dose', label: 'Total Dose' },
  { key: 'fractions', label: 'Fractions' },
  { key: 'technique', label: 'Technique' },
  { key: 'outcome', label: 'Outcome' },
];

const patientColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nama Pasien' },
  { key: 'age', label: 'Usia' },
  { key: 'gender', label: 'Gender' },
  { key: 'diagnosis', label: 'Diagnosis' },
  { key: 'status', label: 'Status' },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatedHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Demo Platform RADIATE</h2>
          <p className="text-gray-600">
            Platform dengan animasi interaktif dan fitur export data ke PDF & Excel
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <DataTableWithExport
            columns={clinicalColumns}
            data={sampleClinicalData}
            title="Data Kasus Klinik Radioterapi"
            exportFileName="kasus-klinik-radioterapi"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <DataTableWithExport
            columns={patientColumns}
            data={patientData}
            title="Data Pasien Radioterapi"
            exportFileName="data-pasien-radioterapi"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Fitur Platform</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="text-4xl mb-2">🎨</div>
              <h4 className="font-semibold text-gray-900 mb-2">Animasi Halus</h4>
              <p className="text-gray-600 text-sm">
                Transisi dan animasi yang smooth menggunakan Framer Motion
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="text-4xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-900 mb-2">DataTables Interaktif</h4>
              <p className="text-gray-600 text-sm">
                Sorting, searching, dan pagination untuk manajemen data yang mudah
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="text-4xl mb-2">📥</div>
              <h4 className="font-semibold text-gray-900 mb-2">Export Data</h4>
              <p className="text-gray-600 text-sm">
                Export ke format PDF dan Excel dengan satu klik
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <a
            href="/admin"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Kembali ke Admin Panel
          </a>
        </motion.div>
      </div>
    </div>
  );
}
