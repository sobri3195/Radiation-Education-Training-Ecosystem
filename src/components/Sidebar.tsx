'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Calculator,
  BriefcaseMedical,
  Shield,
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
  FileText,
  MessageCircleQuestion,
  Tag,
  FileStack,
  Stethoscope,
  Target,
  Syringe,
  Map,
  Users,
  Settings,
  HelpCircle,
  BarChart3,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  Plus,
  List,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavSubItem {
  id: string;
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavItem {
  id: string;
  name: string;
  path?: string;
  icon: React.ReactNode;
  subItems?: NavSubItem[];
}

interface NavSection {
  id: string;
  name: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    id: 'main',
    name: 'DASHBOARD',
    items: [
      {
        id: 'dashboard',
        name: 'Overview',
        path: '/admin',
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 'education',
    name: 'KONTEN EDUKASI (EduRadi)',
    items: [
      {
        id: 'articles',
        name: 'Artikel & Infografik',
        icon: <BookOpen className="w-5 h-5" />,
        subItems: [
          { id: 'all-content', name: 'Semua Konten', path: '/admin/eduradi' },
          { id: 'add-content', name: 'Tambah Konten Baru', path: '/admin/edu/contents/new', icon: <Plus className="w-4 h-4" /> },
          { id: 'categories', name: 'Kategori & Tag', path: '/admin/edu/categories', icon: <Tag className="w-4 h-4" /> },
        ],
      },
      {
        id: 'faq',
        name: 'FAQ Publik',
        icon: <MessageCircleQuestion className="w-5 h-5" />,
        subItems: [
          { id: 'faq-list', name: 'Daftar Pertanyaan', path: '/admin/edu/faq' },
          { id: 'add-faq', name: 'Tambah Q&A', path: '/admin/edu/faq/new', icon: <Plus className="w-4 h-4" /> },
        ],
      },
      {
        id: 'mythbuster',
        name: 'MythBuster Radiasi',
        icon: <Shield className="w-5 h-5" />,
        subItems: [
          { id: 'myths-list', name: 'Mitos vs Fakta', path: '/admin/mythbuster' },
          { id: 'add-myth', name: 'Tambah Entri', path: '/admin/mythbuster/new', icon: <Plus className="w-4 h-4" /> },
        ],
      },
      {
        id: 'references',
        name: 'Referensi Literatur',
        path: '/admin/edu/references',
        icon: <FileStack className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 'training',
    name: 'SIMULASI & PELATIHAN',
    items: [
      {
        id: 'simudose',
        name: 'SimuDose (BED/EQD₂)',
        icon: <Calculator className="w-5 h-5" />,
        subItems: [
          { id: 'simudose-config', name: 'Konfigurasi α/β & Preset', path: '/admin/simudose' },
          { id: 'calculation-history', name: 'Riwayat Perhitungan', path: '/admin/simudose/history' },
          { id: 'fraction-templates', name: 'Template Skema Fraksi', path: '/admin/simudose/templates' },
        ],
      },
      {
        id: 'oncocase',
        name: 'OncoCase Trainer',
        icon: <BriefcaseMedical className="w-5 h-5" />,
        subItems: [
          { id: 'case-bank', name: 'Bank Kasus', path: '/admin/oncocase' },
          { id: 'add-case', name: 'Editor Skenario', path: '/admin/oncocase/new', icon: <Plus className="w-4 h-4" /> },
          { id: 'answer-keys', name: 'Kunci Jawaban & Skor', path: '/admin/oncocase/keys' },
          { id: 'participant-analytics', name: 'Analitik Kinerja Peserta', path: '/admin/oncocase/analytics' },
        ],
      },
      {
        id: 'minilab',
        name: 'Mini-Lab Radioterapi',
        icon: <FlaskConical className="w-5 h-5" />,
        subItems: [
          { id: 'exercises', name: 'Soal Latihan', path: '/admin/minilab' },
          { id: 'exam-packages', name: 'Paket/Ujian', path: '/admin/minilab/packages' },
          { id: 'results-certificates', name: 'Hasil & Sertifikat', path: '/admin/minilab/results' },
        ],
      },
    ],
  },
  {
    id: 'knowledge-map',
    name: 'PETA PENGETAHUAN (OncoMap)',
    items: [
      {
        id: 'oar',
        name: 'Organ-at-Risk (OAR)',
        icon: <Stethoscope className="w-5 h-5" />,
        subItems: [
          { id: 'dose-limits', name: 'Batas Dosis (QUANTEC)', path: '/admin/oncomap' },
          { id: 'side-effects-oar', name: 'Efek Samping Terkait', path: '/admin/oncomap/side-effects' },
        ],
      },
      {
        id: 'techniques',
        name: 'Teknik & Modalitas',
        icon: <Target className="w-5 h-5" />,
        subItems: [
          { id: 'modalities', name: 'IMRT/VMAT/3D-CRT/SBRT', path: '/admin/map/techniques' },
          { id: 'clinical-notes', name: 'Catatan Klinis & Tips', path: '/admin/map/clinical-notes' },
        ],
      },
    ],
  },
  {
    id: 'patient-journey',
    name: 'PERJALANAN PASIEN',
    items: [
      {
        id: 'journey-steps',
        name: 'Patient Journey',
        icon: <Route className="w-5 h-5" />,
        subItems: [
          { id: 'journey-stages', name: 'Tahapan & Edukasi', path: '/admin/patient-journey' },
          { id: 'pre-treatment', name: 'Materi Pre-Treatment', path: '/admin/journey/pre-treatment' },
          { id: 'follow-up', name: 'Edukasi Follow-up', path: '/admin/journey/follow-up' },
        ],
      },
      {
        id: 'side-effects-guide',
        name: 'Panduan Efek Samping',
        icon: <Heart className="w-5 h-5" />,
        subItems: [
          { id: 'common-symptoms', name: 'Gejala Umum', path: '/admin/side-effects' },
          { id: 'home-care', name: 'Anjuran Perawatan', path: '/admin/side-effects/care' },
          { id: 'red-flags', name: 'Red Flags & Kapan ke RS', path: '/admin/side-effects/red-flags' },
        ],
      },
    ],
  },
  {
    id: 'data-viz',
    name: 'DATA & VISUALISASI',
    items: [
      {
        id: 'cancer-explorer',
        name: 'Kanker di Sekitarku',
        icon: <MapPin className="w-5 h-5" />,
        subItems: [
          { id: 'incidence-map', name: 'Peta Insidensi (wilayah)', path: '/admin/cancer-map' },
          { id: 'outcome-trends', name: 'Outcome & Tren', path: '/admin/data/outcomes' },
          { id: 'data-validation', name: 'Anonimisasi & Validasi', path: '/admin/data/validation' },
        ],
      },
      {
        id: 'therapy-modalities',
        name: 'Tabel Modalitas Terapi',
        icon: <Table2 className="w-5 h-5" />,
        subItems: [
          { id: 'radiation-indications', name: 'Indikasi Radiasi', path: '/admin/therapy-table' },
          { id: 'combination-therapy', name: 'Kombinasi Terapi', path: '/admin/therapy-table/combinations' },
        ],
      },
    ],
  },
  {
    id: 'reports',
    name: 'LAPORAN',
    items: [
      {
        id: 'all-reports',
        name: 'Laporan',
        icon: <BarChart3 className="w-5 h-5" />,
        subItems: [
          { id: 'education-reports', name: 'Laporan Edukasi', path: '/admin/reports/education' },
          { id: 'training-reports', name: 'Laporan Pelatihan', path: '/admin/reports/training' },
          { id: 'simulation-reports', name: 'Laporan Simulasi', path: '/admin/reports/simulation' },
          { id: 'export', name: 'Ekspor PDF/CSV', path: '/admin/reports/export' },
        ],
      },
    ],
  },
  {
    id: 'google-sheets',
    name: 'GOOGLE SHEETS',
    items: [
      {
        id: 'sheets-connection',
        name: 'Koneksi & Kredensial',
        path: '/admin/gsheet-data',
        icon: <Database className="w-5 h-5" />,
      },
      {
        id: 'sheets-mapping',
        name: 'Pemetaan Sheet ↔ Modul',
        icon: <FileSpreadsheet className="w-5 h-5" />,
        subItems: [
          { id: 'mapping-eduradi', name: 'EduRadi_Content', path: '/admin/sheets/mapping/eduradi' },
          { id: 'mapping-mythbuster', name: 'MythBuster_DB', path: '/admin/sheets/mapping/mythbuster' },
          { id: 'mapping-simudose', name: 'SimuDose_Presets', path: '/admin/sheets/mapping/simudose' },
          { id: 'mapping-oncocase', name: 'OncoCase_Bank & Keys', path: '/admin/sheets/mapping/oncocase' },
          { id: 'mapping-oar', name: 'OAR_DoseLimits', path: '/admin/sheets/mapping/oar' },
          { id: 'mapping-journey', name: 'PatientJourney_Steps', path: '/admin/sheets/mapping/journey' },
          { id: 'mapping-side-effects', name: 'SideEffects_Guide', path: '/admin/sheets/mapping/side-effects' },
          { id: 'mapping-cancer', name: 'Cancer_Incidence_Region', path: '/admin/sheets/mapping/cancer' },
          { id: 'mapping-therapy', name: 'Therapy_Modalities', path: '/admin/sheets/mapping/therapy' },
        ],
      },
      {
        id: 'sheets-validation',
        name: 'Validasi Kolom & Data',
        path: '/admin/sheets/validation',
        icon: <FileText className="w-5 h-5" />,
      },
      {
        id: 'sheets-templates',
        name: 'Impor/Ekspor Template',
        path: '/admin/sheets/templates',
        icon: <FileStack className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 'users',
    name: 'PENGGUNA & PERAN',
    items: [
      {
        id: 'user-management',
        name: 'Daftar Pengguna',
        path: '/admin/users',
        icon: <Users className="w-5 h-5" />,
      },
      {
        id: 'roles',
        name: 'Peran & Akses',
        path: '/admin/users/roles',
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: 'audit-log',
        name: 'Audit Log',
        path: '/admin/users/audit',
        icon: <FileText className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 'settings',
    name: 'PENGATURAN',
    items: [
      {
        id: 'branding',
        name: 'Branding & Tema',
        path: '/admin/settings/branding',
        icon: <Settings className="w-5 h-5" />,
      },
      {
        id: 'localization',
        name: 'Bahasa & Lokalisasi',
        path: '/admin/settings/localization',
        icon: <Globe className="w-5 h-5" />,
      },
      {
        id: 'privacy',
        name: 'Privasi & Anonimisasi',
        path: '/admin/settings/privacy',
        icon: <Shield className="w-5 h-5" />,
      },
      {
        id: 'integrations',
        name: 'Integrasi',
        path: '/admin/settings/integrations',
        icon: <Database className="w-5 h-5" />,
      },
      {
        id: 'backup',
        name: 'Cadangan & Restore',
        path: '/admin/settings/backup',
        icon: <FileStack className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 'help',
    name: 'BANTUAN',
    items: [
      {
        id: 'admin-guide',
        name: 'Panduan Admin',
        path: '/admin/help',
        icon: <HelpCircle className="w-5 h-5" />,
      },
      {
        id: 'content-sop',
        name: 'SOP Kurasi Konten',
        path: '/admin/help/sop',
        icon: <FileText className="w-5 h-5" />,
      },
      {
        id: 'ethics',
        name: 'Kebijakan Etik & Disclaimer',
        path: '/admin/help/ethics',
        icon: <Shield className="w-5 h-5" />,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const isItemActive = (item: NavItem): boolean => {
    if (item.path && pathname === item.path) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => pathname === sub.path);
    }
    return false;
  };

  const isPathActive = (path: string): boolean => {
    return pathname === path;
  };

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
        <div className="p-6 pb-24">
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
            {navSections.map((section) => (
              <div key={section.id}>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                  {section.name}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isExpanded = expandedItems.has(item.id);
                    const isActive = isItemActive(item);

                    return (
                      <div key={item.id}>
                        {item.subItems ? (
                          <>
                            <button
                              onClick={() => toggleExpanded(item.id)}
                              className={cn(
                                'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                                isActive
                                  ? 'bg-gradient-to-r from-radiate-purple to-radiate-blue text-white shadow-lg'
                                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-sm font-medium">
                                  {item.name}
                                </span>
                              </div>
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="mt-1 ml-4 space-y-1 border-l-2 border-slate-700 pl-3">
                                {item.subItems.map((subItem) => {
                                  const isSubActive = isPathActive(subItem.path);
                                  return (
                                    <Link
                                      key={subItem.id}
                                      href={subItem.path}
                                      onClick={() => setIsOpen(false)}
                                      className={cn(
                                        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                        isSubActive
                                          ? 'bg-slate-700 text-white font-medium'
                                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                                      )}
                                    >
                                      {subItem.icon && subItem.icon}
                                      <span>{subItem.name}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.path!}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                              isActive
                                ? 'bg-gradient-to-r from-radiate-purple to-radiate-blue text-white shadow-lg'
                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                            )}
                          >
                            {item.icon}
                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="fixed bottom-0 left-0 w-72 p-6 bg-slate-900/95 backdrop-blur border-t border-slate-700">
          <div className="p-4 bg-slate-800 rounded-lg">
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
