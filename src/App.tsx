import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FurnitureShowcase } from './components/FurnitureShowcase';
import { DimensionPlanner } from './components/DimensionPlanner';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ProductModal } from './components/ProductModal';
import { ConsultationModal } from './components/ConsultationModal';
import { InquiriesDashboardModal } from './components/InquiriesDashboardModal';
import { Footer } from './components/Footer';
import { HERO_SUITES, FEATURED_PRODUCTS } from './data/furnitureData';
import { FurnitureSuite, FurnitureProduct, Hotspot, Inquiry } from './types';
import { getStoredInquiries, updateInquiryStatus, deleteInquiry } from './utils/inquiryStorage';

export default function App() {
  const [activeSuite, setActiveSuite] = useState<FurnitureSuite>(HERO_SUITES[0]);
  const [inspectItem, setInspectItem] = useState<FurnitureProduct | Hotspot | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [consultationSubject, setConsultationSubject] = useState<string>('General Design Inquiry');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load stored inquiries on mount
  useEffect(() => {
    setInquiries(getStoredInquiries());
  }, []);

  const handleOpenConsultation = (subject?: string) => {
    if (subject) {
      setConsultationSubject(subject);
    }
    setIsConsultationOpen(true);
  };

  const handleSelectRoom = (room: 'living' | 'dining' | 'bedroom') => {
    const found = HERO_SUITES.find((s) => s.room === room);
    if (found) {
      setActiveSuite(found);
    }
  };

  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleUpdateStatus = (id: string, status: Inquiry['status']) => {
    const updated = updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = deleteInquiry(id);
    setInquiries(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 3-Zone Top Navigation Bar with Inquiries Desk Button */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onSelectRoom={handleSelectRoom}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        inquiryCount={inquiries.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Centerpiece Hero Section */}
        <HeroSection
          suites={HERO_SUITES}
          activeSuite={activeSuite}
          onSelectSuite={setActiveSuite}
          onInspectHotspot={(hotspot) => setInspectItem(hotspot)}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Signature Home Furniture Showcase */}
        <FurnitureShowcase
          products={FEATURED_PRODUCTS}
          onInspectProduct={(product) => setInspectItem(product)}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Spatial Room Dimension Planner Tool */}
        <DimensionPlanner
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Material & Structural Craftsmanship */}
        <CraftsmanshipSection
          onOpenConsultation={() => handleOpenConsultation('Material Samples & Atelier Visit')}
        />
      </main>

      {/* Technical Inspection Modal */}
      <ProductModal
        item={inspectItem}
        onClose={() => setInspectItem(null)}
        onInquire={(title) => handleOpenConsultation(title)}
      />

      {/* Bespoke Consultation & Inquiry Drawer */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        initialSubject={consultationSubject}
        onClose={() => setIsConsultationOpen(false)}
        onInquirySubmitted={handleInquirySubmitted}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Inquiries & Form Submissions Management Dashboard */}
      <InquiriesDashboardModal
        isOpen={isDashboardOpen}
        inquiries={inquiries}
        onClose={() => setIsDashboardOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onOpenNewConsultation={() => {
          setIsDashboardOpen(false);
          handleOpenConsultation();
        }}
      />

      {/* Quiet Luxury Footer with Inquiries Desk link */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation('General Atelier Inquiry')}
        onSelectRoom={handleSelectRoom}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />
    </div>
  );
}
