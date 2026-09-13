import React from 'react';
import { ShieldAlert, Activity, Navigation, FileSpreadsheet } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Overview & Alerts', icon: Activity },
    { id: 'sos', label: 'Live SOS Trigger', icon: ShieldAlert },
    { id: 'shelters', label: 'Shelters & Relief', icon: Navigation },
    { id: 'reports', label: 'Damage Assessment', icon: FileSpreadsheet },
  ];

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex flex-wrap justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <ShieldAlert className="text-red-500 w-8 h-8" />
        <div>
          <span className="font-bold text-xl tracking-tight">ResQ<span className="text-red-500">360</span></span>
          <p className="text-xs text-slate-400">AI Disaster Management & Response</p>
        </div>
      </div>

      <div className="flex gap-2 mt-3 sm:mt-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}