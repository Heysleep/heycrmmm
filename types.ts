export enum LeadStatus {
  NEW = '新咨询',
  CONTACTED = '已联系',
  NEGOTIATING = '方案洽谈',
  WON = '成交',
  LOST = '流失',
}

export enum Firmness {
  SOFT = '软',
  MEDIUM_SOFT = '适中偏软',
  MEDIUM = '适中',
  MEDIUM_FIRM = '适中偏硬',
  FIRM = '硬',
}

export interface MattressSpec {
  width: number;
  length: number;
  height: number;
  firmness: Firmness;
  materials: string[]; // e.g., 'Latex', 'Wool', 'Horsehair'
  specialRequests?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: LeadStatus;
  lastContact: string;
  budget?: number;
  notes: string;
  specs?: MattressSpec; // Preferred specs if known
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  deliveryDate: string;
  amount: number;
  status: 'PENDING' | 'PRODUCTION' | 'QUALITY_CHECK' | 'SHIPPED' | 'DELIVERED';
  specs: MattressSpec;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'FABRIC' | 'FILLING' | 'SPRING' | 'ACCESSORY';
  stock: number;
  unit: string;
  status: 'OK' | 'LOW' | 'CRITICAL';
}
