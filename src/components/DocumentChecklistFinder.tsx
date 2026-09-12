import React, { useState } from 'react';
import {
  FileCheck,
  Camera,
  PenTool,
  AlertTriangle,
  Copy,
  Check,
  Share2,
  MessageCircle,
  HelpCircle,
  Store
} from 'lucide-react';
import { SERVICE_CATEGORIES, SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface DocumentChecklistFinderProps {
  preSelectedServiceName?: string;
  onApplyForThis: (serviceName: string) => void;
}

export const DocumentChecklistFinder: React.FC<DocumentChecklistFinderProps> = ({
  preSelectedServiceName,
  onApplyForThis,
}) => {
  // Collect all services
  const allServicesList = SERVICE_CATEGORIES.flatMap((c) => c.services);

  const [selectedServiceId, setSelectedServiceId] = useState<string>(() => {
    if (preSelectedServiceName) {
      const match = allServicesList.find(
        (s) => s.name.toLowerCase() === preSelectedServiceName.toLowerCase()
      );
      if (match) return match.id;
    }
    return allServicesList[0]?.id || 'ssc-exams';
  });

  const [copied, setCopied] = useState(false);

  const activeService =
    allServicesList.find((s) => s.id === selectedServiceId) || allServicesList[0];

  const handleCopyChecklist = () => {
    if (!activeService) return;
    const text = `📋 Document Checklist for ${activeService.name} (PATLU ONLINE SERVICE):\n\n` +
      `Required Documents:\n` +
      activeService.requiredDocuments.map((doc, i) => `${i + 1}. ${doc}`).join('\n') +
      (activeService.photoSpecs ? `\n\n📸 Photo Specs: ${activeService.photoSpecs}` : '') +
      (activeService.signatureSpecs ? `\n✍️ Signature: ${activeService.signatureSpecs}` : '') +
      `\n\nSend these to PATLU ONLINE SERVICE on WhatsApp: ${SHOP_INFO.displayPhone}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendToWhatsApp = () => {
    if (!activeService) return;
    const message = `Hello PATLU ONLINE SERVICE! I want to check the documents checklist for *${activeService.name}* and get ready to apply.`;
    safeOpenUrl(getWhatsAppUrl(message));
  };

  return (
    <section id="checklist" className="py-16 md:py-24 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-3">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            Zero-Mistake Preparation
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Document Checklist &amp; Photo Guidelines
          </h2>
          <p className="text-base text-slate-600">
            Avoid application rejections! Check the exact dimensions, file sizes, and documents
            required before submitting your form.
          </p>
        </div>

        {/* Form Selector Dropdown / Pills */}
        <div className="max-w-xl mx-auto mb-8">
          <label htmlFor="service-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            Select an Exam or Citizen Service:
          </label>
          <select
            id="service-select"
            value={activeService?.id}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="w-full py-3.5 px-4 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <optgroup key={cat.id} label={cat.name}>
                {cat.services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {/* Quick Select Shortcut Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <span className="text-xs text-slate-500 font-medium">Quick jump:</span>
            <button
              type="button"
              onClick={() => setSelectedServiceId('aadhaar-address-update')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeService?.id === 'aadhaar-address-update'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
              }`}
            >
              🔥 Aadhaar ₹125 Offer
            </button>
            <button
              type="button"
              onClick={() => setSelectedServiceId('pan-card')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeService?.id === 'pan-card'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
              }`}
            >
              ⚡ PAN Card ₹200 Offer
            </button>
            <button
              type="button"
              onClick={() => setSelectedServiceId('ssc-exams')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeService?.id === 'ssc-exams'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              SSC Forms
            </button>
            <button
              type="button"
              onClick={() => setSelectedServiceId('voter-id')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeService?.id === 'voter-id'
                  ? 'bg-orange-500 text-slate-950 shadow-xs'
                  : 'bg-orange-100 text-orange-950 hover:bg-orange-200 border border-orange-300'
              }`}
            >
              🗳️ Voter ID ₹50 Offer
            </button>
            <button
              type="button"
              onClick={() => setSelectedServiceId('ayushman-card')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeService?.id === 'ayushman-card'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-teal-100 text-teal-950 hover:bg-teal-200 border border-teal-300'
              }`}
            >
              🏥 Ayushman Card ₹50/₹100
            </button>
          </div>
        </div>

        {/* Selected Service Checklist Display Card */}
        {activeService && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Document Guide
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {activeService.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Govt Fee: <strong className="text-slate-700">{activeService.governmentFeeText}</strong> &bull; Service Fee: <strong className="text-emerald-600">₹{activeService.serviceCharge}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="copy-checklist-btn"
                  onClick={handleCopyChecklist}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy List'}</span>
                </button>

                <button
                  type="button"
                  id="whatsapp-checklist-btn"
                  onClick={handleSendToWhatsApp}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send to WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mandatory Documents list */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>Mandatory Documents</span>
                </h4>
                <ul className="space-y-3">
                  {activeService.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800 font-medium">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo & Signature Specs */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-orange-600" />
                  <span>Official Upload Specifications</span>
                </h4>

                {activeService.photoSpecs ? (
                  <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-900 mb-1.5">
                      <Camera className="w-4 h-4 text-orange-600" />
                      <span>Photo Dimensions &amp; Size</span>
                    </div>
                    <p className="text-xs text-orange-950 leading-relaxed font-medium">
                      {activeService.photoSpecs}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    Standard passport photo or e-KYC photo from Aadhaar applies.
                  </div>
                )}

                {activeService.signatureSpecs && (
                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1.5">
                      <PenTool className="w-4 h-4 text-blue-600" />
                      <span>Signature Requirements</span>
                    </div>
                    <p className="text-xs text-blue-950 leading-relaxed font-medium">
                      {activeService.signatureSpecs}
                    </p>
                  </div>
                )}

                {/* Important Notice Callout */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900">
                    <strong>Patlu Online Service Promise:</strong> If you don’t have an exact scanned photo or signature file, just send us a clear phone picture. We will professionally crop, compress, and format it for you at no extra hassle!
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom direct apply action */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Ready with these documents? Visit our shop counter in Belda for instant form submission!
              </span>

              <button
                type="button"
                id="checklist-apply-cta"
                onClick={() => onApplyForThis(activeService.name)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-sm cursor-pointer active:scale-95 transition-all"
                title="Visit our physical shop counter with these documents"
              >
                <Store className="w-4 h-4" />
                <span>Visit Shop with Documents</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
