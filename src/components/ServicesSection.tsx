import React, { useState } from 'react';
import {
  Briefcase,
  IdCard,
  GraduationCap,
  Printer,
  Car,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Store
} from 'lucide-react';
import { SERVICE_CATEGORIES, ServiceDetail, SHOP_INFO } from '../data/servicesData';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface ServicesSectionProps {
  onOpenApplyModal?: (serviceName: string) => void;
  onVisitShop?: (serviceName: string) => void;
  onViewChecklistFor: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenApplyModal,
  onVisitShop,
  onViewChecklistFor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      case 'IdCard':
        return <IdCard className="w-4 h-4" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4" />;
      case 'Printer':
        return <Printer className="w-4 h-4" />;
      case 'Car':
        return <Car className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  // Flatten or filter services
  const allServices: { service: ServiceDetail; categoryName: string; categoryId: string }[] = [];
  SERVICE_CATEGORIES.forEach((cat) => {
    cat.services.forEach((s) => {
      allServices.push({ service: s, categoryName: cat.name, categoryId: cat.id });
    });
  });

  const filtered = allServices.filter(({ service, categoryId }) => {
    const matchesCategory = selectedCategory === 'all' || categoryId === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.requiredDocuments.some((doc) => doc.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  const handleWhatsAppInquiry = (service: ServiceDetail) => {
    const text = `Hello PATLU ONLINE SERVICE! I want to apply for *${service.name}*. Please let me know what documents to send and your total fee.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  return (
    <section id="services" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Comprehensive Cyber &amp; Digital Solutions
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Our Online Form &amp; Digital Services
        </h2>
        <p className="text-base text-slate-600">
          Select your required form below. We ensure accurate portal submission, correct document
          formatting, instant fee payment, and fast receipt delivery.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="mb-10 space-y-4">
        {/* Search Input */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any form (e.g. SSC, PAN, Railway, Scholarship, Driving License)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Categories ({allServices.length})
          </button>

          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No service found for "{searchQuery}"</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Don't worry! We handle all forms. Contact Patlu Online Service directly on WhatsApp and we will process it right away.
          </p>
          <button
            type="button"
            onClick={() => {
              const text = `Hello PATLU ONLINE SERVICE! I want to ask if you can fill a form for: "${searchQuery}"`;
              safeOpenUrl(getWhatsAppUrl(text));
            }}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Us on WhatsApp</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(({ service, categoryName }) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-6 group"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {categoryName}
                  </span>
                  {service.popular && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full border border-orange-200">
                      Popular
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Pricing & Turnaround pill */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2 mb-4 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Govt Fee:</span>
                    <span className="font-bold text-slate-800">{service.governmentFeeText}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Service Charge:</span>
                    <span className="font-bold text-emerald-700">₹{service.serviceCharge} only</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      Speed:
                    </span>
                    <span className="font-semibold text-slate-700">{service.turnaroundTime}</span>
                  </div>
                </div>

                {/* Key Required Documents Preview */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Required Documents
                    </span>
                    <button
                      type="button"
                      onClick={() => onViewChecklistFor(service.name)}
                      className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Full Specs &rarr;
                    </button>
                  </div>
                  <ul className="space-y-1.5">
                    {service.requiredDocuments.slice(0, 3).map((doc, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="truncate">{doc}</span>
                      </li>
                    ))}
                    {service.requiredDocuments.length > 3 && (
                      <li className="text-[11px] text-slate-400 italic pl-5">
                        +{service.requiredDocuments.length - 3} more documents
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  id={`visit-shop-btn-${service.id}`}
                  onClick={() => {
                    if (onVisitShop) onVisitShop(service.name);
                    else if (onOpenApplyModal) onOpenApplyModal(service.name);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                  title="Visit our physical shop counter in Belda"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Visit Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  id={`whatsapp-btn-${service.id}`}
                  onClick={() => handleWhatsAppInquiry(service)}
                  title="Inquire on WhatsApp"
                  className="py-2 px-3 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
