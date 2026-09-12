import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar
    'topbar.openDaily': 'Open Daily:',
    'topbar.guarantee': '100% Error-Free Submission Guarantee',
    'topbar.call': 'Call:',
    'topbar.whatsapp': 'WhatsApp:',

    // Navbar
    'nav.callNow': 'Call Now',
    'nav.trackForm': 'Track Form',
    'nav.whatsapp': 'WhatsApp',
    'nav.apply': 'Visit Shop',
    'nav.allServices': 'All Services',
    'nav.howItWorks': 'How It Works',
    'nav.docChecklist': 'Doc Checklist',
    'nav.trackApplication': 'Track Application',
    'nav.shopLocation': 'Shop Location',

    // Notice Ticker
    'notice.latest': 'LATEST NOTICE',
    'notice.applyForThis': 'Visit Shop to Apply',

    // Hero Section
    'hero.badge': 'AUTHORIZED DIGITAL SEVA & CYBER CAFE DESK',
    'hero.titleLine1': 'Fast & Error-Free',
    'hero.titleLine2': 'Online Form Filling & Govt Services',
    'hero.subtitle': 'Visit our shop counter in Belda for SSC, Railway, Banking, Police, Aadhaar Correction, PAN Card, Voter ID, Ayushman Card & PVC Plastic Smart Cards with 100% accuracy and instant receipt.',
    'hero.searchPlaceholder': 'Search any service (e.g., Aadhaar, SSC, PAN, PVC Card, Voter)...',
    'hero.applyBtn': 'Visit Shop',
    'hero.checklistBtn': 'View Document Checklist',
    'hero.trackBtn': 'Track Application Status',
    'hero.quickServices': 'Quick Popular Services:',

    // Feature Highlights
    'feat.fast': '10-Minute Instant Receipt',
    'feat.verified': '100% Error-Free Guarantee',
    'feat.support': 'Full WhatsApp Support',

    // Service Categories
    'services.title': 'Our Digital Services & Application Desk',
    'services.subtitle': 'Select from over 50+ government exam applications, scholarship forms, and official ID card services.',
    'services.searchLabel': 'Search Service:',
    'services.allCategories': 'All Categories',
    'services.applyNow': 'Visit Shop',
    'services.checkDocs': 'Check Documents',

    // Language Switcher Labels
    'lang.english': 'English',
    'lang.bengali': 'বাংলা',
    'lang.toggleLabel': 'Language / ভাষা',
  },
  bn: {
    // Top Bar
    'topbar.openDaily': 'প্রতিদিন খোলা:',
    'topbar.guarantee': '১০০% ভুল-মুক্ত ফর্ম সাবমিশনের নিশ্চয়তা',
    'topbar.call': 'কল করুন:',
    'topbar.whatsapp': 'হোয়াটসঅ্যাপ:',

    // Navbar
    'nav.callNow': 'কল করুন',
    'nav.trackForm': 'ফর্ম ট্র্যাক',
    'nav.whatsapp': 'হোয়াটসঅ্যাপ',
    'nav.apply': 'দোকানে আসুন',
    'nav.allServices': 'সমস্ত পরিষেবা',
    'nav.howItWorks': 'পদ্ধতি',
    'nav.docChecklist': 'ডকুমেন্ট তালিকা',
    'nav.trackApplication': 'আবেদন ট্র্যাক করুন',
    'nav.shopLocation': 'দোকানের ঠিকানা',

    // Notice Ticker
    'notice.latest': 'সর্বশেষ বিজ্ঞপ্তি',
    'notice.applyForThis': 'আবেদন করতে দোকানে আসুন',

    // Hero Section
    'hero.badge': 'অনুমোদিত ডিজিটাল সেবা ও সাইবার ক্যাফে ডেস্ক',
    'hero.titleLine1': 'দ্রুত ও নির্ভুল',
    'hero.titleLine2': 'অনলাইন ফর্ম ফিলাপ ও সরকারি পরিষেবা',
    'hero.subtitle': 'বেলদায় আমাদের দোকানে আসুন এসএসসি, রেলওয়ে, ব্যাঙ্কিং, পুলিশ, আধার সংশোধন, প্যান কার্ড, ভোটার আইডি, আয়ুষ্মান কার্ড এবং পিভিসি প্লাস্টিক স্মার্ট কার্ডের নির্ভুল আবেদন ও তাৎক্ষণিক রসিদ পেতে।',
    'hero.searchPlaceholder': 'যে কোনো পরিষেবা খুঁজুন (যেমন: আধার, এসএসসি, প্যান, পিভিসি কার্ড, ভোটার)...',
    'hero.applyBtn': 'দোকানে আসুন',
    'hero.checklistBtn': 'প্রয়োজনীয় কাগজপত্রের তালিকা দেখুন',
    'hero.trackBtn': 'আবেদনের স্ট্যাটাস দেখুন',
    'hero.quickServices': 'জনপ্রিয় পরিষেবা সমূহ:',

    // Feature Highlights
    'feat.fast': '১০ মিনিটে তাত্ক্ষণিক রসিদ',
    'feat.verified': '১০০% ভুল-মুক্ত গ্যারান্টি',
    'feat.support': 'পূর্ণাঙ্গ হোয়াটসঅ্যাপ সহায়তা',

    // Service Categories
    'services.title': 'আমাদের ডিজিটাল পরিষেবা ও আবেদন কেন্দ্র',
    'services.subtitle': '৫০+ এরও বেশি সরকারি পরীক্ষার আবেদন, স্কলারশিপ ফর্ম এবং পরিচয়পত্র পরিষেবা থেকে পছন্দ করুন।',
    'services.searchLabel': 'পরিষেবা খুঁজুন:',
    'services.allCategories': 'সমস্ত বিভাগ',
    'services.applyNow': 'অনলাইনে আবেদন করুন',
    'services.checkDocs': 'ডকুমেন্ট দেখুন',

    // Language Switcher Labels
    'lang.english': 'English',
    'lang.bengali': 'বাংলা',
    'lang.toggleLabel': 'Language / ভাষা',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('patlu_app_language');
      return (saved === 'bn' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('patlu_app_language', lang);
    } catch (e) {
      console.error('Could not save language preference', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
