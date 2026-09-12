import React, { useState } from 'react';
import { X, Send, Clock, ShieldCheck, PhoneCall, Phone } from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleOpenWhatsApp = (customMsg?: string) => {
    const defaultText =
      language === 'en'
        ? `Hello PATLU ONLINE SERVICE! I would like to inquire about online form filling assistance.`
        : `নমস্কার পাতলু অনলাইন সার্ভিস! আমি অনলাইন ফর্ম ফিলাপ সংক্রান্ত সহায়তা পেতে চাই।`;
    const message = customMsg || defaultText;
    safeOpenUrl(getWhatsAppUrl(message));
  };

  const suggestions =
    language === 'en'
      ? [
          'PVC Card Order - Ration/Aadhaar/Ayushman/Voter (₹100)',
          'Ayushman Card (e-KYC ₹50 | PVC Card ₹100)',
          'Voter ID Form 6 / Form 8 (₹50 Offer)',
          'Aadhaar Address & Father/Husband Name (₹125 Offer)',
          'New PAN Card / Correction (₹200 Offer)',
          'Apply for SSC / Railway Exam',
          'Check Document Checklist',
          'Check Status of My Form',
        ]
      : [
          'পিভিসি কার্ড অর্ডার - রেশন/আধার/আয়ুষ্মান/ভোটার (₹১০০)',
          'আয়ুষ্মান কার্ড (ই-কেওয়াইসি ₹৫০ | পিভিসি কার্ড ₹১০০)',
          'ভোটার আইডি ফর্ম ৬ / ফর্ম ৮ (₹৫০ অফার)',
          'আধারের ঠিকানা ও বাবা/স্বামীর নাম পরিবর্তন (₹১২৫ অফার)',
          'নতুন প্যান কার্ড / সংশোধন (₹২০০ অফার)',
          'এসএসসি / রেলওয়ে ফর্ম ফিলাপ',
          'প্রয়োজনীয় ডকুমেন্টের তালিকা',
          'আমার ফর্মের স্ট্যাটাস দেখুন',
        ];

  const msgPrefix =
    language === 'en'
      ? 'Hello Patlu Online Service! I need assistance with: '
      : 'নমস্কার পাতলু অনলাইন সার্ভিস! আমার এই বিষয়ে সহায়তা প্রয়োজন: ';

  return (
    <aside
      id="floating-whatsapp-container"
      aria-label="WhatsApp quick chat"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 select-none"
    >
      {/* Expanded Quick Inquiry Box */}
      {isExpanded && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-84 max-w-[calc(100vw-2.5rem)] overflow-hidden text-left animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header styled with authentic WhatsApp green */}
          <div className="bg-[#075E54] text-white p-3 sm:p-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="/whatsapp.svg"
                  alt="WhatsApp Logo"
                  className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-[#075E54]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm leading-tight text-white truncate">
                  {language === 'en' ? 'PATLU ONLINE SERVICE' : 'পাতলু অনলাইন সার্ভিস'}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {language === 'en' ? 'Typically replies in 5 mins' : 'সাধারণত ৫ মিনিটে উত্তর দেওয়া হয়'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Language Switcher Button Group */}
              <div
                className="flex items-center bg-black/25 p-0.5 rounded-lg border border-white/20 text-[10px] font-bold"
                aria-label="Language selection"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-white text-[#075E54] shadow-xs font-extrabold'
                      : 'text-emerald-100 hover:text-white'
                  }`}
                  title="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    language === 'bn'
                      ? 'bg-white text-[#075E54] shadow-xs font-extrabold'
                      : 'text-emerald-100 hover:text-white'
                  }`}
                  title="বাংলায় পরিবর্তন করুন"
                >
                  বাং
                </button>
              </div>

              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                title={`Call ${SHOP_INFO.displayPhone}`}
                aria-label="Direct Phone Call"
              >
                <PhoneCall className="w-4 h-4 text-emerald-200" />
              </a>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Bubble Body with WhatsApp style background */}
          <div className="p-4 bg-[#ECE5DD] space-y-3 max-h-64 overflow-y-auto">
            <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-xs text-xs text-slate-800 space-y-1.5 border border-slate-200/60 max-w-[92%]">
              <p className="font-semibold text-slate-900">
                {language === 'en'
                  ? 'Namaste! Welcome to Patlu Online Service 🙏'
                  : 'নমস্কার! পাতলু অনলাইন সার্ভিসে স্বাগতম 🙏'}
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {language === 'en'
                  ? 'How can we help you today? You can send your documents or ask for any exam/portal service:'
                  : 'আজ আপনাকে কীভাবে সাহায্য করতে পারি? আপনার ডকুমেন্ট পাঠাতে পারেন বা যেকোনো ফর্মের বিষয়ে জানতে পারেন:'}
              </p>
              <div className="text-[10px] text-slate-400 text-right">
                {language === 'en' ? 'Online' : 'অনলাইন'}
              </div>
            </div>

            {/* Quick Action Suggestions */}
            <div className="space-y-1.5 pt-1">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    handleOpenWhatsApp(`${msgPrefix}${suggestion}`);
                    setIsExpanded(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200/80 shadow-xs transition-colors flex items-center justify-between gap-1.5 cursor-pointer"
                >
                  <span className="line-clamp-2">{suggestion}</span>
                  <Send className="w-3 h-3 text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-1 transition-colors"
              title={`Call ${SHOP_INFO.displayPhone}`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{language === 'en' ? 'Call Helpline' : 'কল হেল্পলাইন'}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                handleOpenWhatsApp();
                setIsExpanded(false);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'en' ? 'Chat on WhatsApp' : 'হোয়াটসঅ্যাপে চ্যাট'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Tooltip (when not expanded) */}
      {showTooltip && !isExpanded && (
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 pr-8 text-left relative animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs cursor-pointer group hover:border-emerald-300 transition-all">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Need Fast Form Help?
              </div>
              <p className="text-[11px] text-slate-500">
                Call us or chat with Patlu Online Service on WhatsApp
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons Group (Call + WhatsApp) in Right Corner */}
      <div className="flex flex-col items-end gap-2.5">
        {/* Floating Call Action Button */}
        <div className="relative group">
          {/* Pulsing Radar Ring */}
          <span
            className="absolute -inset-1 rounded-full bg-blue-500 opacity-30 animate-ping pointer-events-none"
            aria-hidden="true"
          />

          <a
            href={`tel:${SHOP_INFO.phone}`}
            id="floating-call-btn"
            className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
            aria-label={`Direct Call to PATLU ONLINE SERVICE at ${SHOP_INFO.displayPhone}`}
            title={`Direct Phone Call: ${SHOP_INFO.displayPhone}`}
          >
            <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform" />
            
            {/* Tooltip on hover */}
            <span className="hidden sm:group-hover:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 items-center gap-1.5 bg-slate-900/95 backdrop-blur-xs text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap border border-slate-700 pointer-events-none">
              <Phone className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Call: {SHOP_INFO.displayPhone}</span>
            </span>
          </a>
        </div>

        {/* Main Floating Action Button with Official WhatsApp Logo */}
        <div className="relative group">
          {/* Pulsing Radar Ring */}
          <span
            className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"
            aria-hidden="true"
          />

          {/* Action Button */}
          <button
            type="button"
            id="floating-whatsapp-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-108 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer"
            aria-label="Chat on WhatsApp with PATLU ONLINE SERVICE"
            title="Chat with PATLU ONLINE SERVICE on WhatsApp"
          >
            {/* Authentic WhatsApp vector logo */}
            <img
              src="/whatsapp.svg"
              alt="WhatsApp"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-md"
              referrerPolicy="no-referrer"
            />

            {/* Active green notification dot */}
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
