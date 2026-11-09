import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Leaf, 
  Award, 
  Gift, 
  Headphones, 
  CheckCircle2, 
  FileText, 
  Send,
  Building,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Heart,
  Newspaper,
  Plus,
  Video,
  Image as ImageIcon,
  Paperclip,
  Clock,
  Flame,
  Settings,
  GraduationCap,
  Sparkles,
  Plane,
  Bus,
  HeartHandshake,
  Shield,
  Utensils
} from 'lucide-react';
import { Employee, TrainingItem, NewsArticle } from '../types';
import { mockEmployees, mockTrainings } from '../data/mockData';
import { RecognitionWall } from './InternalMarketing/RecognitionWall';
import { CafeteriaMenu } from './InternalMarketing/CafeteriaMenu';
import { GoogleDriveView } from './GoogleDrive/GoogleDriveView';

interface SectionViewsProps {
  activeView: string;
  articles: NewsArticle[];
  employee: Employee;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenPublishModal: () => void;
  onOpenTraining: (t: TrainingItem) => void;
  onOpenContactRH: () => void;
  onSelectEmployee: (id: string) => void;
  onOpenBadge: () => void;
  onOpenVacation: () => void;
  onOpenBus: () => void;
  onOpenVivaBem: () => void;
}

export const SectionViews: React.FC<SectionViewsProps> = ({
  activeView,
  articles,
  employee,
  onSelectArticle,
  onOpenPublishModal,
  onOpenTraining,
  onOpenContactRH,
  onSelectEmployee,
  onOpenBadge,
  onOpenVacation,
  onOpenBus,
  onOpenVivaBem,
}) => {
  const [peopleSearch, setPeopleSearch] = useState('');
  const [newsSearch, setNewsSearch] = useState('');
  const [newsCatFilter, setNewsCatFilter] = useState('Todas');
  const [newsMediaFilter, setNewsMediaFilter] = useState<'all' | 'video' | 'gallery' | 'attachments'>('all');
  const [unitFilter, setUnitFilter] = useState('Todas');
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');

  // GOOGLE DRIVE CORPORATIVO
  if (activeView === 'drive') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <GoogleDriveView />
      </div>
    );
  }

  // 1. ENDOMARKETING & MURAL GENTE DE VALOR
  if (activeView === 'endomarketing') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <RecognitionWall currentEmployee={employee} />
      </div>
    );
  }

  // 2. REFEITÓRIO INDUSTRIAL
  if (activeView === 'refeitorio') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <CafeteriaMenu />
      </div>
    );
  }

  // 3. AUTOATENDIMENTO RH & SERVIÇOS INTERNOS
  if (activeView === 'servicos') {
    const rhServices = [
      {
        title: 'Crachá Funcional Digital',
        desc: 'Visualizar crachá com QR Code para liberação em catracas, refeitório e convênio farmácia.',
        icon: Shield,
        color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60',
        action: onOpenBadge,
        btnLabel: 'Abrir Crachá Digital',
      },
      {
        title: 'Programação & Simulador de Férias',
        desc: 'Consultar saldo disponível, calcular 1/3 constitucional, abono pecuniário e agendar com o gestor.',
        icon: Plane,
        color: 'text-blue-700 bg-blue-50 dark:bg-blue-950/60',
        action: onOpenVacation,
        btnLabel: 'Simular & Agendar Férias',
      },
      {
        title: 'Transporte Fretado & Linhas de Ônibus',
        desc: 'Itinerários, horários de saída dos turnos industriais e contatos dos motoristas por unidade.',
        icon: Bus,
        color: 'text-purple-700 bg-purple-50 dark:bg-purple-950/60',
        action: onOpenBus,
        btnLabel: 'Consultar Linhas & Rotas',
      },
      {
        title: 'Programa Viva Bem (Apoio 24h)',
        desc: 'Canais gratuitos e sigilosos de apoio psicológico, orientação financeira, social e jurídica.',
        icon: HeartHandshake,
        color: 'text-rose-700 bg-rose-50 dark:bg-rose-950/60',
        action: onOpenVivaBem,
        btnLabel: 'Acessar Programa Viva Bem',
      },
      {
        title: 'Canal Direto com RH (Gente & Gestão)',
        desc: 'Abertura de chamados para dúvidas sobre folha de pagamento, benefícios, atestados e declarações.',
        icon: Mail,
        color: 'text-amber-700 bg-amber-50 dark:bg-amber-950/60',
        action: onOpenContactRH,
        btnLabel: 'Abrir Chamado RH',
      },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
              Central de Autoatendimento RH & Serviços ao Colaborador
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Todos os serviços de Gente & Gestão reunidos para facilitar sua rotina na Berneck
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rhServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-800/40 flex flex-col justify-between space-y-4 hover:border-emerald-600 transition-all">
                  <div className="space-y-2">
                    <div className={`w-10 h-10 rounded-xl ${srv.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{srv.title}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">{srv.desc}</p>
                  </div>
                  <button
                    onClick={srv.action}
                    className="w-full py-2.5 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl transition-colors shadow-xs"
                  >
                    {srv.btnLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 4. NOTÍCIAS & COMUNICADOS DEDICATED VIEW
  if (activeView === 'noticias') {
    const filteredNews = articles.filter((a) => {
      const matchesSearch = !newsSearch || a.title.toLowerCase().includes(newsSearch.toLowerCase()) || a.summary.toLowerCase().includes(newsSearch.toLowerCase());
      const matchesCat = newsCatFilter === 'Todas' || a.category === newsCatFilter;
      const matchesMedia = 
        newsMediaFilter === 'all' ? true :
        newsMediaFilter === 'video' ? !!a.video :
        newsMediaFilter === 'gallery' ? !!(a.gallery && a.gallery.length > 0) :
        newsMediaFilter === 'attachments' ? !!(a.attachments && a.attachments.length > 0) : true;
      return matchesSearch && matchesCat && matchesMedia;
    });

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          
          {/* Top Banner & Action */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-emerald-800 dark:text-emerald-400" />
                <h2 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
                  Mural Completo de Notícias & Comunicação Berneck
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Acesse todas as reportagens, entrevistas em vídeo, galerias fotográficas de eventos e circulares oficiais para download.
              </p>
            </div>

            <button
              onClick={onOpenPublishModal}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Nova Notícia Multimídia</span>
            </button>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-700">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                placeholder="Buscar notícias por palavras-chave..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Category select */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={newsCatFilter}
                onChange={(e) => setNewsCatFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              >
                <option value="Todas">Todas as Categorias</option>
                <option value="Destaque">Destaque</option>
                <option value="Sustentabilidade">Sustentabilidade</option>
                <option value="Segurança">Segurança</option>
                <option value="Endomarketing">Endomarketing</option>
                <option value="RH">RH</option>
                <option value="Comunicado">Comunicado</option>
              </select>

              {/* Media type filter buttons */}
              <div className="flex items-center gap-1 p-0.5 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => setNewsMediaFilter('all')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    newsMediaFilter === 'all' ? 'bg-emerald-800 text-white' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setNewsMediaFilter('video')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 ${
                    newsMediaFilter === 'video' ? 'bg-emerald-800 text-white' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Video className="w-3 h-3 text-red-500" /> Com Vídeo
                </button>
                <button
                  onClick={() => setNewsMediaFilter('gallery')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 ${
                    newsMediaFilter === 'gallery' ? 'bg-emerald-800 text-white' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <ImageIcon className="w-3 h-3 text-emerald-500" /> Galeria
                </button>
                <button
                  onClick={() => setNewsMediaFilter('attachments')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 ${
                    newsMediaFilter === 'attachments' ? 'bg-emerald-800 text-white' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Paperclip className="w-3 h-3 text-blue-500" /> Anexos
                </button>
              </div>
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-600 transition-all flex flex-col justify-between bg-white dark:bg-neutral-900 shadow-xs hover:shadow-lg"
              >
                {/* Image Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-emerald-800/90 backdrop-blur-md rounded-md shadow-xs">
                      {article.category}
                    </span>

                    {/* Media icons */}
                    <div className="flex items-center gap-1">
                      {article.video && (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-600/90 rounded flex items-center gap-1">
                          <Video className="w-3 h-3" /> Vídeo
                        </span>
                      )}
                      {article.gallery && article.gallery.length > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-black/60 rounded flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-emerald-400" /> {article.gallery.length}
                        </span>
                      )}
                      {article.attachments && article.attachments.length > 0 && (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-black/60 rounded flex items-center gap-1">
                          <Paperclip className="w-3 h-3 text-blue-300" /> {article.attachments.length}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between text-[11px] font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      {article.date}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Article Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Footer metadata & Download teaser */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-400 truncate max-w-[150px]">
                      {article.author}
                    </span>
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1 text-xs group-hover:translate-x-1 transition-transform">
                      Acessar Matéria →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="py-12 text-center text-neutral-400">
              <p>Nenhuma notícia encontrada para estes filtros.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 5. PESSOAS & RAMAIS DIRECTORY VIEW
  if (activeView === 'pessoas') {
    const list = Object.values(mockEmployees).filter(
      (e) => (unitFilter === 'Todas' || e.unit.includes(unitFilter)) &&
             (!peopleSearch || e.name.toLowerCase().includes(peopleSearch.toLowerCase()) || e.role.toLowerCase().includes(peopleSearch.toLowerCase()) || e.extension.includes(peopleSearch))
    );

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
                Guia de Colaboradores & Ramais Berneck
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Consulte contatos, ramais telefônicos e setores de todas as unidades fabris e administrativas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  value={peopleSearch}
                  onChange={(e) => setPeopleSearch(e.target.value)}
                  placeholder="Buscar por nome, cargo ou ramal..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <select
                value={unitFilter}
                onChange={(e) => setUnitFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              >
                <option value="Todas">Todas as Unidades</option>
                <option value="Araucária">Araucária, PR</option>
                <option value="Curitibanos">Curitibanos, SC</option>
                <option value="Lages">Lages, SC</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {list.map((emp) => (
              <div 
                key={emp.id}
                className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full object-cover border border-emerald-700/40" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 truncate">{emp.name}</h4>
                    <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium truncate">{emp.role}</p>
                    <p className="text-[11px] text-neutral-400 truncate">{emp.department}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Ramal:</span>
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">{emp.extension}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Unidade:</span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-[150px]">{emp.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> E-mail:</span>
                    <span className="text-neutral-600 dark:text-neutral-400 truncate max-w-[150px] font-mono text-[11px]">{emp.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectEmployee(emp.id)}
                  className="w-full py-1.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg transition-colors text-center"
                >
                  Alternar para este perfil
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6. DESENVOLVIMENTO & E-LEARNING VIEW
  if (activeView === 'desenvolvimento') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
                Universidade Corporativa Berneck - Trilha de Capacitação
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Cursos obrigatórios, treinamentos de segurança operacional e desenvolvimento pessoal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTrainings.map((trn) => (
              <div 
                key={trn.id}
                className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-800/40 flex flex-col justify-between space-y-4 hover:border-emerald-600 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {trn.type}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">{trn.duration}</span>
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 leading-snug">{trn.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{trn.description}</p>
                </div>

                <button
                  onClick={() => onOpenTraining(trn)}
                  className="w-full py-2 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl transition-colors text-center"
                >
                  {trn.status === 'Concluído' ? 'Rever Módulo' : 'Iniciar Treinamento'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 7. BENEFÍCIOS VIEW
  if (activeView === 'beneficios') {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-600" />
              Guia Completo de Benefícios Berneck
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Conheça os programas de bem-estar, saúde, alimentação e suporte financeiro oferecidos a você e seus dependentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Assistência Médica Paraná Clínicas',
                desc: 'Cobertura hospitalar, ambulatorial e obstétrica com coparticipação reduzida e ampla rede credenciada em todo o Paraná e Santa Catarina.',
                highlight: 'Coparticipação Reduzida',
                action: 'Ver Tabela de Preços',
              },
              {
                title: 'Vale Alimentação & Refeição (Alelo)',
                desc: 'Disponibilizado mensalmente no 5º dia útil para garantir a segurança alimentar de toda a família.',
                highlight: 'R$ 850,00 / mês',
                action: 'Consultar Saldo Alelo',
              },
              {
                title: 'Refeitório Industrial Berneck',
                desc: 'Refeições completas no café da manhã, almoço e jantar dentro das unidades fabris, com cardápio balanceado por nutricionistas.',
                highlight: 'Subsídio de 90%',
                action: 'Ver Cardápio da Semana',
              },
              {
                title: 'Previdência Privada BerneckPrev',
                desc: 'Plano de previdência complementar onde a Berneck contribui com o mesmo valor investido pelo colaborador (100% de matching até 5%).',
                highlight: 'Matching 100%',
                action: 'Simular Aposentadoria',
              },
              {
                title: 'Wellhub / Gympass & Saúde Mental',
                desc: 'Acesso a milhares de academias, estúdios de pilates, aulas de natação e sessões com psicólogos online.',
                highlight: 'A partir de R$ 39,90',
                action: 'Ativar Assinatura',
              },
              {
                title: 'Auxílio Creche & Material Escolar',
                desc: 'Reembolso de despesas com creches para mães colaboradoras e kit escolar completo no início de cada ano letivo.',
                highlight: 'Apoio à Família',
                action: 'Solicitar Reembolso',
              },
            ].map((b, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-800/40 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {b.highlight}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-1">{b.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{b.desc}</p>
                </div>
                <button
                  onClick={onOpenContactRH}
                  className="w-full py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors text-center"
                >
                  {b.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 8. SUPORTE TI & GLPI VIEW
  if (activeView === 'suporte') {
    const handleTicket = (e: React.FormEvent) => {
      e.preventDefault();
      setTicketSent(true);
      setTimeout(() => {
        setTicketSent(false);
        setTicketSubject('');
        setTicketDesc('');
      }, 2500);
    };

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-emerald-700" />
              Central de Atendimento TI & Suporte ao Usuário (GLPI)
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Abra chamados para problemas de conectividade, acesso aos sistemas SAP/Roover, impressoras ou e-mail.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              {ticketSent ? (
                <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 text-emerald-900 dark:text-emerald-200 space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                  <h4 className="font-bold text-base">Chamado Aberto com Sucesso!</h4>
                  <p className="text-xs">Número do Ticket: <strong>#TI-2025-8831</strong>. Um analista entrará em contato via Teams ou Ramal.</p>
                </div>
              ) : (
                <form onSubmit={handleTicket} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Categoria do Problema
                    </label>
                    <select className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                      <option>Acesso ao SAP / Permissões de Usuário</option>
                      <option>Problemas no Sistema Roover / Ponto Eletrônico</option>
                      <option>Hardware, Computador ou Monitor</option>
                      <option>Conexão de Rede Wi-Fi / VPN / Internet</option>
                      <option>Telefonia / Configuração de Ramal</option>
                      <option>Instalação de Softwares Autorizados</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Assunto Breve
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="Ex: Falha ao sincronizar o espelho no SAP..."
                      className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Descrição Detalhada do Erro
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={ticketDesc}
                      onChange={(e) => setTicketDesc(e.target.value)}
                      placeholder="Descreva o que ocorreu, se há mensagem de erro na tela e se o problema impede sua rotina de trabalho..."
                      className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Enviar Chamado TI
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-500">Plantão de TI Berneck</h4>
                <div className="space-y-2 text-xs">
                  <p className="flex items-center justify-between">
                    <span className="text-neutral-400">Ramal de Suporte Rápido:</span>
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">2222</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-neutral-400">Horário Atendimento:</span>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">24 horas (Industrial)</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-neutral-400">E-mail:</span>
                    <span className="font-mono text-neutral-800 dark:text-neutral-200">suporte@berneck.com.br</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
