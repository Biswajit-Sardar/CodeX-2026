import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SosEmergency from './components/SosEmergency';
import ShelterLocator from './components/ShelterLocator';
import DamageReport from './components/DamageReport';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'sos' && <SosEmergency />}
        {activeTab === 'shelters' && <ShelterLocator />}
        {activeTab === 'reports' && <DamageReport />}
      </main>

      <footer className="bg-white border-t py-4 text-center text-xs text-slate-500">
        ResQ360 • Smart India Hackathon Prototype • Problem Statement #26206
      </footer>
    </div>
  );
}