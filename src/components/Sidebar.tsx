import React from 'react';
import { 
  Home, 
  Newspaper, 
  Gift, 
  Users, 
  GraduationCap, 
  Leaf, 
  Settings, 
  Headphones, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Utensils,
  HardDrive
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeView: string;
  onSelectView: (view: string) => void;
  onOpenContactRH: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeView,
  onSelectView,
  onOpenContactRH,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'noticias', label: 'Notícias & Comunicados', icon: Newspaper },
    { id: 'drive', label: 'Google Drive', icon: HardDrive },
    { id: 'endomarketing', label: 'Endomarketing & Valores', icon: Sparkles },
    { id: 'refeitorio', label: 'Refeitório Industrial', icon: Utensils },
    { id: 'servicos', label: 'Autoatendimento RH', icon: Settings },
    { id: 'beneficios', label: 'Benefícios & Saúde', icon: Gift },
    { id: 'pessoas', label: 'Pessoas & Ramais', icon: Users },
    { id: 'desenvolvimento', label: 'E-Learning Berneck', icon: GraduationCap },
    { id: 'suporte', label: 'Suporte TI & GLPI', icon: Headphones },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onToggle}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-30 transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden shadow-xl lg:shadow-none border-r border-[#002e1a] ${
          isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        } bg-[#003822] text-white select-none`}
      >
        {/* Navigation items list */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                title={!isOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-emerald-700/80 text-white shadow-md shadow-emerald-950/40'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'scale-110 text-emerald-300' : 'text-emerald-200/80'}`} />
                <span className={`truncate whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:hidden opacity-0'}`}>
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-400 rounded-r-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Ambient Topographic Wave Accent & Support Widget */}
        <div className="relative p-4 pt-2 border-t border-emerald-800/60 overflow-hidden">
          {/* Subtle SVG Contour Rings (Mimicking the wood grain rings from screenshot 1!) */}
          <svg 
            className="absolute -bottom-6 -left-6 w-48 h-48 opacity-10 pointer-events-none text-emerald-300" 
            viewBox="0 0 200 200" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <circle cx="50" cy="150" r="40" />
            <circle cx="50" cy="150" r="70" />
            <circle cx="50" cy="150" r="100" />
            <circle cx="50" cy="150" r="130" />
            <circle cx="50" cy="150" r="160" />
          </svg>

          {isOpen ? (
            <div className="relative z-10 space-y-3">
              <div className="p-3 bg-emerald-900/80 rounded-xl border border-emerald-700/50 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold mb-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Central de Ajuda</span>
                </div>
                <p className="text-[11px] text-emerald-100/80">
                  Dúvidas de ponto, folha ou TI? Fale com a central.
                </p>
                <button
                  onClick={onOpenContactRH}
                  className="mt-2 w-full py-1.5 px-2 bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold rounded-lg transition-colors text-center shadow-xs block"
                >
                  Abrir Chamado RH →
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-emerald-300/70 pt-1">
                <span>Versão Portal 2026.1</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Seguro
                </span>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-center">
              <button
                onClick={onToggle}
                className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
                title="Expandir menu"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
