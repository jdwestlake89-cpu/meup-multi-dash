'use client';

import { useState } from 'react';
import ComplianceView from './views/ComplianceView';
import BiddingView from './views/BiddingView';
import ScopeOfWorkView from './views/ScopeOfWorkView';
import CrewHubView from './views/CrewHubView';
import TimeZoneClock from './widgets/TimeZoneClock';
import { LayoutDashboard, Activity, Cpu, ShieldCheck, Settings, Send } from 'lucide-react';

type TabType = 'command' | 'track' | 'engine' | 'vault';

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState<TabType>('engine');

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#e3e2e7] font-sans antialiased overflow-x-hidden pb-24">
      {/* Custom Styles Injector */}
      <style>{`
        .structural-card {
            background-color: #1A1A1B;
            border: 1px solid #2C2C2E;
        }
        .status-strip-active { border-left: 4px solid #7a92ff; }
        .status-strip-standby { border-left: 4px solid #ffb693; }
        .status-strip-pending { border-left: 4px solid #ffb4ab; }

        .scanline {
            width: 100%;
            height: 2px;
            background: rgba(255, 107, 0, 0.1);
            position: absolute;
            animation: scan 4s linear infinite;
            pointer-events: none;
        }
        @keyframes scan {
            0% { top: 0%; }
            100% { top: 100%; }
        }
        .stepped-progress {
            background-image: repeating-linear-gradient(90deg, #ff6b00 0, #ff6b00 8px, transparent 8px, transparent 12px);
        }
      `}</style>

      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full h-16 z-50 flex justify-between items-center px-4 bg-[#121317] border-b border-[#5a4136]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-[#ffb693] h-6 w-6" />
          <h1 className="text-xl font-bold tracking-tighter text-[#ff6b00]">
            MULTI-DASH OPS
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[#38393d] transition-colors rounded">
            <Settings className="text-[#e2bfb0] h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mt-16 px-4 py-8 max-w-7xl mx-auto">
        {activeTab === 'command' && <BiddingView />}
        {activeTab === 'track' && <TrackView />}
        {activeTab === 'engine' && <CrewHubView />}
        {activeTab === 'vault' && <VaultView />}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full h-20 z-50 flex justify-around items-stretch bg-[#121317] border-t border-[#5a4136]">
        {/* COMMAND Tab */}
        <button
          onClick={() => setActiveTab('command')}
          className={`flex-1 flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${
            activeTab === 'command'
              ? 'bg-[#ff6b00] text-[#561f00] border-l-4 border-[#ffb693]'
              : 'text-[#e2bfb0] hover:bg-[#343539]'
          }`}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span className="font-mono text-xs font-bold mt-1">COMMAND</span>
        </button>

        {/* TRACK Tab */}
        <button
          onClick={() => setActiveTab('track')}
          className={`flex-1 flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${
            activeTab === 'track'
              ? 'bg-[#ff6b00] text-[#561f00] border-l-4 border-[#ffb693]'
              : 'text-[#e2bfb0] hover:bg-[#343539]'
          }`}
        >
          <Activity className="h-6 w-6" />
          <span className="font-mono text-xs font-bold mt-1">TRACK</span>
        </button>

        {/* ENGINE Tab */}
        <button
          onClick={() => setActiveTab('engine')}
          className={`flex-1 flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${
            activeTab === 'engine'
              ? 'bg-[#ff6b00] text-[#561f00] border-l-4 border-[#ffb693]'
              : 'text-[#e2bfb0] hover:bg-[#343539]'
          }`}
        >
          <Cpu className="h-6 w-6" />
          <span className="font-mono text-xs font-bold mt-1">ENGINE</span>
        </button>

        {/* VAULT Tab */}
        <button
          onClick={() => setActiveTab('vault')}
          className={`flex-1 flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${
            activeTab === 'vault'
              ? 'bg-[#ff6b00] text-[#561f00] border-l-4 border-[#ffb693]'
              : 'text-[#e2bfb0] hover:bg-[#343539]'
          }`}
        >
          <ShieldCheck className="h-6 w-6" />
          <span className="font-mono text-xs font-bold mt-1">VAULT</span>
        </button>
      </nav>
    </div>
  );
}

function TrackView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <ScopeOfWorkView />
      </div>
      <div className="lg:col-span-4 space-y-6">
        <div className="structural-card p-6 rounded-lg relative overflow-hidden">
          <div className="scanline"></div>
          <div className="flex items-center gap-2 mb-4">
            <Send className="text-[#ff6b00] h-5 w-5" />
            <h2 className="text-lg font-mono font-bold text-[#ffb693]">SMS AI ASSISTANT</h2>
          </div>
          <p className="text-sm text-[#e3e2e7] mb-4">
            Send SMS to your Multi-Dash Maintenance crew number for field-ops assistance.
          </p>
          <div className="bg-[#121317] border border-[#5a4136] rounded p-4 text-xs font-mono text-[#e2bfb0]">
            <strong className="text-[#ffb693]">TWILIO SETUP REQUIRED:</strong>
            <p className="mt-2 text-slate-400">
              Configure your Twilio webhook in n8n to activate inbound SMS routing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VaultView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <ComplianceView />
      </div>
      <div className="lg:col-span-4">
        <TimeZoneClock />
      </div>
    </div>
  );
}
