import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileCheck2,
  PhoneCall,
  MessageCircle,
  Clock,
  ArrowRight,
  UploadCloud,
  Search,
  Users,
  Sparkles,
  ChevronDown,
  QrCode,
  MapPin,
  Store
} from 'lucide-react';
import { motion } from 'motion/react';
import { PatluLogo } from './PatluLogo';
import { SHOP_INFO } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface HeroProps {
  onOpenApplyModal?: () => void;
  onVisitShop?: () => void;
  onJumpToChecklist: () => void;
  onJumpToTracker: () => void;
  onOpenPaymentQrModal?: () => void;
}

const ROTATING_SERVICES = [
  { text: 'Online Form Filling', gradient: 'from-blue-600 via-indigo-600 to-blue-800' },
  { text: 'Aadhaar Address Update (₹125)', gradient: 'from-amber-600 via-orange-500 to-amber-700' },
  { text: 'New PAN Card & Correction (₹200)', gradient: 'from-emerald-600 via-teal-600 to-emerald-800' },
  { text: 'Voter ID Form 6 & 8 (₹50)', gradient: 'from-orange-600 via-amber-500 to-orange-700' },
  { text: 'Ayushman Card PM-JAY (₹5 Lakh Free)', gradient: 'from-teal-600 via-emerald-500 to-teal-800' },
  { text: 'Govt Job & Exam Registration', gradient: 'from-blue-700 via-sky-600 to-blue-900' },
];

export const Hero: React.FC<HeroProps> = ({
  onOpenApplyModal,
  onVisitShop,
  onJumpToChecklist,
  onJumpToTracker,
  onOpenPaymentQrModal,
}) => {
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_SERVICES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = () => {
    const text = 'Hello PATLU ONLINE SERVICE! I want to apply for an online form. Please guide me with the details.';
    safeOpenUrl(getWhatsAppUrl(text));
  };

  const currentService = ROTATING_SERVICES[rotatingIndex];

  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-blue-50/70 via-slate-50 to-white pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-200 overflow-hidden"
    >
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Brand Message & Primary Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{language === 'bn' ? 'অনুমোদিত ডিজিটাল সেবা ও ফর্ম ফিল-আপ সেন্টার' : 'Verified Cyber Seva & Form Filling Center'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-blue-900 font-extrabold">{language === 'bn' ? '১২,৫০০+ সফল ফর্ম জমার অভিজ্ঞতা' : '12,500+ Forms Filled'}</span>
            </motion.div>

            {/* Main Brand Logo Display in Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="py-1"
            >
              <PatluLogo size="xl" showTagline={false} />
            </motion.div>

            {/* Headline with Animated Cycling Text */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Fast, Error-Free{' '}
              <span className="block mt-1 min-h-[1.25em] relative">
                <motion.span
                  key={currentService.text}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${currentService.gradient}`}
                >
                  {currentService.text}
                </motion.span>
              </span>
              <span className="text-slate-900 block mt-1">&amp; Digital Services</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl"
            >
              Don’t let server errors, wrong photo sizes, or complex payment steps cancel your application.
              Get your <strong>SSC, Railway, Police, Defense, College Admissions, Scholarships, PAN &amp; Voter ID</strong>{' '}
              forms submitted accurately with verified confirmation slips.
            </motion.p>

            {/* Bullet Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
            >
              {[
                '100% Accurate Data Entry Guarantee',
                'Exact Photo & Signature Pixel Resizing',
                'Direct PDF Slip on your WhatsApp',
                'No Need to Stand in Long Cyber Lines',
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              <button
                type="button"
                id="hero-visit-shop-btn"
                onClick={onVisitShop || onOpenApplyModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-black text-sm bg-rose-600 text-white hover:bg-rose-700 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                title="Visit our shop counter in Belda, Paschim Medinipur"
              >
                <Store className="w-5 h-5" />
                <span>{t('hero.applyBtn') || (language === 'bn' ? 'দোকানে আসুন' : 'Visit Shop')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="hero-whatsapp-btn"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Details Now</span>
              </button>

              {onOpenPaymentQrModal && (
                <button
                  type="button"
                  id="hero-payment-qr-btn"
                  onClick={onOpenPaymentQrModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-purple-700 hover:bg-purple-800 text-white shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-purple-200" />
                  <span>Scan &amp; Pay QR</span>
                </button>
              )}

              <button
                type="button"
                onClick={onJumpToChecklist}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl font-semibold text-sm bg-white text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-300 transition-all cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>Document Checklist</span>
              </button>
            </motion.div>

            {/* Call or Visit Info */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                Average turnaround: <strong className="text-slate-800">15-30 Mins</strong>
              </span>
              <span className="hidden sm:inline-block text-slate-300">|</span>
              <a
                href="#contact"
                className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer"
                title="Shop location: Belda, Paschim Medinipur"
              >
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Shop Location: Belda, Paschim Medinipur (WB)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Mockup Card with Verification & Receipt Simulation */}
          <div className="lg:col-span-5 relative">
            {/* Card Mockup */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 relative z-10">
              {/* Header of Receipt Preview */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                    POS
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Patlu Digital Seva Slip
                    </h3>
                    <p className="text-[11px] text-slate-500">Application Reference ID: POS-2025-9482</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  SUBMITTED &amp; PAID
                </span>
              </div>

              {/* Body Fields */}
              <div className="py-4 space-y-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Exam / Service</span>
                    <span className="font-extrabold text-slate-900 text-sm">SSC CGL Tier-I Registration</span>
                  </div>
                  <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                    Central Govt
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Applicant Name</span>
                    <span className="font-bold text-slate-800">Amit Kumar Roy</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Submission Status</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Final Ack Ready
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Portal Challan Ref</span>
                    <span className="font-mono text-slate-700">CH-981240219</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Color Print &amp; Copy</span>
                    <span className="font-bold text-slate-800">Sent on WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Footer with instant check button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-white font-mono text-[9px] text-center leading-none p-1">
                    QR VERIFIED
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Official acknowledgement PDF generated
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onJumpToTracker}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Check Your Status</span>
                </button>
              </div>
            </div>

            {/* Floating Trust Badge 1 */}
            <div className="absolute -top-4 -left-4 bg-white p-3 rounded-xl border border-slate-200 shadow-lg flex items-center gap-3 z-20 animate-bounce duration-1000">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900">Urgent Slot Booking</div>
                <div className="text-[10px] text-slate-500">DL, Passport &amp; Exams</div>
              </div>
            </div>

            {/* Floating Trust Badge 2 */}
            <div className="absolute -bottom-4 -right-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl flex items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                ★ 4.9
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">1,200+ Reviews</div>
                <div className="text-[10px] text-slate-300">Patna &amp; Online Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Down-Arrow Scroll Indicator */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('aadhaar-offer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex flex-col items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer text-xs font-semibold focus:outline-none"
            aria-label="Scroll down to explore featured offers and digital services"
          >
            <span className="tracking-wide text-[11px] uppercase font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
              Explore Featured Offers &amp; Services
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-8 h-8 rounded-full bg-white group-hover:bg-blue-50 border border-slate-200 group-hover:border-blue-300 flex items-center justify-center text-slate-500 group-hover:text-blue-600 shadow-xs transition-all"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};
