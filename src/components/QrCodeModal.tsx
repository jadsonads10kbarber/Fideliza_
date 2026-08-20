import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  QrCode,
  Share2,
  X,
} from 'lucide-react';
import { Customer, LoyaltyCard } from '../types';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: LoyaltyCard;
  customer: Customer;
  businessName: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  card,
  customer,
  businessName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  // Compute public card URL
  const publicUrl = `${window.location.origin}/?cardId=${card.id}`;

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        publicUrl,
        {
          width: 240,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('Erro ao gerar QR Code:', error);
        }
      );
    }
  }, [isOpen, publicUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    const shareText = `Olá ${customer.name}! Acompanhe seu Cartão Fidelidade digital da ${businessName} aqui: ${publicUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cartão Fidelidade - ${businessName}`,
          text: shareText,
          url: publicUrl,
        });
        setShareFeedback('Compartilhado com sucesso!');
        setTimeout(() => setShareFeedback(null), 3000);
      } catch (err) {
        // Cancelled by user or not supported
      }
    } else {
      // Direct WhatsApp share url
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        shareText
      )}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleDownloadQr = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `qrcode-fidelidade-${customer.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div
      id="qrcode-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="qrcode-modal-content"
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

        <div className="text-center mb-4">
          <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-2">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">QR Code do Cartão</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cartão de <strong>{customer.name}</strong>
          </p>
        </div>

        {/* QR Code Canvas */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 mb-4">
          <canvas ref={canvasRef} className="rounded-lg shadow-xs" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
            Escaneie com a câmera do celular para abrir o cartão digital
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              id="copy-card-link-btn"
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 font-medium text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>

            <button
              id="download-qr-btn"
              type="button"
              onClick={handleDownloadQr}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 font-medium text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Baixar Imagem</span>
            </button>
          </div>

          <button
            id="share-card-btn"
            type="button"
            onClick={handleShare}
            className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar com o Cliente</span>
          </button>

          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 text-center text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1"
          >
            <span>Ver página pública do cartão</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
