import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  MessageCircle,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Clock,
  FileText,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  LogOut,
  XCircle,
  CreditCard,
  Edit3,
  Send,
  Filter,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getStoredApplications,
  deleteApplication,
  clearAllApplications,
  updateApplicationDetails,
  restoreSampleApplications,
  StoredApplication
} from '../utils/applicationStore';
import { SHOP_INFO } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { safeOpenUrl } from '../utils/safeNavigation';
import { safeCopyToClipboard } from '../utils/clipboard';

interface SubmittedRequestsBoxProps {
  onOpenApplyModal: (serviceName?: string) => void;
  onTrackRefId: (refId: string) => void;
}

export const SubmittedRequestsBox: React.FC<SubmittedRequestsBoxProps> = ({
  onOpenApplyModal,
  onTrackRefId,
}) => {
  const { language } = useLanguage();
  const { isAdminLoggedIn, adminEmail, openLoginModal, logout } = useAuth();

  const [requests, setRequests] = useState<StoredApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Rejection modal state
  const [rejectingRefId, setRejectingRefId] = useState<string | null>(null);
  const [rejectionInput, setRejectionInput] = useState<string>('');

  // Payment modal state
  const [paymentRefId, setPaymentRefId] = useState<string | null>(null);
  const [paymentAmountInput, setPaymentAmountInput] = useState<number>(150);

  // Remarks modal state
  const [editingRemarksRefId, setEditingRemarksRefId] = useState<string | null>(null);
  const [remarksInput, setRemarksInput] = useState<string>('');

  const loadRequests = () => {
    const dataObj = getStoredApplications();
    if (!dataObj || typeof dataObj !== 'object') {
      setRequests([]);
      return;
    }
    const list = Object.values(dataObj).filter(Boolean).sort((a, b) => {
      return (b.refId || '').localeCompare(a.refId || '');
    });
    setRequests(list);
  };

  const handleRestoreSamples = () => {
    restoreSampleApplications();
    loadRequests();
  };

  useEffect(() => {
    loadRequests();

    const handleSavedEvent = () => {
      setTimeout(() => {
        loadRequests();
      }, 0);
    };

    window.addEventListener('patlu_application_saved', handleSavedEvent);
    return () => {
      window.removeEventListener('patlu_application_saved', handleSavedEvent);
    };
  }, []);

  const handleCopy = (refId: string) => {
    safeCopyToClipboard(refId);
    setCopiedId(refId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (refId: string) => {
    deleteApplication(refId);
  };

  const handleClearAll = () => {
    clearAllApplications();
  };

  // Status Action Handlers
  const handleQuickStatusChange = (refId: string, newStatus: StoredApplication['status']) => {
    updateApplicationDetails(refId, { status: newStatus });
  };

  const handleAcceptRequest = (refId: string) => {
    updateApplicationDetails(refId, { status: 'accepted' });
  };

  const handleOpenRejectModal = (refId: string) => {
    setRejectingRefId(refId);
    setRejectionInput('Document image blurry / Signature missing in scan.');
  };

  const handleConfirmReject = () => {
    if (!rejectingRefId) return;
    updateApplicationDetails(rejectingRefId, {
      status: 'rejected',
      rejectionReason: rejectionInput.trim() || 'Document incomplete or unreadable.',
    });
    setRejectingRefId(null);
  };

  const handleOpenPaymentModal = (refId: string) => {
    setPaymentRefId(refId);
    setPaymentAmountInput(150);
  };

  const handleConfirmPaymentRequest = () => {
    if (!paymentRefId) return;
    updateApplicationDetails(paymentRefId, {
      status: 'payment_pending',
      paymentAmount: Number(paymentAmountInput) || 100,
      paymentStatus: 'pending',
    });
    setPaymentRefId(null);
  };

  const handleOpenEditRemarks = (req: StoredApplication) => {
    setEditingRemarksRefId(req.refId);
    setRemarksInput(req.remarks || '');
  };

  const handleSaveRemarks = () => {
    if (!editingRemarksRefId) return;
    updateApplicationDetails(editingRemarksRefId, { remarks: remarksInput.trim() });
    setEditingRemarksRefId(null);
  };

  // WhatsApp Notification Dispatcher
  const handleSendCustomWhatsApp = (req: StoredApplication, customType?: string) => {
    let msg = '';
    const phone = req.phone || SHOP_INFO.phone;

    if (customType === 'accepted') {
      msg = `Hello ${req.applicantName}! 👋\n\n` +
        `Your online form request *${req.refId}* (${req.serviceName}) has been *ACCEPTED* by Patlu Cyber Desk!\n\n` +
        `We are queueing your documents for government portal submission. We will update you shortly.`;
    } else if (customType === 'rejected') {
      msg = `Hello ${req.applicantName}!\n\n` +
        `Regarding your request *${req.refId}* (${req.serviceName}):\n` +
        `❌ *Status: REJECTED*\n` +
        `*Reason:* ${req.rejectionReason || 'Document unreadable or invalid.'}\n\n` +
        `Please send us clear document photos directly here on WhatsApp so we can re-verify and process your form.`;
    } else if (customType === 'payment') {
      msg = `Hello ${req.applicantName}!\n\n` +
        `Your application *${req.refId}* (${req.serviceName}) is ready for final portal filing.\n\n` +
        `💳 *Fee Requested:* ₹${req.paymentAmount || 150}\n` +
        `Please send payment via GPay / PhonePe / Paytm to *${SHOP_INFO.displayPhone}* and share the payment screenshot here.`;
    } else if (customType === 'completed') {
      msg = `Hello ${req.applicantName}! 🎉\n\n` +
        `Great news! Your online form *${req.refId}* (${req.serviceName}) is *COMPLETED*!\n\n` +
        `Your official slip / hall ticket is printed and ready at Patlu Cyber Desk. You can also download it from our website!`;
    } else {
      msg = `Hello PATLU ONLINE SERVICE! Here is my submitted request details:\n\n` +
        `*Reference ID:* ${req.refId}\n` +
        `*Applicant Name:* ${req.applicantName}\n` +
        `*Mobile Number:* ${req.phone}\n` +
        `*Service:* ${req.serviceName}\n` +
        `Please verify and process my form.`;
    }

    const text = encodeURIComponent(msg);
    safeOpenUrl(`https://wa.me/91${phone}?text=${text}`);
  };

  const handleUpiPay = (req: StoredApplication) => {
    const amount = req.paymentAmount || 150;
    const upiUrl = `upi://pay?pa=${SHOP_INFO.whatsapp}@ybl&pn=PatluOnlineService&am=${amount}&cu=INR&tn=Fee_for_${req.refId}`;
    safeOpenUrl(upiUrl);
  };

  // Filter requests by searchQuery & selectedStatusFilter
  const filteredRequests = requests.filter((r) => {
    if (!r) return false;
    const q = searchQuery.toLowerCase().trim();
    const refId = (r.refId || '').toLowerCase();
    const name = (r.applicantName || '').toLowerCase();
    const phone = (r.phone || '').toLowerCase();
    const service = (r.serviceName || '').toLowerCase();

    const matchesQuery = !q || (
      refId.includes(q) ||
      name.includes(q) ||
      phone.includes(q) ||
      service.includes(q)
    );

    const matchesStatus =
      selectedStatusFilter === 'all' ||
      r.status === selectedStatusFilter;

    return matchesQuery && matchesStatus;
  });

  const getStatusBadge = (status: StoredApplication['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-red-100 text-red-800 border border-red-300">
            <XCircle className="w-3 h-3 text-red-600" />
            Rejected
          </span>
        );
      case 'payment_pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-purple-100 text-purple-900 border border-purple-300">
            <CreditCard className="w-3 h-3 text-purple-600 animate-pulse" />
            Payment Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-white" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            In Progress
          </span>
        );
      case 'received':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-blue-100 text-blue-900 border border-blue-300">
            <Sparkles className="w-3 h-3 text-blue-600" />
            Received
          </span>
        );
    }
  };

  return (
    <section id="request-box" className="py-10 md:py-14 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl border-2 border-blue-200/80 shadow-xl overflow-hidden relative">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-inner shrink-0">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {language === 'bn' ? 'জমা দেওয়া ফর্ম আবেদন বাক্স (Request Box)' : 'Submitted Form Request Box'}
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Auto-Saved
                </span>
                {isAdminLoggedIn && (
                  <span className="bg-amber-500/30 text-amber-300 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1">
                    <Unlock className="w-3.5 h-3.5 text-amber-300" />
                    Admin Access Active
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {language === 'bn'
                  ? 'সমস্ত আবেদনকারীর ফর্ম দেখুন, অনুমোদন দিন, পেমেণ্ট লিঙ্ক পাঠান অথবা স্ট্যাটাস পরিবর্তন করুন।'
                  : 'Manage all submitted form requests: Accept, Reject with reason, Request Payment, or Complete forms.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700 text-xs">
                <span className="text-emerald-400 font-bold px-2 hidden sm:inline">
                  Owner: {adminEmail}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'মালিক / অ্যাডমিন লগইন' : 'Owner / Admin Login'}</span>
              </button>
            )}

            <span className="bg-blue-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-sm border border-blue-400/40">
              {requests.length} {language === 'bn' ? 'টি আবেদন' : 'Form Requests'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 bg-slate-50/50">
          {/* Admin Login Alert Banner if not logged in */}
          {!isAdminLoggedIn && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-amber-950">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-900 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">
                    {language === 'bn' ? 'মালিক / অ্যাডমিন অ্যাক্সেস নিয়ন্ত্রণ' : 'Owner / Admin Request Management'}
                  </h4>
                  <p className="text-slate-700 text-xs">
                    {language === 'bn'
                      ? 'আবেদন গ্রহন, বাতিলকরণ ও ফি পেমেন্ট লিঙ্ক পরিচালনা করতে debabratamandal200614@gmail.com দিয়ে লগইন করুন।'
                      : 'Log in as Owner (debabratamandal200614@gmail.com) to Accept/Reject requests, set Payment amounts & manage statuses.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openLoginModal}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-sm cursor-pointer transition-colors shrink-0"
              >
                {language === 'bn' ? 'এখনই লগইন করুন' : 'Log In As Owner'}
              </button>
            </div>
          )}

          {/* Search bar & Status Filter Pills */}
          {requests.length > 0 && (
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      language === 'bn'
                        ? 'রেফারেন্স আইডি, নাম বা ফোন দিয়ে খুঁজুন...'
                        : 'Search request by Ref ID, Name, Mobile or Service...'
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
                  />
                </div>

                <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isAdminLoggedIn
                      ? 'Full Request Control Panel (Admin Mode)'
                      : 'Secured at Patlu Cyber Desk'}
                  </span>
                  {isAdminLoggedIn && (
                    <div className="flex items-center gap-1.5 ml-2">
                      <button
                        type="button"
                        onClick={handleRestoreSamples}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                        title="Reload sample customer applications into the request box"
                      >
                        Load Sample Requests
                      </button>
                      {requests.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAll}
                          className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition-colors cursor-pointer"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 font-bold flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {[
                  { id: 'all', label: 'All Requests', count: requests.length },
                  { id: 'received', label: 'Received', count: requests.filter((r) => r.status === 'received').length },
                  { id: 'accepted', label: 'Accepted', count: requests.filter((r) => r.status === 'accepted').length },
                  { id: 'in_progress', label: 'In Progress', count: requests.filter((r) => r.status === 'in_progress').length },
                  { id: 'payment_pending', label: 'Payment Pending', count: requests.filter((r) => r.status === 'payment_pending').length },
                  { id: 'completed', label: 'Completed', count: requests.filter((r) => r.status === 'completed').length },
                  { id: 'rejected', label: 'Rejected', count: requests.filter((r) => r.status === 'rejected').length },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setSelectedStatusFilter(pill.id)}
                    className={`px-3 py-1.5 rounded-xl font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                      selectedStatusFilter === pill.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {pill.label} ({pill.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Requests List Grid */}
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredRequests.map((req) => (
                  <motion.div
                    key={req.refId}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-400 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
                  >
                    {/* Top Ref Bar & Status */}
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {language === 'bn' ? 'রেফারেন্স আইডি' : 'REFERENCE ID'}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono font-black text-sm text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {req.refId}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(req.refId)}
                              className="p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer"
                              title="Copy Ref ID"
                            >
                              {copiedId === req.refId ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          {getStatusBadge(req.status)}
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" />
                            <span>{req.createdAt || 'Recent'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Applicant & Service Details */}
                      <div className="mt-3 space-y-2 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-900 text-sm truncate">
                            {req.applicantName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-mono font-semibold text-slate-800">
                            {req.phone}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                          <FileText className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold text-slate-900 leading-tight block">
                              {req.serviceName}
                            </span>
                            {req.remarks && (
                              <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 mt-1">
                                <strong>Instructions:</strong> "{req.remarks}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Display Rejection Reason if Rejected */}
                        {req.status === 'rejected' && (
                          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs mt-2">
                            <div className="flex items-start gap-1.5">
                              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-extrabold text-red-950 block">Rejection Reason:</strong>
                                <span className="text-red-800">{req.rejectionReason || 'Document missing or blurry.'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Display Payment Info if Payment Pending */}
                        {req.status === 'payment_pending' && (
                          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs mt-2 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <strong className="font-extrabold block text-purple-900">Requested Fee: ₹{req.paymentAmount || 150}</strong>
                              <span className="text-[10px] text-purple-700">GPay / PhonePe / UPI</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleUpiPay(req)}
                              className="px-3 py-1 rounded-lg text-[11px] font-black bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                            >
                              Pay ₹{req.paymentAmount || 150}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* OWNER / ADMIN MANAGEMENT CONTROLS */}
                    {isAdminLoggedIn ? (
                      <div className="pt-3 border-t-2 border-blue-100 bg-blue-50/50 p-3 rounded-2xl space-y-2">
                        <div className="text-[10px] font-extrabold text-blue-900 uppercase tracking-wider flex items-center justify-between">
                          <span>Admin Quick Actions</span>
                          <button
                            type="button"
                            onClick={() => handleOpenEditRemarks(req)}
                            className="text-blue-600 hover:underline text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" /> Edit Remarks
                          </button>
                        </div>

                        {/* Action buttons row */}
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          {/* 1. Accept Request */}
                          <button
                            type="button"
                            onClick={() => {
                              handleAcceptRequest(req.refId);
                              handleSendCustomWhatsApp(req, 'accepted');
                            }}
                            className={`py-1.5 px-2 rounded-lg font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              req.status === 'accepted'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Accept</span>
                          </button>

                          {/* 2. Reject Request */}
                          <button
                            type="button"
                            onClick={() => handleOpenRejectModal(req.refId)}
                            className={`py-1.5 px-2 rounded-lg font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              req.status === 'rejected'
                                ? 'bg-red-600 text-white shadow-xs'
                                : 'bg-red-100 text-red-900 hover:bg-red-200'
                            }`}
                          >
                            <XCircle className="w-3 h-3 text-red-700" />
                            <span>Reject</span>
                          </button>

                          {/* 3. Payment Request */}
                          <button
                            type="button"
                            onClick={() => handleOpenPaymentModal(req.refId)}
                            className={`py-1.5 px-2 rounded-lg font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              req.status === 'payment_pending'
                                ? 'bg-purple-600 text-white shadow-xs'
                                : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                            }`}
                          >
                            <CreditCard className="w-3 h-3 text-purple-700" />
                            <span>Req Payment</span>
                          </button>

                          {/* 4. Complete Request */}
                          <button
                            type="button"
                            onClick={() => {
                              handleQuickStatusChange(req.refId, 'completed');
                              handleSendCustomWhatsApp(req, 'completed');
                            }}
                            className={`py-1.5 px-2 rounded-lg font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              req.status === 'completed'
                                ? 'bg-slate-900 text-white shadow-xs'
                                : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                            <span>Complete</span>
                          </button>
                        </div>

                        {/* WhatsApp Update Dropdown Options */}
                        <div className="pt-1.5 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSendCustomWhatsApp(req, req.status)}
                            className="w-full py-1.5 px-3 rounded-lg font-bold text-[11px] bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
                          >
                            <Send className="w-3 h-3" />
                            <span>Notify Applicant on WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* USER VIEW BUTTONS */
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleSendCustomWhatsApp(req)}
                          className="flex-1 py-2 px-3 rounded-xl font-bold text-xs bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onTrackRefId(req.refId)}
                          className="flex-1 py-2 px-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Track Status</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(req.refId)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Remove request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : requests.length > 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No requests match "{searchQuery}" in "{selectedStatusFilter}" status</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatusFilter('all');
                }}
                className="text-xs font-extrabold text-blue-600 mt-2 cursor-pointer hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="text-center py-12 px-4 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Inbox className="w-8 h-8" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                {language === 'bn' ? 'এখনও কোনো ফর্ম আবেদন জমা দেওয়া হয়নি' : 'No Form Requests Saved Yet'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
                {language === 'bn'
                  ? 'আপনার অনলাইন ফর্ম আবেদনের তথ্য জমা দেওয়ার পর স্বয়ংক্রিয়ভাবে এই বাক্সে সেভ থাকবে।'
                  : 'Whenever you submit an online form request on Patlu Online Service, it will automatically save right here in this box!'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <span>{language === 'bn' ? 'নতুন ফর্ম আবেদন জমা দিন' : 'Submit Your First Request Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleRestoreSamples}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{language === 'bn' ? 'নমুনা আবেদন লোড করুন' : 'Load Sample Customer Requests'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* REJECTION REASON MODAL */}
      <AnimatePresence>
        {rejectingRefId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border-2 border-red-300 shadow-2xl p-6 max-w-md w-full space-y-4"
            >
              <div className="flex items-center gap-3 text-red-600">
                <XCircle className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-slate-900">Reject Request ({rejectingRefId})</h3>
              </div>
              <p className="text-xs text-slate-600">
                Provide a clear reason for rejecting this application so the applicant can correct their documents.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rejection Reason</label>
                <textarea
                  value={rejectionInput}
                  onChange={(e) => setRejectionInput(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="e.g. Passport photo uploaded is blurry. Please re-scan."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingRefId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-sm"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PAYMENT REQUEST MODAL */}
      <AnimatePresence>
        {paymentRefId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border-2 border-purple-300 shadow-2xl p-6 max-w-md w-full space-y-4"
            >
              <div className="flex items-center gap-3 text-purple-700">
                <CreditCard className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-slate-900">Request Fee Payment ({paymentRefId})</h3>
              </div>
              <p className="text-xs text-slate-600">
                Specify the government or processing fee amount to request from applicant.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fee Amount (₹ INR)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={paymentAmountInput}
                    onChange={(e) => setPaymentAmountInput(Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="150"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentRefId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPaymentRequest}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-sm"
                >
                  Request ₹{paymentAmountInput} Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT REMARKS MODAL */}
      <AnimatePresence>
        {editingRemarksRefId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border-2 border-blue-300 shadow-2xl p-6 max-w-md w-full space-y-4"
            >
              <div className="flex items-center gap-3 text-blue-700">
                <Edit3 className="w-6 h-6" />
                <h3 className="text-lg font-extrabold text-slate-900">Edit Operator Remarks ({editingRemarksRefId})</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Operator Notes / Instructions</label>
                <textarea
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g. Center preference Kolkata, GPay ₹150 received."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRemarksRefId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveRemarks}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm"
                >
                  Save Remarks
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
