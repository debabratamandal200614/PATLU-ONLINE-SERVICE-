import React, { useState } from 'react';
import { Calculator, Check, Plus, MessageCircle, Sparkles, ShieldCheck, QrCode } from 'lucide-react';
import { SERVICE_CATEGORIES, SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface FeeEstimatorProps {
  onOpenPaymentQrModal?: (amount: number, title?: string) => void;
}

export const FeeEstimator: React.FC<FeeEstimatorProps> = ({ onOpenPaymentQrModal }) => {
  const allServices = SERVICE_CATEGORIES.flatMap((cat) => cat.services);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('ssc-exams');
  const [includeColorPrint, setIncludeColorPrint] = useState<boolean>(true);
  const [includeLamination, setIncludeLamination] = useState<boolean>(false);
  const [includeUrgentQueue, setIncludeUrgentQueue] = useState<boolean>(false);
  const [includePvcCard, setIncludePvcCard] = useState<boolean>(false);

  const activeService = allServices.find((s) => s.id === selectedServiceId) || allServices[0];

  // Pricing math
  const serviceBaseFee = activeService.serviceCharge;
  const colorPrintFee = includeColorPrint ? 10 : 0;
  const laminationFee = includeLamination ? 20 : 0;
  const urgentFee = includeUrgentQueue ? 25 : 0;
  const pvcCardFee = includePvcCard ? 50 : 0;

  const totalServiceCharge =
    serviceBaseFee + colorPrintFee + laminationFee + urgentFee + pvcCardFee;

  const handleWhatsAppBooking = () => {
    const addons = [];
    if (includeColorPrint) addons.push('Color Print (+₹10)');
    if (includeLamination) addons.push('Lamination (+₹20)');
    if (includeUrgentQueue) addons.push('Priority Queue (+₹25)');
    if (includePvcCard) addons.push('PVC Card (+₹50)');

    const text = 
      `Hello PATLU ONLINE SERVICE! I used your Fee Calculator for:\n\n` +
      `📌 Service: *${activeService.name}*\n` +
      `💵 Base Service Fee: ₹${serviceBaseFee}\n` +
      `➕ Add-ons: ${addons.length > 0 ? addons.join(', ') : 'None'}\n` +
      `💰 Total Service Estimate: *₹${totalServiceCharge}* (+ Govt fee: ${activeService.governmentFeeText})\n\n` +
      `Please confirm when I can submit my documents.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="calculator" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-3">
          <Calculator className="w-3.5 h-3.5 text-blue-600" />
          Transparent &amp; Honest Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Instant Service Fee Calculator
        </h2>
        <p className="text-base text-slate-600">
          No hidden charges or surprise costs. See exactly how much your form submission,
          printout, and lamination will cost.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Form & Addon Selectors */}
          <div className="p-6 sm:p-8 md:col-span-7 border-b md:border-b-0 md:border-r border-slate-200 space-y-6">
            <div>
              <label htmlFor="calculator-service-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Step 1: Choose Your Primary Service
              </label>
              <select
                id="calculator-service-select"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full py-3 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {allServices.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (Service: ₹{s.serviceCharge})
                  </option>
                ))}
              </select>
            </div>

            {/* Addons Checklist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Step 2: Add Optional Add-Ons &amp; Extras
              </label>
              <div className="space-y-2.5">
                {/* Add-on 1: Color Print */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  includeColorPrint ? 'bg-blue-50/70 border-blue-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeColorPrint}
                      onChange={(e) => setIncludeColorPrint(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                        High-Res Color Print of Final Slip
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Glossy / Laser crisp printout on 80GSM bond paper
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">+₹10</span>
                </label>

                {/* Add-on 2: Heavy Lamination */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  includeLamination ? 'bg-blue-50/70 border-blue-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeLamination}
                      onChange={(e) => setIncludeLamination(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                        Heavy 250-Micron Lamination
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Waterproof and tear-proof protection for certificates &amp; slips
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">+₹20</span>
                </label>

                {/* Add-on 3: Urgent priority slot */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  includeUrgentQueue ? 'bg-blue-50/70 border-blue-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeUrgentQueue}
                      onChange={(e) => setIncludeUrgentQueue(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                        Urgent Deadline Fast-Track (Within 15 Mins)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Prioritized over general queue for same-day deadlines
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">+₹25</span>
                </label>

                {/* Add-on 4: PVC Card */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  includePvcCard ? 'bg-blue-50/70 border-blue-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includePvcCard}
                      onChange={(e) => setIncludePvcCard(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                        PVC Smart Card (Waterproof ATM Style)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        For Aadhaar / PAN / Ayushman / Voter card
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">+₹50</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Total & WhatsApp Booking Button */}
          <div className="p-6 sm:p-8 md:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  Estimated Summary
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  All Taxes Included
                </span>
              </div>

              <div className="text-xs text-slate-300 font-medium mb-1">
                Selected Service:
              </div>
              <div className="text-sm font-bold text-white mb-4 line-clamp-1">
                {activeService.name}
              </div>

              {/* Line items */}
              <div className="space-y-2 border-t border-slate-800 pt-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Base Form Filling Charge:</span>
                  <span className="font-bold text-white">₹{serviceBaseFee}</span>
                </div>
                {includeColorPrint && (
                  <div className="flex justify-between text-blue-300">
                    <span>+ Color Printout:</span>
                    <span>₹10</span>
                  </div>
                )}
                {includeLamination && (
                  <div className="flex justify-between text-blue-300">
                    <span>+ Heavy Lamination:</span>
                    <span>₹20</span>
                  </div>
                )}
                {includeUrgentQueue && (
                  <div className="flex justify-between text-blue-300">
                    <span>+ Priority Fast-Track:</span>
                    <span>₹25</span>
                  </div>
                )}
                {includePvcCard && (
                  <div className="flex justify-between text-blue-300">
                    <span>+ PVC Smart Card:</span>
                    <span>₹50</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800/80">
                  <span>Govt / Portal Fee:</span>
                  <span className="text-slate-300 italic">{activeService.governmentFeeText}</span>
                </div>
              </div>

              {/* Big Total Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Total Service Amount
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mt-0.5">
                  ₹{totalServiceCharge}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Pay after submission or via UPI QR</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {onOpenPaymentQrModal && (
                <button
                  type="button"
                  id="estimator-payment-qr-btn"
                  onClick={() => onOpenPaymentQrModal(totalServiceCharge, activeService.name)}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-purple-200" />
                  <span>Pay ₹{totalServiceCharge} via PhonePe QR</span>
                </button>
              )}

              <button
                type="button"
                id="estimator-whatsapp-order-btn"
                onClick={handleWhatsAppBooking}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm &amp; Book on WhatsApp</span>
              </button>
              <p className="text-[11px] text-center text-slate-400">
                Direct chat with Patlu Online Service team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
