'use client';

import React, { useEffect, useState } from 'react';
import { fetchFromAppsScript, APPS_SCRIPT_URLS } from '@/lib/googleSheets';
import { Database, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface AppsScriptDataProps {
  scriptUrl?: string;
  title?: string;
  description?: string;
}

export default function AppsScriptData({
  scriptUrl = APPS_SCRIPT_URLS.main,
  title = 'Data from Google Apps Script',
  description = 'Fetching data from Google Sheets via Apps Script',
}: AppsScriptDataProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFromAppsScript(scriptUrl);
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptUrl]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-radiate-blue" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
          aria-label="Refresh data"
        >
          <RefreshCw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {lastUpdated && (
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <CheckCircle className="w-4 h-4" />
          Last updated: {lastUpdated.toLocaleString('id-ID')}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading && !data.length ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-radiate-purple"></div>
        </div>
      ) : data.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-900">Total Records</span>
            <span className="text-lg font-bold text-radiate-purple">{data.length}</span>
          </div>
          
          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 sticky top-0">
                <tr>
                  {data[0] && Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-left font-semibold text-slate-700">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                    {Object.values(row).map((value: any, colIndex) => (
                      <td key={colIndex} className="px-4 py-2 text-slate-600">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
