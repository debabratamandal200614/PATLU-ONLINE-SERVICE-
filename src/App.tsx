import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminLoginModal } from './components/AdminLoginModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Navbar } from './components/Navbar';
import { NoticeTicker } from './components/NoticeTicker';
import { Hero } from './components/Hero';
import { CyberCafeBanner } from './components/CyberCafeBanner';
import { PvcCardPromoBanner } from './components/PvcCardPromoBanner';
import { ServicesSection } from './components/ServicesSection';
import { DocumentChecklistFinder } from './components/DocumentChecklistFinder';
import { FeeEstimator } from './components/FeeEstimator';
import { StatusTracker } from './components/StatusTracker';
import { SubmittedRequestsBox } from './components/SubmittedRequestsBox';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { ContactAndFooter } from './components/ContactAndFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RequestFormModal } from './components/RequestFormModal';
import { PaymentQrModal } from './components/PaymentQrModal';
import { PaymentQrSection } from './components/PaymentQrSection';
import { PatluLogo } from './components/PatluLogo';
import { SHOP_INFO } from './data/servicesData';
import { safeOpenUrl } from './utils/safeNavigation';
import { VisitShopModal } from './components/VisitShopModal';

function MainAppContent() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [modalPreselectedService, setModalPreselectedService] = useState<string>('');
  const [checklistService, setChecklistService] = useState<string>('SSC Forms (CGL, CHSL, MTS, GD Constable)');
  const [trackedRefId, setTrackedRefId] = useState<string>('POS-2025-9482');

  const [isPaymentQrModalOpen, setIsPaymentQrModalOpen] = useState(false);
  const [paymentQrAmount, setPaymentQrAmount] = useState<number>(100);
  const [paymentQrTitle, setPaymentQrTitle] = useState<string>('');

  const [isVisitShopModalOpen, setIsVisitShopModalOpen] = useState(false);
  const [visitShopServiceName, setVisitShopServiceName] = useState<string>('');

  const handleOpenPaymentQrModal = (amount?: number, title?: string) => {
    if (amount) setPaymentQrAmount(amount);
    if (title) setPaymentQrTitle(title);
    setIsPaymentQrModalOpen(true);
  };

  // When user clicks "Visit shop", open the dedicated shop location & hours modal
  const handleVisitShop = (serviceName?: string) => {
    if (serviceName && typeof serviceName === 'string') {
      setVisitShopServiceName(serviceName);
    } else {
      setVisitShopServiceName('');
    }
    setIsVisitShopModalOpen(true);
  };

  const handleOpenApplyModal = (serviceName?: string) => {
    if (serviceName) setModalPreselectedService(serviceName);
    setIsApplyModalOpen(true);
  };

  const handleTrackRefId = (refId: string) => {
    setTrackedRefId(refId);
    const trackerElement = document.getElementById('tracker');
    if (trackerElement) {
      trackerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewChecklistFor = (serviceName: string) => {
    setChecklistService(serviceName);
    const checklistElement = document.getElementById('checklist');
    if (checklistElement) {
      checklistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToTracker = () => {
    const trackerElement = document.getElementById('tracker');
    if (trackerElement) {
      trackerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToChecklist = () => {
    const checklistElement = document.getElementById('checklist');
    if (checklistElement) {
      checklistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'apply') {
      handleOpenApplyModal();
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen site-bg-pattern bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-16 sm:pb-0">
      {/* Top Urgent Notice Ticker */}
      <NoticeTicker onQuickApply={handleVisitShop} />

      {/* Main Navbar with Official Logo */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenApplyModal={handleOpenApplyModal}
        onVisitShop={handleVisitShop}
        onOpenPaymentQrModal={() => handleOpenPaymentQrModal()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenApplyModal={handleOpenApplyModal}
          onVisitShop={handleVisitShop}
          onJumpToChecklist={handleJumpToChecklist}
          onJumpToTracker={handleJumpToTracker}
          onOpenPaymentQrModal={() => handleOpenPaymentQrModal()}
        />

        {/* Official Cyber Cafe Storefront Banner (Added from User Upload) */}
        <CyberCafeBanner
          onOpenApplyModal={handleOpenApplyModal}
          onVisitShop={handleVisitShop}
          onOpenPaymentQrModal={handleOpenPaymentQrModal}
          onViewChecklist={handleViewChecklistFor}
        />

        {/* Featured Special Ad: PVC Smart Card Order (Ration / Aadhaar / Ayushman / Voter Card @ ₹100/-) */}
        <PvcCardPromoBanner
          onOpenApplyModal={handleOpenApplyModal}
          onVisitShop={handleVisitShop}
          onViewChecklist={handleViewChecklistFor}
        />

        {/* Comprehensive Services Section */}
        <ServicesSection
          onOpenApplyModal={handleOpenApplyModal}
          onVisitShop={handleVisitShop}
          onViewChecklistFor={handleViewChecklistFor}
        />

        {/* Interactive Document Checklist & Photo Guidelines */}
        <DocumentChecklistFinder
          preSelectedServiceName={checklistService}
          onApplyForThis={handleOpenApplyModal}
        />

        {/* Transparent Fee & Cost Calculator */}
        <FeeEstimator onOpenPaymentQrModal={handleOpenPaymentQrModal} />

        {/* Official Merchant PhonePe / UPI Payment QR Code Section */}
        <PaymentQrSection />

        {/* Real-time Application Status Tracker for Individual Applicants */}
        <StatusTracker initialSearchId={trackedRefId} />

        {/* Cyber Cafe Owner Request Desk & Application Management */}
        <SubmittedRequestsBox
          onOpenApplyModal={handleOpenApplyModal}
          onTrackRefId={handleTrackRefId}
        />

        {/* Client Reviews & Frequently Asked Questions */}
        <ReviewsAndFaq />
      </main>

      {/* Contact Information & Official Footer */}
      <ContactAndFooter onOpenApplyModal={handleOpenApplyModal} />

      {/* Persistent Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

      {/* Online Application Request Modal */}
      <RequestFormModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        defaultServiceName={modalPreselectedService}
        onTrackRefId={handleTrackRefId}
      />

      {/* Payment QR Code Modal */}
      <PaymentQrModal
        isOpen={isPaymentQrModalOpen}
        onClose={() => setIsPaymentQrModalOpen(false)}
        initialAmount={paymentQrAmount}
        serviceTitle={paymentQrTitle}
      />

      {/* Visit Shop & Location Directions Modal */}
      <VisitShopModal
        isOpen={isVisitShopModalOpen}
        onClose={() => setIsVisitShopModalOpen(false)}
        serviceName={visitShopServiceName}
      />

      {/* Sticky Quick-Action Bar for Mobile Screens */}
      <MobileBottomNav
        onOpenApplyModal={handleOpenApplyModal}
        onVisitShop={handleVisitShop}
        onNavigate={handleNavigate}
        onOpenPaymentQrModal={() => handleOpenPaymentQrModal()}
      />

      {/* Admin / Owner Login Modal */}
      <AdminLoginModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
