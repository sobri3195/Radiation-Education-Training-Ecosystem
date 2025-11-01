'use client';

import { motion } from 'framer-motion';
import { Home, Construction } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description: string;
  features?: string[];
}

export default function ComingSoon({ title, description, features = [] }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-12 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Construction className="w-24 h-24 mx-auto text-amber-500 mb-6" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>

          {features.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Fitur yang Akan Datang:</h3>
              <ul className="space-y-2 text-left max-w-md mx-auto">
                {features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition text-lg"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            Fitur ini sedang dalam pengembangan dan akan segera tersedia
          </p>
        </motion.div>
      </div>
    </div>
  );
}
