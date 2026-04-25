'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Clock, MapPin, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'in' | 'out'>('idle');

  const handleCheckIn = async () => {
    setLoading(true);
    // In production, get user/org from Supabase Auth Session
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('attendance').insert({
      user_id: user?.id,
      org_id: user?.user_metadata.org_id, // Metadata set during signup
      check_in: new Date().toISOString(),
    });

    if (!error) setStatus('in');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AttendanceFlow</h1>
        <p className="text-gray-500 mb-8">Good morning! Ready for work?</p>

        <div className="space-y-4">
          {status !== 'in' ? (
            <button
              onClick={handleCheckIn}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Clock size={20} />
              {loading ? 'Processing...' : 'Check In Now'}
            </button>
          ) : (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl flex items-center justify-center gap-2">
              <CheckCircle size={20} />
              Checked In Successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
