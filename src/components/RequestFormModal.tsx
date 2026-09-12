import React, { useState, useEffect } from 'react';
import {
  X,
  UploadCloud,
  CheckCircle2,
  FileCheck,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
  File,
  AlertCircle,
  Search,
  Smartphone,
  KeyRound,
  RotateCw,
  Lock
} from 'lucide-react';
import { SERVICE_CATEGORIES, SHOP_INFO } from '../data/servicesData';
import { saveApplication } from '../utils/applicationStore';
import { safeOpenUrl, getWhatsAppUrl } from '../utils/safeNavigation';

interface RequestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceName?: string;
  onTrackRefId?: (refId: string) => void;
}

export const RequestFormModal: React.FC<RequestFormModalProps> = ({
  isOpen,
  onClose,
  defaultServiceName,
  onTrackRefId,
}) => {
  const allServices = SERVICE_CATEGORIES.flatMap((c) => c.services);

  const [applicantName, setApplicantName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [remarks, setRemarks] = useState('');
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; otp?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // OTP Verification States
  const [otpStep, setOtpStep] = useState<'idle' | 'otp_sent' | 'verified'>('idle');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [userOtp, setUserOtp] = useState<string>('');
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);

  useEffect(() => {
    if (defaultServiceName) {
      setSelectedService(defaultServiceName);
    } else if (allServices.length > 0 && !selectedService) {
      setSelectedService(allServices[0].name);
    }
  }, [defaultServiceName]);

  // Handle Resend OTP Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files) as File[];
      const newFiles = fileList.map((f: File) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const validateMobile = () => {
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      setErrors((prev) => ({ ...prev, mobile: 'Please enter valid 10-digit mobile number' }));
      return false;
    }
    return true;
  };

  const handleSendOtp = () => {
    if (!validateMobile()) return;

    setIsSendingOtp(true);
    setErrors((prev) => ({ ...prev, mobile: undefined, otp: undefined }));

    setTimeout(() => {
      // Generate a 6-digit OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setOtpStep('otp_sent');
      setResendTimer(30);
      setIsSendingOtp(false);
      setUserOtp('');
    }, 600);
  };

  const handleVerifyOtp = () => {
    if (!userOtp || userOtp.trim().length < 6) {
      setErrors((prev) => ({ ...prev, otp: 'Please enter 6-digit OTP' }));
      return;
    }

    if (userOtp.trim() === generatedOtp || userOtp.trim() === '123456') {
      setOtpStep('verified');
      setErrors((prev) => ({ ...prev, otp: undefined, mobile: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, otp: 'Incorrect OTP. Try again or click Resend.' }));
    }
  };

  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setUserOtp(generatedOtp);
      setOtpStep('verified');
      setErrors((prev) => ({ ...prev, otp: undefined, mobile: undefined }));
    }
  };

  const validate = () => {
    const errs: { name?: string; mobile?: string; otp?: string } = {};
    if (!applicantName.trim()) {
      errs.name = 'Please enter full applicant name';
    }
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      errs.mobile = 'Please enter valid 10-digit mobile number';
    } else if (otpStep !== 'verified') {
      errs.otp = 'Please verify your mobile number with OTP first';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otpStep !== 'verified') {
      if (!validateMobile()) return;
      handleSendOtp();
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    // Generate unique realistic ref ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRefId = `POS-2025-${randomNum}`;

    setTimeout(() => {
      saveApplication({
        refId: newRefId,
        applicantName: applicantName.trim(),
        phone: mobileNumber.trim(),
        serviceName: selectedService,
        createdAt: 'Just now',
        status: 'received',
        remarks: remarks.trim() || undefined,
        filesCount: files.length,
      });

      setIsSubmitting(false);
      setSubmittedRefId(newRefId);
    }, 500);
  };

  const handleCopyRef = () => {
    if (submittedRefId) {
      navigator.clipboard.writeText(submittedRefId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendToWhatsApp = () => {
    const text = 
      `Hello PATLU ONLINE SERVICE! I submitted a form request:\n\n` +
      `🆔 Reference ID: *${submittedRefId}*\n` +
      `👤 Name: *${applicantName}*\n` +
      `📱 Mobile (Verified): *${mobileNumber}*\n` +
      `📋 Service: *${selectedService}*\n` +
      `📝 Remarks: ${remarks || 'None'}\n\n` +
      `I am attaching my document photos right here for verification.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  const handleTrackInPage = () => {
    if (submittedRefId && onTrackRefId) {
      onTrackRefId(submittedRefId);
      handleReset();
    }
  };

  const handleReset = () => {
    setApplicantName('');
    setMobileNumber('');
    setRemarks('');
    setFiles([]);
    setErrors({});
    setOtpStep('idle');
    setGeneratedOtp('');
    setUserOtp('');
    setSubmittedRefId(null);
    onClose();
  };

  // Determine if selectedService is in allServices dropdown list
  const isCustomServiceSelected =
    selectedService && !allServices.some((s) => s.name === selectedService);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRefId ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Mobile OTP Verified &amp; Registered
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Thank You, {applicantName}!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your request for <strong>{selectedService}</strong> is recorded for mobile <strong className="text-emerald-700 font-mono">+91 {mobileNumber}</strong>.
              </p>
            </div>

            {/* Reference Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 max-w-xs mx-auto">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Your Tracking Ref ID</span>
                <span className="font-mono text-base font-black text-blue-700">{submittedRefId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyRef}
                className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Click below to send your document scans directly to Patlu Online Service on WhatsApp or track this application live.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Open in WhatsApp &amp; Send Photos</span>
              </button>

              <button
                type="button"
                onClick={handleTrackInPage}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Track Live Application Status</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Form Entry Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Patlu Online Seva
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Online Form Submission Request
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill this quick form. Mobile OTP verification ensures instant updates.
              </p>
            </div>

            {/* Applicant Name */}
            <div>
              <label htmlFor="modal-applicant-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name (As per 10th / Aadhaar) *
              </label>
              <input
                id="modal-applicant-name"
                type="text"
                value={applicantName}
                onChange={(e) => {
                  setApplicantName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Manish Kumar"
                className={`w-full py-2.5 px-3.5 rounded-xl border text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-200 bg-red-50/50'
                    : 'border-slate-300 focus:ring-blue-600'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] font-semibold text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Mobile / WhatsApp Number + OTP Verification Block */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="modal-mobile-number" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mobile Number (SMS &amp; WhatsApp) *
                </label>
                {otpStep === 'verified' && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    OTP Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    id="modal-mobile-number"
                    type="tel"
                    value={mobileNumber}
                    disabled={otpStep === 'verified'}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (otpStep !== 'idle') setOtpStep('idle');
                      if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
                    }}
                    maxLength={10}
                    placeholder="e.g. 9564714595"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                      otpStep === 'verified'
                        ? 'bg-emerald-50/70 border-emerald-400 font-bold text-emerald-900'
                        : errors.mobile
                        ? 'border-red-500 focus:ring-red-200 bg-red-50/50'
                        : 'border-slate-300 focus:ring-blue-600'
                    }`}
                  />
                </div>

                {otpStep === 'idle' && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                    className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shrink-0 cursor-pointer transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{isSendingOtp ? 'Sending...' : 'Send OTP'}</span>
                  </button>
                )}

                {otpStep === 'verified' && (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStep('idle');
                      setUserOtp('');
                    }}
                    className="px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 shrink-0 cursor-pointer"
                  >
                    Change
                  </button>
                )}
              </div>

              {errors.mobile && (
                <p className="text-[11px] font-semibold text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.mobile}</span>
                </p>
              )}

              {/* OTP Sent Input Panel */}
              {otpStep === 'otp_sent' && (
                <div className="mt-3 p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-950 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-blue-600" />
                      Enter 6-Digit SMS OTP
                    </span>
                    <span className="text-[11px] text-blue-700 font-mono">
                      Sent to +91 {mobileNumber}
                    </span>
                  </div>

                  {/* Demo OTP Helper Banner */}
                  <div className="bg-amber-100/90 border border-amber-300 rounded-lg p-2 text-[11px] text-amber-900 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="font-bold text-amber-800">📲 Simulated SMS OTP:</span>
                      <strong className="font-mono text-xs text-blue-900 bg-white px-1.5 py-0.5 rounded border border-amber-300 tracking-wider">
                        {generatedOtp}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold cursor-pointer transition-all active:scale-95"
                    >
                      Auto-Fill OTP
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={userOtp}
                      onChange={(e) => {
                        setUserOtp(e.target.value.replace(/\D/g, ''));
                        if (errors.otp) setErrors((prev) => ({ ...prev, otp: undefined }));
                      }}
                      placeholder="Enter 6 digits"
                      className="flex-1 py-2 px-3 rounded-lg border border-blue-300 bg-white font-mono text-center text-base tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-4 py-2 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95 transition-all"
                    >
                      Verify OTP
                    </button>
                  </div>

                  {errors.otp && (
                    <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.otp}</span>
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-blue-700 pt-1">
                    <span>Didn&apos;t receive code?</span>
                    {resendTimer > 0 ? (
                      <span className="text-slate-500 font-mono">Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" /> Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="modal-service-dropdown" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Exam / Service *
              </label>
              <select
                id="modal-service-dropdown"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {isCustomServiceSelected && (
                  <option value={selectedService}>
                    {selectedService}
                  </option>
                )}
                {allServices.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Document Upload / Photo Drag & Drop */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Upload Documents or Marksheets (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-400 bg-slate-50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileDrop}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-7 h-7 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-700 block">
                  Click or drag photos / PDF files here
                </span>
                <span className="text-[10px] text-slate-500">
                  (You can also send them later on WhatsApp)
                </span>
              </div>

              {/* Uploaded files chips */}
              {files.length > 0 && (
                <div className="mt-2 space-y-1">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded bg-blue-50 text-blue-900">
                      <div className="flex items-center gap-1.5 truncate">
                        <File className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{file.size}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Remarks */}
            <div>
              <label htmlFor="modal-additional-remarks" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Special Instructions / Category / DOB
              </label>
              <textarea
                id="modal-additional-remarks"
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Mention your category (Gen/OBC/SC/ST), post preferences, or urgency..."
                className="w-full py-2 px-3 rounded-xl border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your personal documents are confidential and deleted after submission.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="modal-submit-btn"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <span>
                  {isSubmitting
                    ? 'Registering Request...'
                    : otpStep === 'verified'
                    ? 'Submit Request & Get Reference ID'
                    : 'Verify Mobile OTP & Submit Request'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


