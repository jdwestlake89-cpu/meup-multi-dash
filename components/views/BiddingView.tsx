'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { DollarSign, Plus } from 'lucide-react';

interface BiddingRecord {
  id: string;
  client: string;
  job: string;
  amount: number;
  status: 'draft' | 'submitted' | 'accepted' | 'invoiced';
  dueDate: string;
  paid: boolean;
  vroReserve: number;
  vroOperating: number;
}

const fetcher = async (url: string) => {
  return [];
};

export default function BiddingView() {
  const { data = [], error, isLoading } = useSWR('/api/bids_invoices', fetcher, {
    refreshInterval: 30000,
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Bidding & Invoicing</h2>
          <p className="text-sm text-slate-600">VRO split: 10% reserve / 90% operating</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          <Plus size={18} />
          New Bid
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <FormEmbedded formUrl="https://jdwestlake89.app.n8n.cloud/form/multidash-billing" />
        </div>
      )}

      {isLoading && <p className="text-slate-600">Loading bids...</p>}
      {error && <p className="text-red-600">Error loading bids</p>}

      {data && data.length > 0 ? (
        <div className="space-y-3">
          {data.map((bid: BiddingRecord) => (
            <div key={bid.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{bid.client}</h3>
                  <p className="text-sm text-slate-600">{bid.job}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  bid.status === 'invoiced' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {bid.status.replace('_', ' ')}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Total</p>
                  <p className="font-semibold text-slate-900 flex items-center gap-1">
                    <DollarSign size={14} />
                    {bid.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600">Reserve (10%)</p>
                  <p className="font-semibold text-slate-900">${bid.vroReserve.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-slate-600">Operating (90%)</p>
                  <p className="font-semibold text-slate-900">${bid.vroOperating.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-600">No bids yet. Submit your first bid using the form above.</p>
          <a
            href="https://jdwestlake89.app.n8n.cloud/form/multidash-billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm mt-2 inline-block"
          >
            Or open the form directly →
          </a>
        </div>
      )}
    </div>
  );
}

function FormEmbedded({ formUrl }: { formUrl: string }) {
  return (
    <iframe
      src={formUrl}
      className="w-full h-auto min-h-96 border-0 rounded"
      title="Bidding Form"
    />
  );
}
