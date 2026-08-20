import React from 'react';
import { Award, Check, Gift, Sparkles, Star } from 'lucide-react';
import { Business, Customer, LoyaltyCard, LoyaltyProgram } from '../types';
import { SegmentIcon } from './SegmentIcon';

interface LoyaltyCardGraphicProps {
  business: Business;
  program: LoyaltyProgram;
  customer?: Customer | null;
  card?: LoyaltyCard | null;
  previewMode?: boolean;
  className?: string;
}

export const LoyaltyCardGraphic: React.FC<LoyaltyCardGraphicProps> = ({
  business,
  program,
  customer,
  card,
  previewMode = false,
  className = '',
}) => {
  const goal = Math.max(program.goal || 10, 1);
  const points = card ? Math.min(card.points, goal) : previewMode ? Math.floor(goal / 2) : 0;
  const remaining = Math.max(goal - points, 0);
  const isComplete = points >= goal;
  const unitLabel = program.type === 'visitas' ? 'visitas' : 'pontos';
  const unitLabelSingular = program.type === 'visitas' ? 'visita' : 'ponto';

  // Build grid of stamps
  const stamps = Array.from({ length: goal }, (_, i) => ({
    number: i + 1,
    isCompleted: i < points,
    isNext: i === points,
    isLast: i === goal - 1,
  }));

  // Dynamic grid cols based on goal
  const gridColsClass =
    goal <= 6
      ? 'grid-cols-3'
      : goal <= 8
      ? 'grid-cols-4'
      : goal <= 10
      ? 'grid-cols-5'
      : goal <= 12
      ? 'grid-cols-4 sm:grid-cols-6'
      : 'grid-cols-5 sm:grid-cols-6';

  const themeColor = business.colorTheme || '#2563eb';

  return (
    <div
      id="loyalty-card-container"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white shadow-xl border border-slate-700/60 p-5 sm:p-6 transition-all ${className}`}
      style={{
        boxShadow: `0 12px 30px -8px ${themeColor}33, 0 4px 12px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Decorative background aura */}
      <div
        className="absolute -right-16 -top-16 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />
      <div
        className="absolute -left-16 -bottom-16 w-44 h-44 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: themeColor }}
      />

      {/* Top Bar: Business info + Status badge */}
      <div className="relative z-10 flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            <SegmentIcon segment={business.segment} className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base sm:text-lg text-white truncate tracking-tight">
              {business.name || 'Nome do Estabelecimento'}
            </h3>
            <p className="text-xs text-slate-400 truncate">
              {program.name || 'Cartão Fidelidade'}
            </p>
          </div>
        </div>

        {/* Status / Cycle Badge */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {isComplete ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
              <Gift className="w-3.5 h-3.5" />
              <span>Prêmio Pronto!</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{program.type === 'visitas' ? 'Por Visita' : 'Por Pontos'}</span>
            </span>
          )}

          {card && card.cycleCount > 1 && (
            <span className="text-[10px] text-slate-400 font-medium">
              {card.cycleCount}º ciclo de fidelidade
            </span>
          )}
        </div>
      </div>

      {/* Customer Name info */}
      <div className="relative z-10 mt-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            Titular do Cartão
          </span>
          <p className="font-semibold text-slate-100 text-sm sm:text-base">
            {customer?.name || (previewMode ? 'Ex: João Silva' : 'Cliente Fidelidade')}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            Progresso
          </span>
          <p className="font-bold text-white text-base">
            <span className="text-amber-400">{points}</span> / {goal} {unitLabel}
          </p>
        </div>
      </div>

      {/* Stamp / Points Grid */}
      <div className="relative z-10 my-5">
        <div className={`grid ${gridColsClass} gap-2.5 sm:gap-3`}>
          {stamps.map((stamp) => (
            <div
              key={stamp.number}
              className={`relative flex flex-col items-center justify-center rounded-xl p-2.5 sm:p-3 transition-all duration-300 border ${
                stamp.isCompleted
                  ? 'bg-gradient-to-b from-amber-500/20 to-amber-600/30 border-amber-400 text-amber-300 shadow-md scale-[1.02]'
                  : stamp.isNext
                  ? 'bg-slate-800/80 border-slate-600 text-slate-300 ring-2 ring-blue-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500'
              }`}
            >
              {stamp.isCompleted ? (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-inner">
                  {stamp.isLast ? (
                    <Award className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  ) : (
                    <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                  )}
                </div>
              ) : (
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-xs border ${
                    stamp.isNext
                      ? 'border-dashed border-blue-400 text-blue-300 bg-blue-500/10'
                      : 'border-dashed border-slate-700 text-slate-500 bg-slate-800/40'
                  }`}
                >
                  {stamp.isLast ? (
                    <Gift className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    stamp.number
                  )}
                </div>
              )}

              <span className="text-[10px] mt-1 font-medium text-slate-400">
                {stamp.isLast ? 'Prêmio' : `${stamp.number}º`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Message & Reward Section */}
      <div className="relative z-10 bg-slate-950/70 rounded-xl p-3.5 border border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 flex items-center gap-1.5 font-medium">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Prêmio:</span>
            <strong className="text-slate-100 font-semibold">{program.reward || '1 Produto Grátis'}</strong>
          </span>
        </div>

        {/* Status text */}
        <div className="text-xs pt-1 border-t border-slate-800/80">
          {isComplete ? (
            <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Meta atingida! Apresente este cartão para retirar seu prêmio.
            </p>
          ) : (
            <p className="text-slate-400">
              Faltam{' '}
              <strong className="text-amber-400 font-bold">
                {remaining} {remaining === 1 ? unitLabelSingular : unitLabel}
              </strong>{' '}
              para você conquistar seu prêmio!
            </p>
          )}
        </div>
      </div>

      {/* Description text */}
      {program.description && (
        <p className="relative z-10 text-[11px] text-slate-400 text-center mt-3 line-clamp-2">
          {program.description}
        </p>
      )}
    </div>
  );
};
