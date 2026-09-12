import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Printer, 
  Sparkles, 
  Send, 
  CheckCircle2,
  Layers,
  ExternalLink,
  Store
} from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl } from '../utils/safeNavigation';

export const ContactSection: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;

    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Center Location &amp; Helpdesk</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Visit Our Center or Get in Touch
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Have questions, need urgent assistance, or want to bring physical documents? We welcome walk-ins every day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Facilities Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              PATLU ONLINE SERVICE Center
            </h3>

            <div className="space-y-5 text-sm text-slate-700">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between gap-2">
                    <span>Center Address</span>
                    <button
                      type="button"
                      onClick={() => safeOpenUrl(SHOP_INFO.googleMapsUrl)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                    {SHOP_INFO.address}, {SHOP_INFO.city}
                  </p>
                  <button
                    type="button"
                    onClick={() => safeOpenUrl(SHOP_INFO.googleMapsUrl)}
                    className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Visit Shop (Google Maps Directions)</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Operating Hours</div>
                  <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                    <strong>Monday &ndash; Saturday:</strong> 8:30 AM &ndash; 8:30 PM<br />
                    <strong>Sunday:</strong> 9:00 AM &ndash; 2:00 PM (Emergency form filings open)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Direct Contact &amp; Helpline</div>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a
                      href="tel:+919564714595"
                      className="text-xs sm:text-sm font-bold text-blue-600 hover:underline"
                    >
                      +91 95647 14595
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href="mailto:debabratamandal200614@gmail.com"
                      className="text-xs sm:text-sm text-slate-600 hover:text-slate-900"
                    >
                      debabratamandal200614@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Store Facilities */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                In-Store Printing &amp; Document Facilities
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
                {[
                  'Laser Color & B/W Print',
                  'High-Res Document Scanner',
                  'PVC Card Printing',
                  'Thermal Lamination',
                  'Spiral Binding & Project Books',
                  'Urgent Photo Studio Print'
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-medium text-[11px] truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Message / Inquiry Form */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Send a Quick Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Leave your contact details and our operator will call or WhatsApp you within 15 minutes.
            </p>

            {messageSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95 duration-150">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <div className="text-sm font-bold text-slate-900">Message Dispatched!</div>
                <p className="text-xs text-slate-600 mt-1">
                  Thank you! Our desk operator will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="e.g. Ankit Roy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Which form or service do you need?
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="e.g. I need help filling Railway RRB ALP form and updating my Aadhaar address."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-sm transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Desk</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400">Or chat immediately:</span>
                  <div className="mt-2">
                    <a
                      href="https://wa.me/919564714595?text=Hello%20Patlu%20Online%20Service,%20I%20have%20an%20urgent%20service%20inquiry."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Instant WhatsApp Message</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
