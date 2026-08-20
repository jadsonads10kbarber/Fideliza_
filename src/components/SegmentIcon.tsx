import React from 'react';
import {
  Scissors,
  Sparkles,
  Hand,
  Utensils,
  Sandwich,
  Pizza,
  Coffee,
  IceCream,
  Shirt,
  Footprints,
  Dog,
  Car,
  Dumbbell,
  HeartPulse,
  Cake,
  ShoppingBag,
  Store,
  LucideIcon,
} from 'lucide-react';
import { SegmentId } from '../types';

const ICON_MAP: Record<SegmentId, LucideIcon> = {
  barbearia: Scissors,
  salao: Sparkles,
  manicure: Hand,
  restaurante: Utensils,
  lanchonete: Sandwich,
  pizzaria: Pizza,
  cafeteria: Coffee,
  acaiteria: IceCream,
  roupas: Shirt,
  calcados: Footprints,
  petshop: Dog,
  lavajato: Car,
  academia: Dumbbell,
  clinica: HeartPulse,
  confeitaria: Cake,
  mercado: ShoppingBag,
  outros: Store,
};

interface SegmentIconProps {
  segment?: SegmentId | string;
  className?: string;
  size?: number;
}

export const SegmentIcon: React.FC<SegmentIconProps> = ({
  segment = 'outros',
  className = 'w-5 h-5',
  size,
}) => {
  const IconComponent = (ICON_MAP as Record<string, LucideIcon>)[segment] || Store;
  return <IconComponent className={className} size={size} />;
};
