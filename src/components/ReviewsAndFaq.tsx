import React, { useState } from 'react';
import { Star, MessageSquareQuote, ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Award, Zap } from 'lucide-react';
import { TESTIMONIALS, FAQS, SHOP_INFO } from '../data/servicesData';

export const ReviewsAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Trust Stats Counter Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-20 shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="p-2">
            <div className="text-3xl sm:text-4xl font-black text-blue-400">
              {SHOP_INFO.totalFormsFilled}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Forms Successfully Filled
            </div>
          </div>
          <div className="p-2 pt-6 md:pt-2">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">
              {SHOP_INFO.satisfactionRate}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Zero Rejection Rate
            </div>
          </div>
          <div className="p-2 pt-6 md:pt-2">
            <div className="text-3xl sm:text-4xl font-black text-orange-400">
              15 Mins
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Average Turnaround Time
            </div>
          </div>
          <div className="p-2 pt-6 md:pt-2">
            <div className="text-3xl sm:text-4xl font-black text-white">
              {SHOP_INFO.yearsExperience}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Trusted Cyber Center
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-800 mb-3">
          <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
          Verified Aspirants &amp; Local Customers
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          What Our Clients Say
        </h2>
        <p className="text-base text-slate-600">
          From college entrance aspirants to elderly citizens getting pensions, we take pride in
          every error-free application.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Star rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                "{review.comment}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{review.name}</h4>
                <p className="text-[11px] text-slate-500">
                  {review.role} &bull; {review.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div id="faq" className="max-w-3xl mx-auto pt-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Frequently Asked Questions
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Got Questions? We Have Answers
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
