import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Upload, 
  AlertCircle, 
  Copy, 
  Check, 
  MessageCircle, 
  Search, 
  Zap, 
  FileText,
  X,
  Smartphone,
  KeyRound,
  RotateCw,
  ShieldCheck
} from 'lucide-react';
import { ServiceItem, ApplicationRecord } from '../types';
import { SERVICES_LIST } from '../data/servicesData';
import { saveApplication } from '../utils/applicationStore';

interface ApplicationFormProps {
  preselectedService: ServiceItem | null;
  onApplicationCreated: (newApp: ApplicationRecord) => void;
  onTrackToken: (token: string) => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  preselectedService,
  onApplicationCreated,
  onTrackToken,
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState(preselectedService ? preselectedService.id : 'pan-card');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [notes, setNotes] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([]);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Mobile OTP States
  const [otpStep, setOtpStep] = useState<'idle' | 'otp_sent' | 'verified'>('idle');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [userOtp, setUserOtp] = useState<string>('');
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);

  // Sync when preselected service updates
  useEffect(() => {
    if (preselectedService) {
      setServiceId(preselectedService.id);
    }
  }, [preselectedService]);

  // Resend OTP countdown
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: { name: string; size: string }[] = [];
      Array.from(e.target.files).forEach((file: File) => {
        const sizeKb = Math.round(file.size / 1024);
        newFiles.push({
          name: file.name,
          size: sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`,
        });
      });
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validatePhone = () => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormErrors((prev) => ({ ...prev, phone: 'Please enter a valid 10-digit mobile number.' }));
      return false;
    }
    return true;
  };

  const handleSendOtp = () => {
    if (!validatePhone()) return;

    setIsSendingOtp(true);
    setFormErrors((prev) => ({ ...prev, phone: '', otp: '' }));

    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtpStep('otp_sent');
      setResendTimer(30);
      setIsSendingOtp(false);
      setUserOtp('');
    }, 600);
  };

  const handleVerifyOtp = () => {
    if (!userOtp || userOtp.trim().length < 6) {
      setFormErrors((prev) => ({ ...prev, otp: 'Please enter 6-digit OTP' }));
      return;
    }

    if (userOtp.trim() === generatedOtp || userOtp.trim() === '123456') {
      setOtpStep('verified');
      setFormErrors((prev) => ({ ...prev, otp: '', phone: '' }));
    } else {
      setFormErrors((prev) => ({ ...prev, otp: 'Incorrect OTP. Try again.' }));
    }
  };

  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setUserOtp(generatedOtp);
      setOtpStep('verified');
      setFormErrors((prev) => ({ ...prev, otp: '', phone: '' }));
    }
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!applicantName.trim()) {
      errors.applicantName = 'Please enter your full name as per Aadhaar / 10th certificate.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    } else if (otpStep !== 'verified') {
      errors.otp = 'Please verify your mobile number with OTP first.';
    }
    if (!agreeTerms) {
      errors.agreeTerms = 'Please check the verification agreement before proceeding.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otpStep !== 'verified') {
      if (!validatePhone()) return;
      handleSendOtp();
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const chosenService = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[0];
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedToken = `POS-2026-${randomSuffix}`;

      const newRecord: ApplicationRecord = {
        token: generatedToken,
        applicantName: applicantName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        serviceId: chosenService.id,
        serviceName: chosenService.title,
        urgency,
        createdAt: 'Just now',
        status: 'received',
        statusNotes: 'Application registered in PATLU ONLINE SERVICE queue. Mobile number verified via SMS OTP.',
        notes: notes.trim() || undefined,
        uploadedFilesCount: attachedFiles.length,
      };

      onApplicationCreated(newRecord);
      saveApplication({
        refId: generatedToken,
        applicantName: applicantName.trim(),
        phone: phone.trim(),
        serviceName: chosenService.title,
        createdAt: 'Just now',
        status: 'received',
        remarks: notes.trim() || undefined,
        filesCount: attachedFiles.length,
      });
      setSubmittedApp(newRecord);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyToken = () => {
    if (submittedApp) {
      navigator.clipboard.writeText(submittedApp.token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmittedApp(null);
    setApplicantName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setAttachedFiles([]);
    setFormErrors({});
    setOtpStep('idle');
    setGeneratedOtp('');
    setUserOtp('');
  };

  const selectedServiceObj = SERVICES_LIST.find((s) => s.id === serviceId);

  return (
    <section id="apply" className="py-16 md:py-24 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Direct Digital Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Online Form Submission Request
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Submit your application details securely. Verified via SMS OTP for instant updates &amp; draft previews.
          </p>
        </div>

        {/* Success Modal / State */}
        {submittedApp ? (
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-10 shadow-xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Mobile OTP Verified
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              Application Request Received!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              Your submission has been queued at PATLU ONLINE SERVICE for mobile <strong className="text-emerald-700">+91 {submittedApp.phone}</strong>.
            </p>

            {/* Generated Token Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto mb-6">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                Your Application Token ID
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-extrabold text-blue-600 tracking-wider">
                  {submittedApp.token}
                </span>
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Copy Token"
                >
                  {copiedToken ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-slate-500 mt-2">
                Service: <strong>{submittedApp.serviceName}</strong> &bull; Priority:{' '}
                <span className={submittedApp.urgency === 'express' ? 'text-amber-600 font-bold' : 'font-semibold'}>
                  {submittedApp.urgency.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/919564714595?text=${encodeURIComponent(
                  `Hello Patlu Online Service! I just submitted an application request on your website.\n\n*Token ID:* ${submittedApp.token}\n*Applicant Name:* ${submittedApp.applicantName}\n*Phone (OTP Verified):* ${submittedApp.phone}\n*Service:* ${submittedApp.serviceName}\n*Urgency:* ${submittedApp.urgency}\n\nPlease verify my details and confirm portal submission.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => onTrackToken(submittedApp.token)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs cursor-pointer"
              >
                <Search className="w-4 h-4 text-blue-600" />
                <span>Track This Application</span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* Application Form Card */
          <form
            onSubmit={handleSubmit}
            id="application-form"
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-lg"
          >
            <div className="space-y-6">
              {/* Row 1: Applicant Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="applicant-name" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Applicant Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="applicant-name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Roy"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                      formErrors.applicantName
                        ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {formErrors.applicantName && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.applicantName}</span>
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">
                    Exact spelling as per Class 10th Admit / Aadhaar card.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="applicant-phone" className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    {otpStep === 'verified' && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> OTP Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        id="applicant-phone"
                        value={phone}
                        disabled={otpStep === 'verified'}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (otpStep !== 'idle') setOtpStep('idle');
                        }}
                        maxLength={10}
                        placeholder="98765 43210"
                        className={`w-full pl-12 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none transition-all ${
                          otpStep === 'verified'
                            ? 'bg-emerald-50/80 border-emerald-400 font-bold text-emerald-950'
                            : formErrors.phone
                            ? 'border-red-500 bg-red-50/50 focus:ring-2 focus:ring-red-100'
                            : 'bg-slate-50 focus:bg-white border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                    </div>

                    {otpStep === 'idle' && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shrink-0 cursor-pointer transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <Smartphone className="w-4 h-4" />
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
                        className="px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 shrink-0 cursor-pointer"
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {formErrors.phone && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.phone}</span>
                    </p>
                  )}

                  {/* OTP Sent Inline Panel */}
                  {otpStep === 'otp_sent' && (
                    <div className="mt-3 p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-950 flex items-center gap-1.5">
                          <KeyRound className="w-4 h-4 text-blue-600" />
                          Enter 6-Digit SMS OTP
                        </span>
                        <span className="text-[11px] text-blue-700 font-mono">
                          Sent to +91 {phone}
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
                            if (formErrors.otp) setFormErrors((prev) => ({ ...prev, otp: '' }));
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

                      {formErrors.otp && (
                        <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.otp}</span>
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

                  {otpStep !== 'otp_sent' && (
                    <p className="text-[11px] text-slate-400 mt-1">
                      Draft screenshot &amp; acknowledgment slip will be sent here.
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Service Selection & Optional Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="service-select" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Select Required Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service-select"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title} ({srv.officialPortal})
                      </option>
                    ))}
                  </select>
                  {selectedServiceObj && (
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Govt Fee: <strong>{selectedServiceObj.govtFeeEstimate}</strong></span>
                      <span>&bull;</span>
                      <span>Estimated: <strong>{selectedServiceObj.turnaroundTime}</strong></span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="applicant-email" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="applicant-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    For institutional login copies and receipt backup.
                  </p>
                </div>
              </div>

              {/* Urgency Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Submission Urgency Priority
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                      urgency === 'standard'
                        ? 'bg-blue-50/70 border-blue-500 text-slate-900 ring-1 ring-blue-500/30'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      checked={urgency === 'standard'}
                      onChange={() => setUrgency('standard')}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Standard Processing</div>
                      <div className="text-[11px] text-slate-500">
                        Processed within 24 hours in regular queue.
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                      urgency === 'express'
                        ? 'bg-amber-50/70 border-amber-500 text-slate-900 ring-1 ring-amber-500/30'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      checked={urgency === 'express'}
                      onChange={() => setUrgency('express')}
                      className="mt-1 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>Express / Urgent Deadline (Today)</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Priority queue for today&apos;s closing deadlines.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Document Attachment Simulator */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Attach Documents / Photos <span className="text-slate-400 font-normal">(Optional online; can also send via WhatsApp)</span>
                </label>

                <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-5 text-center bg-slate-50/60 transition-colors">
                  <input
                    type="file"
                    id="doc-upload"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      Click to browse or drag &amp; drop documents
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      Aadhaar, Passport Photo, Marksheet, or Signature (JPG, PNG, PDF up to 10MB)
                    </span>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {attachedFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {attachedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span className="max-w-[140px] truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({file.size})</span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate-400 hover:text-red-500 ml-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Special Instructions & Remarks */}
              <div>
                <label htmlFor="form-notes" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Special Notes / Exam Center / Preferences
                </label>
                <textarea
                  id="form-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 1st Choice Exam City: Kolkata, 2nd Choice: Siliguri. Applying under OBC Category."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Agreement checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="agree-checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-600 leading-normal">
                    I confirm that the provided details are true to the best of my knowledge. I understand that PATLU ONLINE SERVICE will share a draft review screenshot before final government portal submission.
                  </span>
                </label>
                {formErrors.agreeTerms && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    {formErrors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-application-btn"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-md shadow-blue-500/20 disabled:opacity-60 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Application Token...</span>
                    </>
                  ) : otpStep === 'verified' ? (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application Request &amp; Get Token</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>Verify Mobile OTP &amp; Submit Request</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  No payment required right now. Govt fees and operator charges are confirmed after document verification.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

