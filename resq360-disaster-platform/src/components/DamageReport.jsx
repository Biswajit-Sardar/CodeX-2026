import React, { useState } from 'react';
import { Camera, Send, Check } from 'lucide-react';

export default function DamageReport() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ category: 'Infrastructure', description: '', location: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ category: 'Infrastructure', description: '', location: '' });
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Post-Disaster Damage Assessment</h2>
        <p className="text-sm text-slate-500 mb-6">Crowdsourced damage surveys speed up relief deployment and insurance verification.</p>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-emerald-800 font-medium flex items-center justify-center gap-2">
            <Check className="w-5 h-5" /> Report filed successfully into the Disaster Recovery DB.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Incident Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Infrastructure (Bridges, Roads)</option>
                <option>Electrical / Power Outage</option>
                <option>Residential Structural Collapse</option>
                <option>Medical Aid Needed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Location Details</label>
              <input
                type="text"
                required
                placeholder="e.g., Block B, Near Market Square"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Damage Description</label>
              <textarea
                rows="3"
                required
                placeholder="Detail the extent of damage..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Upload Field Evidence</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition">
                <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-500">Tap to upload photos or geotagged media</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition"
            >
              <Send className="w-4 h-4" /> Submit Report to Authority
            </button>
          </form>
        )}
      </div>
    </div>
  );
}