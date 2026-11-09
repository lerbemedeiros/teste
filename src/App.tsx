import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { CollaboratorCard } from './components/CollaboratorCard';
import { NewsSection } from './components/NewsSection';
import { QuickAccess } from './components/QuickAccess';
import { DashboardWidget } from './components/DashboardWidget';
import { OperationalTabs } from './components/OperationalTabs';
import { SectionViews } from './components/SectionViews';

// Modals
import { ArticleModal } from './components/Modals/ArticleModal';
import { TrainingModal } from './components/Modals/TrainingModal';
import { PaycheckModal } from './components/Modals/PaycheckModal';
import { TimeAdjustmentModal } from './components/Modals/TimeAdjustmentModal';
import { BirthdayModal } from './components/Modals/BirthdayModal';
import { QuickAccessModal, QuickAccessType } from './components/Modals/QuickAccessModal';
import { ContactRHModal } from './components/Modals/ContactRHModal';
import { GlobalSearchModal } from './components/Modals/GlobalSearchModal';
import { PublishNewsModal } from './components/Modals/PublishNewsModal';
import { DigitalBadgeModal } from './components/RH/DigitalBadgeModal';
import { VacationSimulatorModal } from './components/RH/VacationSimulatorModal';
import { CharteredBusModal } from './components/RH/CharteredBusModal';
import { VivaBemModal } from './components/RH/VivaBemModal';

// Mock Data
import { 
  mockEmployees, 
  mockNewsArticles, 
  mockTrainings, 
  mockBirthdays, 
  mockTimePunches, 
  mockPaychecks, 
  mockDocuments, 
  mockNotifications 
} from './data/mockData';

import { 
  Employee, 
  NewsArticle, 
  TrainingItem, 
  BirthdayEmployee, 
  PaycheckRecord, 
  DocumentItem,
  NotificationItem 
} from './types';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Active view navigation
  const [activeView, setActiveView] = useState('inicio');

  // Active Employee
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string>('lucas');
  const [employees, setEmployees] = useState(mockEmployees);
  const currentEmployee = employees[currentEmployeeId] || mockEmployees.lucas;

  // Operational Data State
  const [articles, setArticles] = useState<NewsArticle[]>(mockNewsArticles);
  const [trainings, setTrainings] = useState<TrainingItem[]>(mockTrainings);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<TrainingItem | null>(null);
  const [selectedPaycheck, setSelectedPaycheck] = useState<PaycheckRecord | null>(null);
  const [selectedBirthdayEmp, setSelectedBirthdayEmp] = useState<BirthdayEmployee | null>(null);
  const [quickAccessType, setQuickAccessType] = useState<QuickAccessType>(null);
  const [isTimeAdjustmentOpen, setIsTimeAdjustmentOpen] = useState(false);
  const [isContactRHOpen, setIsContactRHOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPublishNewsOpen, setIsPublishNewsOpen] = useState(false);
  const [isDigitalBadgeOpen, setIsDigitalBadgeOpen] = useState(false);
  const [isVacationOpen, setIsVacationOpen] = useState(false);
  const [isBusOpen, setIsBusOpen] = useState(false);
  const [isVivaBemOpen, setIsVivaBemOpen] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Publish new article
  const handlePublishNews = (newArticle: NewsArticle) => {
    setArticles((prev) => [newArticle, ...prev]);
  };

  // Complete a training
  const handleCompleteTraining = (trainingId: string) => {
    setTrainings((prev) =>
      prev.map((t) => (t.id === trainingId ? { ...t, status: 'Concluído' } : t))
    );
  };

  // Handle Time Adjustment submission
  const handleTimeAdjustmentSubmit = (data: { date: string; type: string; reason: string; attachment?: string }) => {
    // Dynamically adjust bank balance
    setEmployees((prev) => {
      const emp = prev[currentEmployeeId];
      if (!emp) return prev;
      return {
        ...prev,
        [currentEmployeeId]: {
          ...emp,
          timeBankBalance: '+00:00',
          timeBankStatus: 'neutral',
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors selection:bg-emerald-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        currentEmployee={currentEmployee}
        allEmployees={employees}
        onSelectEmployee={(id) => setCurrentEmployeeId(id)}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContactRH={() => setIsContactRHOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        activeView={activeView}
        onSelectView={(v) => setActiveView(v)}
      />

      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          activeView={activeView}
          onSelectView={(v) => setActiveView(v)}
          onOpenContactRH={() => setIsContactRHOpen(true)}
        />

        {/* Main Content Area */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out p-4 sm:p-6 lg:p-8 max-w-[1720px] mx-auto w-full space-y-6 ${
            isSidebarOpen ? 'lg:pl-72' : 'lg:pl-28'
          }`}
        >
          {activeView === 'inicio' ? (
            <>
              {/* Panoramic Hero Banner */}
              <HeroBanner
                employee={currentEmployee}
                onOpenTimeAdjustment={() => setIsTimeAdjustmentOpen(true)}
                onOpenContactRH={() => setIsContactRHOpen(true)}
              />

              {/* Main News Portal & Utility Companion Rail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Primary News Portal Stage (8 cols: dominant visual prominence) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <NewsSection
                    articles={articles}
                    onSelectArticle={(article) => setSelectedArticle(article)}
                    onViewAllNews={() => setActiveView('noticias')}
                    onOpenPublishModal={() => setIsPublishNewsOpen(true)}
                  />
                </div>

                {/* Right Column: Collaborator Card + Autoatendimento RH & Dashboard (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <CollaboratorCard
                    employee={currentEmployee}
                    onOpenContactRH={() => setIsContactRHOpen(true)}
                    onOpenProfileModal={() => setQuickAccessType('cadastro')}
                  />
                  <QuickAccess
                    onOpenBadge={() => setIsDigitalBadgeOpen(true)}
                    onOpenVacation={() => setIsVacationOpen(true)}
                    onOpenCafeteria={() => setActiveView('refeitorio')}
                    onOpenBus={() => setIsBusOpen(true)}
                    onOpenVivaBem={() => setIsVivaBemOpen(true)}
                    onOpenHealth={() => setQuickAccessType('saude')}
                  />
                  <DashboardWidget
                    employee={currentEmployee}
                    trainings={trainings}
                    onViewDetails={() => {
                      const el = document.getElementById('operational-tabs-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onOpenTraining={(t) => setSelectedTraining(t)}
                  />
                </div>

              </div>

              {/* Bottom Operational Tabbed Module */}
              <div id="operational-tabs-section" className="pt-2">
                <OperationalTabs
                  trainings={trainings}
                  birthdays={mockBirthdays}
                  news={articles}
                  timePunches={mockTimePunches}
                  paychecks={mockPaychecks}
                  documents={mockDocuments}
                  employee={currentEmployee}
                  onOpenTraining={(t) => setSelectedTraining(t)}
                  onOpenBirthdayModal={(b) => setSelectedBirthdayEmp(b)}
                  onOpenPaycheckModal={(p) => setSelectedPaycheck(p)}
                  onOpenArticleModal={(a) => setSelectedArticle(a)}
                  onOpenTimeAdjustment={() => setIsTimeAdjustmentOpen(true)}
                  onOpenGoogleDrive={() => setActiveView('drive')}
                />
              </div>
            </>
          ) : (
            <>
              {/* Secondary Dedicated Navigation Views */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <button 
                    onClick={() => setActiveView('inicio')}
                    className="hover:text-emerald-800 dark:hover:text-emerald-400"
                  >
                    Início
                  </button>
                  <span>/</span>
                  <span className="text-emerald-800 dark:text-emerald-400 capitalize">{activeView}</span>
                </div>

                <button
                  onClick={() => setActiveView('inicio')}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  ← Voltar ao Início
                </button>
              </div>

              <SectionViews
                activeView={activeView}
                articles={articles}
                employee={currentEmployee}
                onSelectArticle={(article) => setSelectedArticle(article)}
                onOpenPublishModal={() => setIsPublishNewsOpen(true)}
                onOpenTraining={(t) => setSelectedTraining(t)}
                onOpenContactRH={() => setIsContactRHOpen(true)}
                onSelectEmployee={(id) => setCurrentEmployeeId(id)}
                onOpenBadge={() => setIsDigitalBadgeOpen(true)}
                onOpenVacation={() => setIsVacationOpen(true)}
                onOpenBus={() => setIsBusOpen(true)}
                onOpenVivaBem={() => setIsVivaBemOpen(true)}
              />
            </>
          )}

          {/* Institutional Clean Footer */}
          <footer className="pt-8 pb-4 text-center border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-500 space-y-1">
            <p className="font-semibold text-neutral-700 dark:text-neutral-300">
              BERNECK S.A. PAINÉIS E SERRADOS · Desde 1952
            </p>
            <p className="text-[11px] text-neutral-400">
              Araucária (PR) · Curitibanos (SC) · Lages (SC) · Curitiba (PR). Todos os direitos reservados.
            </p>
          </footer>
        </main>
      </div>

      {/* Global Interactive Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <PublishNewsModal
        isOpen={isPublishNewsOpen}
        onClose={() => setIsPublishNewsOpen(false)}
        onPublish={handlePublishNews}
      />

      <DigitalBadgeModal
        isOpen={isDigitalBadgeOpen}
        onClose={() => setIsDigitalBadgeOpen(false)}
        employee={currentEmployee}
      />

      <VacationSimulatorModal
        isOpen={isVacationOpen}
        onClose={() => setIsVacationOpen(false)}
        employee={currentEmployee}
      />

      <CharteredBusModal
        isOpen={isBusOpen}
        onClose={() => setIsBusOpen(false)}
      />

      <VivaBemModal
        isOpen={isVivaBemOpen}
        onClose={() => setIsVivaBemOpen(false)}
        employee={currentEmployee}
      />

      <TrainingModal
        training={selectedTraining}
        onClose={() => setSelectedTraining(null)}
        onComplete={handleCompleteTraining}
      />

      <PaycheckModal
        paycheck={selectedPaycheck}
        employee={currentEmployee}
        onClose={() => setSelectedPaycheck(null)}
      />

      <TimeAdjustmentModal
        isOpen={isTimeAdjustmentOpen}
        onClose={() => setIsTimeAdjustmentOpen(false)}
        onSubmit={handleTimeAdjustmentSubmit}
        currentBalance={currentEmployee.timeBankBalance}
      />

      <BirthdayModal
        employee={selectedBirthdayEmp}
        onClose={() => setSelectedBirthdayEmp(null)}
      />

      <QuickAccessModal
        type={quickAccessType}
        employee={currentEmployee}
        onClose={() => setQuickAccessType(null)}
        onOpenTimeAdjustment={() => setIsTimeAdjustmentOpen(true)}
      />

      <ContactRHModal
        isOpen={isContactRHOpen}
        onClose={() => setIsContactRHOpen(false)}
        employee={currentEmployee}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onSelectTraining={(training) => setSelectedTraining(training)}
        onSelectDocument={(doc) => {
          alert(`Documento selecionado: ${doc.title} (${doc.code}).`);
        }}
      />

    </div>
  );
}
