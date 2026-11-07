import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Inbox, 
  ExternalLink,
  Plus,
  LogOut
} from 'lucide-react';
import { Inquiry } from '../types';

interface InquiriesDashboardModalProps {
  isOpen: boolean;
  inquiries: Inquiry[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: Inquiry['status']) => void;
  onDeleteInquiry: (id: string) => void;
  onOpenNewConsultation: () => void;
  onLogout?: () => void;
}

export const InquiriesDashboardModal: React.FC<InquiriesDashboardModalProps> = ({
  isOpen,
  inquiries,
  onClose,
  onUpdateStatus,
  onDeleteInquiry,
  onOpenNewConsultation,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Inquiry['status']>('all');
  const [roomFilter, setRoomFilter] = useState<string>('all');
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);

  // Filtered inquiries
  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch = 
        inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.roomType.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
      const matchesRoom = roomFilter === 'all' || inq.roomType.toLowerCase().includes(roomFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesRoom;
    });
  }, [inquiries, searchQuery, statusFilter, roomFilter]);

  // Counts
  const counts = useMemo(() => {
    return {
      total: inquiries.length,
      new: inquiries.filter((i) => i.status === 'new').length,
      inReview: inquiries.filter((i) => i.status === 'in-review').length,
      contacted: inquiries.filter((i) => i.status === 'contacted').length,
      completed: inquiries.filter((i) => i.status === 'completed').length,
    };
  }, [inquiries]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Inquiry ID', 'Date & Time', 'Full Name', 'Email', 'Phone', 'Room Space', 'Status', 'Notes'];
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${new Date(i.createdAt).toLocaleString()}"`,
      `"${i.fullName.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.roomType}"`,
      `"${i.status}"`,
      `"${i.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SRK-Homes-Submitted-Inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#FAF8F5] border-b border-stone-200 px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500">
              SRK Homes · Atelier Management
            </div>
            <h2 className="text-2xl font-serif text-stone-900 font-medium mt-0.5">
              Submitted Consultation Forms & Leads
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Download all submissions as spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-2 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Log out of administrator mode"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Strips & Filters Bar */}
        <div className="bg-white border-b border-stone-200 px-6 sm:px-8 py-4 space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-stone-200/70">
              <span className="text-stone-500 block text-[11px] uppercase tracking-wider">Total Submissions</span>
              <span className="text-xl font-serif text-stone-900 font-medium tabular-nums">{counts.total}</span>
            </div>
            <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/60">
              <span className="text-amber-800 block text-[11px] uppercase tracking-wider">New (Action Required)</span>
              <span className="text-xl font-serif text-amber-900 font-medium tabular-nums">{counts.new}</span>
            </div>
            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200/60">
              <span className="text-blue-800 block text-[11px] uppercase tracking-wider">In Review</span>
              <span className="text-xl font-serif text-blue-900 font-medium tabular-nums">{counts.inReview}</span>
            </div>
            <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200/60">
              <span className="text-emerald-800 block text-[11px] uppercase tracking-wider">Contacted / Quoted</span>
              <span className="text-xl font-serif text-emerald-900 font-medium tabular-nums">{counts.contacted + counts.completed}</span>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client name, email, phone, or furniture notes..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {/* Status Segmented Buttons */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs shrink-0">
                {(['all', 'new', 'in-review', 'contacted'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 capitalize rounded-md transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-white text-stone-900 shadow-sm font-medium'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {st === 'all' ? 'All Leads' : st.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Room Filter */}
              <select
                value={roomFilter}
                onChange={(e) => setRoomFilter(e.target.value)}
                className="px-2.5 py-1 text-xs bg-stone-100 border border-stone-200 rounded-lg text-stone-700 cursor-pointer focus:outline-none"
              >
                <option value="all">All Rooms</option>
                <option value="Living">Living</option>
                <option value="Dining">Dining</option>
                <option value="Bedroom">Bedroom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries Content List */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 bg-stone-50/50">
          {filtered.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-white rounded-xl border border-dashed border-stone-300">
              <Inbox className="w-10 h-10 text-stone-400 stroke-1" />
              <div>
                <p className="text-base font-serif text-stone-800">No submissions matching criteria</p>
                <p className="text-xs text-stone-500 mt-1">Try clearing your search query or filter tags.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setRoomFilter('all');
                }}
                className="px-3.5 py-1.5 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filtered.map((inq) => {
              const isSelected = selectedInquiryId === inq.id;
              const dateStr = new Date(inq.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              const timeStr = new Date(inq.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={inq.id}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? 'border-stone-900 shadow-md ring-1 ring-stone-900'
                      : inq.status === 'new'
                      ? 'border-amber-300/80 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 shadow-sm'
                  }`}
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Top Row: Client Info, Room, Timestamp, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-serif text-lg sm:text-xl text-stone-900 font-medium">
                            {inq.fullName}
                          </h3>
                          {inq.status === 'new' && (
                            <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold tracking-wide">
                              New Inquiry
                            </span>
                          )}
                        </div>

                        {/* Unboxed Contact Metadata */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
                          <span className="font-medium text-stone-800">{inq.roomType}</span>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <a href={`mailto:${inq.email}`} className="text-stone-700 hover:text-stone-950 underline flex items-center gap-1">
                            <Mail className="w-3 h-3 text-stone-400" />
                            <span>{inq.email}</span>
                          </a>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span className="text-stone-600 flex items-center gap-1 font-mono text-[11px]">
                            <Phone className="w-3 h-3 text-stone-400" />
                            <span>{inq.phone}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right: Date and Status Dropdown */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right text-[11px] text-stone-400 font-mono">
                          <div>{dateStr}</div>
                          <div>{timeStr}</div>
                        </div>

                        {/* Status Selector */}
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateStatus(inq.id, e.target.value as Inquiry['status'])}
                          className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                            inq.status === 'new'
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : inq.status === 'in-review'
                              ? 'bg-blue-50 text-blue-900 border-blue-300'
                              : inq.status === 'contacted'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-stone-100 text-stone-800 border-stone-300'
                          }`}
                        >
                          <option value="new">Status: New</option>
                          <option value="in-review">Status: In Review</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="completed">Status: Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Detailed Notes Box */}
                    <div className="p-3.5 bg-[#FAF8F5] border border-stone-200/80 rounded-lg text-xs text-stone-700 leading-relaxed font-light">
                      <span className="font-medium text-stone-900 block mb-0.5">Specifications & Floor Plan Notes:</span>
                      <p className="whitespace-pre-line">{inq.notes}</p>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-100 text-xs">
                      <div className="flex items-center gap-3">
                        <a
                          href={`mailto:${inq.email}?subject=SRK%20Homes%20Consultation%20Follow-up%20-%20${encodeURIComponent(inq.roomType)}&body=Dear%20${encodeURIComponent(inq.fullName)},%0A%0AThank%20you%20for%20contacting%20SRK%20Homes%20regarding%20your%20${encodeURIComponent(inq.roomType)}%20furniture.%20`}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply via Email</span>
                        </a>

                        {inq.phone && inq.phone !== 'Not provided' && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>WhatsApp / Chat</span>
                          </a>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="text-stone-400 hover:text-red-700 p-1.5 rounded transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                        title="Delete inquiry record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Strip */}
        <div className="bg-[#FAF8F5] border-t border-stone-200 px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>All consultation requests are saved directly to local storage and routed to</span>
            <strong className="text-stone-800">marketing.srkmodular@gmail.com</strong>
          </div>
          <button
            type="button"
            onClick={onOpenNewConsultation}
            className="text-stone-900 hover:underline font-medium cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit a Test Inquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
