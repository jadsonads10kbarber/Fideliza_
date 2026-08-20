import React, { useState } from 'react';
import {
  Award,
  Check,
  CreditCard,
  Gift,
  Palette,
  RotateCcw,
  Save,
  Sparkles,
} from 'lucide-react';
import { Business, LoyaltyProgram } from '../types';
import { LoyaltyCardGraphic } from '../components/LoyaltyCardGraphic';

interface CardSettingsViewProps {
  business: Business;
  program: LoyaltyProgram;
  onUpdateProgram: (updates: Partial<LoyaltyProgram>) => void;
  onUpdateBusiness: (updates: Partial<Business>) => void;
}

const COLOR_OPTIONS = [
  { label: 'Azul Real', value: '#2563eb' },
  { label: 'Índigo Moderno', value: '#4f46e5' },
  { label: 'Esmeralda', value: '#059669' },
  { label: 'Rosa Pink', value: '#db2777' },
  { label: 'Roxo Púrpura', value: '#9333ea' },
  { label: 'Laranja Quente', value: '#ea580c' },
  { label: 'Café & Âmbar', value: '#78350f' },
  { label: 'Vermelho Intenso', value: '#dc2626' },
  { label: 'Grafite Escuro', value: '#334155' },
];

export const CardSettingsView: React.FC<CardSettingsViewProps> = ({
  business,
  program,
  onUpdateProgram,
  onUpdateBusiness,
}) => {
  const [name, setName] = useState(program.name);
  const [type, setType] = useState<'pontos' | 'visitas'>(program.type);
  const [goal, setGoal] = useState<number>(program.goal);
  const [reward, setReward] = useState(program.reward);
  const [description, setDescription] = useState(program.description);
  const [colorTheme, setColorTheme] = useState(business.colorTheme || '#2563eb');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProgram({
      name: name.trim(),
      type,
      goal,
      reward: reward.trim(),
      description: description.trim(),
    });
    onUpdateBusiness({
      colorTheme,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const previewProgram: LoyaltyProgram = {
    ...program,
    name,
    type,
    goal,
    reward,
    description,
  };

  const previewBusiness: Business = {
    ...business,
    colorTheme,
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Configuração do Cartão Fidelidade
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Personalize as regras, metas, prêmios e o visual do cartão exibido aos clientes.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Configurações do cartão salvas com sucesso!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Nome do Cartão *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  id="card-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Cartão Fidelidade VIP"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Tipo de Fidelidade *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('pontos')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                      type === 'pontos'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Por Pontos
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('visitas')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                      type === 'visitas'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Por Visitas
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Meta para Conquistar Prêmio *
                </label>
                <select
                  id="card-goal-select"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-full py-2.5 px-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[5, 6, 8, 10, 12, 15, 20].map((n) => (
                    <option key={n} value={n}>
                      {n} {type === 'visitas' ? 'visitas' : 'pontos'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Prêmio / Recompensa Final *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Gift className="w-4 h-4" />
                </div>
                <input
                  id="card-reward-input"
                  type="text"
                  required
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="Ex: 1 Corte grátis, 1 Sobremesa especial..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Texto Explicativo
              </label>
              <textarea
                id="card-description-input"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: A cada compra ou atendimento acima de R$ 30, ganhe 1 selo."
                className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Color Scheme Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Cor de Destaque do Cartão
              </label>
              <div className="flex flex-wrap gap-2.5">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColorTheme(c.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      colorTheme === c.value
                        ? 'border-white ring-2 ring-blue-500 scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div className="pt-3">
              <button
                id="save-card-btn"
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Configurações do Cartão</span>
              </button>
            </div>
          </div>
        </form>

        {/* Right Live Preview */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pré-visualização em Tempo Real
            </span>
            <span className="text-[11px] text-slate-400">
              Como o cliente verá
            </span>
          </div>

          <LoyaltyCardGraphic
            business={previewBusiness}
            program={previewProgram}
            previewMode={true}
          />
        </div>
      </div>
    </div>
  );
};
