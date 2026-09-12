import React, { useState } from 'react';
import {
  QrCode,
  Copy,
  Check,
  Download,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Smartphone,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

export const PaymentQrSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState<number>(100);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SHOP_INFO.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const upiPayUrl = `upi://pay?pa=${SHOP_INFO.upiId}&pn=${encodeURIComponent(SHOP_INFO.upiName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('PATLU ONLINE SERVICE Payment')}`;

  const handleWhatsAppNotify = () => {
    const text = 
      `Hello PATLU ONLINE SERVICE!\n\n` +
      `I have scanned your PhonePe QR Code and transferred ₹${amount}.\n` +
      `Payee: *${SHOP_INFO.upiName}*\n\n` +
      `Attached is my payment screenshot for confirmation.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="payment-qr" className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-3xl bg-slate-950 text-white shadow-2xl border-2 border-purple-500/40 p-6 sm:p-8 md:p-10 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Info & UPI Instructions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
              <QrCode className="w-4 h-4 text-purple-400" />
              <span>OFFICIAL MERCHANT PAYMENT PORTAL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Scan &amp; Pay Instantly via <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200">PhonePe / GPay / Paytm</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Pay your online application fees, print charges, or digital seva service charges securely using any UPI app. Scan the official merchant QR code or transfer directly to account holder <strong>{SHOP_INFO.upiName}</strong>.
            </p>

            {/* Quick UPI Copy Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-inner">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Official UPI ID for Direct Transfer:
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-purple-300">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span>{SHOP_INFO.upiId}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className={`px-3.5 py-2 rounded-lg font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied UPI ID!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy UPI ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Supported Payment App Icons Badge */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Accepted Apps:
              </span>
              <span className="bg-slate-900 border border-slate-800 text-purple-300 px-2.5 py-1 rounded-lg font-bold">
                PhonePe
              </span>
              <span className="bg-slate-900 border border-slate-800 text-blue-300 px-2.5 py-1 rounded-lg font-bold">
                Google Pay (GPay)
              </span>
              <span className="bg-slate-900 border border-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg font-bold">
                Paytm
              </span>
              <span className="bg-slate-900 border border-slate-800 text-orange-300 px-2.5 py-1 rounded-lg font-bold">
                BHIM UPI
              </span>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={upiPayUrl}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-purple-600 hover:bg-purple-500 text-white shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-purple-200" />
                <span>Open UPI App on Phone</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleWhatsAppNotify}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Payment on WhatsApp</span>
              </button>
            </div>

          </div>

          {/* Right Column: PhonePe Payment QR Poster */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white rounded-3xl p-5 sm:p-6 text-slate-950 shadow-2xl border-4 border-purple-500/40 w-full max-w-sm flex flex-col items-center text-center space-y-4">
              
              {/* PhonePe Header */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-black text-sm shadow-md">
                    पे
                  </div>
                  <span className="text-2xl font-black text-purple-900 tracking-tight">PhonePe</span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  ACCEPTED HERE
                </span>
                <span className="text-xs font-semibold text-slate-600 mt-1">
                  Scan &amp; Pay Using PhonePe App
                </span>
              </div>

              {/* QR Image */}
              <div className="relative p-2 bg-white rounded-2xl border-2 border-slate-200 shadow-inner">
                <img
                  src={SHOP_INFO.upiQrImage}
                  alt={`Official PhonePe Payment QR Code for ${SHOP_INFO.upiName}`}
                  className="w-64 h-auto aspect-1/1 object-contain rounded-xl"
                />
              </div>

              {/* Account Holder Name */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  VERIFIED MERCHANT
                </span>
                <div className="text-lg font-black text-slate-900 tracking-wide mt-0.5">
                  {SHOP_INFO.upiName}
                </div>
              </div>

              {/* Download QR Button */}
              <a
                href={SHOP_INFO.upiQrImage}
                download="PATLU_ONLINE_SERVICE_Payment_QR.jpg"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Download Official PhonePe QR</span>
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
