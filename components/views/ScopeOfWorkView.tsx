'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { ClipboardList, Plus, FileText, CheckCircle2 } from 'lucide-react';

interface ScopeOfWorkRecord {
  id: string;
  jobName: string;
  imageUrl?: string;
  scopeItems: string[];
  estimatedMaterials: string;
  createdAt: string;
}

const DEFAULT_SOWS: ScopeOfWorkRecord[] = [
  {
    id: 'sow-001',
    jobName: 'Ypsilanti Basement Turnkey Remodel',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80',
    scopeItems: [
      'Precision diagnostic spatial mapping using 3D MEUP Core',
      'Structural framing layout complying with NCCER parameters',
      'Commercial-grade plumbing & diagnostic-led electrical systems',
      'Drywall finishing, recessed LED lighting & custom subfloor',
    ],
    estimatedMaterials: '2x4 Studs, Drywall, Recessed LED, Subfloor panels, PEX piping',
    createdAt: '2026-06-15T10:30:00Z',
  },
];

const fetcher = async (url: string) => {
  return DEFAULT_SOWS;
};

export default function ScopeOfWorkView() {
  const { data = DEFAULT_SOWS, error, isLoading } = useSWR('/api/scope_of_work', fetcher, {
    refreshInterval: 30000,
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <ClipboardList className="text-blue-600" size={22} />
            Scope of Work (Vision-to-SOW)
          </h2>
          <p className="text-sm text-slate-600">
            Field image input to structured SOW generation & material estimates
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          <Plus size={18} />
          New Field SOW
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <iframe
            src="https://jdwestlake89.app.n8n.cloud/form/multidash-sow"
            className="w-full h-auto min-h-96 border-0 rounded"
            title="Scope of Work Form"
          />
        </div>
      )}

      {isLoading && <p className="text-slate-600">Loading scope of work data...</p>}
      {error && <p className="text-red-600">Error loading SOW records</p>}

      <div className="space-y-4">
        {data.map((sow) => (
          <div key={sow.id} className="bg-slate-50 border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">{sow.jobName}</h3>
                <p className="text-xs text-slate-500">ID: {sow.id} • Created: {new Date(sow.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                <FileText size={12} /> Active Scope
              </span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Scope Line Items:</h4>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {sow.scopeItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded p-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Estimated Materials: </span>
              {sow.estimatedMaterials}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
