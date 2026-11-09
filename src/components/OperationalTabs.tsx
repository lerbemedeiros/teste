import React, { useState } from 'react';
import { 
  GraduationCap, 
  Cake, 
  Newspaper, 
  Clock, 
  Calendar, 
  FileText, 
  Folder, 
  Play, 
  Eye, 
  ArrowRight, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  ChevronRight,
  Filter
} from 'lucide-react';
import { 
  TrainingItem, 
  BirthdayEmployee, 
  NewsArticle, 
  TimePunchRecord, 
  PaycheckRecord, 
  DocumentItem, 
  Employee 
} from '../types';

interface OperationalTabsProps {
  trainings: TrainingItem[];
  birthdays: BirthdayEmployee[];
  news: NewsArticle[];
  timePunches: TimePunchRecord[];
  paychecks: PaycheckRecord[];
  documents: DocumentItem[];
  employee: Employee;
  onOpenTraining: (training: TrainingItem) => void;
  onOpenBirthdayModal: (emp: BirthdayEmployee) => void;
  onOpenPaycheckModal: (paycheck: PaycheckRecord) => void;
  onOpenArticleModal: (article: NewsArticle) => void;
  onOpenTimeAdjustment: () => void;
  onOpenGoogleDrive?: () => void;
}

export const OperationalTabs: React.FC<OperationalTabsProps> = ({
  trainings,
  birthdays,
  news,
  timePunches,
  paychecks,
  documents,
  employee,
  onOpenTraining,
  onOpenBirthdayModal,
  onOpenPaycheckModal,
  onOpenArticleModal,
  onOpenTimeAdjustment,
  onOpenGoogleDrive,
}) => {
  const [activeTab, setActiveTab] = useState<
    'elearning' | 'aniversariantes' | 'noticias' | 'timeline' | 'ponto' | 'holerites' | 'documentos'
  >('elearning');

  const [searchFilter, setSearchFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState('Todas');

  const tabs = [
    { id: 'elearning', label: 'E-Learning', icon: GraduationCap },
    { id: 'aniversariantes', label: 'Aniversariantes', icon: Cake },
    { id: 'noticias', label: 'Comunicados', icon: Newspaper },
    { id: 'timeline', label: 'Linha do Tempo', icon: Clock },
    { id: 'ponto', label: 'Ponto & Banco', icon: Calendar },
    { id: 'holerites', label: 'Holerites', icon: FileText },
    { id: 'documentos', label: 'Documentos', icon: Folder },
  ] as const;

  const filteredTrainings = trainings.filter(
    (t) => !searchFilter || t.title.toLowerCase().includes(searchFilter.toLowerCase()) || t.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredBirthdays = birthdays.filter(
    (b) => (unitFilter === 'Todas' || b.unit.includes(unitFilter)) &&
           (!searchFilter || b.name.toLowerCase().includes(searchFilter.toLowerCase()) || b.department.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const filteredDocs = documents.filter(
    (d) => !searchFilter || d.title.toLowerCase().includes(searchFilter.toLowerCase()) || d.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm overflow-hidden transition-colors">
      
      {/* Top Tab Bar Navigation */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 overflow-x-auto scrollbar-none bg-neutral-50/50 dark:bg-neutral-900/50 px-3">
        <div className="flex items-center gap-1 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchFilter('');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 pl-4 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
          <span>Portal do Colaborador</span>
        </div>
      </div>

      {/* Filter / Search Bar Inside Operational Area */}
      <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-neutral-900">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={`Filtrar ${tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}...`}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {activeTab === 'aniversariantes' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Unidade:</span>
            <select
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="Todas">Todas as Unidades</option>
              <option value="Araucária">Araucária, PR</option>
              <option value="Curitibanos">Curitibanos, SC</option>
              <option value="Lages">Lages, SC</option>
            </select>
          </div>
        )}

        {activeTab === 'ponto' && (
          <button
            onClick={onOpenTimeAdjustment}
            className="px-3 py-1.5 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>+ Solicitar Ajuste / Ocorrência</span>
          </button>
        )}
      </div>

      {/* Content Table Views */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        
        {/* 1. E-LEARNING TAB (Exact layout requested in Image 1!) */}
        {activeTab === 'elearning' && (
          <div className="min-w-[680px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Descrição do Treinamento</th>
                  <th className="py-3 px-3">Tipo</th>
                  <th className="py-3 px-3 text-center">Anexo/Vídeo</th>
                  <th className="py-3 px-3 text-center">Visualização</th>
                  <th className="py-3 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredTrainings.map((trn) => {
                  const isDone = trn.status === 'Concluído';
                  return (
                    <tr 
                      key={trn.id}
                      className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors group"
                    >
                      {/* Descrição */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${isDone ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          <div>
                            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                              {trn.title}
                            </span>
                            <span className="text-[11px] text-neutral-400">
                              {trn.category} · {trn.duration}
                              {trn.mandatory && ' · Obrigatório'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Tipo */}
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                          {trn.type}
                        </span>
                      </td>

                      {/* Anexo/Vídeo */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => onOpenTraining(trn)}
                          title="Visualizar mídia"
                          className="w-8 h-8 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-800 flex items-center justify-center transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 translate-x-0.5 fill-current" />
                        </button>
                      </td>

                      {/* Visualização */}
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          isDone 
                            ? 'text-emerald-600 dark:text-emerald-400' 
                            : 'text-neutral-500 dark:text-neutral-400'
                        }`}>
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isDone ? 'Concluído' : 'Não visualizado'}</span>
                        </span>
                      </td>

                      {/* Ação */}
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => onOpenTraining(trn)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-all inline-flex items-center gap-1 cursor-pointer group-hover:scale-105"
                        >
                          <span>Acessar</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. ANIVERSARIANTES TAB */}
        {activeTab === 'aniversariantes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredBirthdays.map((b) => (
              <div 
                key={b.id}
                className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 transition-all flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={b.avatar} alt={b.name} className="w-12 h-12 rounded-full object-cover border border-emerald-600/40" />
                    <span className="absolute -top-1 -right-1 text-sm">🎂</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-neutral-900 dark:text-neutral-100">{b.name}</h5>
                    <p className="text-[11px] text-neutral-500">{b.role}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-800 dark:text-emerald-400 font-bold">
                      <span>{b.birthDate}</span>
                      <span>·</span>
                      <span>{b.unit}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBirthdayModal(b)}
                  className="px-3 py-1.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 hover:bg-emerald-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  Parabenizar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 3. COMUNICADOS TAB (With official legacy PDFs from image 2) */}
        {activeTab === 'noticias' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {news.map((item) => (
              <div 
                key={item.id}
                onClick={() => onOpenArticleModal(item)}
                className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-600 transition-all cursor-pointer flex gap-4 bg-neutral-50/30 dark:bg-neutral-800/30 group"
              >
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-emerald-800 dark:text-emerald-400 font-bold mb-1">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span className="font-mono">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. LINHA DO TEMPO */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 max-w-2xl py-2">
            {[
              { date: '16 a 20 de Junho', title: 'SIPATMA 2025 - Semana de Prevenção & Meio Ambiente', unit: 'Todas as Unidades' },
              { date: '05 de Junho', title: 'Dia Mundial do Meio Ambiente - Ação de Plantio Simbólico', unit: 'Araucária & Curitibanos' },
              { date: '20 de Novembro', title: 'Pagamento da 1ª Parcela do 13º Salário', unit: 'Crédito em Conta' },
              { date: '22 a 26 de Dezembro', title: 'Parada Programada Anual de Manutenção Linha MDF', unit: 'Complexo Araucária' },
            ].map((event, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-28 shrink-0 text-right">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">{event.date}</span>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-600 shrink-0 mt-1 ring-4 ring-emerald-100 dark:ring-emerald-950"></div>
                <div className="flex-1 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{event.title}</h5>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{event.unit}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. PONTO & BANCO TAB (from legacy intranet screenshot 2) */}
        {activeTab === 'ponto' && (
          <div className="min-w-[650px] space-y-4">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-500">Período de Apuração:</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 ml-1.5">01/11/2025 a 30/11/2025</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Saldo Atual:</span>
                <span className="font-mono font-bold text-sm text-emerald-800 dark:text-emerald-400">
                  {employee.timeBankBalance} horas
                </span>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 uppercase">
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Dia</th>
                  <th className="py-2.5 px-2 text-center font-mono">Entrada 1</th>
                  <th className="py-2.5 px-2 text-center font-mono">Saída 1</th>
                  <th className="py-2.5 px-2 text-center font-mono">Entrada 2</th>
                  <th className="py-2.5 px-2 text-center font-mono">Saída 2</th>
                  <th className="py-2.5 px-3 text-center font-mono">Total Dia</th>
                  <th className="py-2.5 px-3 text-right font-mono">Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {timePunches.map((tp) => (
                  <tr key={tp.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <td className="py-2.5 px-3 font-mono font-medium">{tp.date}</td>
                    <td className="py-2.5 px-3 text-neutral-500">{tp.weekday}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">{tp.entry1}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">{tp.exit1}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">{tp.entry2}</td>
                    <td className="py-2.5 px-2 text-center font-mono font-semibold">{tp.exit2}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-neutral-800 dark:text-neutral-200">
                      {tp.totalHours}
                    </td>
                    <td className={`py-2.5 px-3 text-right font-mono font-bold ${
                      tp.balance.startsWith('-') ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {tp.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. HOLERITES TAB */}
        {activeTab === 'holerites' && (
          <div className="min-w-[620px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-500 uppercase">
                  <th className="py-3 px-3">Competência</th>
                  <th className="py-3 px-3">Tipo de Pagamento</th>
                  <th className="py-3 px-3 text-right font-mono">Total Bruto</th>
                  <th className="py-3 px-3 text-right font-mono">Descontos</th>
                  <th className="py-3 px-3 text-right font-mono">Valor Líquido</th>
                  <th className="py-3 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {paychecks.map((pay) => (
                  <tr key={pay.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-neutral-900 dark:text-neutral-100">
                      {pay.month} / {pay.year}
                    </td>
                    <td className="py-3.5 px-3 text-neutral-500">{pay.type}</td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-neutral-700 dark:text-neutral-300 font-medium">
                      R$ {pay.grossValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-red-600">
                      R$ {pay.discounts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-800 dark:text-emerald-400">
                      R$ {pay.netValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => onOpenPaycheckModal(pay)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Visualizar Recibo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 7. DOCUMENTOS TAB */}
        {activeTab === 'documentos' && (
          <div className="space-y-4">
            {onOpenGoogleDrive && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-neutral-800 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 87.3 78">
                      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA"/>
                      <path d="M43.65 25 29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.55h27.5z" fill="#00AC47"/>
                      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15 7.9 13.65z" fill="#EA4335"/>
                      <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2z" fill="#00832D"/>
                      <path d="M59.8 48.55H27.5L13.75 72.35c1.35.8 2.9 1.2 4.45 1.2h50.9c1.55 0 3.1-.4 4.45-1.2z" fill="#2684FC"/>
                      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 23.55h27.5c0-1.55-.4-3.1-1.2-4.5z" fill="#FFBA00"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-900 dark:text-neutral-100">
                      Arquivos em Nuvem no Google Drive Berneck
                    </h5>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Consulte, envie e gerencie documentos, planilhas da fábrica e materiais de endomarketing diretamente no Drive.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenGoogleDrive}
                  className="px-3.5 py-1.5 bg-[#003822] hover:bg-[#002817] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Abrir Google Drive</span>
                  <span>→</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredDocs.map((doc) => (
              <div 
                key={doc.id}
                className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-600 transition-colors flex items-center justify-between gap-3 bg-neutral-50/30 dark:bg-neutral-800/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                    {doc.format}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-neutral-900 dark:text-neutral-100 line-clamp-1">
                      {doc.title}
                    </h5>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      {doc.code} · {doc.version} · {doc.fileSize}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Iniciando download do documento ${doc.code}: ${doc.title}`)}
                  title="Baixar Documento"
                  className="p-2 text-neutral-500 hover:text-emerald-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      </div>
    </div>
  );
};
