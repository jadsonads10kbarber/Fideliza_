import React, { useState } from 'react';
import {
  Award,
  Check,
  Clock,
  Copy,
  Gift,
  Minus,
  Phone,
  Plus,
  QrCode,
  Share2,
  Trash2,
  X,
} from 'lucide-react';
import { Business, Customer, LoyaltyCard, LoyaltyProgram } from '../types';
import { LoyaltyCardGraphic } from './LoyaltyCardGraphic';
import { storageService } from '../services/storageService';

interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  card: LoyaltyCard;
  business: Business;
  program: LoyaltyProgram;
  onAddPoint: (cardId: string) => void;
  onRemovePoint: (cardId: string) => void;
  onOpenRedeem: (customer: Customer, card: LoyaltyCard) => void;
  onOpenQr: (customer: Customer, card: LoyaltyCard) => void;
  onDeleteCustomer: (customerId: string) => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  isOpen,
  onClose,
  customer,
  card,
  business,
  program,
  onAddPoint,
  onRemovePoint,
  onOpenRedeem,
  onOpenQr,
  onDeleteCustomer,
}) => {
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen) return null;

  const publicUrl = `${window.location.origin}/?cardId=${card.id}`;
  const isGoalReached = card.points >= program.goal;
  const transactions = storageService.getTransactions(card.id);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareText = `Olá ${customer.name}! Seu cartão fidelidade da ${business.name} está atualizado: ${publicUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cartão Fidelidade - ${business.name}`,
          text: shareText,
          url: publicUrl,
        });
      } catch {
        // Ignored
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?phone=55${customer.phone.replace(
        /\D/g,
        ''
      )}&text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div
      id="customer-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="customer-detail-modal-content"
        className="relative w-full max-w-lg my-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-5 sm:p-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
              {customer.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                {customer.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3 h-3" />
                {customer.phone}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Card Graphic */}
        <div className="mb-4">
          <LoyaltyCardGraphic
            business={business}
            program={program}
            customer={customer}
            card={card}
          />
        </div>

        {/* Action Controls Panel */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 mb-4 space-y-3">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">
            Ações do Cartão
          </span>

          {/* Goal Reached Banner or Point Actions */}
          {isGoalReached ? (
            <div className="p-3 bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>Meta atingida! Prêmio pronto para entrega.</span>
              </div>
              <button
                id="redeem-reward-btn"
                type="button"
                onClick={() => onOpenRedeem(customer, card)}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Gift className="w-4 h-4" />
                <span>Resgatar Prêmio Agora</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                id="add-point-btn"
                type="button"
                onClick={() => onAddPoint(card.id)}
                className="py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Adicionar Ponto</span>
              </button>

              <button
                id="remove-point-btn"
                type="button"
                onClick={() => onRemovePoint(card.id)}
                disabled={card.points <= 0}
                className={`py-2.5 px-4 rounded-lg border font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  card.points <= 0
                    ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Remover Ponto</span>
              </button>
            </div>
          )}

          {/* Share & QR Code row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              id="qr-code-btn"
              type="button"
              onClick={() => onOpenQr(customer, card)}
              className="py-2 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-semibold text-slate-700 dark:text-slate-200 flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>QR Code</span>
            </button>

            <button
              id="share-whatsapp-btn"
              type="button"
              onClick={handleShare}
              className="py-2 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-semibold text-slate-700 dark:text-slate-200 flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Enviar Cartão</span>
            </button>

            <button
              id="copy-link-detail-btn"
              type="button"
              onClick={handleCopyLink}
              className="py-2 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-semibold text-slate-700 dark:text-slate-200 flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* History / Transactions summary */}
        {transactions.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block mb-2">
              Histórico Recente
            </span>
            <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-xs">
              {transactions.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="font-medium">
                      {tx.type === 'adicao'
                        ? '+1 Ponto adicionado'
                        : tx.type === 'remocao'
                        ? '-1 Ponto ajustado'
                        : 'Prêmio resgatado'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(tx.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Customer Safety */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          {showDeleteConfirm ? (
            <div className="flex items-center gap-2 w-full justify-between">
              <span className="text-red-600 dark:text-red-400 font-semibold text-xs">
                Confirmar exclusão deste cliente?
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onDeleteCustomer(customer.id);
                    onClose();
                  }}
                  className="px-2.5 py-1 bg-red-600 text-white rounded-lg font-bold"
                >
                  Sim, excluir
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Excluir cliente</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
