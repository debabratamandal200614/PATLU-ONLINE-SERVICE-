import React from 'react';
import {
  X,
  Store,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface VisitShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export const VisitShopModal: React.FC<VisitShopModalProps> = ({
  isOpen,
  onClose,
  serviceName,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const handleGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      SHOP_INFO.name + ' ' + SHOP_INFO.address + ' ' + SHOP_INFO.city
    )}`;
    safeOpenUrl(mapsUrl);
  };

  const handleWhatsApp = () => {
    const text = serviceName
      ? `Hello PATLU ONLINE SERVICE! I want to visit your shop in Belda for: *${serviceName}*.\n\nPlease confirm your open hours and what documents to bring.`
      : `Hello PATLU ONLINE SERVICE! I want to visit your shop in Belda. Please share your exact shop location and visiting details.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  const handleScrollToContact = () => {
    onClose();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/15 rounded-xl border border-white/20 backdrop-blur-xs">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-200 block">
                {language === 'bn' ? 'সরাসরি দোকানে আসুন' : 'Direct In-Person Service'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {language === 'bn' ? 'আমাদের দোকানে আসুন' : 'Visit Our Shop'}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-slate-800">
          {/* If a specific service was clicked */}
          {serviceName && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">
                  {language === 'bn' ? 'নির্বাচিত পরিষেবা' : 'Selected Service'}
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                  {serviceName}
                </p>
                <p className="text-[11px] text-slate-600 mt-1 font-medium">
                  {language === 'bn'
                    ? 'আবেদনপত্র পূরণ ও তাৎক্ষণিক রসিদ পেতে আসল কাগজপত্র ও ছবি নিয়ে দোকানে আসুন।'
                    : 'Visit our counter with your original documents & photo for instant form filing and printed receipt.'}
                </p>
              </div>
            </div>
          )}

          {/* Shop Details Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-slate-500 font-bold">
                  {language === 'bn' ? 'দোকানের ঠিকানা' : 'Shop Address'}
                </strong>
                <span className="text-sm font-black text-slate-900 block mt-0.5">
                  {SHOP_INFO.name}
                </span>
                <span className="text-xs text-slate-700 block font-medium">
                  {SHOP_INFO.address}, {SHOP_INFO.city}, West Bengal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-slate-500 font-bold">
                  {language === 'bn' ? 'খোলার সময়' : 'Working Hours'}
                </strong>
                <span className="text-xs font-extrabold text-emerald-700">
                  {language === 'bn' ? 'প্রতিদিন খোলা: সকাল ৮:০০ - রাত ৯:০০' : 'Open Daily: 8:00 AM – 9:00 PM'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <Phone className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <strong className="block text-xs uppercase tracking-wider text-slate-500 font-bold">
                  {language === 'bn' ? 'যোগাযোগের নম্বর' : 'Phone / Mobile'}
                </strong>
                <a
                  href={`tel:${SHOP_INFO.phone}`}
                  className="text-xs font-black text-blue-600 hover:underline"
                >
                  +91 {SHOP_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-emerald-800">
                100% Error-Free Guarantee
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-[11px] font-bold text-blue-800">
                Instant Printed Receipt
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {/* Google Maps Button */}
            <button
              type="button"
              id="visit-modal-maps-btn"
              onClick={handleGoogleMaps}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-black bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>{language === 'bn' ? 'গুগল ম্যাপে দেখুন ও আসুন' : 'Get Directions on Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
            </button>

            {/* WhatsApp Inquiry Button */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="visit-modal-whatsapp-btn"
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-95 text-center cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Scroll to Page Contact Info */}
            <button
              type="button"
              onClick={handleScrollToContact}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 py-1.5 cursor-pointer"
            >
              {language === 'bn' ? 'পেজে সম্পূর্ণ বিবরণ দেখুন ↓' : 'View Full Shop Details on Page ↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
