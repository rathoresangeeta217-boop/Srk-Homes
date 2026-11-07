export interface Hotspot {
  id: string;
  title: string;
  category: string;
  price: string;
  materials: string;
  dimensions: string;
  x: number; // percentage from left
  y: number; // percentage from top
  description: string;
  image?: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  colorHex: string;
  textureNote: string;
}

export interface FurnitureSuite {
  id: string;
  name: string;
  tagline: string;
  room: 'living' | 'dining' | 'bedroom';
  image: string;
  description: string;
  keySpecs: string[];
  hotspots: Hotspot[];
  materials: MaterialOption[];
}

export interface FurnitureProduct {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: string;
  dimensions: string;
  material: string;
  finish: string;
  leadTime: string;
  image: string;
  description: string;
  features: string[];
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roomType: string;
  notes: string;
  createdAt: string;
  status: 'new' | 'in-review' | 'contacted' | 'completed';
}
