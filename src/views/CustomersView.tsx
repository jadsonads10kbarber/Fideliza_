import React, { useState } from 'react';
import {
  Award,
  Check,
  CreditCard,
  Gift,
  Plus,
  QrCode,
  Search,
  Share2,
  Users,
} from 'lucide-react';
import { Business, Customer, LoyaltyCard, LoyaltyProgram } from '../types';

interface CustomersViewProps {
  business: Business;
  program: LoyaltyProgram;
  customersWithCards: { customer: Customer; card: LoyaltyCard }[];
  onOpenNewCustomer: () => void;
  onOpenCustomerDetail: (customer: Customer, card: LoyaltyCard) => void;
  onAddPoint: (cardId: string) => void;
  onOpenQr: (customer: Customer, card: LoyaltyCard) => void;
  onOpenRedeem: (customer: Customer, card: LoyaltyCard) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  business,
  program,
  customersWithCards,
  onOpenNewCustomer,
  onOpenCustomerDetail,
  onAddPoint,
  onOpenQr,
  onOpenRedeem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'em_andamento' | 'premio_disponivel'>('todos');
  const [justStampedId, setJustStampedId] = useState<string | null>(null);

  const goal = program.goal || 10;

  const filtered = customersWithCards.filter(({ customer, card }) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const isPrize = card.points >= goal;
    if (statusFilter === 'em_andamento') {
      return matchesSearch && !isPrize;
    }
    if (statusFilter === 'premio_disponivel') {
      return matchesSearch && isPrize;
    }
    return matchesSearch;
  });

  const handleQuickAddPoint = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddPoint(cardId);
    setJustStampedId(cardId);
    setTimeout(() => setJustStampedId(null), 1500);
  };

  const prizeCount = customersWithCards.filter((c) => c.card.points >= goal).length;
  const inProgressCount = customersWithCards.filter((c) => c.card.points < goal).length;

  return (
    <div className="space-y-5 pb-20 md:pb-6">
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Clientes & Cartões
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gerencie o progresso e os prêmios dos seus {customersWithCards.length} clientes.
          </p>
        </div>

        <button
          id="customers-add-btn"
          type="button"
          onClick={onOpenNewCustomer}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="customers-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, WhatsApp ou e-mail..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setStatusFilter('todos')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              statusFilter === 'todos'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todos ({customersWithCards.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('em_andamento')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              statusFilter === 'em_andamento'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Em andamento ({inProgressCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('premio_disponivel')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1 ${
              statusFilter === 'premio_disponivel'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Prêmio disponível ({prizeCount})</span>
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
              Nenhum cliente encontrado
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto mb-4">
              Tente buscar com outros termos ou cadastre um novo cliente agora.
            </p>
            <button
              type="button"
              onClick={onOpenNewCustomer}
              className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700"
            >
              + Cadastrar Cliente
            </button>
          </div>
        ) : (
          filtered.map(({ customer, card }) => {
            const isPrize = card.points >= goal;
            const isJustStamped = justStampedId === card.id;
            const percentage = Math.min(Math.round((card.points / goal) * 100), 100);

            return (
              <div
                key={customer.id}
                onClick={() => onOpenCustomerDetail(customer, card)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isJustStamped
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/20'
                    : isPrize
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/80 hover:border-emerald-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {/* Left Customer Info & Stamp summary */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      isPrize
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {customer.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                        {customer.name}
                      </h3>
                      {card.cycleCount > 1 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                          {card.cycleCount}º ciclo
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 truncate">
                      {customer.phone}
                    </p>

                    {/* Stamp dots mini preview */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(goal, 10) }).map((_, idx) => {
                          const filled = idx < card.points;
                          return (
                            <div
                              key={idx}
                              className={`w-2.5 h-2.5 rounded-full ${
                                filled
                                  ? 'bg-blue-600 dark:bg-blue-500'
                                  : 'bg-slate-200 dark:bg-slate-800'
                              }`}
                            />
                          );
                        })}
                      </div>

                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 ml-1">
                        {card.points}/{goal} {program.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Status Badge + Action Buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  {/* Status Badge */}
                  <div>
                    {isPrize ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <Award className="w-3 h-3" />
                        <span>Prêmio pronto</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        Em andamento
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* Quick QR code button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQr(customer, card);
                      }}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                      title="Ver QR Code do Cartão"
                      aria-label="Ver QR Code do Cartão"
                    >
                      <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>

                    {/* Point Add or Redeem Button */}
                    {isPrize ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRedeem(customer, card);
                        }}
                        className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Resgatar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleQuickAddPoint(card.id, e)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                          isJustStamped
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isJustStamped ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Adicionado!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[3]" />
                            <span>+1 Ponto</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
