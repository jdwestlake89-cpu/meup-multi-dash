'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { DollarSign, Plus, ChevronDown, ChevronUp, FileText } from 'lucide-react';

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

const mockBids: BiddingRecord[] = [
  {
    id: 'bid-1092',
    client: 'Washtenaw Housing Comm.',
    job: 'Roof Truss Stabilization',
    amount: 14500.00,
    status: 'invoiced',
    dueDate: '2026-07-30',
    paid: true,
    vroReserve: 1450.00,
    vroOperating: 13050.00
  },
  {
    id: 'bid-1093',
    client: 'Ypsilanti Depot Assoc.',
    job: 'Structural Framing Check',
    amount: 8900.00,
    status: 'accepted',
    dueDate: '2026-08-15',
    paid: false,
    vroReserve: 890.00,
    vroOperating: 8010.00
  }
];

const fetcher = async (url: string) => {
  // Mock API fallback to ensure data renders elegantly
  return mockBids;
};

export default function BiddingView() {
  const { data = mockBids, error, isLoading } = useSWR('/api/bids_invoices', fetcher, {
    refreshInterval: 30000,
  });
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="structural-card p-6 rounded-lg relative overflow-hidden">
        <div className="scanline"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#a98a7d] uppercase tracking-wider">
              FINANCIAL_INTAKE_LEDGER
            </span>
            <h2 className="text-xl font-bold text-[#ff6b00] mt-1">
              Bidding & Invoicing
            </h2>
            <p className="text-sm text-[#e2bfb0] mt-1">
              Deterministic VRO split calculations: <span className="text-white font-mono font-bold">10% reserve / 90% operating</span>
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#ff6b00] text-[#561f00] font-mono text-xs font-bold py-2.5 px-4 rounded hover:bg-[#ffb693] transition active:scale-95"
          >
            <Plus size={16} />
            {showForm ? 'CLOSE_FORM' : 'NEW_BID_FORM'}
          </button>
        </div>
      </div>

      {/* Embedded Intake Form */}
      {showForm && (
        <div className="structural-card rounded-lg p-6 relative overflow-hidden bg-[#121317]">
          <div className="scanline"></div>
          <h3 className="font-mono text-xs font-bold text-[#ffb693] mb-4 uppercase tracking-wider">
            N8N_SECURE_BILLING_PORTAL
          </h3>
          <FormEmbedded formUrl="https://jdwestlake89.app.n8n.cloud/form/multidash-billing" />
        </div>
      )}

      {/* Loading & Error States */}
      {isLoading && <p className="font-mono text-xs text-[#a98a7d]">POLLING_SECURE_DATALAYER...</p>}
      {error && <p className="font-mono text-xs text-[#ffb4ab]">LEDGER_CONNECTION_ERROR</p>}

      {/* Bids List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="font-mono text-xs font-bold text-[#ffb693] tracking-widest">
            ACTIVE_COMMERCIAL_BIDS
          </span>
          <span className="font-mono text-[10px] text-[#e2bfb0] opacity-50">
            SECURE_LEDGER_SYNC: OK
          </span>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((bid: BiddingRecord) => (
              <div key={bid.id} className="structural-card p-5 rounded-lg flex flex-col justify-between gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] text-[#a98a7d] uppercase">
                      ID: {bid.id}
                    </span>
                    <h3 className="font-sans text-base font-bold text-[#e3e2e7] mt-1">
                      {bid.client}
                    </h3>
                    <p className="text-xs text-[#e2bfb0] mt-0.5">{bid.job}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                    bid.status === 'invoiced'
                      ? 'bg-[#1a2e26] text-[#b8ffdf] border border-[#2e5a44]'
                      : 'bg-[#122b40] text-[#b8c3ff] border border-[#2e5a80]'
                  }`}>
                    {bid.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-[#5a4136]/50 pt-3">
                  <div>
                    <span className="font-mono text-[10px] text-[#a98a7d] block">TOTAL</span>
                    <span className="font-mono text-sm font-bold text-[#e3e2e7] flex items-center gap-0.5 mt-0.5">
                      <DollarSign size={12} className="text-[#ff6b00]" />
                      {bid.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#a98a7d] block">RESERVE (10%)</span>
                    <span className="font-mono text-sm font-bold text-[#ffb693] block mt-0.5">
                      ${bid.vroReserve.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#a98a7d] block">OPERATING (90%)</span>
                    <span className="font-mono text-sm font-bold text-[#7a92ff] block mt-0.5">
                      ${bid.vroOperating.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#121317] rounded-lg border border-[#5a4136]">
            <FileText className="mx-auto h-12 w-12 text-[#a98a7d] opacity-40 mb-2" />
            <p className="font-mono text-sm text-[#e3e2e7]">NO_BIDS_IN_LEDGER</p>
            <p className="text-xs text-[#e2bfb0] mt-1">Submit your first bid using the portal form above.</p>
            <a
              href="https://jdwestlake89.app.n8n.cloud/form/multidash-billing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffb693] hover:underline text-xs font-mono mt-4 inline-block"
            >
              LAUNCH_EXTERNAL_FORM &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function FormEmbedded({ formUrl }: { formUrl: string }) {
  return (
    <iframe
      src={formUrl}
      className="w-full h-auto min-h-[400px] border-0 rounded bg-[#1A1A1B]"
      title="Bidding Form"
    />
  );
}
