'use client';

import { ShieldCheck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Credential {
  id: string;
  holder: string;
  credentialType: string;
  credentialId: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'expired' | 'expiring_soon' | 'valid';
}

const CREDENTIALS_DATA: Credential[] = [
  {
    id: 'c1',
    holder: 'R. McKean',
    credentialType: 'NCCER Framing Level 3',
    credentialId: 'NCCER-99281-F',
    expiryDate: '2026-12-15',
    daysRemaining: 148,
    status: 'valid'
  },
  {
    id: 'c2',
    holder: 'V. Gibbs',
    credentialType: 'OSHA 30 Construction',
    credentialId: 'OSHA-30-77281',
    expiryDate: '2026-08-01',
    daysRemaining: 12,
    status: 'expiring_soon'
  },
  {
    id: 'c3',
    holder: 'M. Aris',
    credentialType: 'LARA Contractor License',
    credentialId: 'LARA-21029-A',
    expiryDate: '2026-10-30',
    daysRemaining: 102,
    status: 'valid'
  },
  {
    id: 'c4',
    holder: 'J. Wolfe',
    credentialType: 'First Aid / CPR / AED',
    credentialId: 'CPR-AED-11029',
    expiryDate: '2026-06-10',
    daysRemaining: -40,
    status: 'expired'
  }
];

export default function ComplianceView() {
  return (
    <div className="space-y-6">
      {/* Overview Block */}
      <div className="structural-card p-6 rounded-lg relative overflow-hidden">
        <div className="scanline"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#a98a7d] uppercase tracking-wider">
              COMPLIANCE_WATCHDOG_SYS
            </span>
            <h2 className="text-xl font-bold text-[#ff6b00] mt-1">
              Active Credentials & Certifications
            </h2>
          </div>
          <div className="bg-[#121317] border border-[#5a4136] px-4 py-2 rounded font-mono text-xs text-[#e2bfb0]">
            LARA_STATUS: <span className="text-[#b8c3ff] font-bold">REGISTERED (PASS)</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-[#e3e2e7] border-t border-[#5a4136] pt-4">
          <p>
            Real-time compliance monitoring aligned with the <strong className="text-[#ffb693]">Davis-Bacon Act</strong> and <strong className="text-[#ffb693]">Copeland &ldquo;Anti-Kickback&rdquo; Act</strong>. Automatic alerts are dispatched daily at 8:00 AM via the Compliance Watchdog pipeline.
          </p>
        </div>
      </div>

      {/* Credentials Table / Grid */}
      <div className="structural-card rounded-lg overflow-hidden">
        <div className="p-4 bg-[#121317] border-b border-[#5a4136] flex justify-between items-center">
          <span className="font-mono text-xs font-bold text-[#ffb693] tracking-wider">
            CREDENTIALS_REGISTRY
          </span>
          <span className="font-mono text-[10px] text-[#e2bfb0] opacity-50">
            TOTAL_ENTRIES: {CREDENTIALS_DATA.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-[#5a4136] bg-[#1a1b1f]">
                <th className="p-4 font-mono text-xs font-bold text-[#a98a7d]">HOLDER</th>
                <th className="p-4 font-mono text-xs font-bold text-[#a98a7d]">CREDENTIAL TYPE</th>
                <th className="p-4 font-mono text-xs font-bold text-[#a98a7d]">CREDENTIAL ID</th>
                <th className="p-4 font-mono text-xs font-bold text-[#a98a7d]">EXPIRY DATE</th>
                <th className="p-4 font-mono text-xs font-bold text-[#a98a7d]">DAYS REMAINING</th>
                <th className="p-4 font-mono text-xs font-bold text-[#a98a7d] text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5a4136]">
              {CREDENTIALS_DATA.map((cred) => (
                <tr key={cred.id} className="hover:bg-[#1e1f23] transition-colors">
                  <td className="p-4 font-mono text-sm font-semibold text-[#e3e2e7]">
                    {cred.holder}
                  </td>
                  <td className="p-4 text-sm text-[#e3e2e7]">
                    {cred.credentialType}
                  </td>
                  <td className="p-4 font-mono text-xs text-[#e2bfb0]">
                    {cred.credentialId}
                  </td>
                  <td className="p-4 font-mono text-xs text-[#e2bfb0]">
                    {cred.expiryDate}
                  </td>
                  <td className="p-4 font-mono text-sm">
                    {cred.daysRemaining < 0 ? (
                      <span className="text-[#ffb4ab] font-bold">
                        {cred.daysRemaining} days (Lapsed)
                      </span>
                    ) : (
                      <span className="text-[#e3e2e7]">
                        {cred.daysRemaining} days
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {cred.status === 'valid' && (
                      <span className="inline-flex items-center gap-1 bg-[#1a2e26] text-[#b8ffdf] text-xs font-mono font-bold px-2 py-1 rounded border border-[#2e5a44]">
                        <CheckCircle className="h-3 w-3" />
                        VALID
                      </span>
                    )}
                    {cred.status === 'expiring_soon' && (
                      <span className="inline-flex items-center gap-1 bg-[#472d1a] text-[#ffddb8] text-xs font-mono font-bold px-2 py-1 rounded border border-[#7a4823] animate-pulse">
                        <Clock className="h-3 w-3" />
                        EXPIRING
                      </span>
                    )}
                    {cred.status === 'expired' && (
                      <span className="inline-flex items-center gap-1 bg-[#571010] text-[#ffdad6] text-xs font-mono font-bold px-2 py-1 rounded border border-[#932020]">
                        <AlertTriangle className="h-3 w-3" />
                        EXPIRED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
