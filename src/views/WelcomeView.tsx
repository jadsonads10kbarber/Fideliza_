import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  QrCode,
  Smartphone,
  Sparkles,
  Store,
  Users,
} from 'lucide-react';
import { SEGMENTS } from '../data/segments';
import { SegmentIcon } from '../components/SegmentIcon';

interface WelcomeViewProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onStartDemo: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onOpenRegister,
  onOpenLogin,
  onStartDemo,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-sm flex-shrink-0">
            <span className="text-xl tracking-tighter">F+</span>
          </div>
          <div>
            <h1 className="font-bold text-xl sm:text-2xl text-blue-900 dark:text-blue-100 tracking-tight leading-none">
              Fideliza<span className="text-blue-600 dark:text-blue-400">+</span>
            </h1>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
              Cartão Fidelidade Digital
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="welcome-login-top-btn"
            type="button"
            onClick={onOpenLogin}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            Entrar
          </button>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-12 text-center flex-1 flex flex-col justify-center items-center">
        {/* Slogan Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Seu cliente volta. Seu negócio cresce.</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-2xl leading-[1.15] mb-4">
          Cartão Fidelidade Digital para o seu negócio
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8 leading-relaxed">
          Crie cartões fidelidade digitais para seus clientes, incentive novas compras e acompanhe o retorno sem cartões de papel.
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            id="welcome-register-btn"
            type="button"
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-base shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <span>Criar meu negócio</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            id="welcome-demo-btn"
            type="button"
            onClick={onStartDemo}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-base shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Testar com Demo</span>
          </button>
        </div>

        <button
          id="welcome-login-bottom-btn"
          type="button"
          onClick={onOpenLogin}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium underline transition-colors"
        >
          Já possui um negócio cadastrado? Faça login aqui
        </button>

        {/* Segments Carousel / Grid */}
        <div className="w-full mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            Ideal para diversos segmentos comerciais
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {SEGMENTS.slice(0, 10).map((seg) => (
              <div
                key={seg.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs"
              >
                <SegmentIcon segment={seg.id} className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{seg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Mobile-First & PWA
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Funciona direto no celular, instalável na tela de início sem precisar de loja de aplicativos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              QR Code Exclusivo
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cada cliente recebe seu link e QR Code para acompanhar seus pontos em tempo real.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
              Fácil de Pontuar
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Lance pontos com 1 toque no balcão e resgate prêmios com segurança e histórico.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto px-4 py-6 border-t border-slate-200 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-500">
        <p>Fideliza+ &copy; {new Date().getFullYear()} — Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
