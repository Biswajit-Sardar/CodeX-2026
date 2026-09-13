import React, { useState } from 'react';
import { Radio, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function SosEmergency() {
  const [status, setStatus] = useState('idle');
  const [coords, setCoords] = useState(null);

  const triggerSOS = () => {
    setStatus('locating');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude.toFixed(5),
            lng: pos.coords.longitude.toFixed(5)
          });
          setStatus('dispatched');
        },
        () => {
          // Fallback location for presentation demo
          setCoords({ lat: '22.5726', lng: '88.3639' });
          setStatus('dispatched');
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setCoords({ lat: '22.5726', lng: '88.3639' });
      setStatus('dispatched');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 text-center">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Emergency SOS Trigger</h2>
        <p className="text-sm text-slate-600 mb-6">
          Pressing the button initiates rescue triage, pulls GPS telemetry, and broadcasts your distress ping to NDRF/SDRF hubs.
        </p>

        {status === 'idle' && (
          <button
            onClick={triggerSOS}
            className="w-44 h-44 mx-auto rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-2xl shadow-xl flex flex-col items-center justify-center gap-2 border-8 border-red-200 active:scale-95 transition-transform"
          >
            <AlertOctagon className="w-12 h-12" />
            TRIGGER SOS
          </button>
        )}

        {status === 'locating' && (
          <div className="p-8 flex flex-col items-center gap-3">
            <Radio className="w-12 h-12 text-red-600 animate-pulse" />
            <p className="font-semibold text-slate-700">Acquiring GPS coordinates...</p>
          </div>
        )}

        {status === 'dispatched' && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-lg text-emerald-900">Distress Signal Transmitted!</h3>
            <p className="text-sm text-emerald-700 mt-1">
              Disaster Management Command Center notified.
            </p>
            <div className="mt-4 inline-block bg-white px-4 py-2 rounded-lg border text-sm font-mono text-slate-700">
              Latitude: {coords?.lat} | Longitude: {coords?.lng}
            </div>
            <div className="mt-4">
              <button 
                onClick={() => setStatus('idle')} 
                className="text-xs text-slate-500 underline hover:text-slate-700"
              >
                Reset Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}