'use client';

import { useState } from 'react';
import ComplianceView from './views/ComplianceView';
import BiddingView from './views/BiddingView';
import ScopeOfWorkView from './views/ScopeOfWorkView';
import TimeZoneClock from './widgets/TimeZoneClock';
import { ClipboardList, FileText, CheckSquare, Send, Clock } from 'lucide-react';

type TabType = 'compliance' | 'bidding' | 'sow' | 'sms' | 'clock';

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState<TabType>('compliance');

  const tabs: { id: TabType; label: string; icon: JSX.Element }[] = [
    { id: 'compliance', label: 'Compliance', icon: <CheckSquare size={18} /> },
    { id: 'bidding', label: 'Bidding & Invoicing', icon: <FileText size={18} /> },
    { id: 'sow', label: 'Scope of Work', icon: <ClipboardList size={18} /> },
    { id: 'sms', label: 'SMS Assistant', icon: <Send size={18} /> },
    { id: 'clock', label: 'World Clock', icon: <Clock size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-2 mb-8 border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        {activeTab === 'compliance' && <ComplianceView />}
        {activeTab === 'bidding' && <BiddingView />}
        {activeTab === 'sow' && <ScopeOfWorkView />}
        {activeTab === 'sms' && <SMSAssistantView />}
        {activeTab === 'clock' && <TimeZoneClock />}
      </div>
    </div>
  );
}

function SMSAssistantView() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">SMS AI Assistant</h2>
      <p className="text-sm text-slate-600">
        Send SMS to your Multi-Dash Maintenance crew number for field-ops assistance.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-slate-700">
        <strong>Twilio Setup Required:</strong> Configure your Twilio webhook in n8n to activate inbound SMS routing.
      </div>
    </div>
  );
}
