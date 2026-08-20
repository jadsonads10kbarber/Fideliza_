import React from 'react';
import { Award, Calendar, CheckCircle2, Gift, Users } from 'lucide-react';
import { Redemption } from '../types';

interface RedemptionsViewProps {
  redemptions: Redemption[];
}

export const RedemptionsView: React.FC<RedemptionsViewProps> = ({
  redemptions,
}) => {
  return (
    <div className="space-y-5 pb-20 md:pb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Histórico de Resgates
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Acompanhe todos os prêmios entregues aos seus clientes fiéis.
        </p>
      </div>

      {redemptions.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <Gift className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">
            Nenhum resgate registrado ainda
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Quando um cliente atingir a meta de pontos e você confirmar a entrega do prêmio, o registro aparecerar aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {redemptions.map((red) => (
            <div
              key={red.id}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {red.customerName}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                    {red.reward}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(red.redeemedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3 h-3" />
                  Entregue
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
