import React from 'react';
import { 
  Shield, 
  Plane, 
  Utensils, 
  Bus, 
  HeartHandshake, 
  Heart,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface QuickAccessProps {
  onOpenBadge: () => void;
  onOpenVacation: () => void;
  onOpenCafeteria: () => void;
  onOpenBus: () => void;
  onOpenVivaBem: () => void;
  onOpenHealth: () => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ 
  onOpenBadge,
  onOpenVacation,
  onOpenCafeteria,
  onOpenBus,
  onOpenVivaBem,
  onOpenHealth,
}) => {
  const items = [
    {
      id: 'cracha',
      label: 'Crachá Digital',
      icon: Shield,
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/60',
      borderColor: 'hover:border-emerald-500',
      description: 'QR Code & Catraca',
      onClick: onOpenBadge,
    },
    {
      id: 'ferias',
      label: 'Programar Férias',
      icon: Plane,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      borderColor: 'hover:border-blue-500',
      description: 'Simulador & 1/3',
      onClick: onOpenVacation,
    },
    {
      id: 'refeitorio',
      label: 'Cardápio Refeitório',
      icon: Utensils,
      iconColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      borderColor: 'hover:border-amber-500',
      description: 'Almoço, Jantar & Ceia',
      onClick: onOpenCafeteria,
    },
    {
      id: 'transporte',
      label: 'Ônibus Fretado',
      icon: Bus,
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
      borderColor: 'hover:border-purple-500',
      description: 'Linhas & Horários',
      onClick: onOpenBus,
    },
    {
      id: 'vivabem',
      label: 'Programa Viva Bem',
      icon: HeartHandshake,
      iconColor: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      borderColor: 'hover:border-rose-500',
      description: 'Apoio Psicológico 24h',
      onClick: onOpenVivaBem,
    },
    {
      id: 'saude',
      label: 'Plano de Saúde',
      icon: Heart,
      iconColor: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/40',
      borderColor: 'hover:border-red-400',
      description: 'Paraná Clínicas / Guia',
      onClick: onOpenHealth,
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Autoatendimento RH & Serviços
          </h3>
        </div>
        <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
          6 Serviços Diretos
        </span>
      </div>

      {/* Grid of 6 buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 transition-all flex flex-col items-center text-center group cursor-pointer shadow-xs hover:shadow-md ${item.borderColor}`}
            >
              <div className={`w-10 h-10 rounded-xl ${item.bgColor} ${item.iconColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-xs`}>
                <Icon className="w-5 h-5" />
              </div>

              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                {item.label}
              </span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 line-clamp-1">
                {item.description}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
