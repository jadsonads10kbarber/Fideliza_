import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CreditCard,
  Gift,
  Mail,
  Lock,
  Phone,
  Sparkles,
  Store,
  User as UserIcon,
  X,
} from 'lucide-react';
import { SEGMENTS } from '../data/segments';
import { SegmentId } from '../types';
import { SegmentIcon } from '../components/SegmentIcon';

interface RegisterBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
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
  }) => void;
}

export const RegisterBusinessModal: React.FC<RegisterBusinessModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Business and Account
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [segment, setSegment] = useState<SegmentId>('salao');

  // Step 2: Loyalty Card Setup
  const [programName, setProgramName] = useState('Cartão Fidelidade');
  const [programType, setProgramType] = useState<'pontos' | 'visitas'>('pontos');
  const [goal, setGoal] = useState<number>(10);
  const [reward, setReward] = useState('Ganhe 1 produto grátis');
  const [description, setDescription] = useState('A cada compra você ganha 1 ponto.');

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

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

  const handleSegmentSelect = (segId: SegmentId) => {
    setSegment(segId);
    const segInfo = SEGMENTS.find((s) => s.id === segId);
    if (segInfo) {
      setReward(segInfo.defaultReward);
      setDescription(segInfo.defaultDescription);
      if (businessName) {
        setProgramName(`Cartão Fidelidade ${businessName}`);
      }
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setError('Informe o nome do estabelecimento.');
      return;
    }
    if (!ownerName.trim()) {
      setError('Informe o nome do responsável.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Informe o WhatsApp do estabelecimento.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Informe um e-mail válido.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setError(null);
    if (!programName || programName === 'Cartão Fidelidade') {
      setProgramName(`Cartão Fidelidade ${businessName.trim()}`);
    }
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programName.trim()) {
      setError('Informe o nome do cartão.');
      return;
    }
    if (!reward.trim()) {
      setError('Informe o prêmio que o cliente ganhará.');
      return;
    }
    if (goal < 2 || goal > 30) {
      setError('A meta deve ser entre 2 e 30 pontos/visitas.');
      return;
    }

    onSubmit({
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      segment,
      programName: programName.trim(),
      programType,
      goal,
      reward: reward.trim(),
      description: description.trim(),
    });
  };

  return (
    <div
      id="register-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="register-modal-content"
        className="relative w-full max-w-lg my-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 1
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {step === 2 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <div className="h-0.5 w-8 bg-slate-200 dark:bg-slate-700" />
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            2
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-2">
            {step === 1 ? '1. Dados do Estabelecimento' : '2. Configurar Cartão'}
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-medium">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleStep1Submit} className="space-y-3.5">
            <div className="mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Cadastro do Estabelecimento
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Preencha os dados do seu negócio para criar a conta.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Nome do Estabelecimento *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Store className="w-4 h-4" />
                </div>
                <input
                  id="reg-business-name"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ex: Pizzaria Bella, Studio Bella Vista..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Nome do Responsável *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-owner-name"
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  WhatsApp *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  E-mail *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@empresa.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Senha de Acesso *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 dígitos"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Segment Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Segmento do Estabelecimento *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {SEGMENTS.map((s) => {
                  const isSelected = segment === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSegmentSelect(s.id)}
                      className={`p-2 rounded-lg text-left text-xs font-medium flex items-center gap-2 border transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
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

            <div className="pt-3">
              <button
                id="reg-step-1-btn"
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>Avançar para Configuração do Cartão</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Configuração do Cartão Fidelidade
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Defina como seus clientes vão pontuar e o que vão ganhar.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Nome do Cartão *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  id="reg-program-name"
                  type="text"
                  required
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  placeholder="Ex: Cartão Fidelidade Barber Shop"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Tipo de Fidelidade *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProgramType('pontos')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      programType === 'pontos'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Por Pontos
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgramType('visitas')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      programType === 'visitas'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Por Visitas
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Meta para o Prêmio *
                </label>
                <select
                  id="reg-goal-select"
                  value={goal}
                  onChange={(e) => setGoal(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[5, 6, 8, 10, 12, 15, 20].map((n) => (
                    <option key={n} value={n}>
                      {n} {programType === 'visitas' ? 'visitas' : 'pontos'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Prêmio / Recompensa *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Gift className="w-4 h-4" />
                </div>
                <input
                  id="reg-reward"
                  type="text"
                  required
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="Ex: 1 Corte grátis, 1 Hambúrguer artesanal..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Texto explicativo (opcional)
              </label>
              <textarea
                id="reg-description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: A cada compra ou atendimento acima de R$ 30, ganhe 1 selo."
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Voltar
              </button>
              <button
                id="create-business-final-btn"
                type="submit"
                className="w-full sm:w-2/3 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Salvar e Abrir Meu Painel</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
