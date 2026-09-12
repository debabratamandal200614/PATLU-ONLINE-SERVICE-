import React from 'react';
import { Users, CheckCircle2, Clock, Star } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      number: '12,500+',
      label: 'Forms Successfully Processed',
      detail: 'Pan cards, exam forms & admissions'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      number: '99.8%',
      label: 'Portal Submission Accuracy',
      detail: 'Double verification before payment'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      number: '15 Mins',
      label: 'Average Turnaround',
      detail: 'Quick submission without waiting'
    },
    {
      icon: <Star className="w-6 h-6 text-amber-500 fill-amber-500" />,
      number: '4.9 / 5',
      label: 'Client Satisfaction',
      detail: '5,000+ local happy applicants'
    }
  ];

  return (
    <div id="stats-banner" className="bg-white border-b border-slate-200 py-10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3 sm:p-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-3 shadow-xs">
                {item.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {item.number}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5 hidden sm:block">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
