'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Calculator,
  BriefcaseMedical,
  Shield,
  User,
  MapPin,
  FlaskConical,
  Route,
  Heart,
  Table2,
  Menu,
  X,
  LayoutDashboard,
  Radiation,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  category: string;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
    category: 'main',
  },
  {
    id: 'eduradi',
    name: 'EduRadi',
    path: '/admin/eduradi',
    icon: <BookOpen className="w-5 h-5" />,
    category: 'education',
  },
  {
    id: 'simudose',
    name: 'SimuDose',
    path: '/admin/simudose',
    icon: <Calculator className="w-5 h-5" />,
    category: 'training',
  },
  {
    id: 'oncocase',
    name: 'OncoCase Trainer',
    path: '/admin/oncocase',
    icon: <BriefcaseMedical className="w-5 h-5" />,
    category: 'training',
  },
  {
    id: 'mythbuster',
    name: 'MythBuster',
    path: '/admin/mythbuster',
    icon: <Shield className="w-5 h-5" />,
    category: 'education',
  },
  {
    id: 'oncomap',
    name: 'OncoMap',
    path: '/admin/oncomap',
    icon: <User className="w-5 h-5" />,
    category: 'clinical',
  },
  {
    id: 'cancer-map',
    name: 'Kanker di Sekitarku',
    path: '/admin/cancer-map',
    icon: <MapPin className="w-5 h-5" />,
    category: 'public',
  },
  {
    id: 'minilab',
    name: 'Mini-Lab',
    path: '/admin/minilab',
    icon: <FlaskConical className="w-5 h-5" />,
    category: 'training',
  },
  {
    id: 'patient-journey',
    name: 'Patient Journey',
    path: '/admin/patient-journey',
    icon: <Route className="w-5 h-5" />,
    category: 'public',
  },
  {
    id: 'side-effects',
    name: 'Efek Samping',
    path: '/admin/side-effects',
    icon: <Heart className="w-5 h-5" />,
    category: 'clinical',
  },
  {
    id: 'therapy-table',
    name: 'OncoTheraTable',
    path: '/admin/therapy-table',
    icon: <Table2 className="w-5 h-5" />,
    category: 'clinical',
  },
  {
    id: 'gsheet-data',
    name: 'Google Sheets Data',
    path: '/admin/gsheet-data',
    icon: <Database className="w-5 h-5" />,
    category: 'data',
  },
];

const categoryLabels = {
  main: 'Main',
  education: 'Edukasi',
  training: 'Pelatihan',
  clinical: 'Klinik',
  public: 'Publik',
  data: 'Data Management',
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-radiate-purple text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white w-72 overflow-y-auto z-40 transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-radiate-purple to-radiate-blue rounded-lg">
              <Radiation className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-radiate-purple to-radiate-cyan bg-clip-text text-transparent">
                RADIATE
              </h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                <div className="space-y-1">
                  {items.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.id}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                          isActive
                            ? 'bg-gradient-to-r from-radiate-purple to-radiate-blue text-white shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        )}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900/80 backdrop-blur">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400">
              Edukasi Publik, Pelatihan Dokter, dan Literasi Radiasi dalam Satu Platform
            </p>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
