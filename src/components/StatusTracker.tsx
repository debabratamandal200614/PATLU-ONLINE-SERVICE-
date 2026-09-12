import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  AlertCircle,
  MessageCircle,
  QrCode,
  XCircle,
  CreditCard,
  Check
} from 'lucide-react';
import { SHOP_INFO } from '../data/servicesData';
import { getStoredApplications, StoredApplication } from '../utils/applicationStore';
import { safeOpenUrl, getWhatsAppUrl, getUpiPaymentUrl } from '../utils/safeNavigation';

interface DisplayOrder {
  refId: string;
  name: string;
  service: string;
  date: string;
  status: 'completed' | 'in_progress' | 'accepted' | 'rejected' | 'payment_pending' | 'received';
  rejectionReason?: string;
  paymentAmount?: number;
  paymentStatus?: 'pending' | 'paid';
  currentStep: number;
  steps: { label: string; date: string; done: boolean }[];
  challanNo?: string;
  printStatus: string;
}

const DEMO_ORDERS: Record<string, DisplayOrder> = {
  'POS-2025-9482': {
    refId: 'POS-2025-9482',
    name: 'Manish Kumar Sharma',
    service: 'SSC CGL Tier-I 2025 Online Form',
    date: 'Today, 10:15 AM',
    status: 'payment_pending',
    paymentAmount: 150,
    paymentStatus: 'pending',
    currentStep: 3,
    steps: [
      { label: 'Form Request & Documents Received', date: '10:15 AM', done: true },
      { label: 'Documents & Eligibility Verified', date: '10:25 AM', done: true },
      { label: 'Payment Pending (₹150 Govt & Portal Fee)', date: 'Action Required', done: false },
      { label: 'Final SSC Portal Submission & Slip', date: 'Upcoming', done: false },
    ],
    challanNo: 'CH-981240219',
    printStatus: 'Awaiting fee payment to complete submission',
  },
  'POS-2025-1049': {
    refId: 'POS-2025-1049',
    name: 'Sunita Devi',
    service: 'New PAN Card (Physical + e-PAN)',
    date: 'Yesterday, 04:30 PM',
    status: 'in_progress',
    currentStep: 2,
    steps: [
      { label: 'Aadhaar e-KYC Received', date: '04:30 PM', done: true },
      { label: 'NSDL Portal Form Verification', date: '04:45 PM', done: true },
      { label: 'Government Biometric Processing', date: 'Pending NSDL', done: false },
      { label: 'e-PAN Delivery & Dispatch', date: 'Expected 48 Hrs', done: false },
    ],
    challanNo: 'NSDL-8472910',
    printStatus: 'e-Receipt generated, Physical card dispatching',
  },
  'POS-2025-3312': {
    refId: 'POS-2025-3312',
    name: 'Ravi Prakash',
    service: 'Railway RRB ALP Examination Hall Ticket',
    date: 'Today, 09:15 AM',
    status: 'completed',
    currentStep: 4,
    steps: [
      { label: 'Registration ID Verified', date: '09:15 AM', done: true },
      { label: 'Hall Ticket Retrieved from Server', date: '09:18 AM', done: true },
      { label: 'Exam Center & Shifts Checked', date: '09:20 AM', done: true },
      { label: 'Double Sided Color Print Ready', date: '09:24 AM', done: true },
    ],
    challanNo: 'RRB-2025-9921',
    printStatus: 'Laminated Copy Ready for Collection at Shop',
  },
};

export const StatusTracker: React.FC<{ initialSearchId?: string }> = ({ initialSearchId }) => {
  const [searchInput, setSearchInput] = useState<string>(initialSearchId || 'POS-2025-9482');
  const [searchedId, setSearchedId] = useState<string>(initialSearchId || 'POS-2025-9482');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialSearchId) {
      setSearchInput(initialSearchId);
      setSearchedId(initialSearchId);
    }
  }, [initialSearchId]);

  const cleanKey = searchedId.toUpperCase().trim();
  const storedApps = getStoredApplications();
  const storedApp: StoredApplication | undefined = storedApps[cleanKey];

  let order: DisplayOrder | undefined = DEMO_ORDERS[cleanKey];

  if (!order && storedApp) {
    const isCompleted = storedApp.status === 'completed';
    const isAccepted = storedApp.status === 'accepted';
    const isRejected = storedApp.status === 'rejected';
    const isPayPending = storedApp.status === 'payment_pending';

    order = {
      refId: storedApp.refId,
      name: storedApp.applicantName,
      service: storedApp.serviceName,
      date: storedApp.createdAt || 'Today',
      status: storedApp.status,
      rejectionReason: storedApp.rejectionReason,
      paymentAmount: storedApp.paymentAmount,
      paymentStatus: storedApp.paymentStatus,
      currentStep: isCompleted ? 4 : isRejected ? 1 : isPayPending ? 3 : isAccepted ? 2 : 1,
      steps: [
        { label: 'Form Request Received', date: storedApp.createdAt || 'Just now', done: true },
        {
          label: isRejected
            ? 'Application Rejected'
            : isAccepted
            ? 'Accepted & Queueing'
            : 'Operator Review',
          date: isRejected ? 'Rejected' : 'Done',
          done: isAccepted || isCompleted || isPayPending || isRejected,
        },
        {
          label: isPayPending
            ? `Fee Payment Pending (₹${storedApp.paymentAmount || 100})`
            : 'Portal Registration & Submission',
          date: isPayPending ? 'Action Required' : isCompleted ? 'Completed' : 'Pending',
          done: isCompleted,
        },
        {
          label: 'Final Receipt & Print Slip Ready',
          date: isCompleted ? 'Ready' : 'Upcoming',
          done: isCompleted,
        },
      ],
      challanNo: `POS-REG-${Math.floor(100000 + Math.random() * 900000)}`,
      printStatus: isCompleted
        ? 'Final Slip & Color Printout Ready at Cyber Desk'
        : isRejected
        ? 'Application Rejected - Action Required'
        : isPayPending
        ? `Payment of ₹${storedApp.paymentAmount || 100} Pending`
        : 'Queued at Patlu Cyber Desk',
    };
  } else if (!order && cleanKey.startsWith('POS-')) {
    order = {
      refId: cleanKey,
      name: 'Applicant',
      service: 'Online Form Request',
      date: 'Today',
      status: 'in_progress',
      currentStep: 2,
      steps: [
        { label: 'Request Registered in System', date: 'Today', done: true },
        { label: 'Document Review by Cyber Cafe', date: 'In Progress', done: true },
        { label: 'Government Portal Form Filling', date: 'Pending Verification', done: false },
        { label: 'Final Print & Receipt Delivery', date: 'Upcoming', done: false },
      ],
      challanNo: `POS-${Math.floor(10000 + Math.random() * 90000)}`,
      printStatus: 'Received at Patlu Cyber Desk',
    };
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedId(searchInput);
  };

  const handleQuickDemo = (id: string) => {
    setSearchInput(id);
    setSearchedId(id);
  };

  const handleDownloadReceipt = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleWhatsAppStatusCheck = () => {
    const text = `Hello PATLU ONLINE SERVICE! I want to check the status or payment details for my application ID: *${searchedId}*. Please assist.`;
    safeOpenUrl(getWhatsAppUrl(text));
  };

  const handleUpiPay = (amount: number) => {
    safeOpenUrl(getUpiPaymentUrl(amount, `Fee_for_${searchedId}`));
  };

  return (
    <section id="tracker" className="py-16 md:py-24 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-3">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Real-Time Processing Tracking
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Track Application &amp; Payment Status
          </h2>
          <p className="text-base text-slate-600">
            Enter your unique <strong>POS Reference ID</strong> (provided on your receipt or WhatsApp)
            to check real-time progress, acceptance status &amp; fee payment requests.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-xl mx-auto mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Reference ID (e.g. POS-2025-9482)"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm cursor-pointer active:scale-95"
            >
              Track Now
            </button>
          </form>

          {/* Quick Demo Pre-load buttons */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500 flex-wrap">
            <span>Test sample IDs:</span>
            {['POS-2025-9482', 'POS-2025-8831', 'POS-2025-7104', 'POS-2025-6021'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleQuickDemo(id)}
                className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Results Card */}
        {order ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-300">
            {/* Header Banner */}
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {order.refId}
                  </span>
                  <span className="text-xs text-slate-400">{order.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{order.service}</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Applicant: <strong className="text-white">{order.name}</strong>
                </p>
              </div>

              <div>
                {order.status === 'completed' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    COMPLETED &amp; READY
                  </span>
                ) : order.status === 'accepted' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ACCEPTED / APPROVED
                  </span>
                ) : order.status === 'rejected' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-500/20 text-red-300 border border-red-500/40">
                    <XCircle className="w-4 h-4 text-red-400" />
                    REJECTED
                  </span>
                ) : order.status === 'payment_pending' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    <CreditCard className="w-4 h-4 text-purple-300 animate-pulse" />
                    PAYMENT PENDING (₹{order.paymentAmount || 100})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                    PROCESSING IN PORTAL
                  </span>
                )}
              </div>
            </div>

            {/* Special Rejection Banner */}
            {order.status === 'rejected' && (
              <div className="p-5 bg-red-50 border-b border-red-200 text-red-900 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-red-950 text-sm">
                      Application Request Was Rejected by Cyber Desk
                    </h4>
                    <p className="mt-1 text-red-800 font-medium">
                      <strong>Reason:</strong> {order.rejectionReason || 'Document unreadable or invalid credentials.'}
                    </p>
                    <p className="mt-1 text-slate-600 text-xs">
                      Please contact Patlu Cyber Desk on WhatsApp to submit corrected documents without paying twice.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Special Payment Request Banner */}
            {order.status === 'payment_pending' && (
              <div className="p-5 bg-purple-50 border-b border-purple-200 text-purple-950 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-200 flex items-center justify-center text-purple-800 shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Fee Payment Requested: ₹{order.paymentAmount || 150}
                    </h4>
                    <p className="text-slate-600 text-xs mt-0.5">
                      Pay via Google Pay / PhonePe / UPI to initiate government portal submission.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpiPay(order.paymentAmount || 150)}
                    className="px-4 py-2 rounded-xl font-black text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-sm cursor-pointer"
                  >
                    Pay ₹{order.paymentAmount || 150} via UPI
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppStatusCheck}
                    className="px-3 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  >
                    Pay on WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* Stepper Progress Visual */}
            <div className="p-6 sm:p-8 border-b border-slate-100">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-6">
                Submission Milestone Progress
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {order.steps.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col sm:items-center text-left sm:text-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-colors ${
                        step.done
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : order.status === 'rejected' && idx === 1
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-400 border border-slate-300'
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : order.status === 'rejected' && idx === 1 ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <span className="text-xs font-bold text-slate-800 leading-snug">
                      {step.label}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      {step.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Box */}
            <div className="p-6 bg-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Government Ref #</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{order.challanNo}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Print &amp; Lamination</span>
                <span className="font-bold text-slate-800">{order.printStatus}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Store Verification</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Checked &amp; Sealed by Patlu
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{downloadSuccess ? 'Ack Receipt Downloaded!' : 'Download Official Slip (PDF)'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppStatusCheck}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">
              No matching application found for "{searchedId}"
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Please check your reference ID. You can also send your name or phone number directly
              to Patlu Online Service on WhatsApp to trace your form.
            </p>
            <button
              type="button"
              onClick={handleWhatsAppStatusCheck}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
