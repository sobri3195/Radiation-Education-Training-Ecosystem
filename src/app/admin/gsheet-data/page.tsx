'use client';

import React, { useState, useEffect } from 'react';
import AppsScriptData from '@/components/AppsScriptData';
import { fetchFromAppsScript, postToAppsScript, APPS_SCRIPT_URLS } from '@/lib/googleSheets';
import { 
  Database, 
  Upload, 
  Download,
  Plus,
  FileSpreadsheet,
  Settings,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function GSheetDataPage() {
  const [activeTab, setActiveTab] = useState<'view' | 'upload' | 'settings'>('view');
  const [uploadStatus, setUploadStatus] = useState<{type: 'success' | 'error' | null, message: string}>({ type: null, message: '' });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus({ type: null, message: '' });

    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => row.split(','));
      
      const result = await postToAppsScript(APPS_SCRIPT_URLS.main, {
        action: 'append',
        data: rows
      });

      if (result) {
        setUploadStatus({ 
          type: 'success', 
          message: 'Data berhasil di-upload ke Google Sheets!' 
        });
      } else {
        setUploadStatus({ 
          type: 'error', 
          message: 'Gagal mengupload data. Silakan coba lagi.' 
        });
      }
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Terjadi kesalahan saat upload' 
      });
    }
  };

  const handleExportData = async () => {
    try {
      const data = await fetchFromAppsScript(APPS_SCRIPT_URLS.main);
      
      const csv = [
        Object.keys(data[0] || {}).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gsheet-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      setUploadStatus({ 
        type: 'success', 
        message: 'Data berhasil di-export!' 
      });
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: 'Gagal mengexport data' 
      });
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Google Sheets Data Management</h1>
          <p className="text-slate-600 mt-1">
            Kelola data dari Google Sheets via Apps Script
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <div className="flex gap-2 p-2">
            <button
              onClick={() => setActiveTab('view')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'view'
                  ? 'bg-radiate-purple text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              View Data
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'upload'
                  ? 'bg-radiate-purple text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload Data
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-radiate-purple text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        <div className="p-6">
          {uploadStatus.type && (
            <div
              className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
                uploadStatus.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {uploadStatus.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="text-sm">{uploadStatus.message}</p>
            </div>
          )}

          {activeTab === 'view' && (
            <AppsScriptData
              title="Data dari Google Sheets"
              description="Data real-time dari Google Apps Script"
            />
          )}

          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-radiate-purple transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-radiate-purple to-radiate-blue flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900 mb-1">
                      Upload CSV File
                    </p>
                    <p className="text-sm text-slate-600">
                      Click to select a CSV file to upload to Google Sheets
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-6 py-2 bg-radiate-purple text-white rounded-lg hover:bg-radiate-purple/90 transition-colors"
                  >
                    Select File
                  </button>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  CSV Format Guidelines
                </h3>
                <ul className="text-sm text-blue-700 space-y-1 ml-7">
                  <li>• First row should contain column headers</li>
                  <li>• Use comma (,) as delimiter</li>
                  <li>• UTF-8 encoding recommended</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Google Apps Script URL
                  </label>
                  <input
                    type="text"
                    value={APPS_SCRIPT_URLS.main}
                    readOnly
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Configure this in your .env file using NEXT_PUBLIC_APPS_SCRIPT_URL
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Apps Script Configuration
                  </h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    Make sure your Google Apps Script is configured correctly:
                  </p>
                  <ol className="text-sm text-yellow-700 space-y-1 ml-5 list-decimal">
                    <li>Deploy as Web App</li>
                    <li>Set &quot;Execute as&quot; to &quot;Me&quot;</li>
                    <li>Set &quot;Who has access&quot; to &quot;Anyone&quot;</li>
                    <li>Return data as JSON format</li>
                  </ol>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Connection Status</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-slate-700">Ready to fetch data</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <Database className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Dynamic Data</h3>
          <p className="text-sm text-blue-100">
            Data otomatis sinkron dari Google Sheets
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <Upload className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Easy Upload</h3>
          <p className="text-sm text-purple-100">
            Upload CSV langsung ke Google Sheets
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <Download className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Export Data</h3>
          <p className="text-sm text-emerald-100">
            Download data dalam format CSV
          </p>
        </div>
      </div>
    </div>
  );
}
