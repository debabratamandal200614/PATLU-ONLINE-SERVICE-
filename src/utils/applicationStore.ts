export interface StoredApplication {
  refId: string;
  applicantName: string;
  phone: string;
  serviceName: string;
  createdAt: string;
  status: 'received' | 'accepted' | 'in_progress' | 'payment_pending' | 'completed' | 'rejected';
  remarks?: string;
  rejectionReason?: string;
  paymentAmount?: number;
  paymentStatus?: 'pending' | 'paid';
  filesCount?: number;
  updatedAt?: string;
}

const STORAGE_KEY = 'patlu_online_applications_v1';

const DEFAULT_SAMPLE_APPLICATIONS: Record<string, StoredApplication> = {
  'POS-2025-9482': {
    refId: 'POS-2025-9482',
    applicantName: 'Manish Kumar Sharma',
    phone: '9564714595',
    serviceName: 'SSC CGL 2025 Online Form',
    createdAt: 'Today at 10:15 AM',
    status: 'payment_pending',
    paymentAmount: 150,
    paymentStatus: 'pending',
    remarks: 'Category: OBC-NCL, Center Choice: Kolkata / Howrah',
    filesCount: 3,
  },
  'POS-2025-8831': {
    refId: 'POS-2025-8831',
    applicantName: 'Priya Roy',
    phone: '9832145678',
    serviceName: 'Aadhaar Card Address Correction',
    createdAt: 'Yesterday at 04:30 PM',
    status: 'completed',
    paymentAmount: 125,
    paymentStatus: 'paid',
    remarks: 'Voter ID & Electricity Bill attached for address proof.',
    filesCount: 2,
  },
  'POS-2025-7104': {
    refId: 'POS-2025-7104',
    applicantName: 'Debabrata Mandal',
    phone: '9564714595',
    serviceName: 'PVC Plastic Smart Card Print',
    createdAt: 'Today at 11:00 AM',
    status: 'accepted',
    remarks: 'Aadhaar + Voter PVC print needed urgently.',
    filesCount: 2,
  },
  'POS-2025-6021': {
    refId: 'POS-2025-6021',
    applicantName: 'Rahul Ghosh',
    phone: '8910452310',
    serviceName: 'New PAN Card Application',
    createdAt: 'Yesterday at 02:15 PM',
    status: 'rejected',
    rejectionReason: 'Passport photo uploaded is blurry & Signature missing in scan.',
    remarks: 'Please re-upload a clear photo and sign on white paper.',
    filesCount: 1,
  },
};

export function getStoredApplications(): Record<string, StoredApplication> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_APPLICATIONS));
      return DEFAULT_SAMPLE_APPLICATIONS;
    }
    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed !== 'object' || Object.keys(parsed).length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_APPLICATIONS));
      return DEFAULT_SAMPLE_APPLICATIONS;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading stored applications:', err);
    return DEFAULT_SAMPLE_APPLICATIONS;
  }
}

export function restoreSampleApplications(): Record<string, StoredApplication> {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_APPLICATIONS));
    window.dispatchEvent(new CustomEvent('patlu_application_saved'));
    return DEFAULT_SAMPLE_APPLICATIONS;
  } catch (err) {
    console.error('Error restoring sample applications:', err);
    return DEFAULT_SAMPLE_APPLICATIONS;
  }
}

export function saveApplication(app: StoredApplication): void {
  try {
    const existing = getStoredApplications();
    existing[app.refId.toUpperCase().trim()] = app;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent('patlu_application_saved', { detail: app }));
  } catch (err) {
    console.error('Error saving application:', err);
  }
}

export function updateApplicationDetails(
  refId: string,
  updates: Partial<StoredApplication>
): void {
  try {
    const existing = getStoredApplications();
    const cleanId = refId.toUpperCase().trim();
    if (existing[cleanId]) {
      existing[cleanId] = {
        ...existing[cleanId],
        ...updates,
        updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent('patlu_application_saved'));
    }
  } catch (err) {
    console.error('Error updating application details:', err);
  }
}

export function updateApplicationStatus(
  refId: string,
  newStatus: StoredApplication['status']
): void {
  updateApplicationDetails(refId, { status: newStatus });
}

export function deleteApplication(refId: string): void {
  try {
    const existing = getStoredApplications();
    delete existing[refId.toUpperCase().trim()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent('patlu_application_saved'));
  } catch (err) {
    console.error('Error deleting application:', err);
  }
}

export function clearAllApplications(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('patlu_application_saved'));
  } catch (err) {
    console.error('Error clearing applications:', err);
  }
}

export function getApplicationByRef(refId: string): StoredApplication | null {
  const cleanId = refId.toUpperCase().trim();
  const existing = getStoredApplications();
  return existing[cleanId] || null;
}
