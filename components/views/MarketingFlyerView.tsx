'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, Image as ImageIcon, Phone, Mail, MapPin, Wrench, Shield, Layers } from 'lucide-react';

export default function MarketingFlyerView() {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  const imagePrompt = `High-resolution professional marketing flyer visual for Multi-Dash Maintenance LLC. Split-screen layout. Left side: Dark, unfinished concrete basement with exposed framing and studs. Right side: Fully finished, modern luxury basement with recessed LED lighting, custom drywall, and plush seating. A central glowing technical UI overlay titled 'MEUP CORE' bridges the two sides with blue diagnostic lines and nodes pointing to structural components. Clean, modern, commercial aesthetic.`;

  const flyerBlueprint = `MULTI-DASH MAINTENANCE LLC
Precision-Engineered Basement Turnkey Solutions
DON'T MOVE — IMPROVE YOUR INFRASTRUCTURE
Transform raw square footage into an optimized, high-value asset. Built using precision diagnostic planning, code-certified executions, and systemic compliance.

* Integrated Diagnostic Planning: Complete 3D MEUP spatial visualization, scope mapping, and structural integration.
* Master Trade Execution: Commercial-grade plumbing, diagnostic-led electrical systems, and custom framing complying strictly with NCCER parameters.
* Zero-Defect Quality Standard: Empirical site mapping and real-time oversight to ensure long-term asset resiliency.

SPECIAL INTRODUCTORY DIRECTIVE
FULL NEW CONSTRUCTION BASEMENT REMODEL
Labor Starting At $8,000.00
(Includes full diagnostic consultation, structural framework layout, and complete scope mapping.)

CONTACT FOR A DIAGNOSTIC CONSULTATION
* Direct Line: (734) 218-2063
* Email: jdwestlake89@gmail.com
* Location: Ypsilanti, MI`;

  const copyToClipboard = (text: string, type: 'prompt' | 'blueprint') => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedBlueprint(true);
      setTimeout(() => setCopiedBlueprint(false), 2000);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 text-white p-6 rounded-lg border border-slate-800 shadow-lg relative overflow-hidden scanline">
        <div className="z-10">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse status-strip-active inline-block"></span>
            MEUP Core Operational Blueprint
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Marketing Flyer & Graphic Prompt Blueprint
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Precision-Engineered Basement Turnkey Solutions • Multi-Dash Maintenance LLC
          </p>
        </div>
        <div className="mt-4 md:mt-0 z-10 flex gap-2">
          <button
            onClick={() => copyToClipboard(imagePrompt, 'prompt')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-3 rounded shadow transition"
          >
            {copiedPrompt ? <Check size={14} /> : <Copy size={14} />}
            {copiedPrompt ? 'Prompt Copied!' : 'Copy Image Prompt'}
          </button>
          <button
            onClick={() => copyToClipboard(flyerBlueprint, 'blueprint')}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold py-2 px-3 rounded shadow transition"
          >
            {copiedBlueprint ? <Check size={14} /> : <Copy size={14} />}
            {copiedBlueprint ? 'Blueprint Copied!' : 'Copy Text Copy'}
          </button>
        </div>
      </div>

      {/* Assembly Directive Note */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-sm text-amber-900 shadow-sm">
        <div className="font-semibold flex items-center gap-2 mb-1 text-amber-900">
          <Sparkles size={16} className="text-amber-600" />
          Design Software & External Prompt Execution Instructions:
        </div>
        <ul className="list-disc list-inside space-y-1 text-xs text-amber-800">
          <li><strong>Design Software Assembly:</strong> Copy and paste the text templates directly into visual design platforms (Canva, Adobe Express, Photoshop).</li>
          <li><strong>Graphic Prompt Execution:</strong> Copy the prompt below into external image tools (Midjourney, DALL-E 3) to render background visuals.</li>
        </ul>
      </div>

      {/* Grid Layout for Prompt & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Card: Graphic Prompt */}
        <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-lg p-6 shadow-md relative overflow-hidden structural-card">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <h3 className="font-mono text-sm uppercase text-blue-400 font-semibold flex items-center gap-2">
              <ImageIcon size={16} />
              External Image Generation Prompt
            </h3>
            <button
              onClick={() => copyToClipboard(imagePrompt, 'prompt')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
            >
              {copiedPrompt ? <Check size={12} /> : <Copy size={12} />}
              Copy
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded p-4 font-mono text-xs text-slate-300 leading-relaxed mb-4">
            "{imagePrompt}"
          </div>

          <div className="space-y-2 text-xs text-slate-400 font-mono">
            <p className="text-blue-400 font-semibold uppercase tracking-wider text-[11px]">Visual Composition Parameters:</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-300 font-semibold block">Left Split:</span>
                Dark, unfinished concrete basement with exposed framing & studs.
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-300 font-semibold block">Right Split:</span>
                Finished luxury basement, recessed LED lighting, custom drywall.
              </div>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-800">
              <span className="text-slate-300 font-semibold block">Bridge Overlay:</span>
              Central glowing technical UI overlay titled 'MEUP CORE' with diagnostic lines.
            </div>
          </div>
        </div>

        {/* Right Card: Visual Flyer Layout Preview */}
        <div className="bg-slate-900 border border-slate-800 text-white rounded-lg p-6 shadow-md relative overflow-hidden structural-card">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <h3 className="font-mono text-sm uppercase text-emerald-400 font-semibold flex items-center gap-2">
              <Layers size={16} />
              Live Flyer Blueprint Layout
            </h3>
            <button
              onClick={() => copyToClipboard(flyerBlueprint, 'blueprint')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-700"
            >
              {copiedBlueprint ? <Check size={12} /> : <Copy size={12} />}
              Copy Copy
            </button>
          </div>

          <div className="space-y-4 text-slate-200">
            {/* Header */}
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-xl font-bold tracking-tight text-white uppercase">MULTI-DASH MAINTENANCE LLC</h2>
              <p className="text-blue-400 text-xs font-mono font-semibold">Precision-Engineered Basement Turnkey Solutions</p>
            </div>

            {/* Hook */}
            <div className="bg-blue-950/40 border border-blue-900/60 p-3 rounded">
              <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wide">DON'T MOVE — IMPROVE YOUR INFRASTRUCTURE</h4>
              <p className="text-xs text-slate-300 mt-1">
                Transform raw square footage into an optimized, high-value asset. Built using precision diagnostic planning, code-certified executions, and systemic compliance.
              </p>
            </div>

            {/* Pillars */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Shield size={14} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Integrated Diagnostic Planning:</strong> Complete 3D MEUP spatial visualization, scope mapping, and structural integration.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Wrench size={14} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Master Trade Execution:</strong> Commercial-grade plumbing, diagnostic-led electrical, custom framing strictly complying with NCCER parameters.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Zero-Defect Quality Standard:</strong> Empirical site mapping and real-time oversight to ensure long-term asset resiliency.
                </div>
              </div>
            </div>

            {/* Offer Box */}
            <div className="bg-slate-950 border border-blue-500/50 p-4 rounded text-center space-y-1 shadow-inner">
              <p className="text-[10px] font-mono uppercase tracking-widest text-blue-400">SPECIAL INTRODUCTORY DIRECTIVE</p>
              <h3 className="text-sm font-bold text-white uppercase">FULL NEW CONSTRUCTION BASEMENT REMODEL</h3>
              <p className="text-2xl font-mono font-extrabold text-emerald-400">Labor Starting At $8,000.00</p>
              <p className="text-[11px] text-slate-400">(Includes full diagnostic consultation, structural framework layout, and complete scope mapping.)</p>
            </div>

            {/* Contact Footer */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="text-blue-400" />
                <span>(734) 218-2063</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-blue-400" />
                <span className="truncate">jdwestlake89@gmail.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-blue-400" />
                <span>Ypsilanti, MI</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
