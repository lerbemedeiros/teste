import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Award, 
  Calendar, 
  Plane, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';
import { Employee, TrainingItem } from '../types';

interface DashboardWidgetProps {
  employee: Employee;
  trainings: TrainingItem[];
  onViewDetails: () => void;
  onOpenTraining: (training: TrainingItem) => void;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  employee,
  trainings,
  onViewDetails,
  onOpenTraining,
}) => {
  const [activeTab, setActiveTab] = useState<'elearning' | 'tempo' | 'ferias' | 'certificados'>('elearning');

  const totalMandatory = trainings.filter((t) => t.mandatory).length;
  const completedMandatory = trainings.filter((t) => t.mandatory && t.status === 'Concluído').length;
  const progressPercent = totalMandatory > 0 ? Math.round((completedMandatory / totalMandatory) * 100) : 0;

  // Calculate dynamic circular gauge stroke dash
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Calculate time at company
  const admissionYear = parseInt(employee.admissionDate.split('/')[2], 10);
  const currentYear = new Date().getFullYear();
  const yearsAtCompany = Math.max(0, currentYear - admissionYear);

  return (
    <div className="bg-[#003822] text-white rounded-2xl p-5 border border-emerald-900 shadow-md flex flex-col justify-between transition-all relative overflow-hidden">
      
      {/* Background subtle botanical wave */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
          <path d="M0 140C60 100 120 40 220 20V140H0Z" fill="white" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-300" />
          <h3 className="text-sm font-bold tracking-tight text-white">
            Meu Dashboard
          </h3>
        </div>

        <button
          onClick={onViewDetails}
          className="text-xs font-semibold text-emerald-300 hover:text-white flex items-center gap-0.5 group"
        >
          <span>Ver detalhes</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Subtabs (from legacy intranet image 2: E-learning, Tempo de casa, Férias, Certificados) */}
      <div className="flex items-center gap-1 my-3 p-1 bg-emerald-950/60 rounded-xl text-[11px] font-medium border border-emerald-800/60">
        <button
          onClick={() => setActiveTab('elearning')}
          className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-colors truncate ${
            activeTab === 'elearning' ? 'bg-emerald-700 text-white font-bold shadow-xs' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          E-learning
        </button>
        <button
          onClick={() => setActiveTab('tempo')}
          className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-colors truncate ${
            activeTab === 'tempo' ? 'bg-emerald-700 text-white font-bold shadow-xs' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          Tempo de Casa
        </button>
        <button
          onClick={() => setActiveTab('ferias')}
          className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-colors truncate ${
            activeTab === 'ferias' ? 'bg-emerald-700 text-white font-bold shadow-xs' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          Férias
        </button>
        <button
          onClick={() => setActiveTab('certificados')}
          className={`flex-1 py-1 px-1.5 rounded-lg text-center transition-colors truncate ${
            activeTab === 'certificados' ? 'bg-emerald-700 text-white font-bold shadow-xs' : 'text-emerald-200/80 hover:text-white'
          }`}
        >
          Certificados
        </button>
      </div>

      {/* Tab Panels */}
      <div className="py-1">
        {activeTab === 'elearning' && (
          <div className="flex items-center justify-between gap-4">
            {/* Circular Gauge */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="stroke-emerald-900"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="stroke-emerald-400 transition-all duration-700 ease-out"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-base font-extrabold font-mono text-white leading-none">
                  {progressPercent}%
                </span>
                <span className="text-[9px] text-emerald-200 font-medium mt-0.5">concluído</span>
              </div>
            </div>

            {/* Gauge info description */}
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold text-white">
                {totalMandatory} conteúdos disponíveis
              </p>
              <p className="text-[11px] text-emerald-200/90 font-mono">
                Lidos com aceite: <span className="font-bold text-white">{completedMandatory}</span>
              </p>
              <div className="pt-1">
                {completedMandatory < totalMandatory ? (
                  <button
                    onClick={() => {
                      const next = trainings.find((t) => t.mandatory && t.status !== 'Concluído');
                      if (next) onOpenTraining(next);
                    }}
                    className="text-[11px] font-bold text-emerald-300 hover:text-white underline cursor-pointer"
                  >
                    Iniciar próximo módulo →
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Trilhas em dia!
                  </span>
                )}
              </div>
            </div>

            {/* Book Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center shrink-0 border border-emerald-700">
              <BookOpen className="w-5 h-5 text-emerald-300" />
            </div>
          </div>
        )}

        {activeTab === 'tempo' && (
          <div className="space-y-2 py-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">Admissão Oficial:</span>
              <span className="font-mono font-bold text-white">{employee.admissionDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">Tempo de Berneck:</span>
              <span className="font-bold text-emerald-300">
                {yearsAtCompany === 0 ? '9 meses de dedicação' : `${yearsAtCompany} anos e dedicação`}
              </span>
            </div>
            <p className="text-[10px] text-emerald-200/70 pt-1 border-t border-emerald-800/60">
              Sua jornada faz a diferença no crescimento sustentável da Berneck.
            </p>
          </div>
        )}

        {activeTab === 'ferias' && (
          <div className="space-y-2 py-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">Saldo Disponível:</span>
              <span className="font-mono font-bold text-emerald-300 text-sm">{employee.vacationDaysLeft} dias</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">Período Aquisitivo:</span>
              <span className="font-mono font-bold text-white">{employee.vacationPeriod}</span>
            </div>
            <div className="pt-1 border-t border-emerald-800/60">
              <button
                onClick={onViewDetails}
                className="w-full py-1.5 text-center text-[11px] font-semibold bg-emerald-700/80 hover:bg-emerald-600 rounded-lg text-white transition-colors"
              >
                Solicitar Programação de Férias
              </button>
            </div>
          </div>
        )}

        {activeTab === 'certificados' && (
          <div className="space-y-2 py-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-emerald-200">Certificados Válidos:</span>
              <span className="font-mono font-bold text-emerald-300 text-sm">02 emitidos</span>
            </div>
            <div className="text-[11px] text-emerald-100/90 truncate">
              • Integração Institucional Berneck (2025)
            </div>
            <div className="text-[11px] text-emerald-100/90 truncate">
              • NR-12 Segurança Operacional (2025)
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
