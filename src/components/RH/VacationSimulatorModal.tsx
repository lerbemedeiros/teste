import React, { useState } from 'react';
import { X, Plane, Calendar, DollarSign, Calculator, CheckCircle2, AlertCircle } from 'lucide-react';
import { Employee } from '../../types';

interface VacationSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

export const VacationSimulatorModal: React.FC<VacationSimulatorModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const [daysRequested, setDaysRequested] = useState<number>(15);
  const [sellDays, setSellDays] = useState<boolean>(false);
  const [advance13th, setAdvance13th] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('2026-01-12');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Base salary estimate for simulation
  const baseSalary = 6450.0;
  const dayRate = baseSalary / 30;

  // Calculations
  const vacationPay = daysRequested * dayRate;
  const constitutionThird = vacationPay / 3;
  const sellDaysPay = sellDays ? 10 * dayRate + (10 * dayRate) / 3 : 0;
  const advance13thPay = advance13th ? baseSalary * 0.5 : 0;
  const totalEstimatedGross = vacationPay + constitutionThird + sellDaysPay + advance13thPay;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-[#003822] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/60 flex items-center justify-center text-white">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Simulador & Programação de Férias</h3>
              <p className="text-xs text-emerald-200">Autoatendimento Gente & Gestão Berneck</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Solicitação de Férias Enviada ao Gestor!
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              O agendamento para <strong>{startDate}</strong> ({daysRequested} dias) foi registrado sob o protocolo <strong>FER-2026-092</strong> e aguarda aprovação da liderança.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 text-xs">
            
            {/* Vacation Balance Status */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase font-bold">Saldo Disponível</span>
                <span className="text-lg font-mono font-extrabold text-emerald-800 dark:text-emerald-400">
                  {employee.vacationDaysLeft} dias
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block uppercase font-bold">Período Aquisitivo</span>
                <span className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                  {employee.vacationPeriod}
                </span>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Data de Início Prevista *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">Início não pode ser em dia de folga/feriado.</span>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Quantidade de Dias de Gozo *
                  </label>
                  <select
                    value={daysRequested}
                    onChange={(e) => setDaysRequested(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value={10}>10 dias</option>
                    <option value={15}>15 dias</option>
                    <option value={18}>18 dias (Saldo Total)</option>
                    <option value={20}>20 dias</option>
                    <option value={30}>30 dias</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={sellDays}
                    onChange={(e) => setSellDays(e.target.checked)}
                    className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-600"
                  />
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 block">Vender 10 dias (Abono Pecuniário)</span>
                    <span className="text-[10px] text-neutral-500">Conversão de 1/3 do período de férias em remuneração financeira.</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={advance13th}
                    onChange={(e) => setAdvance13th(e.target.checked)}
                    className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-600"
                  />
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 block">Adiantar 1ª Parcela do 13º Salário</span>
                    <span className="text-[10px] text-neutral-500">Disponível caso solicitado com pelo menos 60 dias de antecedência.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Real-time Estimated Financial Simulation */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 text-xs">
                  <Calculator className="w-4 h-4 text-emerald-700" /> Simulação Financeira Estimada (Bruto)
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">Salário Base: R$ {baseSalary.toFixed(2)}</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-300">
                <div className="flex justify-between">
                  <span>Remuneração de Férias ({daysRequested} dias):</span>
                  <span className="font-mono font-semibold">R$ {vacationPay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>1/3 Constitucional de Férias:</span>
                  <span className="font-mono font-semibold">R$ {constitutionThird.toFixed(2)}</span>
                </div>
                {sellDays && (
                  <div className="flex justify-between text-emerald-800 dark:text-emerald-400 font-semibold">
                    <span>Abono Pecuniário (10 dias + 1/3):</span>
                    <span className="font-mono">R$ {sellDaysPay.toFixed(2)}</span>
                  </div>
                )}
                {advance13th && (
                  <div className="flex justify-between text-emerald-800 dark:text-emerald-400 font-semibold">
                    <span>Adiantamento 50% 13º Salário:</span>
                    <span className="font-mono">R$ {advance13thPay.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-100">Total Bruto Estimado:</span>
                <span className="text-base font-extrabold font-mono text-emerald-800 dark:text-emerald-300">
                  R$ {totalEstimatedGross.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plane className="w-4 h-4" /> Enviar Solicitação ao Gestor
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
