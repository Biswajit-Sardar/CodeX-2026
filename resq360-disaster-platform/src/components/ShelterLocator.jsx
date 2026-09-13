import React from 'react';
import { nearbyShelters } from '../data/mockData';
import { Phone, MapPin, Building2 } from 'lucide-react';

export default function ShelterLocator() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Designated Relief Camps & Medical Hubs</h2>
          <p className="text-sm text-slate-600">Real-time capacity tracking and contact lines.</p>
        </div>
        <span className="text-xs bg-slate-100 border text-slate-600 px-3 py-1.5 rounded-md font-medium">
          Source: District Disaster Management Authority (DDMA)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nearbyShelters.map((shelter) => (
          <div key={shelter.id} className="bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  shelter.status === 'Open' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {shelter.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{shelter.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {shelter.distance} away
              </p>
            </div>

            <div className="mt-4 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Occupancy:</span>
                <span className="font-semibold text-slate-800">{shelter.capacity}</span>
              </div>
              <a 
                href={`tel:${shelter.contact}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium text-xs transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call Helpline
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}