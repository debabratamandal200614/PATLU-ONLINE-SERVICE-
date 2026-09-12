import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Camera, 
  PenTool, 
  FileBadge, 
  AlertTriangle, 
  HelpCircle,
  FileCheck,
  ShieldAlert
} from 'lucide-react';

export const DocumentChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const checklistGroups = [
    {
      category: '1. Photo & Signature Specifications',
      icon: <Camera className="w-4 h-4 text-blue-600" />,
      items: [
        { id: 'p1', title: 'Passport Size Photograph', detail: 'Taken within last 3 months, plain white/light background, both ears visible, no sunglasses or caps.' },
        { id: 'p2', title: 'File Size (20KB - 50KB)', detail: 'JPEG format. (Don’t worry if yours is larger; our desk automatically compresses it for free).' },
        { id: 'p3', title: 'Clear Signature on Plain Paper', detail: 'Signed using black or dark blue ballpoint pen on unruled white paper. No overwriting.' },
      ]
    },
    {
      category: '2. Identity & Age Proofs',
      icon: <FileBadge className="w-4 h-4 text-emerald-600" />,
      items: [
        { id: 'id1', title: 'Aadhaar Card (With Active Mobile)', detail: 'Crucial for OTP e-KYC and digital verification across central & state portals.' },
        { id: 'id2', title: 'Class 10th (Matriculation) Admit Card', detail: 'Primary verified record for Date of Birth (DOB) and candidate name spelling.' },
        { id: 'id3', title: 'Voter ID / PAN Card (Optional)', detail: 'Beneficial as secondary identity verification for passport and bank forms.' },
      ]
    },
    {
      category: '3. Academic & Category Certificates',
      icon: <FileCheck className="w-4 h-4 text-indigo-600" />,
      items: [
        { id: 'a1', title: '10th & 12th Board Marksheets', detail: 'Clear scan showing roll number, registration number, total marks, and subject grades.' },
        { id: 'a2', title: 'Caste / Reservation Certificate', detail: 'OBC-NCL, SC, ST, or EWS certificate issued by competent revenue authority.' },
        { id: 'a3', title: 'Bank Account Passbook (First Page)', detail: 'Showing Account number, IFSC code, and candidate name for scholarships/reimbursements.' },
      ]
    }
  ];

  const totalItems = checklistGroups.reduce((acc, g) => acc + g.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <section id="checklist" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Applicant Readiness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Document Preparation Guidelines
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2">
            Most government applications are rejected due to invalid photo formats, unclear signatures, or misspelled names. Use our interactive readiness checker below.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-700">Your Readiness Score:</span>
            <span className="text-blue-600 font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {completedItems} of {totalItems} items ready
          </div>
        </div>
      </div>

      {/* Checklist Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {checklistGroups.map((group, gIdx) => (
          <div
            key={gIdx}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  {group.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-3">
                {group.items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-blue-50/50 border-blue-300 text-slate-900'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 text-blue-600 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 fill-blue-600 text-white" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`text-xs font-bold leading-tight ${
                              isChecked ? 'line-through text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            {item.title}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-normal mt-1">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Click any box to mark as prepared</span>
            </div>
          </div>
        ))}
      </div>

      {/* Safety & Compliance Notice */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 text-amber-900 text-xs sm:text-sm flex flex-col sm:flex-row items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-900">
            Official Disclaimer &amp; Privacy Policy:
          </div>
          <p className="text-slate-700 leading-relaxed text-xs">
            PATLU ONLINE SERVICE operates as an independent digital facilitation and cyber cafe service. We assist citizens and candidates with online form entry, image cropping, and submission on publicly accessible government and institutional portals. All government application fees are paid directly to the designated department portals. We never sell or share user data.
          </p>
        </div>
      </div>
    </section>
  );
};
