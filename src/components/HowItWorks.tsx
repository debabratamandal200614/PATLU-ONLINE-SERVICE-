import React from 'react';
import { 
  FileCheck2, 
  ScanLine, 
  Send, 
  DownloadCloud, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HowItWorksProps {
  onApplyClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onApplyClick }) => {
  const steps = [
    {
      step: '01',
      icon: <FileCheck2 className="w-6 h-6 text-blue-600" />,
      title: 'Submit Details & Docs',
      desc: 'Fill out our quick online request form, send your photos on WhatsApp, or bring physical documents directly to our center.'
    },
    {
      step: '02',
      icon: <ScanLine className="w-6 h-6 text-cyan-600" />,
      title: 'Expert Verification & Resizing',
      desc: 'Our operators check age criteria, category qualifications, and crop/resize photos and signatures to exact portal KB/pixel specifications.'
    },
    {
      step: '03',
      icon: <Send className="w-6 h-6 text-indigo-600" />,
      title: 'Draft Review & Payment',
      desc: 'We share a preview snapshot of your completed application via WhatsApp to cross-check spelling and DOB before fee payment.'
    },
    {
      step: '04',
      icon: <DownloadCloud className="w-6 h-6 text-emerald-600" />,
      title: 'Official Slip & Delivery',
      desc: 'Receive official government acknowledgment slip, registration number, and PDF receipt instantly on WhatsApp & Email.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparent Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How PATLU ONLINE SERVICE Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Four simple steps to ensure your online forms are submitted with zero rejections, accurate credentials, and official receipts.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 relative flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-mono text-3xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                <span>Step {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onApplyClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all active:scale-98 cursor-pointer"
          >
            <span>Start Your Online Application Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
