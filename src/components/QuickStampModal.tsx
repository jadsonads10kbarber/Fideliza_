import React, { useState } from 'react';
import { Award, Check, Plus, Search, Sparkles, User, X } from 'lucide-react';
import { Customer, LoyaltyCard, LoyaltyProgram } from '../types';

interface QuickStampModalProps {
  isOpen: boolean;
  onClose: () => void;
  customersWithCards: { customer: Customer; card: LoyaltyCard }[];
  program: LoyaltyProgram;
  onAddPoint: (cardId: string) => void;
  onSelectCustomer: (customer: Customer, card: LoyaltyCard) => void;
}

export const QuickStampModal: React.FC<QuickStampModalProps> = ({
  isOpen,
  onClose,
  customersWithCards,
  program,
  onAddPoint,
  onSelectCustomer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [justStampedId, setJustStampedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = customersWithCards.filter(
    (item) =>
      item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.phone.includes(searchTerm)
  );

  const handleStamp = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddPoint(cardId);
    setJustStampedId(cardId);
    setTimeout(() => setJustStampedId(null), 1800);
  };

  return (
    <div
      id="quick-stamp-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="quick-stamp-modal-content"
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <div className="inline-flex p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold">Lançar Ponto Rápido</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Localize o cliente pelo nome ou WhatsApp e adicione a visita/ponto com 1 toque.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="quick-stamp-search"
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome ou WhatsApp..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* List of customers */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[160px] max-h-[360px]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              Nenhum cliente encontrado com &quot;{searchTerm}&quot;
            </div>
          ) : (
            filtered.map(({ customer, card }) => {
              const isPrizeReady = card.points >= program.goal;
              const isJustStamped = justStampedId === card.id;

              return (
                <div
                  key={customer.id}
                  onClick={() => onSelectCustomer(customer, card)}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isJustStamped
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 flex-shrink-0 text-sm">
                      {customer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {customer.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {customer.phone}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                          {card.points}/{program.goal} {program.type}
                        </span>
                        {isPrizeReady && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                            <Award className="w-3 h-3" />
                            Prêmio Pronto!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stamp button */}
                  <button
                    type="button"
                    onClick={(e) => handleStamp(card.id, e)}
                    disabled={isPrizeReady}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0 ${
                      isJustStamped
                        ? 'bg-emerald-600 text-white'
                        : isPrizeReady
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white'
                    }`}
                  >
                    {isJustStamped ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Pontuado!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>+1 Ponto</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
