import React from 'react';
import { X, CheckCircle2, FileCheck, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { ServiceItem } from '../types';

interface DocGuideModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onApply: (service: ServiceItem) => void;
}

export const DocGuideModal: React.FC<DocGuideModalProps> = ({
  service,
  onClose,
  onApply,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
          <FileCheck className="w-4 h-4" />
          <span>{service.categoryName}</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 pr-8 mb-2">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        {/* Key metadata banner */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs mb-6">
          <div>
            <span className="text-slate-400 font-medium block">Official Portal:</span>
            <span className="font-bold text-slate-900">{service.officialPortal}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Estimated Turnaround:</span>
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {service.turnaroundTime}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Govt Fee:</span>
            <span className="font-bold text-slate-900">{service.govtFeeEstimate}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Service Assistance:</span>
            <span className="font-bold text-emerald-700">{service.serviceCharge}</span>
          </div>
        </div>

        {/* Required Documents List */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Mandatory Documents Checklist:
          </h4>
          <div className="space-y-2.5">
            {service.requiredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{doc}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Tip: Clear smartphone camera photos of original documents are fully accepted by our team.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onApply(service);
              onClose();
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-98 cursor-pointer"
          >
            <span>Apply for this Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/919564714595?text=Hello%20Patlu%20Online%20Service,%20I%20have%20a%20document%20query%20about:%20${encodeURIComponent(service.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
