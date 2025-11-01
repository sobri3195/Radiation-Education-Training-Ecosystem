'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Home, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface PageTemplateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  children: ReactNode;
}

export default function PageTemplate({
  title,
  description,
  icon: Icon,
  iconColor = 'text-blue-600',
  gradientFrom = 'from-blue-50',
  gradientTo = 'to-purple-50',
  children,
}: PageTemplateProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientFrom} via-purple-50 ${gradientTo} p-8`}>
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon className={`w-12 h-12 ${iconColor}`} />
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          </div>
          <p className="text-lg text-gray-600">{description}</p>
        </motion.div>

        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
