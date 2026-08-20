import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsInstalled(true);
    }

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
    if (!deferredPrompt) {
      // If iOS or unsupported browser, provide hint
      alert('Para instalar no seu celular, toque em Compartilhar e depois em "Adicionar à Tela de Início".');
      return;
    }
    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || isDismissed) return null;

  return (
    <div
      id="pwa-install-banner"
      className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2.5 shadow-xs flex items-center justify-between text-sm"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-bold text-xs sm:text-sm leading-tight">Instale o Fideliza+ no seu celular</p>
          <p className="text-[11px] text-blue-100">Acesso rápido direto da sua tela inicial</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          id="pwa-install-btn"
          type="button"
          onClick={handleInstallClick}
          className="px-3 py-1.5 bg-white text-blue-700 font-bold rounded-lg text-xs hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Instalar</span>
        </button>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 text-white/80 hover:text-white rounded-md transition-colors"
          aria-label="Fechar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
