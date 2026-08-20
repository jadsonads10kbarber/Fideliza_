import React from 'react';
import {
  Award,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  prizeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  prizeCount = 0,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-3 pb-safe"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-all ${
            activeTab === 'dashboard'
              ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/40'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 font-medium">Painel</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('customers')}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-lg transition-all ${
            activeTab === 'customers'
              ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/40'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Users className={`w-5 h-5 ${activeTab === 'customers' ? 'stroke-[2.5]' : ''}`} />
            {prizeCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-medium">Clientes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('card_config')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-all ${
            activeTab === 'card_config'
              ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/40'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <CreditCard className={`w-5 h-5 ${activeTab === 'card_config' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 font-medium">Cartão</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('redemptions')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-all ${
            activeTab === 'redemptions'
              ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/40'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Award className={`w-5 h-5 ${activeTab === 'redemptions' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 font-medium">Resgates</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-all ${
            activeTab === 'settings'
              ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/40'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 font-medium">Ajustes</span>
        </button>
      </div>
    </nav>
  );
};
