import React from 'react';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  FileCheck2,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

export const GovtPortalsNoticeBanner: React.FC = () => {
  const govtPortals = [
    {
      id: 'aadhaar',
      name: 'UIDAI Official Aadhaar Portal',
      govEntity: 'Unique Identification Authority of India (UIDAI)',
      url: 'https://myaadhaar.uidai.gov.in',
      displayUrl: 'myaadhaar.uidai.gov.in',
      badge: 'Official UIDAI Portal',
      theme: 'from-blue-900/90 to-slate-900 border-blue-400/50 text-blue-300',
      btnBg: 'bg-blue-600 hover:bg-blue-500 text-white',
      services: ['Address Update & Correction', 'Download Official e-Aadhaar', 'Order Aadhaar PVC Card', 'Check Update Status (URN)'],
      icon: '🆔'
    },
    {
      id: 'pan',
      name: 'NSDL / Income Tax PAN Portal',
      govEntity: 'Income Tax Dept / NSDL & UTIITSL e-Gov',
      url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
      displayUrl: 'onlineservices.nsdl.com',
      badge: 'Official Income Tax / NSDL',
      theme: 'from-emerald-900/90 to-slate-900 border-emerald-400/50 text-emerald-300',
      btnBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      services: ['New PAN Application (Form 49A)', 'PAN Name/DOB/Photo Correction', 'Instant Digital e-PAN Download', 'PAN-Aadhaar Linking Status'],
      icon: '💳'
    },
    {
      id: 'voter',
      name: 'ECI Official Voter Services Portal',
      govEntity: 'Election Commission of India (ECI)',
      url: 'https://voters.eci.gov.in',
      displayUrl: 'voters.eci.gov.in',
      badge: 'Official ECI Portal',
      theme: 'from-orange-900/90 to-slate-900 border-orange-400/50 text-orange-300',
      btnBg: 'bg-orange-600 hover:bg-orange-500 text-white',
      services: ['New Voter Registration (Form 6)', 'Address Shifting & Correction (Form 8)', 'Download Digital e-EPIC Voter Card', 'Track Application Status'],
      icon: '🗳️'
    },
    {
      id: 'ayushman',
      name: 'NHA Official Ayushman PM-JAY Portal',
      govEntity: 'National Health Authority (NHA / MoHFW)',
      url: 'https://beneficiary.nha.gov.in',
      displayUrl: 'beneficiary.nha.gov.in',
      badge: 'Official PM-JAY NHA Portal',
      theme: 'from-teal-900/90 to-slate-900 border-teal-400/50 text-teal-300',
      btnBg: 'bg-teal-600 hover:bg-teal-500 text-white',
      services: ['PM-JAY ₹5 Lakh Eligibility Search', 'Aadhaar e-KYC Beneficiary Auth', 'Download Ayushman Golden Card', 'Empanelled Hospital Directory'],
      icon: '🏥'
    }
  ];

  return (
    <section id="official-portals-notice" className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Outer Card with High Contrast Government Compliance Border */}
      <div className="relative rounded-3xl bg-slate-950 text-white shadow-2xl border-2 border-amber-400/60 overflow-hidden p-6 sm:p-8 md:p-10">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Alert Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded">
                  GOVERNMENT COMPLIANCE DIRECTORY
                </span>
                <span className="text-xs font-bold text-amber-300 hidden sm:inline-flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Official Government Websites Only
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                Official Government Portals for Aadhaar, PAN, Voter ID &amp; Ayushman Card
              </h2>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Govt of India Official Portals (.gov.in)</span>
          </span>
        </div>

        {/* Mandatory Statutory Disclaimer Box */}
        <div className="bg-amber-950/60 border border-amber-500/40 rounded-2xl p-4 text-xs sm:text-sm text-amber-100 mb-8 space-y-1.5 shadow-md">
          <div className="font-extrabold text-amber-300 flex items-center gap-2 text-sm uppercase tracking-wide">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mandatory Statutory Compliance Notice:</span>
          </div>
          <p className="leading-relaxed text-slate-200">
            In strict compliance with Government of India Information Technology regulations and Statutory Directives, official card applications, data updates, e-KYC authentication, and official issuances for <strong>AADHAAR, PAN CARD, VOTER ID, and AYUSHMAN BHARAT CARD</strong> are conducted <strong>EXCLUSIVELY on the respective official government portals (.gov.in)</strong> listed below.
          </p>
          <p className="text-xs text-amber-200/90 italic font-medium">
            * Note: Patlu Online Service operates as an independent, private Cyber Assistance &amp; Printing Seva Desk. We provide guided form assistance, document scanning, and plastic printing services to assist citizens with official portal submissions.
          </p>
        </div>

        {/* 4 Official Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {govtPortals.map((portal) => (
            <motion.div
              key={portal.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className={`bg-gradient-to-br ${portal.theme} rounded-2xl p-5 border shadow-xl flex flex-col justify-between space-y-4 relative`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 bg-slate-950/60 rounded-xl border border-slate-800 shadow-inner">
                      {portal.icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                        {portal.govEntity}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                        {portal.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-slate-300 shrink-0">
                    {portal.badge}
                  </span>
                </div>

                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Official Services Available on {portal.displayUrl}:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-200 text-xs">
                    {portal.services.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Government Website Button */}
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm ${portal.btnBg} shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer text-center`}
              >
                <span>Visit Official Govt Portal ({portal.displayUrl})</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom Verification Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 text-center flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Verified Official Portals (.gov.in / .nic.in / .in)
          </span>
          <span>&bull;</span>
          <span>Patlu Cyber Seva Desk &bull; Ph: +91 95647 14595</span>
        </div>

      </div>
    </section>
  );
};
