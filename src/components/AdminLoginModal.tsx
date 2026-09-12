import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, AlertCircle, LogIn, CheckCircle2 } from 'lucide-react';
import { useAuth, ADMIN_CREDENTIALS } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, isAdminLoggedIn, logout, adminEmail } = useAuth();
  const { language } = useLanguage();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(emailInput, passwordInput);
      setIsSubmitting(false);

      if (!result.success) {
        setErrorMessage(result.error || 'Invalid credentials');
      } else {
        setEmailInput('');
        setPasswordInput('');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmailInput(ADMIN_CREDENTIALS.email);
    setPasswordInput(ADMIN_CREDENTIALS.password);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 relative">
          <button
            type="button"
            onClick={closeLoginModal}
            className="absolute right-4 top-4 p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {language === 'bn' ? 'মালিক/অপারেটর লগইন' : 'Owner / Admin Login'}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'bn'
                  ? 'সমস্ত ফর্ম রিকোয়েস্ট ও আবেদন দেখতে লগইন করুন'
                  : 'Log in to view & process all form requests in the Request Box'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isAdminLoggedIn ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-900">
                  {language === 'bn' ? 'অপারেটর লগইন সফল হয়েছে!' : 'Admin Logged In Successfully!'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Active ID: <strong className="text-blue-700">{adminEmail}</strong>
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={closeLoginModal}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  {language === 'bn' ? 'রিকোয়েস্ট বক্স দেখুন' : 'Go To Request Box'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeLoginModal();
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer"
                >
                  {language === 'bn' ? 'লগআউট' : 'Logout'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Login Email */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Login ID / Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. debabratamandal200615@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 font-bold"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Quick Fill Credentials Helper */}
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-blue-900 block">Owner Credentials:</span>
                  <span className="font-mono text-[11px] text-blue-700 block">debabratamandal200615@gmail.com</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-black text-[11px] shadow-2xs hover:bg-blue-700 cursor-pointer shrink-0"
                >
                  Auto Fill
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>{isSubmitting ? 'Logging in...' : 'Login As Owner / Operator'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
