import React from 'react';
import {
  Store,
  PhoneCall,
  MessageCircle,
  MapPin,
  QrCode
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
    } else if (onOpenApplyModal) {
      onOpenApplyModal();
    } else {
      onNavigate('contact');
    }
  };

  return (
    <div
      id="mobile-bottom-quick-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-white py-2 px-3 sm:hidden shadow-2xl"
    >
      <div className="grid grid-cols-5 gap-0.5 max-w-md mx-auto items-center">
        {/* 1. Visit Shop */}
        <button
          type="button"
          id="mobile-bottom-visit-shop-btn"
          onClick={handleVisitShopAction}
          className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md active:scale-95 transition-all cursor-pointer"
          title="Visit Our Shop Counter in Belda"
        >
          <Store className="w-4 h-4 text-white" />
          <span className="text-[9px] font-black mt-0.5 tracking-tight truncate max-w-full">
            {language === 'bn' ? 'দোকানে আসুন' : 'Visit Shop'}
          </span>
        </button>

        {/* 2. Pay QR */}
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

        {/* 3. Direct Call */}
        <a
          href={`tel:${SHOP_INFO.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer"
        >
          <PhoneCall className="w-5 h-5 text-blue-400" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">
            {language === 'bn' ? 'কল করুন' : 'Call Us'}
          </span>
        </a>

        {/* 4. Direct WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer relative"
        >
          <MessageCircle className="w-5 h-5 text-[#00E676]" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">
            WhatsApp
          </span>
        </button>

        {/* 5. Shop Location */}
        <button
          type="button"
          id="mobile-bottom-location-btn"
          onClick={() => onNavigate('contact')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer"
          title="Shop Location"
        >
          <MapPin className="w-5 h-5 text-rose-500" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight truncate max-w-full">
            {language === 'bn' ? 'ঠিকানা' : 'Location'}
          </span>
        </button>
      </div>
    </div>
  );
};
