import React from 'react';
import {
  Award,
  Check,
  CheckCircle2,
  Gift,
  QrCode,
  Share2,
  Sparkles,
  Store,
} from 'lucide-react';
import { Business, Customer, LoyaltyCard, LoyaltyProgram } from '../types';
import { SegmentIcon } from '../components/SegmentIcon';
import { LoyaltyCardGraphic } from '../components/LoyaltyCardGraphic';

interface PublicCardViewProps {
  card: LoyaltyCard;
  customer: Customer;
  business: Business;
  program: LoyaltyProgram;
  onBackToApp?: () => void;
}

export const PublicCardView: React.FC<PublicCardViewProps> = ({
  card,
  customer,
  business,
  program,
  onBackToApp,
}) => {
  const goal = program.goal || 10;
  const points = Math.min(card.points, goal);
  const remaining = Math.max(goal - points, 0);
  const isComplete = points >= goal;
  const unitLabel = program.type === 'visitas' ? 'visitas' : 'pontos';
  const unitLabelSingular = program.type === 'visitas' ? 'visita' : 'ponto';

  const handleShare = async () => {
    const url = window.location.href;
    const shareText = `Meu cartão fidelidade da ${business.name} no Fideliza+! Acompanhe: ${url}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cartão Fidelidade - ${business.name}`,
          text: shareText,
          url,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link do cartão copiado!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Public Header */}
      <header className="max-w-md w-full mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
            F+
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
              Fideliza<span className="text-blue-600 dark:text-blue-400">+</span>
            </span>
            <span className="block text-[9px] text-slate-400 leading-none">
              Cartão Digital do Cliente
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onBackToApp && (
            <button
              type="button"
              onClick={onBackToApp}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
            >
              Painel
            </button>
          )}
        </div>
      </header>

      {/* Main Card View */}
      <main className="max-w-md w-full mx-auto px-4 py-4 space-y-4 flex-1 flex flex-col justify-center">
        {/* Customer & Business Heading */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs mb-1">
            <SegmentIcon segment={business.segment} className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{business.name}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Cartão de {customer.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Apresente seu cartão no estabelecimento para acumular pontos
          </p>
        </div>

        {/* Visual Card Graphic */}
        <LoyaltyCardGraphic
          business={business}
          program={program}
          customer={customer}
          card={card}
        />

        {/* Status Callout */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-2">
          {isComplete ? (
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>Prêmio Conquistado!</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {program.reward}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mostre esta tela para o atendente no <strong>{business.name}</strong> para retirar seu prêmio.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Próximo Objetivo
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Faltam {remaining} {remaining === 1 ? unitLabelSingular : unitLabel} para:{' '}
                <span className="text-blue-600 dark:text-blue-400">{program.reward}</span>
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={handleShare}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Salvar ou Compartilhar Cartão</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto px-4 py-4 text-center text-[11px] text-slate-400">
        <p>
          Cartão Fidelidade Digital gerado por <strong>Fideliza+</strong>
        </p>
        <p className="text-[10px] text-slate-400/80 mt-0.5">
          Seu cliente volta. Seu negócio cresce.
        </p>
      </footer>
    </div>
  );
};
