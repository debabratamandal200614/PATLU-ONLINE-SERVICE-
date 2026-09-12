export interface ServiceCategory {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  badge?: string;
  services: ServiceDetail[];
}

export interface ServiceDetail {
  id: string;
  name: string;
  popular?: boolean;
  governmentFeeText: string;
  serviceCharge: number;
  turnaroundTime: string;
  requiredDocuments: string[];
  photoSpecs?: string;
  signatureSpecs?: string;
  description: string;
  officialPortal?: string;
}

export const NOTICE_ALERTS = [
  { id: 'pvc-special', title: 'Special Offer: PVC Smart Card Order - Ration Card / Aadhaar Card / Ayushman Card / Voter ID Card @ ₹100/- Only!', tag: 'Special Offer', date: 'Active Now', urgent: true },
  { id: 'ayushman-special', title: 'Special Ad: Ayushman Card (PM-JAY ₹5 Lakh Free Treatment) - e-KYC for ₹50/-, Original PVC Card for ₹100/- Only', tag: 'Special Offer', date: 'Active Now', urgent: true },
  { id: 'voter-special', title: 'Special Ad: Voter ID (New Form 6 / Correction Form 8) for ₹50/- Only with Free Reference Tracking', tag: 'Special Offer', date: 'Active Now', urgent: true },
  { id: 'aadhaar-special', title: 'Special Ad: Aadhaar Address & Father/Husband Name Change for ₹125/- Only', tag: 'Special Offer', date: 'Active Now', urgent: true },
  { id: 'pan-special', title: 'Special Ad: PAN Card (New / Correction) for ₹200/- Only (Physical Card Home Delivery + e-PAN)', tag: 'Special Offer', date: 'Active Now', urgent: true },
  { id: '1', title: 'SSC CGL & CHSL 2025 Online Form is Live', tag: 'Job Alert', date: 'Active Now', urgent: true },
  { id: '2', title: 'National Scholarship Portal (NSP) Renewal Open', tag: 'Scholarship', date: 'Ends 25th', urgent: true },
  { id: '3', title: 'PAN-Aadhaar Link & Instant e-PAN Correction', tag: 'Govt Service', date: 'Available Daily', urgent: false },
  { id: '4', title: 'Railway RRB & State Police Recruitment Registration', tag: 'Recruitment', date: 'Last 5 Days', urgent: true },
  { id: '5', title: 'CUET UG & State University Online Admission Registration', tag: 'Admissions', date: 'Ongoing', urgent: false },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'job-exams',
    name: 'Govt Job & Recruitment Forms',
    shortDesc: 'UPSC, SSC, Railway, Banking, Police, Defense & State PSC exam online applications.',
    icon: 'Briefcase',
    badge: 'High Demand',
    services: [
      {
        id: 'ssc-exams',
        name: 'SSC Forms (CGL, CHSL, MTS, GD Constable)',
        popular: true,
        governmentFeeText: '₹100 (Free for Female/SC/ST)',
        serviceCharge: 60,
        turnaroundTime: 'Same Day (20-30 mins)',
        photoSpecs: '20 KB to 50 KB (JPEG), Plain White/Light background, recent photo with live capture where applicable',
        signatureSpecs: '10 KB to 20 KB (JPEG), black ink on white paper',
        requiredDocuments: [
          '10th Class Marksheet / Certificate (Roll No & Passing Year)',
          '12th / Graduation Marksheet (for higher posts)',
          'Aadhaar Card or Photo ID Proof',
          'Active Mobile Number & Email ID for OTP',
          'Passport Size Photo (Recent)',
          'Cast / Category Certificate (if applicable)'
        ],
        description: 'Complete registration, post selection preference guidance, accurate photo/signature dimension verification, online fee payment, and final acknowledgment printout.',
        officialPortal: 'ssc.gov.in'
      },
      {
        id: 'railway-rrb',
        name: 'Railway RRB (NTPC, Group D, ALP, Tech)',
        popular: true,
        governmentFeeText: '₹250 - ₹500 (Refundable as per norms)',
        serviceCharge: 70,
        turnaroundTime: 'Same Day (30 mins)',
        photoSpecs: '30 KB to 70 KB (JPEG), clear frontal face',
        signatureSpecs: '20 KB to 40 KB (JPEG)',
        requiredDocuments: [
          'Aadhaar Card',
          '10th Marksheet & ITI / Diploma (if applicable)',
          'Bank Account details (Passbook or Cancelled Cheque for refund)',
          'Caste Certificate & Domicile',
          'Recent Passport Photo'
        ],
        description: 'Zone and division selection support, qualification mapping, fee payment & instant receipt generation.',
        officialPortal: 'rrbcdg.gov.in'
      },
      {
        id: 'defense-police',
        name: 'Police & Defense (Agniveer, State Police)',
        popular: true,
        governmentFeeText: 'Varies by state (₹0 - ₹400)',
        serviceCharge: 60,
        turnaroundTime: 'Same Day',
        photoSpecs: '20 KB to 50 KB, light background, clear ears',
        signatureSpecs: '10 KB to 20 KB',
        requiredDocuments: [
          'Aadhaar Card',
          '10th & 12th Board Marksheet',
          'Residential / Domicile Certificate',
          'Character Certificate',
          'NCC / Sports Certificate (if any)'
        ],
        description: 'Accurate physical measurement entry, rally slot choice, center preference, and admit card alert registration.'
      },
      {
        id: 'banking-ibps',
        name: 'Banking Exams (IBPS, SBI, RBI PO/Clerk)',
        popular: false,
        governmentFeeText: '₹175 - ₹850 (as per notification)',
        serviceCharge: 70,
        turnaroundTime: '30 mins',
        photoSpecs: '20 KB to 50 KB with left thumb impression & handwritten declaration',
        signatureSpecs: '10 KB to 20 KB in black ink',
        requiredDocuments: [
          'Graduation Marksheet & Percentage Calculation',
          'Aadhaar Card',
          'Left Thumb Impression (clean on white paper)',
          'Handwritten Declaration Text (as per notification)',
          'Recent Passport Photo'
        ],
        description: 'Accurate state & bank preference ranking, declaration scan, thumb impression formatting, and fee payment.'
      }
    ]
  },
  {
    id: 'citizen-docs',
    name: 'Identity & Citizen Services',
    shortDesc: 'PAN Card, Voter ID, Ration Card, e-Shram, Ayushman Card, Domicile & Certificates.',
    icon: 'IdCard',
    badge: 'Essential',
    services: [
      {
        id: 'aadhaar-address-update',
        name: 'Aadhaar Address & Father/Husband Name Change (₹125 Offer)',
        popular: true,
        governmentFeeText: 'Included in Offer',
        serviceCharge: 125,
        turnaroundTime: 'Portal URN in 15 mins, Verified in 2-3 Days',
        photoSpecs: 'Clear photo/scan of original document proof (JPEG/PDF up to 2MB)',
        requiredDocuments: [
          'Aadhaar Card (Linked Mobile for OTP verification)',
          'Any One Proof of Address (POA): Electricity/Water Bill, Ration Card, Voter ID, Bank Passbook, or Gas Connection',
          'For Father/Husband Name (C/O, S/O, W/O): Marriage Certificate, Old Marksheet, or Father/Husband Aadhaar',
          'Without personal document? We provide UIDAI Head of Family (HOF) / Mukhiya Certificate format!'
        ],
        description: 'Special ₹125/- promotional offer! Fast, online UIDAI address correction and Father/Husband name update without waiting in long queues. Official URN acknowledgment slip delivered straight to your WhatsApp.',
        officialPortal: 'myaadhaar.uidai.gov.in'
      },
      {
        id: 'pan-card',
        name: 'PAN Card (New / Correction / Minor to Major) - ₹200 Offer',
        popular: true,
        governmentFeeText: 'Included in ₹200 Package',
        serviceCharge: 200,
        turnaroundTime: 'e-PAN in 48-72 hours, Original Physical Card via Speed Post',
        photoSpecs: 'Passport size photo, 3.5cm x 2.5cm (clear white background)',
        signatureSpecs: 'Clean black/dark blue ink signature on blank white paper',
        requiredDocuments: [
          'Aadhaar Card (Linked Mobile for Instant Paperless e-KYC)',
          'Proof of Date of Birth (Aadhaar Card, 10th Admit/Marksheet, or Birth Certificate)',
          'For Correction: Copy of existing PAN card or PAN number proof',
          '2 Passport Size Color Photos & Signature on plain white paper'
        ],
        description: 'Special ₹200/- all-inclusive promotional offer! Complete Form 49A / Correction application, government fee, digital e-PAN delivery to your WhatsApp/Email, plus original laminated PVC Physical PAN Card delivered to your home by India Post speed post.',
        officialPortal: 'nsdl.co.in / utiitsl.com'
      },
      {
        id: 'voter-id',
        name: 'Voter ID (New Form 6 / Correction Form 8) - ₹50 Offer',
        popular: true,
        governmentFeeText: 'Free (ECI Portal)',
        serviceCharge: 50,
        turnaroundTime: 'Ack Receipt in 15 mins, BLO Verification & e-EPIC in 7-15 days',
        photoSpecs: 'Clear color photo with white background (JPEG/PNG under 2MB)',
        requiredDocuments: [
          'Aadhaar Card (Linked Mobile preferred for OTP)',
          'Current Address Proof (Electricity/Water Bill, Ration Card, Bank Passbook, or Gas Bill)',
          'Date of Birth Proof (Aadhaar Card, 10th Certificate, or Birth Certificate)',
          'Family Member (Father/Mother/Spouse) EPIC Voter Number (for Polling Booth & Part mapping)',
          'For Form 8 (Correction): Copy of old Voter Card or EPIC Number'
        ],
        description: 'Special ₹50/- promotional offer! Fresh voter registration (Form 6), address shifting, photo update, name/DOB correction (Form 8), and lost card replacement. Instant official Election Commission of India (ECI) Acknowledgement number on WhatsApp!',
        officialPortal: 'voters.eci.gov.in'
      },
      {
        id: 'ayushman-card',
        name: 'Ayushman Card (PM-JAY ₹5 Lakh Free Treatment) - e-KYC ₹50 | PVC Card ₹100',
        popular: true,
        governmentFeeText: 'Free (Govt NHA Scheme)',
        serviceCharge: 50,
        turnaroundTime: 'Instant Approval in 10-15 Mins, PVC Print Ready Same Day',
        requiredDocuments: [
          'Aadhaar Card (Linked Mobile for OTP or Biometric Thumb)',
          'Ration Card (NFSA / BPL / Antyodaya) or Family ID / PM-JAY Letter',
          'Family Head (Mukhiya) Details for family member verification'
        ],
        description: 'Special Ad Offer! Ayushman Bharat PM-JAY ₹5,00,000/- annual cashless medical hospital treatment for entire family. e-KYC & beneficiary approval at just ₹50/-, and heavy waterproof high-gloss PVC Smart Card print at just ₹100/-!',
        officialPortal: 'beneficiary.nha.gov.in'
      },
      {
        id: 'certificates',
        name: 'Caste, Income & Domicile Certificates',
        popular: false,
        governmentFeeText: '₹20 - ₹50 (Govt treasury)',
        serviceCharge: 80,
        turnaroundTime: '7 - 14 working days',
        requiredDocuments: [
          'Aadhaar Card of Applicant & Guardian',
          'Ration Card copy or Land record / Khatiyan',
          'Self-Declaration Affidavit form',
          'Previous caste certificate of father/blood relative (for Caste)'
        ],
        description: 'State e-District portal submission, document compilation, application tracking, and digitally signed certificate download.'
      }
    ]
  },
  {
    id: 'admission-scholarship',
    name: 'College Admissions & Scholarships',
    shortDesc: 'University admissions, CUET, NEET, JEE counseling, NSP and State Scholarship portals.',
    icon: 'GraduationCap',
    badge: 'Student Friendly',
    services: [
      {
        id: 'scholarship-nsp',
        name: 'National & State Scholarship (NSP / Medhasoft)',
        popular: true,
        governmentFeeText: 'Free (Govt portal)',
        serviceCharge: 80,
        turnaroundTime: 'Same Day submission',
        requiredDocuments: [
          'Aadhaar Card',
          'Bank Account Passbook (Aadhaar Seeded / DBT Active)',
          'Income Certificate (Current Year)',
          'Caste Certificate (if reserved category)',
          'Previous Year Marksheet',
          'College Fee Receipt & Bonafide Certificate'
        ],
        description: 'Fresh application & renewal registration, scheme selection, bonafide upload, and institutional verification tracking.'
      },
      {
        id: 'college-admission',
        name: 'College & University UG/PG Admission Forms',
        popular: true,
        governmentFeeText: 'Varies by University (₹300 - ₹1000)',
        serviceCharge: 60,
        turnaroundTime: '30 mins',
        requiredDocuments: [
          '10th & 12th Board Marksheets & Admit Cards',
          'Migration & School Leaving Certificate (SLC/CLC)',
          'Aadhaar Card',
          'Passport Size Photo & Signature',
          'Category & Income certificate for fee concessions'
        ],
        description: 'College choice listing, honors subject selection, merit cut-off checking, online counseling registration, and fee slip download.'
      }
    ]
  },
  {
    id: 'print-admit-card',
    name: 'Admit Cards & Fast Cyber Printing',
    shortDesc: 'High-speed admit card downloads, laser Xerox, color photos, PVC smart cards & lamination.',
    icon: 'Printer',
    services: [
      {
        id: 'admit-card-download',
        name: 'Admit Card / Hall Ticket Download & Color Print',
        popular: true,
        governmentFeeText: 'None',
        serviceCharge: 20,
        turnaroundTime: '5 mins',
        requiredDocuments: [
          'Registration Number / Application ID',
          'Date of Birth or Password'
        ],
        description: 'Password recovery if forgotten, exam center details verification, COVID self-declaration printing, and thick lamination.'
      },
      {
        id: 'pvc-card-print',
        name: 'PVC Smart Card Printing (Aadhaar / PAN / Voter)',
        popular: true,
        governmentFeeText: 'None',
        serviceCharge: 50,
        turnaroundTime: '10 mins',
        requiredDocuments: [
          'Official e-Aadhaar / e-PAN / Voter digital PDF or ID number'
        ],
        description: 'Waterproof, high-resolution original PVC plastic card print matching official ATM card thickness and durability.'
      },
      {
        id: 'doc-scan-resize',
        name: 'Document Scanning & Photo/Sign Resizing',
        popular: false,
        governmentFeeText: 'None',
        serviceCharge: 30,
        turnaroundTime: '5 mins',
        requiredDocuments: [
          'Original physical photo, signature or certificates'
        ],
        description: '600 DPI crisp scanning, compression under 50KB/100KB/200KB as demanded by portal validators with zero pixel blur.'
      }
    ]
  },
  {
    id: 'transport-travel',
    name: 'Driving License & Transport',
    shortDesc: 'Sarathi Parivahan Learning License, Slot Booking, Vehicle RC services, Passport assistance.',
    icon: 'Car',
    services: [
      {
        id: 'learning-license',
        name: 'Driving License (Learner Apply & Test Slot)',
        popular: true,
        governmentFeeText: '₹200 - ₹350 (State RTO fee)',
        serviceCharge: 100,
        turnaroundTime: 'Same Day test slot booking',
        requiredDocuments: [
          'Aadhaar Card (with mobile linked for contactless e-KYC)',
          'Blood Group Details',
          'Age Proof (10th certificate or Birth Certificate)',
          'Address Proof'
        ],
        description: 'Form 1 medical self-declaration, vehicle category (MCWG, LMV) selection, online mock test preparation advice, and fee payment.'
      },
      {
        id: 'passport-assistance',
        name: 'Passport Seva Kendra (PSK) Online Application',
        popular: false,
        governmentFeeText: '₹1,500 (Standard 36-page normal booklet)',
        serviceCharge: 200,
        turnaroundTime: 'Slot booked within 24-48 hours',
        requiredDocuments: [
          'Aadhaar Card',
          'PAN Card',
          '10th Board Certificate (for Non-ECR status check)',
          'Bank Passbook or Voter ID for address proof'
        ],
        description: 'Complete registration on Passport Seva portal, Non-ECR qualification mapping, appointment date slot booking, and document checklist kit.'
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Rahul Kumar Sharma',
    role: 'SSC CGL Aspirant',
    location: 'Gandhi Nagar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    stars: 5,
    comment: 'I was struggling with live webcam photo capture and signature size on the new SSC portal. Patlu Online Service completed my form in just 15 minutes without any server error. The color admit card print quality is top notch!'
  },
  {
    id: 't2',
    name: 'Pooja Kumari',
    role: 'B.Sc College Student',
    location: 'Station Road',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    stars: 5,
    comment: 'Got my National Scholarship (NSP) form filled and approved on the first attempt. They double-checked all my bank IFSC details and bonafide certificate before submitting. Very polite and honest service.'
  },
  {
    id: 't3',
    name: 'Manoj Verma',
    role: 'Small Business Owner',
    location: 'Main Market',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    stars: 5,
    comment: 'Needed urgent PVC Aadhaar and PAN reprint for banking work. Done within 10 minutes at a very reasonable rate. No unnecessary wait times like other cyber cafes.'
  },
  {
    id: 't4',
    name: 'Anjali Mishra',
    role: 'B.Ed Entrance Applicant',
    location: 'Adarsh Colony',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    stars: 5,
    comment: 'Whenever a job vacancy opens, I just WhatsApp my details to Patlu Online Service. They submit the form safely and send the official receipt PDF to my WhatsApp with complete privacy.'
  }
];

export const FAQS = [
  {
    question: 'How do I submit my form details through WhatsApp?',
    answer: 'Simply click any "Send Details via WhatsApp" button on this website or message us at our official number. Send clear photos or scans of your documents, mention which exam/service you need, and we will verify, process, and send you the final confirmation receipt directly on WhatsApp.'
  },
  {
    question: 'Are my personal documents and certificates safe with Patlu Online Service?',
    answer: 'Yes, 100%. We follow strict privacy practices. Your documents are used solely for the specific portal submission you authorize and are never shared, saved permanently, or accessible to third parties.'
  },
  {
    question: 'What if my photo or signature is rejected by the portal validator?',
    answer: 'You do not have to worry! We have professional image editing software to resize, crop, remove background, enhance brightness, and compress your photos and signatures to match the exact KB and pixel rules of SSC, UPSC, NTA, or State portals.'
  },
  {
    question: 'Can you recover my forgotten application registration number or password?',
    answer: 'Yes! Bring your 10th Roll Number, registered mobile number, or email ID. We can recover your user ID and reset passwords for SSC, Railway, State Police, or University admission portals.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Google Pay, PhonePe, Paytm, UPI QR Scan, Direct Bank Transfer, and Cash at our service counter.'
  }
];

export const SHOP_INFO = {
  name: 'PATLU ONLINE SERVICE',
  tagline: 'Fast, Error-Free Online Form Filling & Digital Seva',
  owner: 'Debabrata Mandal',
  phone: '+919564714595',
  whatsapp: '919564714595',
  displayPhone: '+91 95647 14595',
  upiId: '9564714595@ybl',
  upiName: 'DEBABRATA MANDAL',
  upiQrImage: '/phonepe_qr.jpg',
  email: 'debabratamandal200614@gmail.com',
  address: 'BALASUNDAR (BHOWMIK PARA)',
  city: 'COOCH BEHAR, West Bengal',
  fullAddress: 'BALASUNDAR (BHOWMIK PARA), COOCH BEHAR, West Bengal',
  googleMapsUrl: 'https://maps.app.goo.gl/FfGKoWJTWBeFoCen9?g_st=aw',
  timingWeekdays: '8:00 AM – 9:00 PM (Monday to Saturday)',
  timingSunday: '9:00 AM – 3:00 PM (Sunday)',
  totalFormsFilled: '12,500+',
  satisfactionRate: '99.4%',
  yearsExperience: '7+ Years'
};

import { ServiceItem, ApplicationRecord } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'pan-card',
    title: 'New PAN Card & Correction',
    category: 'govt_id',
    categoryName: 'Government Cards & IDs',
    shortDesc: 'Instant e-PAN generation, new physical PAN application, and name/DOB/father name corrections.',
    fullDesc: 'Complete filing through NSDL / UTIITSL portals with digital photo and signature resizing. Receive acknowledgment number immediately.',
    officialPortal: 'NSDL & UTIITSL',
    turnaroundTime: 'Same Day Filing (Card in 7-10 Days)',
    govtFeeEstimate: '₹107 (Govt Fee)',
    serviceCharge: '₹50 - ₹100',
    requiredDocuments: ['Aadhaar Card with linked Mobile', 'Passport Size Photo', 'Signature on White Paper', 'Proof of DOB'],
    popular: true,
  },
  {
    id: 'voter-id',
    title: 'Voter ID Registration & Form 8',
    category: 'govt_id',
    categoryName: 'Government Cards & IDs',
    shortDesc: 'New voter card (Form 6), address change, shifting of constituency, and digital EPIC download.',
    fullDesc: 'Full assistance on Election Commission of India (NVSP / ECIS) portal with field verification tracking.',
    officialPortal: 'Voters Portal (ECI)',
    turnaroundTime: '15 - 20 Minutes Filing',
    govtFeeEstimate: 'Free (Govt)',
    serviceCharge: '₹50',
    requiredDocuments: ['Aadhaar Card / Age Proof', 'Current Address Proof', 'Passport Photo', 'Family Member Voter EPIC Number'],
    popular: true,
  },
  {
    id: 'aadhaar-services',
    title: 'Aadhaar PVC Card & Address Update',
    category: 'govt_id',
    categoryName: 'Government Cards & IDs',
    shortDesc: 'Order official weather-proof Aadhaar PVC card, online address update with supporting documents.',
    fullDesc: 'Secured processing via myAadhaar portal. SMS OTP required on UIDAI-registered mobile number.',
    officialPortal: 'UIDAI myAadhaar',
    turnaroundTime: '10 Minutes Online',
    govtFeeEstimate: '₹50 (PVC Govt Fee)',
    serviceCharge: '₹40',
    requiredDocuments: ['Aadhaar Number', 'Active Mobile for OTP', 'Valid Address Proof (for updates)'],
    popular: true,
  },
  {
    id: 'govt-jobs',
    title: 'Government Job Applications',
    category: 'exams_jobs',
    categoryName: 'Exams & Competitive Jobs',
    shortDesc: 'SSC (CGL, CHSL, MTS, GD), Railway RRB, Banking (IBPS, SBI), Police, Defense, and State PSC forms.',
    fullDesc: 'Careful data entry, exact photo and signature pixel resizing (20-50 KB), fee payment receipt generation, and printout.',
    officialPortal: 'SSC, RRB, IBPS & State PSCs',
    turnaroundTime: '20 - 30 Minutes',
    govtFeeEstimate: 'As per Notification (₹0 - ₹500)',
    serviceCharge: '₹70 - ₹120',
    requiredDocuments: ['10th / 12th / Degree Marksheets', 'Category Certificate (SC/ST/OBC/EWS)', 'Photo (White background)', 'Signature', 'ID Proof'],
    popular: true,
  },
  {
    id: 'college-admissions',
    title: 'University & College Admissions',
    category: 'admissions',
    categoryName: 'Academic & Admissions',
    shortDesc: 'CUET UG/PG, State University centralized admissions, Polytechnic, ITI, and B.Ed entrance applications.',
    fullDesc: 'Selection of college preferences, subject combination optimization, marks calculation, document uploads, and final merit form printout.',
    officialPortal: 'Samarth / State Higher Education Portals',
    turnaroundTime: '25 - 40 Minutes',
    govtFeeEstimate: 'Varies by Institute',
    serviceCharge: '₹80 - ₹150',
    requiredDocuments: ['Class 10th & 12th Marksheet & Admit Card', 'School Leaving Certificate', 'Caste Certificate (if applicable)', 'Photo & Signature'],
    popular: true,
  },
  {
    id: 'scholarships',
    title: 'National & State Scholarships',
    category: 'admissions',
    categoryName: 'Academic & Admissions',
    shortDesc: 'NSP Portal, Post-Matric & Pre-Matric Scholarships, Oasis, Swami Vivekananda, and Merit-cum-Means.',
    fullDesc: 'End-to-end form completion with bank passbook verification, bonafide certificate verification, and scheme eligibility matching.',
    officialPortal: 'National Scholarship Portal & State Portals',
    turnaroundTime: '30 Minutes',
    govtFeeEstimate: 'Free Scheme',
    serviceCharge: '₹80 - ₹120',
    requiredDocuments: ['Income Certificate (Recent)', 'Previous Year Marksheet', 'College Bonafide Certificate', 'Bank Passbook Copy (Aadhaar Seeded)', 'Ration Card / ID'],
    popular: false,
  },
  {
    id: 'caste-income-domicile',
    title: 'Income, Caste & Domicile Certificates',
    category: 'certificates',
    categoryName: 'Certificates & Revenue',
    shortDesc: 'Application submission on e-District / State Service Plus portal for digital revenue certificates.',
    fullDesc: 'Submission of self-declaration affidavits, land tax receipts, employer payslips, and local ward counselor verification.',
    officialPortal: 'State e-District / Service Plus',
    turnaroundTime: 'Filing in 20 Mins (Issuance: 7-15 Days)',
    govtFeeEstimate: '₹20 - ₹50 (Govt Challan)',
    serviceCharge: '₹70',
    requiredDocuments: ['Aadhaar Card', 'Ration Card', 'Salary Slip / Land Tax Receipt / Pradhan Certificate', 'Passport Photo'],
    popular: false,
  },
  {
    id: 'driving-license',
    title: 'Learner & Driving Licence (LLR/DL)',
    category: 'certificates',
    categoryName: 'Certificates & Revenue',
    shortDesc: 'Online Learner Licence test booking, DL renewal, duplicate licence, and slot booking at RTO.',
    fullDesc: 'Form 1 medical self-declaration, fee payment on Sarathi portal, and appointment receipt generation.',
    officialPortal: 'Sarathi Parivahan (MoRTH)',
    turnaroundTime: '20 Minutes',
    govtFeeEstimate: '₹200 - ₹500 (RTO Fee)',
    serviceCharge: '₹100',
    requiredDocuments: ['Aadhaar Card with Mobile linked', 'Age Proof (10th admit/Birth certificate)', 'Blood Group info', 'Passport Photo & Signature'],
    popular: false,
  },
  {
    id: 'passport-seva',
    title: 'Passport Online Appointment Booking',
    category: 'govt_id',
    categoryName: 'Government Cards & IDs',
    shortDesc: 'Fresh Passport application, Tatkaal scheme, police clearance certificate (PCC), and PSK slot booking.',
    fullDesc: 'Careful Annexure selection, address history documentation, online payment, and appointment slip printout.',
    officialPortal: 'Passport Seva Kendra (MEA)',
    turnaroundTime: '35 - 50 Minutes',
    govtFeeEstimate: '₹1,500 (Standard) / ₹3,500 (Tatkaal)',
    serviceCharge: '₹150 - ₹250',
    requiredDocuments: ['Aadhaar Card', 'Pan Card / Voter ID', '10th Marksheet (for ECNR status)', 'Bank Passbook (1 year statement)'],
    popular: false,
  },
  {
    id: 'utility-banking',
    title: 'Utility Bill Payment & FASTag Recharge',
    category: 'utilities',
    categoryName: 'Bills & Utilities',
    shortDesc: 'Instant electricity bill payment, WBSEDCL / State Discom receipts, water tax, and FASTag recharges.',
    fullDesc: 'BBPS certified digital transaction gateway with official receipt and SMS confirmation.',
    officialPortal: 'State Electricity Board & BBPS',
    turnaroundTime: 'Instant (2 Minutes)',
    govtFeeEstimate: 'Actual Bill Amount',
    serviceCharge: '₹10 - ₹20',
    requiredDocuments: ['Consumer ID / CA Number / Account No', 'Previous Bill copy (optional)'],
    popular: false,
  }
];

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    token: 'POS-2025-8421',
    applicantName: 'Rahul Kumar Sharma',
    phone: '9876543210',
    email: 'rahul.sharma@example.com',
    serviceId: 'pan-card',
    serviceName: 'New PAN Card & Correction',
    urgency: 'standard',
    createdAt: '2026-09-08 10:15 AM',
    status: 'completed',
    statusNotes: 'Application submitted successfully on NSDL portal. Acknowledgment Slip #882941094 dispatched via WhatsApp.',
    notes: 'Physical PAN card will be delivered to registered address via Speed Post.',
    uploadedFilesCount: 3
  },
  {
    token: 'POS-2025-9104',
    applicantName: 'Pooja Rani Verma',
    phone: '9832145678',
    serviceId: 'govt-jobs',
    serviceName: 'Government Job Applications',
    urgency: 'express',
    createdAt: '2026-09-09 03:40 PM',
    status: 'submitted',
    statusNotes: 'SSC GD Constable form filled. Fees verified and registration slip generated.',
    notes: 'Exam center preference: Zone 1 (First Choice).',
    uploadedFilesCount: 4
  },
  {
    token: 'POS-2025-9340',
    applicantName: 'Debabrata Mandal',
    phone: '9123456780',
    serviceId: 'college-admissions',
    serviceName: 'University & College Admissions',
    urgency: 'express',
    createdAt: '2026-09-10 09:20 AM',
    status: 'verifying',
    statusNotes: 'Documents received. Resizing marksheet scans and verifying subject cutoffs.',
    notes: 'Targeting Honours in Computer Science & Mathematics.',
    uploadedFilesCount: 2
  }
];

export const FREQUENT_QUESTIONS = FAQS;

