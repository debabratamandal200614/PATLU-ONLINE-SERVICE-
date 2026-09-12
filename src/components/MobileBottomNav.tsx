import React from 'react';
import {
  Store,
  PhoneCall,
  MessageCircle,
  MapPin,
  QrCode,
  FileText
} from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface MobileBottomNavProps {
  onOpenApplyModal?: () => void;
  onVisitShop?: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenPaymentQrModal?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenApplyModal,
  onVisitShop,
  onNavigate,
  onOpenPaymentQrModal
}) => {
  const { language } = useLanguage();

  const handleWhatsApp = () => {
    const text = 'Hello PATLU ONLINE SERVICE! I need assistance with an online form or document service.';
    safeOpenUrl(getWhatsAppUrl(text));
  };

  const handleVisitShopAction = () => {
    if (onVisitShop) {
      onVisitShop();
    } else {
      safeOpenUrl(SHOP_INFO.googleMapsUrl);
    }
  };

  return (
    <div
      id="mobile-bottom-quick-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-white py-2 px-3 sm:hidden shadow-2xl"
    >
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto items-center">
        {/* 1. Apply Online */}
        <button
          type="button"
          id="mobile-bottom-apply-btn"
          onClick={onOpenApplyModal}
          className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md active:scale-95 transition-all cursor-pointer"
          title="Apply Online with Document Upload & Verification"
        >
          <FileText className="w-4 h-4 text-white" />
          <span className="text-[9px] font-black mt-0.5 tracking-tight truncate max-w-full">
            {language === 'bn' ? 'আবেদন' : 'Apply'}
          </span>
        </button>

        {/* 2. Visit Shop */}
        <button
          type="button"
          id="mobile-bottom-visit-shop-btn"
          onClick={handleVisitShopAction}
          className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md active:scale-95 transition-all cursor-pointer"
          title="Visit Our Shop Counter in Balasundar, Cooch Behar"
        >
          <Store className="w-4 h-4 text-white" />
          <span className="text-[9px] font-black mt-0.5 tracking-tight truncate max-w-full">
            {language === 'bn' ? 'দোকানে আসুন' : 'Shop'}
          </span>
        </button>

        {/* 3. Pay QR */}
        <button
          type="button"
          onClick={onOpenPaymentQrModal || (() => onNavigate('payment-qr'))}
          className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-purple-300 hover:text-purple-200 hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-purple-400" />
          <span className="text-[9px] font-bold mt-0.5 tracking-tight truncate max-w-full">
            Pay QR
          </span>
        </button>

        {/* 4. Direct Call */}
        <a
          href={`tel:${SHOP_INFO.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer"
        >
          <PhoneCall className="w-4 h-4 text-blue-400" />
          <span className="text-[9px] font-bold mt-0.5 tracking-tight">
            {language === 'bn' ? 'কল' : 'Call'}
          </span>
        </a>

        {/* 5. Direct WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer relative"
        >
          <MessageCircle className="w-4 h-4 text-[#00E676]" />
          <span className="text-[9px] font-bold mt-0.5 tracking-tight">
            Chat
          </span>
        </button>
      </div>
    </div>
  );
};
