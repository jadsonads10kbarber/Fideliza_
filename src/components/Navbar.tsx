import React from 'react';
import {
  Award,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import { ActiveTab, Business, User } from '../types';
import { SegmentIcon } from './SegmentIcon';
import { SEGMENTS } from '../data/segments';

interface NavbarProps {
  user: User;
  business: Business;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewCustomer?: () => void;
  onOpenQuickStamp?: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  business,
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const isDemo = user.id === 'demo_user_01';

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand: Establishment Icon + Name + Category */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex items-center gap-3 cursor-pointer select-none min-w-0"
              onClick={() => setActiveTab('dashboard')}
              title={business.name}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                <SegmentIcon
                  segment={business.segment}
                  className="w-5 h-5 text-white"
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 tracking-tight truncate leading-tight">
                    {business.name}
                  </h1>
                  {isDemo && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 flex-shrink-0">
                      Demo
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 truncate leading-tight mt-0.5">
                  {SEGMENTS.find((s) => s.id === business.segment)?.label || business.segment}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Painel</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('customers')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'customers'
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clientes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('card_config')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'card_config'
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Cartão Fidelidade</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('redemptions')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'redemptions'
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Resgates</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
          </nav>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="truncate max-w-[120px]">{user.name}</span>
            </div>

            <div className="flex items-center gap-1.5 pl-2 lg:border-l border-slate-200 dark:border-slate-800">
              <div
                className="w-8 h-8 rounded-full bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center border border-blue-200 dark:border-slate-800 shadow-xs"
                title={`${user.name} (${business.name})`}
              >
                {user.name.slice(0, 2).toUpperCase()}
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Sair da conta"
                aria-label="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
