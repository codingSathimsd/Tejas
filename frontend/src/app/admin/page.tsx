'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, present: 0 });
  const [aiReport, setAiReport] = useState("Loading latest AI summary...");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    // 1. Fetch Today's Logs
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('attendance')
      .select('*, profiles(full_name)')
      .eq('date', today);

    if (data) {
      setLogs(data);
      setStats({
        total: data.length,
        present: data.filter(l => l.status === 'present').length
      });
    }

    // 2. Mock fetch for Gemini Report (In prod, fetch from a 'reports' table)
    // For now, we simulate the display of the worker's output
    setAiReport("Yesterday's Insight: 95% punctuality recorded. 2 employees missed check-out. Recommendation: Remind Team B about the new closing procedures.");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Organization Analytics</h1>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">
            Date: {new Date().toLocaleDateString()}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users /></div>
              <div>
                <p className="text-sm text-slate-500">Total Logs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg"><TrendingUp /></div>
              <div>
                <p className="text-sm text-slate-500">Present</p>
                <p className="text-2xl font-bold">{stats.present}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">{aiReport}</p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Employee</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Check In</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 font-medium text-slate-800">{log.profiles?.full_name}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(log.check_in).toLocaleTimeString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
