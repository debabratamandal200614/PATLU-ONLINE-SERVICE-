import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ArrowUp
} from 'lucide-react';
import { PatluLogo } from './PatluLogo';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface ContactAndFooterProps {
  onOpenApplyModal: () => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({ onOpenApplyModal }) => {
  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // ignore
    }
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    try {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } catch {
      // ignore
    }
  };

  const handleWhatsApp = () => {
    const text = 'Hello PATLU ONLINE SERVICE! I want to visit your shop or inquire about form filling.';
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Contact Banner Card */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-10 border border-blue-800/50 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Visit In-Person or Send On WhatsApp
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Need Help With An Application Today?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Whether you prefer to visit our shop counter or submit your documents from home
                via WhatsApp, we ensure prompt, reliable, and error-free processing.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                id="footer-whatsapp-action"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onOpenApplyModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              >
                <span>Submit Form Request Online</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-3 rounded-xl inline-block shadow-md">
              <PatluLogo size="md" />
            </div>
            
            {/* Storefront Official Banner Thumbnail */}
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-md max-w-sm group">
              <button
                type="button"
                onClick={(e) => scrollToSection(e, 'official-banner')}
                title="Click to view Official Cyber Cafe Banner"
                className="w-full block text-left cursor-pointer"
              >
                <img
                  src="/patlu_official_banner.jpg"
                  alt="PATLU ONLINE SERVICE Storefront Banner"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              PATLU ONLINE SERVICE is your trusted digital partner for government job forms,
              educational counseling, scholarship submissions, citizen identity cards, high-speed
              document scanning, and PVC smart cards.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Digital Seva Center</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Govt Job Forms
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  PAN &amp; Voter ID
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  College Admissions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  National Scholarship
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'services')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Driving License
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'pvc-offer')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  PVC Smart Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Tools */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Quick Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'checklist')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Document Checklist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'calculator')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Fee Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'tracker')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Track Application
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'reviews')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Client Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => scrollToSection(e, 'faq')}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Help &amp; FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Shop Timing & Address */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Store Information
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block">{SHOP_INFO.address}, {SHOP_INFO.city}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP_INFO.name + ' ' + SHOP_INFO.address + ' ' + SHOP_INFO.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors"
                    title="Open shop location on Google Maps"
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${SHOP_INFO.phone}`} className="hover:text-white transition-colors">
                  {SHOP_INFO.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${SHOP_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {SHOP_INFO.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a
                  href={`mailto:${SHOP_INFO.email}`}
                  className="hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  {SHOP_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{SHOP_INFO.timingWeekdays}</div>
                  <div className="text-slate-400 text-[11px]">{SHOP_INFO.timingSunday}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>{SHOP_INFO.name}</strong>. All rights reserved.
            Authorized Common Services &amp; Digital Solutions.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
