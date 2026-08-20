export type SegmentId =
  | 'barbearia'
  | 'salao'
  | 'manicure'
  | 'restaurante'
  | 'lanchonete'
  | 'pizzaria'
  | 'cafeteria'
  | 'acaiteria'
  | 'roupas'
  | 'calcados'
  | 'petshop'
  | 'lavajato'
  | 'academia'
  | 'clinica'
  | 'confeitaria'
  | 'mercado'
  | 'outros';

export type LoyaltyType = 'pontos' | 'visitas';

export type CardStatus = 'em_andamento' | 'premio_disponivel' | 'resgatado';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessId: string;
  createdAt: string;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  segment: SegmentId;
  phone: string;
  colorTheme: string;
  logoIcon?: string;
  createdAt: string;
}

export interface LoyaltyProgram {
  id: string;
  businessId: string;
  name: string;
  type: LoyaltyType;
  goal: number;
  reward: string;
  description: string;
  active: boolean;
  createdAt: string;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
}

export interface LoyaltyCard {
  id: string;
  businessId: string;
  customerId: string;
  programId: string;
  points: number;
  status: CardStatus;
  cycleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Redemption {
  id: string;
  cardId: string;
  customerId: string;
  customerName: string;
  businessId: string;
  reward: string;
  redeemedAt: string;
}

export interface PointTransaction {
  id: string;
  cardId: string;
  customerId: string;
  businessId: string;
  amount: number;
  type: 'adicao' | 'remocao' | 'resgate';
  note?: string;
  createdAt: string;
}

export type ActiveTab = 'dashboard' | 'customers' | 'card_config' | 'redemptions' | 'settings';
