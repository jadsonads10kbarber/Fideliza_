import {
  Business,
  Customer,
  LoyaltyCard,
  LoyaltyProgram,
  PointTransaction,
  Redemption,
  SegmentId,
  User,
} from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'fideliza_current_user',
  BUSINESSES: 'fideliza_businesses',
  USERS: 'fideliza_users',
  PROGRAMS: 'fideliza_programs',
  CUSTOMERS: 'fideliza_customers',
  CARDS: 'fideliza_cards',
  REDEMPTIONS: 'fideliza_redemptions',
  TRANSACTIONS: 'fideliza_transactions',
  THEME: 'fideliza_theme',
};

// Initial Demo Seed Data
const DEMO_BUSINESS_ID = 'demo_business_01';
const DEMO_USER_ID = 'demo_user_01';
const DEMO_PROGRAM_ID = 'demo_prog_01';

const INITIAL_DEMO_USER: User = {
  id: DEMO_USER_ID,
  name: 'Carlos Oliveira',
  email: 'carlos@negociodemo.com.br',
  phone: '(11) 98765-4321',
  businessId: DEMO_BUSINESS_ID,
  createdAt: new Date().toISOString(),
};

const INITIAL_DEMO_BUSINESS: Business = {
  id: DEMO_BUSINESS_ID,
  ownerId: DEMO_USER_ID,
  name: 'Café & Delícias Demo',
  segment: 'cafeteria',
  phone: '(11) 98765-4321',
  colorTheme: '#78350f',
  createdAt: new Date().toISOString(),
};

const INITIAL_DEMO_PROGRAM: LoyaltyProgram = {
  id: DEMO_PROGRAM_ID,
  businessId: DEMO_BUSINESS_ID,
  name: 'Cartão Fidelidade Café & Delícias',
  type: 'pontos',
  goal: 10,
  reward: '1 Café Especial + 1 Fatia de Torta Grátis',
  description: 'A cada café ou combo consumido você acumula 1 ponto no seu cartão digital.',
  active: true,
  createdAt: new Date().toISOString(),
};

const INITIAL_DEMO_CUSTOMERS: Customer[] = [
  {
    id: 'cust_01',
    businessId: DEMO_BUSINESS_ID,
    name: 'João Silva',
    phone: '(11) 99123-4567',
    email: 'joao.silva@email.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
  {
    id: 'cust_02',
    businessId: DEMO_BUSINESS_ID,
    name: 'Maria Santos',
    phone: '(11) 98888-1122',
    email: 'maria.santos@email.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: 'cust_03',
    businessId: DEMO_BUSINESS_ID,
    name: 'Pedro Henrique',
    phone: '(11) 97777-3344',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'cust_04',
    businessId: DEMO_BUSINESS_ID,
    name: 'Ana Paula Rocha',
    phone: '(11) 96666-5566',
    email: 'ana.rocha@email.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'cust_05',
    businessId: DEMO_BUSINESS_ID,
    name: 'Lucas Ferreira',
    phone: '(11) 95555-7788',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
];

const INITIAL_DEMO_CARDS: LoyaltyCard[] = [
  {
    id: 'card_cust_01',
    businessId: DEMO_BUSINESS_ID,
    customerId: 'cust_01',
    programId: DEMO_PROGRAM_ID,
    points: 4,
    status: 'em_andamento',
    cycleCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'card_cust_02',
    businessId: DEMO_BUSINESS_ID,
    customerId: 'cust_02',
    programId: DEMO_PROGRAM_ID,
    points: 10,
    status: 'premio_disponivel',
    cycleCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'card_cust_03',
    businessId: DEMO_BUSINESS_ID,
    customerId: 'cust_03',
    programId: DEMO_PROGRAM_ID,
    points: 8,
    status: 'em_andamento',
    cycleCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: 'card_cust_04',
    businessId: DEMO_BUSINESS_ID,
    customerId: 'cust_04',
    programId: DEMO_PROGRAM_ID,
    points: 10,
    status: 'premio_disponivel',
    cycleCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
  },
  {
    id: 'card_cust_05',
    businessId: DEMO_BUSINESS_ID,
    customerId: 'cust_05',
    programId: DEMO_PROGRAM_ID,
    points: 1,
    status: 'em_andamento',
    cycleCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

const INITIAL_DEMO_REDEMPTIONS: Redemption[] = [
  {
    id: 'red_01',
    cardId: 'card_cust_04',
    customerId: 'cust_04',
    customerName: 'Ana Paula Rocha',
    businessId: DEMO_BUSINESS_ID,
    reward: '1 Café Especial + 1 Fatia de Torta Grátis',
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Erro ao salvar ${key} no localStorage:`, err);
  }
}

export const storageService = {
  // Ensure default demo data is initialized
  init() {
    const businesses = loadFromStorage<Business[]>(STORAGE_KEYS.BUSINESSES, []);
    if (businesses.length === 0) {
      this.resetToDemoData();
    }
  },

  resetToDemoData() {
    saveToStorage(STORAGE_KEYS.USERS, [INITIAL_DEMO_USER]);
    saveToStorage(STORAGE_KEYS.BUSINESSES, [INITIAL_DEMO_BUSINESS]);
    saveToStorage(STORAGE_KEYS.PROGRAMS, [INITIAL_DEMO_PROGRAM]);
    saveToStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_DEMO_CUSTOMERS);
    saveToStorage(STORAGE_KEYS.CARDS, INITIAL_DEMO_CARDS);
    saveToStorage(STORAGE_KEYS.REDEMPTIONS, INITIAL_DEMO_REDEMPTIONS);
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, []);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, INITIAL_DEMO_USER);
  },

  // Auth Operations
  getCurrentUser(): User | null {
    return loadFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser(user: User | null) {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
  },

  loginDemo(): { user: User; business: Business; program: LoyaltyProgram } {
    let users = loadFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    let businesses = loadFromStorage<Business[]>(STORAGE_KEYS.BUSINESSES, []);
    let programs = loadFromStorage<LoyaltyProgram[]>(STORAGE_KEYS.PROGRAMS, []);

    let demoUser = users.find((u) => u.id === DEMO_USER_ID);
    if (!demoUser) {
      this.resetToDemoData();
      users = loadFromStorage<User[]>(STORAGE_KEYS.USERS, []);
      businesses = loadFromStorage<Business[]>(STORAGE_KEYS.BUSINESSES, []);
      programs = loadFromStorage<LoyaltyProgram[]>(STORAGE_KEYS.PROGRAMS, []);
      demoUser = users.find((u) => u.id === DEMO_USER_ID) || INITIAL_DEMO_USER;
    }

    const business =
      businesses.find((b) => b.id === demoUser!.businessId) || INITIAL_DEMO_BUSINESS;
    const program =
      programs.find((p) => p.businessId === business.id) || INITIAL_DEMO_PROGRAM;

    this.setCurrentUser(demoUser);
    return { user: demoUser, business, program };
  },

  registerBusiness(data: {
    businessName: string;
    ownerName: string;
    phone: string;
    email: string;
    segment: SegmentId;
  }): { user: User; business: Business; program: LoyaltyProgram } {
    const businessId = 'biz_' + Date.now();
    const userId = 'user_' + Date.now();
    const programId = 'prog_' + Date.now();

    const newUser: User = {
      id: userId,
      name: data.ownerName,
      email: data.email,
      phone: data.phone,
      businessId: businessId,
      createdAt: new Date().toISOString(),
    };

    const newBusiness: Business = {
      id: businessId,
      ownerId: userId,
      name: data.businessName,
      segment: data.segment,
      phone: data.phone,
      colorTheme: '#2563eb',
      createdAt: new Date().toISOString(),
    };

    const newProgram: LoyaltyProgram = {
      id: programId,
      businessId: businessId,
      name: `Cartão Fidelidade ${data.businessName}`,
      type: 'pontos',
      goal: 10,
      reward: 'Ganhe 1 produto ou serviço grátis',
      description: 'A cada compra você acumula 1 ponto para resgatar seu prêmio.',
      active: true,
      createdAt: new Date().toISOString(),
    };

    const users = loadFromStorage<User[]>(STORAGE_KEYS.USERS, []);
    const businesses = loadFromStorage<Business[]>(STORAGE_KEYS.BUSINESSES, []);
    const programs = loadFromStorage<LoyaltyProgram[]>(STORAGE_KEYS.PROGRAMS, []);

    users.push(newUser);
    businesses.push(newBusiness);
    programs.push(newProgram);

    saveToStorage(STORAGE_KEYS.USERS, users);
    saveToStorage(STORAGE_KEYS.BUSINESSES, businesses);
    saveToStorage(STORAGE_KEYS.PROGRAMS, programs);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, newUser);

    return { user: newUser, business: newBusiness, program: newProgram };
  },

  // Business queries
  getBusiness(businessId: string): Business | null {
    const businesses = loadFromStorage<Business[]>(STORAGE_KEYS.BUSINESSES, []);
    return businesses.find((b) => b.id === businessId) || null;
  },

  updateBusiness(businessId: string, updates: Partial<Business>): Business | null {
    const businesses = loadFromStorage<Business[]>(STORAGE_KEYS.BUSINESSES, []);
    const index = businesses.findIndex((b) => b.id === businessId);
    if (index === -1) return null;

    businesses[index] = { ...businesses[index], ...updates };
    saveToStorage(STORAGE_KEYS.BUSINESSES, businesses);
    return businesses[index];
  },

  // Program queries
  getProgram(businessId: string): LoyaltyProgram | null {
    const programs = loadFromStorage<LoyaltyProgram[]>(STORAGE_KEYS.PROGRAMS, []);
    return programs.find((p) => p.businessId === businessId) || null;
  },

  updateProgram(programId: string, updates: Partial<LoyaltyProgram>): LoyaltyProgram | null {
    const programs = loadFromStorage<LoyaltyProgram[]>(STORAGE_KEYS.PROGRAMS, []);
    const index = programs.findIndex((p) => p.id === programId);
    if (index === -1) return null;

    programs[index] = { ...programs[index], ...updates };
    saveToStorage(STORAGE_KEYS.PROGRAMS, programs);
    return programs[index];
  },

  // Customers & Cards
  getCustomers(businessId: string): { customer: Customer; card: LoyaltyCard }[] {
    const customers = loadFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []).filter(
      (c) => c.businessId === businessId
    );
    const cards = loadFromStorage<LoyaltyCard[]>(STORAGE_KEYS.CARDS, []).filter(
      (c) => c.businessId === businessId
    );
    const program = this.getProgram(businessId);

    return customers.map((customer) => {
      let card = cards.find((c) => c.customerId === customer.id);
      if (!card) {
        card = {
          id: 'card_' + customer.id,
          businessId,
          customerId: customer.id,
          programId: program?.id || 'prog_default',
          points: 0,
          status: 'em_andamento',
          cycleCount: 1,
          createdAt: customer.createdAt,
          updatedAt: customer.createdAt,
        };
      }
      return { customer, card };
    });
  },

  createCustomer(
    businessId: string,
    data: { name: string; phone: string; email?: string }
  ): { customer: Customer; card: LoyaltyCard } {
    const program = this.getProgram(businessId);
    const customerId = 'cust_' + Date.now();
    const cardId = 'card_' + customerId;

    const newCustomer: Customer = {
      id: customerId,
      businessId,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    const newCard: LoyaltyCard = {
      id: cardId,
      businessId,
      customerId,
      programId: program?.id || 'prog_default',
      points: 0,
      status: 'em_andamento',
      cycleCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const customers = loadFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []);
    const cards = loadFromStorage<LoyaltyCard[]>(STORAGE_KEYS.CARDS, []);

    customers.unshift(newCustomer);
    cards.unshift(newCard);

    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
    saveToStorage(STORAGE_KEYS.CARDS, cards);

    return { customer: newCustomer, card: newCard };
  },

  deleteCustomer(customerId: string, businessId: string): void {
    const customers = loadFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []).filter(
      (c) => c.id !== customerId || c.businessId !== businessId
    );
    const cards = loadFromStorage<LoyaltyCard[]>(STORAGE_KEYS.CARDS, []).filter(
      (c) => c.customerId !== customerId || c.businessId !== businessId
    );
    saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);
    saveToStorage(STORAGE_KEYS.CARDS, cards);
  },

  // Point Operations
  addPoint(cardId: string): { card: LoyaltyCard; reachedGoal: boolean } | null {
    const cards = loadFromStorage<LoyaltyCard[]>(STORAGE_KEYS.CARDS, []);
    const index = cards.findIndex((c) => c.id === cardId);
    if (index === -1) return null;

    const card = cards[index];
    const program = this.getProgram(card.businessId);
    const goal = program?.goal || 10;

    const newPoints = Math.min(card.points + 1, goal);
    const reachedGoal = newPoints >= goal;
    const status = reachedGoal ? 'premio_disponivel' : 'em_andamento';

    cards[index] = {
      ...card,
      points: newPoints,
      status,
      updatedAt: new Date().toISOString(),
    };

    saveToStorage(STORAGE_KEYS.CARDS, cards);

    // Record Transaction
    this.recordTransaction({
      cardId,
      customerId: card.customerId,
      businessId: card.businessId,
      amount: 1,
      type: 'adicao',
    });

    return { card: cards[index], reachedGoal };
  },

  removePoint(cardId: string): LoyaltyCard | null {
    const cards = loadFromStorage<LoyaltyCard[]>(STORAGE_KEYS.CARDS, []);
    const index = cards.findIndex((c) => c.id === cardId);
    if (index === -1) return null;

    const card = cards[index];
    const program = this.getProgram(card.businessId);
    const goal = program?.goal || 10;

    const newPoints = Math.max(card.points - 1, 0);
    const status = newPoints >= goal ? 'premio_disponivel' : 'em_andamento';

    cards[index] = {
      ...card,
      points: newPoints,
      status,
      updatedAt: new Date().toISOString(),
    };

    saveToStorage(STORAGE_KEYS.CARDS, cards);

    // Record Transaction
    this.recordTransaction({
      cardId,
      customerId: card.customerId,
      businessId: card.businessId,
      amount: -1,
      type: 'remocao',
    });

    return cards[index];
  },

  redeemReward(cardId: string): { card: LoyaltyCard; redemption: Redemption } | null {
    const cards = loadFromStorage<LoyaltyCard[]>(STORAGE_KEYS.CARDS, []);
    const index = cards.findIndex((c) => c.id === cardId);
    if (index === -1) return null;

    const card = cards[index];
    const program = this.getProgram(card.businessId);
    const customers = loadFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []);
    const customer = customers.find((c) => c.id === card.customerId);

    const redemption: Redemption = {
      id: 'red_' + Date.now(),
      cardId: card.id,
      customerId: card.customerId,
      customerName: customer?.name || 'Cliente',
      businessId: card.businessId,
      reward: program?.reward || 'Prêmio Fidelidade',
      redeemedAt: new Date().toISOString(),
    };

    const redemptions = loadFromStorage<Redemption[]>(STORAGE_KEYS.REDEMPTIONS, []);
    redemptions.unshift(redemption);
    saveToStorage(STORAGE_KEYS.REDEMPTIONS, redemptions);

    // Reset card points for a new cycle
    cards[index] = {
      ...card,
      points: 0,
      status: 'em_andamento',
      cycleCount: (card.cycleCount || 1) + 1,
      updatedAt: new Date().toISOString(),
    };

    saveToStorage(STORAGE_KEYS.CARDS, cards);

    // Record Transaction
    this.recordTransaction({
      cardId,
      customerId: card.customerId,
      businessId: card.businessId,
      amount: 0,
      type: 'resgate',
      note: `Prêmio resgatado: ${redemption.reward}`,
    });

    return { card: cards[index], redemption };
  },

  recordTransaction(tx: Omit<PointTransaction, 'id' | 'createdAt'>) {
    const transactions = loadFromStorage<PointTransaction[]>(STORAGE_KEYS.TRANSACTIONS, []);
    transactions.unshift({
      ...tx,
      id: 'tx_' + Date.now(),
      createdAt: new Date().toISOString(),
    });
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  },

  getRedemptions(businessId: string): Redemption[] {
    const redemptions = loadFromStorage<Redemption[]>(STORAGE_KEYS.REDEMPTIONS, []);
    return redemptions.filter((r) => r.businessId === businessId);
  },

  getTransactions(cardId: string): PointTransaction[] {
    const transactions = loadFromStorage<PointTransaction[]>(STORAGE_KEYS.TRANSACTIONS, []);
    return transactions.filter((t) => t.cardId === cardId);
  },

  // Public Card Lookup for `/cartao/:cardId`
  getPublicCardData(cardId: string): {
    card: LoyaltyCard;
    customer: Customer;
    business: Business;
    program: LoyaltyProgram;
  } | null {
    const cards = loadFromStorage<LoyaltyCard[]>(STORAGE_KEYS.CARDS, []);
    const card = cards.find((c) => c.id === cardId);
    if (!card) return null;

    const customers = loadFromStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, []);
    const customer = customers.find((c) => c.id === card.customerId);
    if (!customer) return null;

    const business = this.getBusiness(card.businessId);
    if (!business) return null;

    const program = this.getProgram(card.businessId);
    if (!program) return null;

    return { card, customer, business, program };
  },

  // Theme support
  getTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  },

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
};
