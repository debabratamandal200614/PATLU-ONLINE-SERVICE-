import React, { useState } from 'react';
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Smartphone,
  Info
} from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface PaymentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  serviceTitle?: string;
}

export const PaymentQrModal: React.FC<PaymentQrModalProps> = ({
  isOpen,
  onClose,
  initialAmount = 100,
  serviceTitle
}) => {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [customAmountText, setCustomAmountText] = useState<string>(initialAmount.toString());

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SHOP_INFO.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAmountChange = (val: number) => {
    setAmount(val);
    setCustomAmountText(val.toString());
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCustomAmountText(raw);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const upiPayUrl = `upi://pay?pa=${SHOP_INFO.upiId}&pn=${encodeURIComponent(SHOP_INFO.upiName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(serviceTitle ? `Payment for ${serviceTitle}` : 'Service Charge PATLU ONLINE')}`;

  const handleWhatsAppNotify = () => {
    const text = 
      `Hello PATLU ONLINE SERVICE!\n\n` +
      `I have made a payment via PhonePe / UPI QR Code:\n` +
      `💰 Paid Amount: *₹${amount}*\n` +
      `📌 For Service: *${serviceTitle || 'Online Service Fee'}*\n` +
      `👤 Payee: *${SHOP_INFO.upiName}*\n\n` +
      `Please check the payment and confirm my request.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-purple-500/40 rounded-3xl shadow-2xl text-white overflow-hidden my-auto">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 p-4 sm:p-5 flex items-center justify-between border-b border-purple-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
              <QrCode className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white text-purple-900 px-2 py-0.5 rounded">
                  PHONEPE ACCEPTED HERE
                </span>
                <span className="text-[10px] font-bold text-purple-200 hidden sm:inline">
                  &bull; Instant UPI
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                Scan &amp; Pay via PhonePe / GPay / Paytm
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Service Title Context */}
          {serviceTitle && (
            <div className="bg-purple-950/50 border border-purple-500/30 rounded-xl p-3 text-xs text-purple-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">Service: <strong>{serviceTitle}</strong></span>
              </div>
              <span className="font-extrabold text-white bg-purple-600 px-2.5 py-0.5 rounded-lg text-xs shrink-0">
                ₹{amount}
              </span>
            </div>
          )}

          {/* Quick Amount Selector Chips */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select or Enter Payment Amount (₹):
            </label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {[50, 60, 100, 125, 150, 200].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleAmountChange(preset)}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    amount === preset
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-md scale-105'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  ₹{preset}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                min="1"
                value={customAmountText}
                onChange={handleCustomTextChange}
                placeholder="Enter custom amount"
                className="w-full py-2.5 pl-8 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-black text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Main PhonePe QR Code Card (Matches uploaded image exactly) */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 text-slate-950 shadow-2xl border-2 border-purple-500/30 flex flex-col items-center text-center space-y-3 relative">
            
            {/* Top PhonePe Logo Header */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-white font-black text-xs shadow-md">
                  पे
                </div>
                <span className="text-xl font-black text-purple-900 tracking-tight">PhonePe</span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-purple-700">
                ACCEPTED HERE
              </span>
              <span className="text-[11px] font-semibold text-slate-600">
                Scan &amp; Pay Using PhonePe / Any UPI App
              </span>
            </div>

            {/* QR Code Container */}
            <div className="relative p-2 bg-white rounded-xl border-2 border-slate-200 shadow-inner">
              <img
                src={SHOP_INFO.upiQrImage}
                alt={`PhonePe Payment QR Code for ${SHOP_INFO.upiName}`}
                className="w-56 h-auto sm:w-64 aspect-1/1 object-contain rounded-lg"
              />
            </div>

            {/* Account Owner Name (Matches DEBABRATA MANDAL in image) */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                VERIFIED MERCHANT ACCOUNT
              </span>
              <div className="text-base sm:text-lg font-black text-slate-900 tracking-wide mt-0.5">
                {SHOP_INFO.upiName}
              </div>
            </div>

            {/* Powered Notice */}
            <div className="text-[10px] font-medium text-slate-500 pt-1 border-t border-slate-200 w-full">
              Accepted via PhonePe, Google Pay, Paytm, BHIM &amp; all Bank UPI Apps
            </div>
          </div>

          {/* UPI ID Copy Bar */}
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Official UPI ID / Phone Number:
              </span>
              <span className="font-mono font-bold text-sm text-purple-300">
                {SHOP_INFO.upiId}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyUpi}
              className={`px-3 py-2 rounded-lg font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy UPI ID</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Mobile UPI Pay Button */}
          <div className="space-y-2">
            <a
              href={upiPayUrl}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer text-center"
            >
              <Smartphone className="w-4 h-4 text-purple-200" />
              <span>Open PhonePe / UPI App to Pay ₹{amount}</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-200" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              {/* WhatsApp Screenshot Share */}
              <button
                type="button"
                onClick={handleWhatsAppNotify}
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share Screenshot</span>
              </button>

              {/* Download QR Code */}
              <a
                href={SHOP_INFO.upiQrImage}
                download="PATLU_ONLINE_SERVICE_PhonePe_QR.jpg"
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Download QR</span>
              </a>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Secure Merchant Payment &bull; Instant WhatsApp Confirmation</span>
          </div>

        </div>

      </div>
    </div>
  );
};
