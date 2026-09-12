import React from 'react';
import { Languages, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'topbar' | 'compact' | 'pill';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'pill',
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === 'topbar') {
    return (
      <div className={`inline-flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-lg border border-slate-700/80 text-[11px] font-bold ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-blue-600 text-white font-black shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage('bn')}
          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
            language === 'bn'
              ? 'bg-emerald-600 text-white font-black shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          বাং
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer active:scale-95 ${
          language === 'bn'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            : 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
        } ${className}`}
        title="Toggle English / বাংলা"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
      </button>
    );
  }

  // Default Pill Variant
  return (
    <div className={`inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-extrabold shadow-2xs ${className}`}>
      <span className="text-slate-500 px-1.5 flex items-center gap-1 text-[11px]">
        <Languages className="w-3.5 h-3.5 text-slate-600" />
      </span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-blue-600 text-white font-black shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
          language === 'bn'
            ? 'bg-emerald-600 text-white font-black shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        বাংলা
      </button>
    </div>
  );
};
