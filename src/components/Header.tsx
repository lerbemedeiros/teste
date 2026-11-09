import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  MessageSquare, 
  Home, 
  Moon, 
  Sun, 
  ChevronDown, 
  CheckCheck, 
  ExternalLink,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { Employee, NotificationItem } from '../types';

interface HeaderProps {
  currentEmployee: Employee;
  allEmployees: Record<string, Employee>;
  onSelectEmployee: (id: string) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onOpenSearch: () => void;
  onOpenContactRH: () => void;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeView: string;
  onSelectView: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentEmployee,
  allEmployees,
  onSelectEmployee,
  notifications,
  onMarkAllNotificationsRead,
  onOpenSearch,
  onOpenContactRH,
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode,
  activeView,
  onSelectView,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Hamburger & Berneck Brand Lockup */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={onToggleSidebar}
            aria-label="Alternar menu de navegação"
            className="p-2 -ml-1 text-neutral-600 dark:text-neutral-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Berneck Wordmark & Intranet Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectView('inicio')}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="flex items-center tracking-tight">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-[#003B22] dark:text-emerald-400 font-sans uppercase">
                  BERNECK
                </span>
                <span className="inline-block w-2 h-2 ml-1 rounded-sm bg-emerald-500 rotate-45 transform"></span>
              </div>
            </button>

            <span className="text-neutral-300 dark:text-neutral-700 select-none">|</span>

            <button
              onClick={() => onSelectView('inicio')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Intranet Corporativa</span>
            </button>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs bg-neutral-100/90 dark:bg-neutral-800 hover:bg-neutral-200/70 dark:hover:bg-neutral-750 text-neutral-500 dark:text-neutral-400 rounded-full border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-left shadow-inner"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span className="truncate">O que você procura? Ramais, documentos, holerite...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-neutral-400 bg-white dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-700">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Notifications, User Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Buscar no portal"
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Alternar tema claro/escuro"
            title={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          {/* Quick Help / Fale com RH */}
          <button
            onClick={onOpenContactRH}
            title="Abrir suporte RH / Fale com Gente & Gestão"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200/60 dark:border-emerald-900/60"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Fale com RH</span>
          </button>

          {/* Notification Bell Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificações corporativas"
              className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full animate-in zoom-in">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                      Notificações Berneck
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded">
                        {unreadCount} novas
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllNotificationsRead}
                      className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/80">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${
                        !item.read ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="font-bold text-xs text-neutral-900 dark:text-neutral-100 leading-tight">
                          {item.title}
                        </h5>
                        <span className="text-[10px] text-neutral-400 whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 text-center bg-neutral-50 dark:bg-neutral-800/40 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onSelectView('noticias');
                    }}
                    className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:underline"
                  >
                    Ver todos os comunicados internos →
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block"></div>

          {/* User Profile Avatar & Switcher */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 pl-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="relative">
                <img
                  src={currentEmployee.avatar}
                  alt={currentEmployee.name}
                  className="w-8 h-8 rounded-full object-cover border border-emerald-700/50"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-900 rounded-full"></span>
              </div>
              <div className="hidden xl:block text-left pr-1">
                <span className="block text-xs font-bold text-neutral-800 dark:text-neutral-200 leading-tight">
                  {currentEmployee.name}
                </span>
                <span className="block text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                  Matr. {currentEmployee.registration}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* User Switcher Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50 animate-in fade-in-50 duration-150">
                <div className="p-4 bg-emerald-800 text-white">
                  <p className="text-[10px] uppercase font-semibold text-emerald-200 tracking-wider">
                    Colaborador Ativo
                  </p>
                  <p className="font-bold text-sm mt-0.5">{currentEmployee.name}</p>
                  <p className="text-xs text-emerald-100">{currentEmployee.role}</p>
                  <p className="text-[11px] text-emerald-200/80 mt-1">{currentEmployee.unit}</p>
                </div>

                <div className="p-3 border-b border-neutral-100 dark:border-neutral-800 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Alternar Colaborador (Simulação)
                  </span>
                  <div className="space-y-1">
                    {Object.values(allEmployees).map((emp) => (
                      <button
                        key={emp.id}
                        onClick={() => {
                          onSelectEmployee(emp.id);
                          setShowUserMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                          emp.id === currentEmployee.id
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img src={emp.avatar} alt={emp.name} className="w-6 h-6 rounded-full object-cover" />
                          <div className="truncate">
                            <span className="block text-xs truncate">{emp.name}</span>
                            <span className="block text-[10px] text-neutral-400">{emp.unit}</span>
                          </div>
                        </div>
                        {emp.id === currentEmployee.id && (
                          <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2 space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenContactRH();
                    }}
                    className="w-full text-left px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    Meu Cadastro e Dependentes
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      alert('Simulação: Sessão do colaborador reiniciada com segurança.');
                    }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors font-medium"
                  >
                    Encerrar Sessão
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
