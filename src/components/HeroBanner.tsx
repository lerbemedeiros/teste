import React from 'react';
import { Clock, AlertCircle, ArrowUpRight, CloudSun, MapPin, Calendar } from 'lucide-react';
import { Employee } from '../types';

interface HeroBannerProps {
  employee: Employee;
  onOpenTimeAdjustment: () => void;
  onOpenContactRH: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  employee,
  onOpenTimeAdjustment,
  onOpenContactRH,
}) => {
  const firstName = employee.name.split(' ')[0];

  // Format today's date in Portuguese
  const todayStr = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const isNegative = employee.timeBankStatus === 'negative';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900 min-h-[170px] sm:min-h-[190px] flex items-center">
      {/* Background imagery: Sustainable Pine Forest transitioning into Modern Wood Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          {/* Left: Sustainable Pinus Forest */}
          <div className="relative h-full overflow-hidden hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80"
              alt="Manejo Florestal Sustentável Berneck"
              className="w-full h-full object-cover object-center filter brightness-90"
              referrerPolicy="no-referrer"
            />
            {/* Smooth transition gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#003822]/90 via-[#003822]/70 to-transparent"></div>
          </div>

          {/* Right: Elegant Wood Panel Interior / Showroom Architecture */}
          <div className="relative h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Painéis e Arquitetura de Interiores Berneck"
              className="w-full h-full object-cover object-center filter brightness-95"
              referrerPolicy="no-referrer"
            />
            {/* Vignette and blend */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-[#003822]/30 to-[#003822]/80"></div>
          </div>
        </div>

        {/* Global organic curve ribbon overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002d1b]/95 via-[#003822]/75 to-neutral-900/60 pointer-events-none"></div>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 w-full px-6 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
        
        {/* Left Welcome Text */}
        <div className="max-w-xl space-y-2">
          {/* Location & Weather pill */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-200/90 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{employee.unit}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-300" />
              <span>21°C · Ensolarado</span>
            </span>
            <span>·</span>
            <span className="capitalize">{todayStr}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Olá, {firstName}! Bem-vindo(a) ao Portal Berneck.
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            73 anos transformando florestas plantadas em soluções inteligentes para a arquitetura e a indústria moveleira.
          </p>
        </div>

        {/* Right: Operational Time Bank Badge (from legacy intranet screenshot 2!) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-white shadow-xl flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isNegative ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              <Clock className="w-5 h-5" />
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-neutral-300 font-semibold">
                Banco de Horas Atual
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold font-mono tracking-tight ${
                  isNegative ? 'text-amber-300' : 'text-emerald-300'
                }`}>
                  {employee.timeBankBalance} h
                </span>
                <span className="text-[11px] text-neutral-300">
                  {isNegative ? 'a compensar' : 'de saldo positivo'}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenTimeAdjustment}
              title="Solicitar ajuste de ponto ou justificar ocorrência"
              className="ml-2 px-3 py-1.5 text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-1 shrink-0 shadow-xs"
            >
              <span>Ocorrência</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
