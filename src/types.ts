export type ServiceCategory = 'all' | 'govt_id' | 'exams_jobs' | 'admissions' | 'certificates' | 'utilities';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryName: string;
  shortDesc: string;
  fullDesc: string;
  officialPortal: string;
  turnaroundTime: string;
  govtFeeEstimate: string;
  serviceCharge: string;
  requiredDocuments: string[];
  popular?: boolean;
}

export interface ApplicationRecord {
  token: string;
  applicantName: string;
  phone: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  urgency: 'standard' | 'express';
  createdAt: string;
  status: 'received' | 'verifying' | 'submitted' | 'completed';
  statusNotes: string;
  notes?: string;
  uploadedFilesCount?: number;
}
