import { Inquiry } from '../types';

const STORAGE_KEY = 'srk_homes_inquiries_v1';

const INITIAL_SEEDS: Inquiry[] = [
  {
    id: 'inq-101',
    fullName: 'Ananya Sharma',
    email: 'ananya.interiors@studioarch.in',
    phone: '+91 98201 54321',
    roomType: 'Living Room',
    notes: 'Regarding: Alva Modular 4-Seat Sectional in Oatmeal Boucle for a 6500 sq ft duplex villa in Bangalore. Need custom length of 380cm and matching travertine plinth table.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    status: 'new'
  },
  {
    id: 'inq-102',
    fullName: 'Rajesh & Meera Singhania',
    email: 'r.singhania@apexcapital.com',
    phone: '+91 98110 99887',
    roomType: 'Dining Room',
    notes: 'Regarding: Kyoto Monolithic Oak 10-Seater Table. Requesting wood finish samples in American Walnut and Smoked Charcoal Oak. Residence in Worli, Mumbai.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
    status: 'in-review'
  },
  {
    id: 'inq-103',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@residence.com',
    phone: '+1 (415) 890-2134',
    roomType: 'Master Bedroom',
    notes: 'Custom Layout: 5.5m × 7.0m master space. Requesting Sylvan Fluted Platform Bed with extended headboard wall and integrated dimmable nightstand lamps.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    status: 'contacted'
  }
];

export function getStoredInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDS));
      return INITIAL_SEEDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SEEDS;
  } catch (e) {
    console.error('Error reading inquiries from localStorage', e);
    return INITIAL_SEEDS;
  }
}

export function saveNewInquiry(data: {
  fullName: string;
  email: string;
  phone: string;
  roomType: string;
  notes: string;
}): Inquiry {
  const current = getStoredInquiries();
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone || 'Not provided',
    roomType: data.roomType,
    notes: data.notes || 'No extra notes provided',
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  const updated = [newInquiry, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving inquiry', e);
  }
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry[] {
  const current = getStoredInquiries();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating inquiry status', e);
  }
  return updated;
}

export function deleteInquiry(id: string): Inquiry[] {
  const current = getStoredInquiries();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting inquiry', e);
  }
  return updated;
}
