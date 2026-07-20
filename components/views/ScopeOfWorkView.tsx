'use client';

import { useState } from 'react';
import { ClipboardList, Upload, Image, Cpu, CheckCircle2 } from 'lucide-react';

interface ScopeItem {
  id: string;
  category: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  laborHours: number;
  materialCost: number;
}

export default function ScopeOfWorkView() {
  const [jobName, setJobName] = useState('Sector 5 Rehabilitation');
  const [clientName, setClientName] = useState('Multi-Dash Properties LLC');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sowGenerated, setSowGenerated] = useState(false);

  // Simulated SOW items based on NCCER/OSHA categories
  const [scopeItems, setScopeItems] = useState<ScopeItem[]>([
    {
      id: '1',
      category: 'Structural Framing',
      description: 'NCCER-aligned wall framing framing check & reinforcement',
      quantity: 120,
      unit: 'LF',
      unitCost: 95.0,
      laborHours: 30,
      materialCost: 3500.0,
    },
    {
      id: '2',
      category: 'Roof System',
      description: 'Truss truss stabilization & OSHA safety guardrails installation',
      quantity: 1,
      unit: 'LS',
      unitCost: 1250.0,
      laborHours: 15,
      materialCost: 800.0,
    },
    {
      id: '3',
      category: 'Compliance Remediation',
      description: 'Remediation of non-compliant structural framing to meet local code',
      quantity: 1,
      unit: 'LS',
      unitCost: 950.0,
      laborHours: 8,
      materialCost: 300.0,
    },
  ]);

  const handleUploadSimulate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setImageUploaded(true);
      setSowGenerated(true);
    }, 2000);
  };

  const calculateSubtotal = () => {
    return scopeItems.reduce(
      (sum, item) => sum + item.quantity * item.unitCost + item.materialCost,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const vroReserve = subtotal * 0.1;
  const contractorOperating = subtotal * 0.9;
  const totalLaborHours = scopeItems.reduce((sum, item) => sum + item.laborHours, 0);

  return (
    <div className="space-y-6">
      {/* Engine Overview */}
      <div className="structural-card p-6 rounded-lg relative overflow-hidden">
        <div className="scanline"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#a98a7d] uppercase tracking-wider">
              VISION_TO_SOW_ENGINE
            </span>
            <h2 className="text-xl font-bold text-[#ff6b00] mt-1">
              Field AI Estimator & SOW Generator
            </h2>
          </div>
          <div className="bg-[#121317] border border-[#5a4136] px-4 py-2 rounded font-mono text-xs text-[#e2bfb0] flex items-center gap-1">
            <Cpu className="h-4 w-4 text-[#ffb693] animate-pulse" />
            ENGINE_STATUS: <span className="text-[#7a92ff] font-bold">READY</span>
          </div>
        </div>
        <p className="text-sm text-[#e3e2e7] mt-4">
          Upload field site photos to automatically analyze structural conditions, generate NCCER-compliant line items, estimate materials, and compile a formal Statement of Work.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload & Setup Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="structural-card p-6 rounded-lg space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#ffb693] uppercase tracking-wider">
              PROJECT_METADATA_INPUT
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-[#a98a7d] mb-1">
                  JOB_NAME
                </label>
                <input
                  type="text"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  className="w-full bg-[#121317] border border-[#5a4136] rounded px-3 py-2 text-sm text-[#e3e2e7] focus:outline-none focus:border-[#ff6b00]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#a98a7d] mb-1">
                  CLIENT_NAME
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#121317] border border-[#5a4136] rounded px-3 py-2 text-sm text-[#e3e2e7] focus:outline-none focus:border-[#ff6b00]"
                />
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="pt-4 border-t border-[#5a4136]">
              <label className="block text-xs font-mono text-[#a98a7d] mb-2 uppercase">
                FIELD_PHOTO_INGRESS
              </label>
              {!imageUploaded && !isProcessing ? (
                <div
                  onClick={handleUploadSimulate}
                  className="border-2 border-dashed border-[#5a4136] rounded-lg p-6 text-center cursor-pointer hover:border-[#ffb693] transition-colors"
                >
                  <Upload className="mx-auto h-8 w-8 text-[#e2bfb0] mb-2" />
                  <span className="block text-xs font-mono text-[#e3e2e7]">
                    DRAG_SITE_PHOTO_HERE
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-1">
                    Or click to simulate upload
                  </span>
                </div>
              ) : isProcessing ? (
                <div className="border border-[#5a4136] bg-[#121317] rounded-lg p-6 text-center space-y-3">
                  <Cpu className="mx-auto h-8 w-8 text-[#ff6b00] animate-spin" />
                  <span className="block text-xs font-mono text-[#ffb693] animate-pulse">
                    ANALYZING_FIELD_IMAGE_VIA_GEMINI...
                  </span>
                </div>
              ) : (
                <div className="border border-[#2e5a44] bg-[#1a2e26] rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#b8ffdf]" />
                    <span className="font-mono text-xs font-bold text-[#b8ffdf]">
                      IMAGE_ANALYZED_SUCCESSFULLY
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#121317] border border-[#2e5a44] p-2 rounded">
                    <Image className="h-4 w-4 text-[#ffb693]" />
                    <span className="text-[10px] font-mono text-[#e2bfb0] truncate">
                      field_image_sec5_framing.jpg
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setImageUploaded(false);
                      setSowGenerated(false);
                    }}
                    className="text-xs text-[#a98a7d] hover:text-[#ffb693] underline font-mono"
                  >
                    RESET_INGRESS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statement of Work Preview */}
        <div className="lg:col-span-7">
          <div className="structural-card p-6 rounded-lg relative overflow-hidden h-full flex flex-col justify-between">
            <div className="scanline"></div>
            <div>
              <div className="flex justify-between items-start border-b border-[#5a4136] pb-3 mb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#ffb693] tracking-wider uppercase">
                    STATEMENT_OF_WORK_PREVIEW
                  </span>
                  <h3 className="text-base font-bold text-[#e3e2e7] mt-1">{jobName}</h3>
                </div>
                <span className="bg-[#5a4136] text-[#ffb693] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  DRAFT
                </span>
              </div>

              {!sowGenerated ? (
                <div className="text-center py-20 text-[#a98a7d] space-y-2">
                  <ClipboardList className="mx-auto h-12 w-12 opacity-30" />
                  <p className="font-mono text-sm">NO_DATA_INGESTED</p>
                  <p className="text-xs">
                    Please upload and analyze a field photo to generate the SOW estimate.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Scope Items */}
                  <div className="space-y-3">
                    {scopeItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#121317] border border-[#5a4136] p-3 rounded"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="bg-[#343539] text-[#e2bfb0] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                              {item.category}
                            </span>
                            <p className="text-xs text-[#e3e2e7] font-semibold mt-1.5">
                              {item.description}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-[#ffb693] font-bold">
                            ${(item.quantity * item.unitCost + item.materialCost).toLocaleString(
                              undefined,
                              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                            )}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-[#1e1f23] text-[10px] font-mono text-[#a98a7d]">
                          <div>
                            QTY: <span className="text-[#e3e2e7]">{item.quantity} {item.unit}</span>
                          </div>
                          <div>
                            LABOR: <span className="text-[#e3e2e7]">{item.laborHours}h</span>
                          </div>
                          <div>
                            MATERIALS: <span className="text-[#e3e2e7]">${item.materialCost.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Financial Summary */}
                  <div className="border-t border-[#5a4136] pt-4 mt-6 space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-[#a98a7d]">
                      <span>TOTAL_ESTIMATED_LABOR:</span>
                      <span className="text-[#e3e2e7]">{totalLaborHours} hours</span>
                    </div>
                    <div className="flex justify-between text-[#a98a7d]">
                      <span>SUBTOTAL_PROJECT_VALUE:</span>
                      <span className="text-[#e3e2e7] font-bold">
                        ${subtotal.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#ff6b00] border-t border-[#5a4136]/50 pt-2 font-bold">
                      <span>VRO_RESERVE_SPLIT (10%):</span>
                      <span>
                        ${vroReserve.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#7a92ff] font-bold">
                      <span>CONTRACTOR_OPERATING (90%):</span>
                      <span>
                        ${contractorOperating.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {sowGenerated && (
              <div className="mt-6">
                <button
                  onClick={() => alert('SOW formally exported to n8n secure ledger database!')}
                  className="w-full bg-[#ff6b00] text-[#561f00] font-mono text-xs font-bold py-3 px-4 rounded hover:bg-[#ffb693] transition-colors"
                >
                  EXPORT_SOW_TO_LEDGER
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
