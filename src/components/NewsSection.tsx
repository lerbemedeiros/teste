import React, { useState } from 'react';
import { 
  Megaphone, 
  ChevronRight, 
  Plus, 
  Video, 
  Image as ImageIcon, 
  Paperclip,
  Calendar, 
  Clock, 
  Heart,
  MessageSquare,
  Eye,
  Flame,
  Radio,
  FileText,
  Filter,
  CheckCircle2,
  Share2,
  Sparkles
} from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsSectionProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onViewAllNews: () => void;
  onOpenPublishModal: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  onSelectArticle,
  onViewAllNews,
  onOpenPublishModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeTickerIndex, setActiveTickerIndex] = useState<number>(0);

  const categories = [
    { label: 'Todas as Notícias', value: 'Todas' },
    { label: 'Destaques', value: 'Destaque' },
    { label: 'Endomarketing', value: 'Endomarketing' },
    { label: 'Gente & Gestão', value: 'RH' },
    { label: 'Segurança SESMT', value: 'Segurança' },
    { label: 'Sustentabilidade', value: 'Sustentabilidade' },
  ];

  // Plantão / Breaking Ticker items based on actual corporate updates
  const tickerItems = [
    { text: 'Campanha "Gente que Faz a Berneck" homenageia trajetórias de colaboradores de Araucária e SC', category: 'Endomarketing', id: 'news-4' },
    { text: 'SIPATMA 2025: Inscrições abertas para oficinas práticas e palestras de segurança', category: 'Segurança', id: 'news-3' },
    { text: 'Reajuste anual do Plano de Saúde Paraná Clínicas homologado sem alteração de coparticipação', category: 'RH', id: 'news-5' },
    { text: 'Ações de preservação ambiental reforçam manejo certificado FSC® em Santa Catarina', category: 'Sustentabilidade', id: 'news-2' },
  ];

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'Todas'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  // Pick lead hero article (explicitly featured or first in list)
  const leadArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0] || articles[0];

  // Pick secondary articles for the grid
  const secondaryArticles = filteredArticles
    .filter((a) => a.id !== leadArticle?.id)
    .slice(0, 4);

  // Backfill if filter has fewer articles so layout remains rich
  const displaySecondary = secondaryArticles.length > 0
    ? secondaryArticles
    : articles.filter((a) => a.id !== leadArticle?.id).slice(0, 4);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-7 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-5 transition-colors">
      
      {/* 1. PORTAL MASTHEAD / CABEÇALHO EDITORIAL DO PORTAL DE NOTÍCIAS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 gap-4">
        
        {/* Masthead Branding & Live Indicator */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#003822] text-white flex items-center justify-center shrink-0 shadow-md">
            <Megaphone className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                Portal de Notícias Berneck
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                COMUNICAÇÃO INTERNA ATIVA
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              O ponto de encontro diário de Endomarketing, Gente & Gestão, Segurança e Sustentabilidade
            </p>
          </div>
        </div>

        {/* Action Controls: Publicar Notícia + Ver Arquivo */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <button
            onClick={onOpenPublishModal}
            className="px-4 py-2 text-xs font-bold text-white bg-[#003822] hover:bg-[#002817] active:scale-98 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer border border-emerald-900/40"
            title="Publicar matéria com fotos, vídeos do YouTube e anexos para download"
          >
            <Plus className="w-4 h-4 text-emerald-300" />
            <span>Publicar Notícia</span>
          </button>

          <button
            onClick={onViewAllNews}
            className="px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-emerald-800 dark:hover:text-emerald-400 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>Ver Arquivo</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. PLANTÃO INTERNO / BREAKING NEWS TICKER */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 rounded-xl text-xs overflow-hidden">
        <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300 shrink-0 uppercase tracking-wider text-[11px]">
          <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span>Plantão Interno:</span>
        </div>

        <div className="flex-1 truncate">
          <button
            onClick={() => {
              const matched = articles.find((a) => a.id === tickerItems[activeTickerIndex].id);
              if (matched) onSelectArticle(matched);
            }}
            className="text-neutral-800 dark:text-neutral-200 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors truncate font-medium text-left cursor-pointer hover:underline block w-full"
          >
            <span className="font-semibold text-emerald-700 dark:text-emerald-400 mr-2">
              [{tickerItems[activeTickerIndex].category}]
            </span>
            {tickerItems[activeTickerIndex].text}
          </button>
        </div>

        {/* Ticker dots navigation */}
        <div className="flex items-center gap-1 shrink-0">
          {tickerItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTickerIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeTickerIndex === idx 
                  ? 'bg-emerald-700 dark:bg-emerald-400 w-4' 
                  : 'bg-emerald-300 dark:bg-emerald-800 hover:bg-emerald-500'
              }`}
              title={`Aviso ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 3. CATEGORY / EDITORIAL FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          const count = cat.value === 'Todas' 
            ? articles.length 
            : articles.filter((a) => a.category === cat.value).length;

          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#003822] text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isActive 
                  ? 'bg-emerald-700 text-emerald-100' 
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. SUPER DESTAQUE DE CAPA DO PORTAL (LEAD STORY / MANCHETÃO MULTIMÍDIA) */}
      {leadArticle && (
        <div 
          onClick={() => onSelectArticle(leadArticle)}
          className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 hover:border-emerald-700 dark:hover:border-emerald-500 transition-all relative flex flex-col justify-end bg-neutral-900 shadow-sm hover:shadow-xl min-h-[340px] sm:min-h-[420px]"
        >
          {/* Main Hero Photo with Ken-Burns hover zoom */}
          <img
            src={leadArticle.imageUrl}
            alt={leadArticle.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Smooth Multi-Stop Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20 pointer-events-none" />

          {/* Top Bar: Floating Badges (Category + Media Cluster) */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
            <span className="px-3 py-1.5 text-xs font-black text-white bg-[#003822]/95 backdrop-blur-md rounded-lg shadow-md border border-emerald-600/40 flex items-center gap-1.5 uppercase tracking-wide">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              {leadArticle.category}
            </span>

            {/* Media Tags Pills Cluster */}
            <div className="flex flex-wrap items-center gap-2">
              {leadArticle.video && (
                <span className="px-2.5 py-1 text-xs font-bold text-white bg-red-600/95 backdrop-blur-md rounded-lg flex items-center gap-1.5 shadow-md">
                  <Video className="w-3.5 h-3.5" />
                  <span>Vídeo Oficial</span>
                  {leadArticle.video.duration && (
                    <span className="text-[10px] opacity-80 font-mono">({leadArticle.video.duration})</span>
                  )}
                </span>
              )}
              {leadArticle.gallery && leadArticle.gallery.length > 0 && (
                <span className="px-2.5 py-1 text-xs font-bold text-white bg-black/70 backdrop-blur-md rounded-lg flex items-center gap-1.5 shadow-md border border-white/20">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{leadArticle.gallery.length} Fotos em Galeria</span>
                </span>
              )}
              {leadArticle.attachments && leadArticle.attachments.length > 0 && (
                <span className="px-2.5 py-1 text-xs font-bold text-white bg-blue-900/80 backdrop-blur-md rounded-lg flex items-center gap-1.5 shadow-md border border-blue-400/30">
                  <Paperclip className="w-3.5 h-3.5 text-blue-300" />
                  <span>{leadArticle.attachments.length} Anexos para Download</span>
                </span>
              )}
            </div>
          </div>

          {/* Bottom Editorial Content */}
          <div className="relative z-10 p-5 sm:p-7 text-white space-y-3 max-w-4xl">
            
            {/* Meta Row: Date, Reading Time, Author */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-300 font-medium">
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {leadArticle.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {leadArticle.readTime}
              </span>
              <span>·</span>
              <span className="font-semibold text-white/90">
                {leadArticle.author}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-white group-hover:text-emerald-200 transition-colors drop-shadow-sm">
              {leadArticle.title}
            </h3>

            {/* Summary Excerpt */}
            <p className="text-xs sm:text-sm text-neutral-200/95 leading-relaxed line-clamp-2 max-w-3xl">
              {leadArticle.summary}
            </p>

            {/* Interactive Bottom Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 text-xs">
              <div className="flex items-center gap-4 text-neutral-300 font-mono">
                {leadArticle.likes && (
                  <span className="flex items-center gap-1 text-red-300">
                    <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                    <span>{leadArticle.likes}</span>
                  </span>
                )}
                {leadArticle.commentsCount && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{leadArticle.commentsCount} comentários</span>
                  </span>
                )}
                {leadArticle.views && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{leadArticle.views} leituras</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {leadArticle.attachments && leadArticle.attachments.length > 0 && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-blue-200 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-400/20">
                    <Paperclip className="w-3 h-3" />
                    {leadArticle.attachments[0].name}
                  </span>
                )}
                <span className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-1.5 shadow group-hover:translate-x-1">
                  <span>Ler Matéria Completa</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. GRADE EDITORIAL DE NOTÍCIAS RECENTES (SECONDARY NEWS GRID - 4 CARTOES RICOS) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Outras Matérias & Informativos Internos
            </h4>
            <span className="text-xs text-neutral-400 font-normal">
              ({displaySecondary.length} reportagens)
            </span>
          </div>

          <button
            onClick={onViewAllNews}
            className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver arquivo completo</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Grid of 2 columns on desktop (or 4 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displaySecondary.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-700/60 dark:hover:border-emerald-500/60 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/60 transition-all flex flex-col sm:flex-row gap-4 bg-white dark:bg-neutral-900 shadow-xs hover:shadow-md"
            >
              {/* Thumbnail Container */}
              <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800 relative shadow-inner">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay Media Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-black/70 backdrop-blur-md rounded shadow-xs">
                    {article.category}
                  </span>
                </div>

                {article.video && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Video className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Bottom right indicator on thumbnail */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  {article.gallery && article.gallery.length > 0 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-black/80 rounded flex items-center gap-1">
                      <ImageIcon className="w-2.5 h-2.5 text-emerald-400" />
                      {article.gallery.length}
                    </span>
                  )}
                  {article.attachments && article.attachments.length > 0 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-blue-900/90 rounded flex items-center gap-1">
                      <Paperclip className="w-2.5 h-2.5 text-blue-300" />
                      {article.attachments.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1.5">
                
                {/* Meta header */}
                <div className="flex items-center justify-between gap-1 text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-400" />
                    {article.date}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                {/* Title */}
                <h5 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h5>

                {/* Summary */}
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>

                {/* Footer bar with attachments preview & likes */}
                <div className="pt-1.5 flex items-center justify-between text-xs border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-mono">
                    {article.likes && (
                      <span className="flex items-center gap-1 text-red-500">
                        <Heart className="w-3 h-3 fill-red-500" />
                        {article.likes}
                      </span>
                    )}
                    {article.attachments && article.attachments.length > 0 && (
                      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                        <Paperclip className="w-3 h-3" />
                        {article.attachments[0].format}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Ler notícia →
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
