import React, { useState } from 'react';
import {
  Check,
  Database,
  Download,
  Phone,
  RefreshCw,
  Save,
  ShieldCheck,
  Sparkles,
  Store,
  User as UserIcon,
} from 'lucide-react';
import { Business, SegmentId, User } from '../types';
import { SEGMENTS } from '../data/segments';
import { SegmentIcon } from '../components/SegmentIcon';
import { storageService } from '../services/storageService';

interface SettingsViewProps {
  user: User;
  business: Business;
  onUpdateBusiness: (updates: Partial<Business>) => void;
  onUpdateUser: (updates: Partial<User>) => void;
  onResetDemo: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  business,
  onUpdateBusiness,
  onUpdateUser,
  onResetDemo,
}) => {
  const [businessName, setBusinessName] = useState(business.name);
  const [ownerName, setOwnerName] = useState(user.name);
  const [phone, setPhone] = useState(business.phone);
  const [segment, setSegment] = useState<SegmentId>(business.segment);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isDemo = user.id === 'demo_user_01';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    setPhone(val);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusiness({
      name: businessName.trim(),
      phone: phone.trim(),
      segment,
    });
    onUpdateUser({
      name: ownerName.trim(),
      phone: phone.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportData = () => {
    const data = {
      user,
      business,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fideliza-${business.name.toLowerCase().replace(/\s+/g, '-')}-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Configurações da Empresa
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Atualize as informações do seu negócio e gerencie o armazenamento local.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Informações da empresa salvas com sucesso!</span>
        </div>
      )}

      {/* Business Info Form */}
      <form onSubmit={handleSaveProfile} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Dados do Estabelecimento
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Nome do Estabelecimento *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Store className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Nome do Responsável *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            WhatsApp Oficial *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Segment selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Segmento
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {SEGMENTS.map((s) => {
              const isSelected = segment === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSegment(s.id)}
                  className={`p-2 rounded-md text-left text-xs font-medium flex items-center gap-2 border transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                >
                  <SegmentIcon
                    segment={s.id}
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                    }`}
                  />
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2">
          <button
            id="save-settings-btn"
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Informações</span>
          </button>
        </div>
      </form>

      {/* Architecture & Cloud Readiness Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Arquitetura & Preparação para Nuvem
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          O Fideliza+ está modularizado com entidades espelhadas no Firestore (coleções: <code>users</code>, <code>businesses</code>, <code>loyaltyPrograms</code>, <code>customers</code>, <code>loyaltyCards</code>, <code>redemptions</code>) pronto para conexão com Firebase Auth e Cloud Firestore.
        </p>

        <div className="pt-2 flex flex-wrap gap-2.5">
          <button
            id="export-backup-btn"
            type="button"
            onClick={handleExportData}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Dados (Backup JSON)</span>
          </button>

          {isDemo && (
            <button
              id="reset-demo-btn"
              type="button"
              onClick={onResetDemo}
              className="px-4 py-2 rounded-lg border border-amber-300 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restaurar Dados da Demonstração</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
