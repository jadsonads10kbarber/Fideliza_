import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X, Share, PlusSquare, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissedSession = sessionStorage.getItem('pwa_prompt_dismissed');
    if (dismissedSession === 'true') {
      setIsDismissed(true);
    }

    // Check if already in standalone / installed mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      setIsInstalled(true);
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Trigger native Chrome/Android install prompt
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosInstructions(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  // Do not render if installed, dismissed or not supported on this view
  if (isInstalled || isDismissed) return null;
  // If not iOS and no install prompt event available yet, do not show empty banner
  if (!deferredPrompt && !isIos) return null;

  return (
    <>
      <div
        id="pwa-install-banner"
        className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-sm transition-all animate-fadeIn"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-xs sm:text-sm leading-tight truncate">
              Instalar o app Fideliza+
            </p>
            <p className="text-[11px] text-blue-100 hidden xs:block truncate">
              Acesso rápido direto da tela de início do celular
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="pwa-install-btn"
            type="button"
            onClick={handleInstallClick}
            className="px-3 py-1.5 bg-white text-blue-700 font-bold rounded-lg text-xs hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Instalar</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1.5 text-white/80 hover:text-white rounded-md transition-colors"
            aria-label="Fechar aviso de instalação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Step-by-Step Installation Modal */}
      {showIosInstructions && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  F+
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Instalar no iPhone / iPad
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIosInstructions(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p>
                  Toque no botão <strong className="text-slate-900 dark:text-slate-100 font-semibold">Compartilhar</strong> (<Share className="w-3.5 h-3.5 inline text-blue-600" />) na barra inferior do Safari.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p>
                  Role para baixo e selecione <strong className="text-slate-900 dark:text-slate-100 font-semibold">Adicionar à Tela de Início</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-blue-600" />).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p>
                  Toque em <strong className="text-slate-900 dark:text-slate-100 font-semibold">Adicionar</strong> no canto superior direito.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosInstructions(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Entendi</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
