import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                P
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                PATLU ONLINE SERVICE
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your trusted neighborhood digital facilitator for fast, reliable, and error-free online form submissions, government identity cards, competitive job applications, and document services.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://wa.me/919564714595"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:+919564714595"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                title="Call Helpline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:debabratamandal200614@gmail.com"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'All Services', id: 'services' },
                { label: 'How It Works', id: 'how-it-works' },
                { label: 'Document Checklist', id: 'checklist' },
                { label: 'Track Application', id: 'tracker' },
                { label: 'Online Request Form', id: 'apply' },
                { label: 'FAQs', id: 'faq' },
                { label: 'Contact Us', id: 'contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Popular Portals
            </h4>
            <ul className="space-y-2">
              <li className="text-slate-300">NSDL / UTIITSL (New &amp; Correction PAN)</li>
              <li className="text-slate-300">UIDAI myAadhaar (PVC Card &amp; Address)</li>
              <li className="text-slate-300">NVSP / ECI (Voter ID Card Form 6 &amp; 8)</li>
              <li className="text-slate-300">SSC &amp; Railway RRB Recruitments</li>
              <li className="text-slate-300">State University UG/PG Admissions</li>
              <li className="text-slate-300">National Scholarship Portal (NSP)</li>
            </ul>
          </div>

          {/* Col 4: Center Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Operating Hours
            </h4>
            <div className="text-slate-400 space-y-1 text-xs">
              <p>Monday – Saturday: <strong className="text-white">8:30 AM – 8:30 PM</strong></p>
              <p>Sunday: <strong className="text-white">9:00 AM – 2:00 PM</strong></p>
              <p className="pt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online requests accepted 24/7
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} <strong>PATLU ONLINE SERVICE</strong>. All rights reserved. 
            Facilitation center providing online data entry, document scanning, and citizen assistance.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by Verified Digital Service</span>
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
