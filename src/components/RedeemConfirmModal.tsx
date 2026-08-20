import React from 'react';
import confetti from 'canvas-confetti';
import { AlertCircle, Award, Check, Gift, RefreshCw, X } from 'lucide-react';
import { Customer, LoyaltyCard, LoyaltyProgram } from '../types';

interface RedeemConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customer: Customer;
  card: LoyaltyCard;
  program: LoyaltyProgram;
}

export const RedeemConfirmModal: React.FC<RedeemConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  customer,
  card,
  program,
}) => {
  if (!isOpen) return null;

  const handleConfirmRedemption = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti fails
    }

    onConfirm();
  };

  return (
    <div
      id="redeem-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="redeem-modal-content"
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 text-slate-900 dark:text-slate-100"
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

        <div className="text-center mb-5">
          <div className="inline-flex p-3 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mb-2 ring-4 ring-emerald-50/50 dark:ring-emerald-950/30">
            <Gift className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Resgatar Prêmio</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Confirmar a entrega do prêmio para <strong>{customer.name}</strong>
          </p>
        </div>

        {/* Prize description card */}
        <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl mb-4 text-center">
          <span className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider">
            Prêmio a ser entregue
          </span>
          <p className="text-base font-bold text-slate-900 dark:text-emerald-200 mt-1">
            {program.reward || '1 Produto ou Serviço Grátis'}
          </p>
          <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-0.5 rounded-full font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Meta de {program.goal} {program.type === 'visitas' ? 'visitas' : 'pontos'} concluída!</span>
          </div>
        </div>

        {/* Notice of card reset */}
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-300 mb-5">
          <RefreshCw className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p>
            Ao confirmar, o saldo do cartão será <strong>zerado</strong> e o cliente iniciará o{' '}
            <strong>{(card.cycleCount || 1) + 1}º ciclo</strong> de fidelidade. O histórico do resgate será salvo.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            id="confirm-redeem-btn"
            type="button"
            onClick={handleConfirmRedemption}
            className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirmar Entrega do Prêmio</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
