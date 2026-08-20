import React from 'react';
import {
  Award,
  CreditCard,
  Gift,
  Plus,
  QrCode,
  Share2,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import { Business, Customer, LoyaltyCard, LoyaltyProgram, User } from '../types';
import { LoyaltyCardGraphic } from '../components/LoyaltyCardGraphic';

interface DashboardViewProps {
  user: User;
  business: Business;
  program: LoyaltyProgram;
  customersWithCards: { customer: Customer; card: LoyaltyCard }[];
  onOpenNewCustomer: () => void;
  onOpenQuickStamp: () => void;
  onOpenCustomerDetail: (customer: Customer, card: LoyaltyCard) => void;
  onOpenRedeem: (customer: Customer, card: LoyaltyCard) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  business,
  program,
  customersWithCards,
  onOpenNewCustomer,
  onOpenQuickStamp,
  onOpenCustomerDetail,
  onOpenRedeem,
  onNavigateTab,
}) => {
  const totalCustomers = customersWithCards.length;
  const activeCards = customersWithCards.filter(
    (item) => item.card.points > 0 && item.card.points < program.goal
  ).length;
  const readyPrizes = customersWithCards.filter(
    (item) => item.card.points >= program.goal
  );

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome Greeting & Quick Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Visão Geral do Estabelecimento</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Olá, {user.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Gerenciando <strong>{business.name}</strong> &bull; Acompanhe a fidelização e entrega de prêmios.
          </p>
        </div>

        {/* Action button cluster */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="dash-quick-point-btn"
            type="button"
            onClick={onOpenQuickStamp}
            className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lançar Ponto</span>
          </button>

          <button
            id="dash-new-customer-btn"
            type="button"
            onClick={onOpenNewCustomer}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Cliente</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Total Clientes */}
        <div
          onClick={() => onNavigateTab('customers')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5 cursor-pointer hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
        >
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium block">
              Total de Clientes
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
              {totalCustomers}
            </div>
          </div>
        </div>

        {/* Card 2: Cartões Ativos */}
        <div
          onClick={() => onNavigateTab('customers')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5 cursor-pointer hover:border-orange-200 dark:hover:border-orange-800 transition-all group"
        >
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium block">
              Cartões Ativos
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
              {activeCards}
            </div>
          </div>
        </div>

        {/* Card 3: Prêmios Prontos */}
        <div
          onClick={() => onNavigateTab('customers')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5 cursor-pointer hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group"
        >
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium block">
              Prêmios Prontos
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {readyPrizes.length}
              </span>
              {readyPrizes.length > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Disponíveis
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Prize Ready Alert Banner if any */}
      {readyPrizes.length > 0 && (
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                {readyPrizes.length === 1
                  ? '1 cliente com prêmio pronto para resgate!'
                  : `${readyPrizes.length} clientes com prêmios prontos para resgate!`}
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Recompensa: {program.reward}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {readyPrizes.map(({ customer, card }) => (
              <div
                key={customer.id}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/70 flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {customer.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {customer.phone}
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Meta de {program.goal} {program.type} concluída
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenRedeem(customer, card)}
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0 shadow-xs transition-all active:scale-95"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Entregar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column Layout: Recent Customers & Loyalty Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Customers Table */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Clientes Recentes
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('customers')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver todos ({totalCustomers})
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-slate-100 dark:border-slate-800 px-6 py-3.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <div className="col-span-6 sm:col-span-5">Cliente</div>
              <div className="col-span-6 sm:col-span-4">Progresso</div>
              <div className="hidden sm:block sm:col-span-3 text-right">Status</div>
            </div>

            {/* List */}
            {customersWithCards.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                  Nenhum cliente cadastrado ainda
                </p>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Cadastre seu primeiro cliente para começar a pontuar.
                </p>
                <button
                  type="button"
                  onClick={onOpenNewCustomer}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-blue-700"
                >
                  Cadastrar Primeiro Cliente
                </button>
              </div>
            ) : (
              customersWithCards.slice(0, 6).map(({ customer, card }) => {
                const isPrize = card.points >= program.goal;
                const percentage = Math.min(
                  Math.round((card.points / program.goal) * 100),
                  100
                );

                return (
                  <div
                    key={customer.id}
                    onClick={() => onOpenCustomerDetail(customer, card)}
                    className="grid grid-cols-12 px-6 py-4 items-center border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    {/* Customer Info */}
                    <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center text-xs flex-shrink-0">
                        {customer.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 truncate">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white truncate block">
                          {customer.name}
                        </span>
                        <span className="text-xs text-slate-400 truncate block">
                          {customer.phone}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar & Counter */}
                    <div className="col-span-6 sm:col-span-4 pr-2">
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isPrize ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] mt-1 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                        {card.points} de {program.goal} {program.type}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="hidden sm:block sm:col-span-3 text-right">
                      {isPrize ? (
                        <span className="text-[10px] px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-full font-bold uppercase tracking-wider">
                          Prêmio Pronto
                        </span>
                      ) : (
                        <span className="text-[10px] px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-full font-bold uppercase tracking-wider">
                          Em Andamento
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Card Preview */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Pré-visualização do Cartão
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('card_config')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Configurar Regras
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-5 sm:p-6 flex flex-col items-center">
            <div className="w-full mb-4">
              <LoyaltyCardGraphic
                business={business}
                program={program}
                previewMode={true}
              />
            </div>

            <div className="w-full pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-500" />
                <span>Recompensa: <strong className="text-slate-700 dark:text-slate-200">{program.reward}</strong></span>
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Meta: {program.goal} {program.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
