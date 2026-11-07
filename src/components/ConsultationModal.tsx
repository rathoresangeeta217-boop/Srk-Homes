import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Mail, Phone, MapPin, Send, Download, FileText, ClipboardList, Instagram } from 'lucide-react';
import { Inquiry } from '../types';
import { saveNewInquiry } from '../utils/inquiryStorage';

interface ConsultationModalProps {
  isOpen: boolean;
  initialSubject?: string;
  onClose: () => void;
  onInquirySubmitted?: (inquiry: Inquiry) => void;
  onOpenDashboard?: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  initialSubject = 'General Furniture Inquiry',
  onClose,
  onInquirySubmitted,
  onOpenDashboard
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomType, setRoomType] = useState('Living Room');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [downloadedLookbook, setDownloadedLookbook] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      if (initialSubject && !notes) {
        setNotes(`Regarding: ${initialSubject}`);
      }
    }
  }, [isOpen, initialSubject]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const newInquiry = saveNewInquiry({
      fullName,
      email,
      phone,
      roomType,
      notes
    });

    if (onInquirySubmitted) {
      onInquirySubmitted(newInquiry);
    }

    setSubmitted(true);
  };

  const handleDownloadLookbook = () => {
    setDownloadedLookbook(true);
    // Simulate generating or downloading the lookbook
    const element = document.createElement('a');
    const file = new Blob([
      `SRK HOMES - 2026 FURNITURE LOOKBOOK\n\n` +
      `Thank you for requesting our 2026 Architectural Home Furniture catalog.\n\n` +
      `Collections:\n` +
      `- The Alva Modular Living Suite (Solid American Walnut & Oatmeal Boucle)\n` +
      `- The Kyoto Solid Oak Dining Ensemble (French Oak & Papercord)\n` +
      `- The Sylvan Master Bedroom Sanctuary (Continuous Fluted Walnut Platform)\n` +
      `- Limited Stone Editions (Roman Travertine & Calacatta Marble)\n\n` +
      `For bespoke dimensions and finish customizer boxes, contact our atelier at marketing.srkmodular@gmail.com\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'SRK-Homes-2026-Lookbook.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-stone-200 overflow-y-auto text-stone-900 pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-stone-200 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-stone-500 font-medium">
              SRK Homes Atelier
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium mt-0.5">
              Book Design Consultation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 min-h-[40px] min-w-[40px] flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-stone-900">
                Inquiry Received
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <strong className="font-semibold text-stone-900">{fullName}</strong>. An SRK Homes furniture architect has received your specifications and will respond to <span className="font-mono text-stone-800">{email}</span> within 24 business hours.
              </p>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl max-w-md mx-auto text-xs text-stone-600 space-y-1.5 text-left">
                <div className="text-stone-800 font-medium">Direct Atelier Desk:</div>
                <div>Email: marketing.srkmodular@gmail.com</div>
                <div>Phone: +91 (0) 98200 45890 / +1 (800) 480-7750</div>
                <div className="pt-1 flex items-center gap-1.5 text-stone-800 border-t border-stone-200">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>Instagram: </span>
                  <a 
                    href="https://www.instagram.com/homes.srk/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-900 font-semibold underline hover:text-pink-600 transition-colors"
                  >
                    @homes.srk
                  </a>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                {onOpenDashboard && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDashboard();
                    }}
                    className="px-4 py-2 text-xs font-medium bg-amber-100 hover:bg-amber-200 text-stone-900 rounded flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ClipboardList className="w-3.5 h-3.5 text-amber-900" />
                    <span>View in Inquiries Desk</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDownloadLookbook}
                  className="px-4 py-2 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadedLookbook ? 'Lookbook Saved' : 'Download Lookbook PDF'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs uppercase tracking-wider font-medium bg-stone-900 text-white rounded hover:bg-stone-800 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Victoria Sterling"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="victoria@residence.com"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                    Room Space of Interest
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors cursor-pointer"
                  >
                    <option value="Living Room">Living Room & Sectionals</option>
                    <option value="Dining Room">Dining Hall & Tables</option>
                    <option value="Master Bedroom">Master Bedroom & Sanctuaries</option>
                    <option value="Modular Storage">Custom Modular Cabinetry</option>
                    <option value="Full Residence">Full Residence Architecture</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 font-medium mb-1.5">
                  Dimensions, Custom Finishes & Floor Plan Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Include preferred wood finishes (Walnut/Oak), fabric textures, room dimensions, or timeline..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors resize-none"
                />
              </div>

              {/* Direct email notice */}
              <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>Inquiries routed directly to SRK Atelier (marketing.srkmodular@gmail.com).</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs tracking-wider uppercase font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry to Furniture Architect</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
