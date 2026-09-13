import React from 'react';
import { disasterAlerts } from '../data/mockData';
import { AlertTriangle, CloudRain, Users, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Timeline Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded shadow-sm">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Phase 1: Before</span>
          <h3 className="text-lg font-semibold text-slate-800 mt-1">Predictive Risk Engine</h3>
          <p className="text-sm text-slate-600 mt-1">Continuous weather monitoring and flood modeling active.</p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded shadow-sm">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Phase 2: During</span>
          <h3 className="text-lg font-semibold text-slate-800 mt-1">Emergency Dispatch</h3>
          <p className="text-sm text-slate-600 mt-1">Geo-fencing, SOS telemetry, and live triage routing online.</p>
        </div>
        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded shadow-sm">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Phase 3: After</span>
          <h3 className="text-lg font-semibold text-slate-800 mt-1">Relief Logistics</h3>
          <p className="text-sm text-slate-600 mt-1">Crowdsourced damage surveys & resource allocation.</p>
        </div>
      </div>

      {/* Live Warning Feed */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
          <AlertTriangle className="text-amber-500 w-5 h-5" /> Active Warnings & Early Advisories
        </h2>
        <div className="space-y-3">
          {disasterAlerts.map((alert) => (
            <div key={alert.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50">
              <div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  alert.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {alert.severity} Severity
                </span>
                <h4 className="font-semibold text-slate-900 mt-1">{alert.type} - {alert.region}</h4>
                <p className="text-sm text-slate-600">{alert.instruction}</p>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">{alert.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}