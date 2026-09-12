import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneCall,
  MessageCircle, 
  Clock, 
  Menu, 
  X, 
  CheckCircle2, 
  Search, 
  FileText,
  ShieldCheck,
  Mail,
  QrCode,
  MapPin,
  Store
} from 'lucide-react';
import { PatluLogo } from './PatluLogo';
import { SHOP_INFO } from '../data/servicesData';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface NavItem {
  label: string;
  id: string;
  highlight?: boolean;
  emerald?: boolean;
  purple?: boolean;
  teal?: boolean;
  orange?: boolean;
}

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  onOpenApplyModal?: (serviceName?: string) => void;
  onVisitShop?: (serviceName?: string) => void;
  onOpenPaymentQrModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  activeSection = 'hero',
  onOpenApplyModal,
  onVisitShop,
  onOpenPaymentQrModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Cyber Cafe Hub', id: 'official-banner', highlight: true },
    { label: 'PVC Card @ ₹100', id: 'pvc-offer', highlight: true, emerald: true },
    { label: 'Pay via QR Code', id: 'payment-qr', highlight: true, purple: true },
    { label: 'All Services', id: 'services' },
    { label: 'Doc Checklist', id: 'checklist' },
    { label: 'Fee Calculator', id: 'calculator' },
    { label: 'Track Application', id: 'tracker' },
    { label: 'Visit Shop', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const handleWhatsAppDirect = () => {
    const text = 'Hello PATLU ONLINE SERVICE! I need help with an online form submission or government document service.';
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <>
      {/* Top dark utility bar matching image.png */}
      <div id="top-announcement-bar" className="bg-[#040914] text-white text-xs py-2 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span>Open Daily:</span>
              <strong className="text-white font-extrabold">{SHOP_INFO.timingWeekdays}</strong>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-[#00E676] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#00E676]" />
              <span>100% Error-Free Submission Guarantee</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('topbar.call')} <strong className="text-white font-extrabold">{SHOP_INFO.displayPhone}</strong></span>
            </a>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="flex items-center gap-1.5 text-[#00E676] hover:text-emerald-300 font-extrabold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('topbar.whatsapp')} {SHOP_INFO.displayPhone}</span>
            </button>
            <span className="text-slate-700">|</span>
            {/* Shop Location */}
            <button
              type="button"
              onClick={() => safeOpenUrl(SHOP_INFO.googleMapsUrl)}
              className="flex items-center gap-1.5 text-rose-300 hover:text-white font-bold transition-colors cursor-pointer"
              title="Open shop location on Google Maps (Balasundar, Cooch Behar)"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Location: Balasundar, Cooch Behar</span>
            </button>
            <span className="text-slate-700">|</span>
            <LanguageSwitcher variant="topbar" />
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar matching image.png */}
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 bg-white transition-all duration-200 border-b border-slate-200 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer text-left"
            aria-label="PATLU ONLINE SERVICE Home"
          >
            <PatluLogo size="md" showTagline={true} />
          </button>

          {/* Action Buttons Group matching image.png */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Call Now Button */}
            <a
              href={`tel:${SHOP_INFO.phone}`}
              id="header-call-btn"
              className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] hover:bg-blue-100 border border-[#BFDBFE] transition-all cursor-pointer active:scale-95 shadow-2xs"
              title={`Direct Call: ${SHOP_INFO.displayPhone}`}
            >
              <PhoneCall className="w-4 h-4 text-[#1D4ED8]" />
              <span className="hidden sm:inline">Call Now</span>
            </a>

            {/* Track Form Button */}
            <button
              type="button"
              id="header-track-btn"
              onClick={() => handleNavClick('tracker')}
              className="hidden md:inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-[#1E293B] bg-[#F1F5F9] hover:bg-slate-200 border border-[#CBD5E1] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-600" />
              <span>Track Form</span>
            </button>

            {/* WhatsApp Button */}
            <button
              type="button"
              id="header-whatsapp-btn"
              onClick={handleWhatsAppDirect}
              className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-[#ECFDF5] text-[#059669] hover:bg-emerald-100 border border-[#A7F3D0] transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-[#059669]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Scan & Pay QR Button */}
            {onOpenPaymentQrModal && (
              <button
                type="button"
                id="header-payment-qr-btn"
                onClick={onOpenPaymentQrModal}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-black bg-purple-700 hover:bg-purple-800 text-white transition-all cursor-pointer shadow-xs active:scale-95"
                title="Scan & Pay via PhonePe / UPI QR Code"
              >
                <QrCode className="w-4 h-4 text-purple-200" />
                <span className="hidden xs:inline">Pay QR</span>
              </button>
            )}

            {/* Location Button */}
            <button
              type="button"
              id="header-location-btn"
              onClick={() => safeOpenUrl(SHOP_INFO.googleMapsUrl)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#FEF2F2] text-[#DC2626] hover:bg-rose-100 border border-[#FECACA] transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Open shop location on Google Maps (Balasundar, Cooch Behar)"
            >
              <MapPin className="w-4 h-4 text-[#DC2626]" />
              <span>Google Maps</span>
            </button>

            {/* Apply Online Button */}
            {onOpenApplyModal && (
              <button
                type="button"
                id="header-apply-online-btn"
                onClick={() => onOpenApplyModal()}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-xs active:scale-95"
                title="Apply Online with Document Upload & OTP Verification"
              >
                <FileText className="w-4 h-4" />
                <span>Apply Online</span>
              </button>
            )}

            {/* Visit Shop Button */}
            <button
              type="button"
              id="header-visit-shop-btn"
              onClick={() => {
                if (onVisitShop) onVisitShop();
                else safeOpenUrl(SHOP_INFO.googleMapsUrl);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black bg-rose-600 text-white hover:bg-rose-700 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Visit our physical shop counter in Balasundar (Bhowmik Para), Cooch Behar"
            >
              <Store className="w-4 h-4" />
              <span>Visit Shop</span>
            </button>

            {/* Language Switcher Pill */}
            <LanguageSwitcher variant="pill" className="hidden sm:inline-flex" />

            {/* Hamburger Toggle */}
            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-150"
          >
            {/* Language Switcher Row in Mobile Menu */}
            <div className="flex items-center justify-between p-2.5 mb-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Language / ভাষা Select:</span>
              <LanguageSwitcher variant="pill" />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                id="mobile-menu-visit-shop-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onVisitShop) onVisitShop();
                  else safeOpenUrl(SHOP_INFO.googleMapsUrl);
                }}
                className="w-full flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-xs cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Visit Shop</span>
              </button>
              <button
                type="button"
                id="mobile-menu-apply-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenApplyModal) onOpenApplyModal();
                }}
                className="w-full flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Apply Online</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('tracker')}
                className="w-full flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Track Status</span>
              </button>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 px-2 rounded-lg text-left text-sm font-semibold flex items-center justify-between cursor-pointer ${
                    item.purple
                      ? 'bg-purple-50 text-purple-950 border border-purple-200 my-1'
                      : item.emerald
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 my-1'
                      : item.highlight
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 my-1'
                      : 'text-slate-800 hover:text-blue-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.purple ? (
                      <span className="text-[10px] uppercase font-black bg-purple-700 text-white px-1.5 py-0.5 rounded">
                        PHONEPE
                      </span>
                    ) : item.emerald ? (
                      <span className="text-[10px] uppercase font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                        ₹100
                      </span>
                    ) : item.highlight ? (
                      <span className="text-[10px] uppercase font-black bg-blue-600 text-white px-1.5 py-0.5 rounded">
                        HUB
                      </span>
                    ) : null}
                  </span>
                  {item.id === 'contact' ? (
                    <MapPin className="w-4 h-4 text-rose-600" />
                  ) : (
                    <CheckCircle2 className={`w-4 h-4 ${item.purple ? 'text-purple-600' : item.emerald ? 'text-emerald-600' : item.highlight ? 'text-blue-600' : 'text-slate-300'}`} />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Helpline: {SHOP_INFO.displayPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Timings: {SHOP_INFO.timingWeekdays}</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
