import { SegmentId } from '../types';

export interface SegmentInfo {
  id: SegmentId;
  label: string;
  iconName: string;
  defaultReward: string;
  defaultDescription: string;
  defaultColor: string;
}

export const SEGMENTS: SegmentInfo[] = [
  {
    id: 'barbearia',
    label: 'Barbearia',
    iconName: 'Scissors',
    defaultReward: 'Corte ou barba grátis',
    defaultDescription: 'A cada corte você acumula 1 ponto para um serviço grátis.',
    defaultColor: '#2563eb', // blue
  },
  {
    id: 'salao',
    label: 'Salão de Beleza',
    iconName: 'Sparkles',
    defaultReward: 'Hidratação capilar ou escova grátis',
    defaultDescription: 'A cada atendimento você acumula 1 selo.',
    defaultColor: '#db2777', // pink
  },
  {
    id: 'manicure',
    label: 'Manicure & Pedicure',
    iconName: 'Hand',
    defaultReward: 'Manicure completa grátis',
    defaultDescription: 'A cada sessão de unhas você ganha 1 selo.',
    defaultColor: '#9333ea', // purple
  },
  {
    id: 'restaurante',
    label: 'Restaurante',
    iconName: 'Utensils',
    defaultReward: '1 Prato principal ou sobremesa grátis',
    defaultDescription: 'A cada refeição você acumula pontos para um prato grátis.',
    defaultColor: '#ea580c', // orange
  },
  {
    id: 'lanchonete',
    label: 'Lanchonete / Hamburgueria',
    iconName: 'Sandwich',
    defaultReward: '1 Hambúrguer especial grátis',
    defaultDescription: 'A cada lanche consumido você ganha 1 selo.',
    defaultColor: '#dc2626', // red
  },
  {
    id: 'pizzaria',
    label: 'Pizzaria',
    iconName: 'Pizza',
    defaultReward: '1 Pizza grande grátis',
    defaultDescription: 'A cada pedido de pizza você acumula 1 ponto.',
    defaultColor: '#b91c1c', // deep red
  },
  {
    id: 'cafeteria',
    label: 'Cafeteria',
    iconName: 'Coffee',
    defaultReward: '1 Café especial ou bebida grátis',
    defaultDescription: 'A cada café ou combo você ganha 1 selo.',
    defaultColor: '#78350f', // amber/brown
  },
  {
    id: 'acaiteria',
    label: 'Açaíteria / Sorveteria',
    iconName: 'IceCream',
    defaultReward: '1 Açaí de 500ml com 3 adicionais',
    defaultDescription: 'A cada açaí consumido você ganha 1 ponto.',
    defaultColor: '#7e22ce', // deep purple
  },
  {
    id: 'roupas',
    label: 'Loja de Roupas',
    iconName: 'Shirt',
    defaultReward: 'Vale-compras de R$ 50,00 ou peça grátis',
    defaultDescription: 'A cada compra você pontua para ganhar descontos especiais.',
    defaultColor: '#059669', // emerald
  },
  {
    id: 'calcados',
    label: 'Loja de Calçados',
    iconName: 'Footprints',
    defaultReward: 'Vale-compras de R$ 60,00',
    defaultDescription: 'A cada compra ganhe pontos para trocar por produtos.',
    defaultColor: '#0891b2', // cyan
  },
  {
    id: 'petshop',
    label: 'Pet Shop / Banho e Tosa',
    iconName: 'Dog',
    defaultReward: '1 Banho completo ou brinquedo pet grátis',
    defaultDescription: 'A cada banho ou compra você ganha 1 selo de fidelidade.',
    defaultColor: '#16a34a', // green
  },
  {
    id: 'lavajato',
    label: 'Lava-Jato / Estética Automotiva',
    iconName: 'Car',
    defaultReward: '1 Lavagem completa grátis',
    defaultDescription: 'A cada lavagem de veículo você acumula 1 ponto.',
    defaultColor: '#0284c7', // light blue
  },
  {
    id: 'academia',
    label: 'Academia / Studio',
    iconName: 'Dumbbell',
    defaultReward: '1 Mensalidade grátis ou avaliação bioimpedância',
    defaultDescription: 'A cada mês ativo ou frequência semanal você pontua.',
    defaultColor: '#4f46e5', // indigo
  },
  {
    id: 'clinica',
    label: 'Clínica / Consultório',
    iconName: 'HeartPulse',
    defaultReward: '1 Procedimento ou desconto especial',
    defaultDescription: 'A cada consulta ou sessão você acumula pontos.',
    defaultColor: '#0d9488', // teal
  },
  {
    id: 'confeitaria',
    label: 'Confeitaria / Doceria',
    iconName: 'Cake',
    defaultReward: '1 Caixa de doces finos ou bolo vulcão',
    defaultDescription: 'A cada compra de doces você ganha 1 selo doce.',
    defaultColor: '#d97706', // amber
  },
  {
    id: 'mercado',
    label: 'Mercado / Empório',
    iconName: 'ShoppingBag',
    defaultReward: 'Vale-compras de R$ 40,00 no empório',
    defaultDescription: 'A cada compra acima do valor mínimo você pontua.',
    defaultColor: '#15803d', // dark green
  },
  {
    id: 'outros',
    label: 'Outros Segmentos',
    iconName: 'Store',
    defaultReward: 'Ganhe 1 produto ou serviço grátis',
    defaultDescription: 'A cada compra ou visita você ganha pontos para trocar por prêmios.',
    defaultColor: '#475569', // slate
  },
];

export function getSegment(id: SegmentId): SegmentInfo {
  return SEGMENTS.find((s) => s.id === id) || SEGMENTS[SEGMENTS.length - 1];
}
