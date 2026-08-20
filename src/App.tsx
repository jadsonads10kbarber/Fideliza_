import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ActiveTab,
  Business,
  Customer,
  LoyaltyCard,
  LoyaltyProgram,
  Redemption,
  SegmentId,
  User,
} from './types';
import { storageService } from './services/storageService';
import { WelcomeView } from './views/WelcomeView';
import { RegisterBusinessModal } from './views/RegisterBusinessModal';
import { LoginModal } from './views/LoginModal';
import { DashboardView } from './views/DashboardView';
import { CustomersView } from './views/CustomersView';
import { CardSettingsView } from './views/CardSettingsView';
import { RedemptionsView } from './views/RedemptionsView';
import { SettingsView } from './views/SettingsView';
import { PublicCardView } from './views/PublicCardView';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { NewCustomerModal } from './components/NewCustomerModal';
import { CustomerDetailModal } from './components/CustomerDetailModal';
import { QuickStampModal } from './components/QuickStampModal';
import { QrCodeModal } from './components/QrCodeModal';
import { RedeemConfirmModal } from './components/RedeemConfirmModal';
import { InstallPwaPrompt } from './components/InstallPwaPrompt';

export default function App() {
  // Authentication & Context
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [program, setProgram] = useState<LoyaltyProgram | null>(null);

  // Data
  const [customersWithCards, setCustomersWithCards] = useState<
    { customer: Customer; card: LoyaltyCard }[]
  >([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);
  const [isQuickStampOpen, setIsQuickStampOpen] = useState(false);

  // Active item modals
  const [detailCustomer, setDetailCustomer] = useState<{
    customer: Customer;
    card: LoyaltyCard;
  } | null>(null);
  const [qrModalData, setQrModalData] = useState<{
    customer: Customer;
    card: LoyaltyCard;
  } | null>(null);
  const [redeemModalData, setRedeemModalData] = useState<{
    customer: Customer;
    card: LoyaltyCard;
  } | null>(null);

  // Public View handling (?cardId=xxx or #/cartao/xxx)
  const [publicCardId, setPublicCardId] = useState<string | null>(null);

  // Initialize storage & theme
  useEffect(() => {
    storageService.init();
    const currentTheme = storageService.getTheme();
    storageService.setTheme(currentTheme);

    // Detect public card in URL parameters (?cardId=xxx)
    const urlParams = new URLSearchParams(window.location.search);
    const cardIdParam = urlParams.get('cardId');
    if (cardIdParam) {
      setPublicCardId(cardIdParam);
      return;
    }

    // Check direct pathname /cartao/:id
    const pathname = window.location.pathname;
    if (pathname.startsWith('/cartao/')) {
      const id = pathname.replace('/cartao/', '').split('/')[0]?.trim();
      if (id) {
        setPublicCardId(id);
        return;
      }
    }

    // Check hash route #/cartao/:id
    const hash = window.location.hash;
    if (hash.startsWith('#/cartao/')) {
      const id = hash.replace('#/cartao/', '').split('?')[0]?.trim();
      if (id) {
        setPublicCardId(id);
        return;
      }
    }

    // Load active session if any
    const user = storageService.getCurrentUser();
    if (user) {
      loadUserData(user);
    }
  }, []);

  const loadUserData = (user: User) => {
    setCurrentUser(user);
    const biz = storageService.getBusiness(user.businessId);
    const prog = storageService.getProgram(user.businessId);
    const custs = storageService.getCustomers(user.businessId);
    const reds = storageService.getRedemptions(user.businessId);

    setBusiness(biz);
    setProgram(prog);
    setCustomersWithCards(custs);
    setRedemptions(reds);
  };

  const refreshData = () => {
    if (!currentUser || !business) return;
    const custs = storageService.getCustomers(business.id);
    const reds = storageService.getRedemptions(business.id);
    const prog = storageService.getProgram(business.id);
    const biz = storageService.getBusiness(business.id);

    setCustomersWithCards(custs);
    setRedemptions(reds);
    setProgram(prog);
    setBusiness(biz);

    // Also sync currently opened detail customer
    if (detailCustomer) {
      const updated = custs.find((c) => c.customer.id === detailCustomer.customer.id);
      if (updated) {
        setDetailCustomer(updated);
      }
    }
  };

  // Auth actions
  const handleStartDemo = () => {
    const { user, business, program } = storageService.loginDemo();
    setCurrentUser(user);
    setBusiness(business);
    setProgram(program);
    loadUserData(user);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setActiveTab('dashboard');
  };

  const handleRegister = (data: {
    businessName: string;
    ownerName: string;
    phone: string;
    email: string;
    segment: SegmentId;
    programName: string;
    programType: 'pontos' | 'visitas';
    goal: number;
    reward: string;
    description: string;
  }) => {
    const { user, business, program } = storageService.registerBusiness({
      businessName: data.businessName,
      ownerName: data.ownerName,
      phone: data.phone,
      email: data.email,
      segment: data.segment,
    });

    // Update program with custom settings from step 2
    storageService.updateProgram(program.id, {
      name: data.programName,
      type: data.programType,
      goal: data.goal,
      reward: data.reward,
      description: data.description,
    });

    loadUserData(user);
    setIsRegisterOpen(false);
    setActiveTab('dashboard');
  };

  const handleLogin = (emailOrPhone: string) => {
    // For MVP local storage, if matches demo or creates/loads user
    const users = JSON.parse(localStorage.getItem('fideliza_users') || '[]');
    const user = users.find(
      (u: User) =>
        u.email.toLowerCase() === emailOrPhone.toLowerCase() ||
        u.phone.includes(emailOrPhone)
    );

    if (user) {
      storageService.setCurrentUser(user);
      loadUserData(user);
      setIsLoginOpen(false);
    } else {
      // Fallback: log in to demo
      handleStartDemo();
    }
  };

  const handleLogout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
    setBusiness(null);
    setProgram(null);
    setCustomersWithCards([]);
    setActiveTab('dashboard');
  };

  // Customer & Point Actions
  const handleCreateCustomer = (data: { name: string; phone: string; email?: string }) => {
    if (!business) return;
    const { customer, card } = storageService.createCustomer(business.id, data);
    refreshData();
    // Open detail modal for the new customer immediately
    setDetailCustomer({ customer, card });
  };

  const handleAddPoint = (cardId: string) => {
    const res = storageService.addPoint(cardId);
    if (!res) return;

    refreshData();

    if (res.reachedGoal) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignored
      }
    }
  };

  const handleRemovePoint = (cardId: string) => {
    storageService.removePoint(cardId);
    refreshData();
  };

  const handleConfirmRedeem = () => {
    if (!redeemModalData) return;
    storageService.redeemReward(redeemModalData.card.id);
    setRedeemModalData(null);
    refreshData();
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (!business) return;
    storageService.deleteCustomer(customerId, business.id);
    setDetailCustomer(null);
    refreshData();
  };

  // Updates
  const handleUpdateBusiness = (updates: Partial<Business>) => {
    if (!business) return;
    const updated = storageService.updateBusiness(business.id, updates);
    if (updated) setBusiness(updated);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    if (!currentUser) return;
    const users = JSON.parse(localStorage.getItem('fideliza_users') || '[]');
    const idx = users.findIndex((u: User) => u.id === currentUser.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('fideliza_users', JSON.stringify(users));
      setCurrentUser(users[idx]);
      storageService.setCurrentUser(users[idx]);
    }
  };

  const handleUpdateProgram = (updates: Partial<LoyaltyProgram>) => {
    if (!program) return;
    const updated = storageService.updateProgram(program.id, updates);
    if (updated) setProgram(updated);
  };

  const handleResetDemo = () => {
    storageService.resetToDemoData();
    const user = storageService.getCurrentUser();
    if (user) loadUserData(user);
    alert('Dados de demonstração restaurados!');
  };

  // ----------------------------------------------------
  // PUBLIC CARD VIEW: If URL query ?cardId=xxx is present
  // ----------------------------------------------------
  if (publicCardId) {
    const publicData = storageService.getPublicCardData(publicCardId);

    if (!publicData) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
              F+
            </div>
            <h2 className="text-xl font-bold">Cartão não encontrado</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              O link informado não corresponde a nenhum cartão ativo ou os dados foram redefinidos.
            </p>
            <button
              type="button"
              onClick={() => {
                setPublicCardId(null);
                window.history.replaceState({}, '', '/');
              }}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Ir para a Página Inicial
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <InstallPwaPrompt />
        <PublicCardView
          card={publicData.card}
          customer={publicData.customer}
          business={publicData.business}
          program={publicData.program}
          onBackToApp={
            currentUser
              ? () => {
                  setPublicCardId(null);
                  window.history.replaceState({}, '', '/');
                }
              : undefined
          }
        />
      </>
    );
  }

  // ----------------------------------------------------
  // WELCOME / LANDING: If user is not authenticated
  // ----------------------------------------------------
  if (!currentUser || !business || !program) {
    return (
      <>
        <InstallPwaPrompt />
        <WelcomeView
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onStartDemo={handleStartDemo}
        />

        <RegisterBusinessModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSubmit={handleRegister}
        />

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
          onStartDemo={handleStartDemo}
        />
      </>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED MERCHANT DASHBOARD & TABS
  // ----------------------------------------------------
  const prizeCustomersCount = customersWithCards.filter(
    (c) => c.card.points >= program.goal
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <InstallPwaPrompt />

      {/* Top Navbar */}
      <Navbar
        user={currentUser}
        business={business}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewCustomer={() => setIsNewCustomerOpen(true)}
        onOpenQuickStamp={() => setIsQuickStampOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            user={currentUser}
            business={business}
            program={program}
            customersWithCards={customersWithCards}
            onOpenNewCustomer={() => setIsNewCustomerOpen(true)}
            onOpenQuickStamp={() => setIsQuickStampOpen(true)}
            onOpenCustomerDetail={(customer, card) =>
              setDetailCustomer({ customer, card })
            }
            onOpenRedeem={(customer, card) =>
              setRedeemModalData({ customer, card })
            }
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'customers' && (
          <CustomersView
            business={business}
            program={program}
            customersWithCards={customersWithCards}
            onOpenNewCustomer={() => setIsNewCustomerOpen(true)}
            onOpenCustomerDetail={(customer, card) =>
              setDetailCustomer({ customer, card })
            }
            onAddPoint={handleAddPoint}
            onOpenQr={(customer, card) => setQrModalData({ customer, card })}
            onOpenRedeem={(customer, card) =>
              setRedeemModalData({ customer, card })
            }
          />
        )}

        {activeTab === 'card_config' && (
          <CardSettingsView
            business={business}
            program={program}
            onUpdateProgram={handleUpdateProgram}
            onUpdateBusiness={handleUpdateBusiness}
          />
        )}

        {activeTab === 'redemptions' && (
          <RedemptionsView redemptions={redemptions} />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            user={currentUser}
            business={business}
            onUpdateBusiness={handleUpdateBusiness}
            onUpdateUser={handleUpdateUser}
            onResetDemo={handleResetDemo}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        prizeCount={prizeCustomersCount}
      />

      {/* Global Modals */}
      <NewCustomerModal
        isOpen={isNewCustomerOpen}
        onClose={() => setIsNewCustomerOpen(false)}
        onSubmit={handleCreateCustomer}
      />

      <QuickStampModal
        isOpen={isQuickStampOpen}
        onClose={() => setIsQuickStampOpen(false)}
        customersWithCards={customersWithCards}
        program={program}
        onAddPoint={handleAddPoint}
        onSelectCustomer={(customer, card) => {
          setIsQuickStampOpen(false);
          setDetailCustomer({ customer, card });
        }}
      />

      {detailCustomer && (
        <CustomerDetailModal
          isOpen={Boolean(detailCustomer)}
          onClose={() => setDetailCustomer(null)}
          customer={detailCustomer.customer}
          card={detailCustomer.card}
          business={business}
          program={program}
          onAddPoint={handleAddPoint}
          onRemovePoint={handleRemovePoint}
          onOpenRedeem={(cust, card) => {
            setDetailCustomer(null);
            setRedeemModalData({ customer: cust, card });
          }}
          onOpenQr={(cust, card) => setQrModalData({ customer: cust, card })}
          onDeleteCustomer={handleDeleteCustomer}
        />
      )}

      {qrModalData && (
        <QrCodeModal
          isOpen={Boolean(qrModalData)}
          onClose={() => setQrModalData(null)}
          card={qrModalData.card}
          customer={qrModalData.customer}
          businessName={business.name}
        />
      )}

      {redeemModalData && (
        <RedeemConfirmModal
          isOpen={Boolean(redeemModalData)}
          onClose={() => setRedeemModalData(null)}
          onConfirm={handleConfirmRedeem}
          customer={redeemModalData.customer}
          card={redeemModalData.card}
          program={program}
        />
      )}
    </div>
  );
}
