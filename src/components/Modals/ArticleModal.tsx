import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark, 
  Check, 
  Video, 
  Image as ImageIcon, 
  Download, 
  FileText, 
  Heart, 
  Eye, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Sparkles,
  Send,
  Layers
} from 'lucide-react';
import { NewsArticle, ArticleAttachment, ArticleGalleryItem } from '../../types';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'image' | 'video' | 'gallery'>('image');
  
  // Gallery Lightbox state
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Like & Comment state
  const [likesCount, setLikesCount] = useState<number>(article?.likes || 42);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Array<{ id: string; author: string; role: string; text: string; time: string }>>([
    {
      id: 'c-1',
      author: 'Carolina Mendes Ramos',
      role: 'Controladoria · Araucária',
      text: 'Excelente iniciativa! É muito gratificante ver a empresa investindo em sustentabilidade e na modernização fabril.',
      time: 'Há 2 horas',
    },
    {
      id: 'c-2',
      author: 'Rafael Silveira',
      role: 'Produção MDF · Curitibanos',
      text: 'Excelente iniciativa de endomarketing! O reconhecimento entre equipes faz toda a diferença no dia a dia.',
      time: 'Há 45 min',
    },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleLike = () => {
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newC = {
      id: `c-${Date.now()}`,
      author: 'Lucas Almeida',
      role: 'Marketing AUC · Araucária',
      text: newCommentText.trim(),
      time: 'Agora mesmo',
    };
    setComments([newC, ...comments]);
    setNewCommentText('');
  };

  const handleDownloadAttachment = (att: ArticleAttachment) => {
    const element = document.createElement("a");
    const file = new Blob([
      `BERNECK S.A. PAINÉIS E SERRADOS\nARQUIVO ANEXO: ${att.name}\nFORMATO: ${att.format}\nTAMANHO: ${att.size}\nDOCUMENTO OFICIAL DA NOTÍCIA: "${article.title}"\nDATA DE EMISSÃO: ${article.date}\n\nEste documento é de uso interno corporativo Berneck.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = att.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const hasVideo = !!article.video;
  const hasGallery = !!(article.gallery && article.gallery.length > 0);
  const hasAttachments = !!(article.attachments && article.attachments.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold">
              {article.category}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-500 font-normal">{article.readTime}</span>
            {article.views && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-neutral-500 font-normal flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {article.views} visualizações
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              title={bookmarked ? "Salvo" : "Salvar notícia"}
              className={`p-2 rounded-lg transition-colors ${
                bookmarked 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                  : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Copiar link da notícia"
              className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Media Switcher Tab Bar (Cap / Vídeo / Galeria) */}
          {(hasVideo || hasGallery) && (
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl w-fit text-xs font-semibold">
              <button
                onClick={() => setActiveMediaTab('image')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeMediaTab === 'image' 
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Foto de Capa</span>
              </button>

              {hasVideo && (
                <button
                  onClick={() => setActiveMediaTab('video')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeMediaTab === 'video' 
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-red-600" />
                  <span>Assistir ao Vídeo</span>
                  <span className="text-[10px] font-mono text-neutral-400">({article.video?.duration || 'HD'})</span>
                </button>
              )}

              {hasGallery && (
                <button
                  onClick={() => setActiveMediaTab('gallery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeMediaTab === 'gallery' 
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Galeria de Fotos ({article.gallery?.length})</span>
                </button>
              )}
            </div>
          )}

          {/* Media Stage: Image vs Video vs Gallery */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            {activeMediaTab === 'image' && (
              <div className="relative aspect-video max-h-[420px] w-full overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                  <span className="px-3 py-1 text-xs font-bold bg-[#003822]/90 backdrop-blur-md rounded-lg shadow-sm">
                    Berneck Notícias Corporativas
                  </span>
                </div>
              </div>
            )}

            {activeMediaTab === 'video' && article.video && (
              <div className="relative aspect-video max-h-[440px] w-full bg-neutral-950 flex flex-col justify-between">
                <div className="p-3 bg-black/60 text-white flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-500" /> {article.video.title}
                  </span>
                  <span className="font-mono text-neutral-400">{article.video.duration}</span>
                </div>
                
                <div className="flex-1 flex items-center justify-center p-4">
                  <iframe
                    src={article.video.url}
                    title={article.video.title}
                    className="w-full h-full rounded-xl border border-neutral-800"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {activeMediaTab === 'gallery' && article.gallery && (
              <div className="p-4 bg-neutral-950 text-white space-y-3">
                {/* Featured active picture */}
                <div className="relative aspect-video max-h-[380px] w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src={article.gallery[activeGalleryIndex].url}
                    alt={article.gallery[activeGalleryIndex].caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex justify-between items-end">
                    <p className="text-xs sm:text-sm text-neutral-100 font-medium">
                      {article.gallery[activeGalleryIndex].caption}
                    </p>
                    <span className="text-xs font-mono bg-black/50 px-2 py-0.5 rounded text-neutral-300">
                      {activeGalleryIndex + 1} / {article.gallery.length}
                    </span>
                  </div>

                  {/* Nav arrows */}
                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : article.gallery!.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev < article.gallery!.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnails strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {article.gallery.map((g, idx) => (
                    <button
                      key={g.id}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeGalleryIndex === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={g.url} alt={g.caption} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Headline & Meta */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-snug tracking-tight">
              {article.title}
            </h2>
            
            {article.subtitle && (
              <p className="mt-2.5 text-base text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                {article.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                <User className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Text Content */}
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base border-t border-neutral-100 dark:border-neutral-800 pt-6">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="first-of-type:font-medium first-of-type:text-neutral-900 dark:first-of-type:text-neutral-100 first-of-type:text-base md:first-of-type:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* PHOTO GALLERY GRID (When not in tab view or for inline browsing) */}
          {hasGallery && (
            <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  Galeria de Imagens da Matéria
                </h4>
                <span className="text-xs text-neutral-400">{article.gallery!.length} fotografias</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {article.gallery!.map((photo, i) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setActiveGalleryIndex(i);
                      setActiveMediaTab('gallery');
                    }}
                    className="group relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 cursor-pointer shadow-xs hover:shadow-md transition-all"
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Maximize2 className="w-5 h-5 drop-shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ATTACHMENTS & DOWNLOADABLE FILES (PDF, DOC, XLS) */}
          {hasAttachments && (
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  Arquivos e Documentos para Download ({article.attachments!.length})
                </h4>
                <span className="text-[11px] text-neutral-500">Documentos verificados</span>
              </div>

              <div className="space-y-2">
                {article.attachments!.map((att) => {
                  const formatColor = att.format === 'PDF' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-200' 
                    : att.format === 'DOC' || att.format === 'DOCX'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200';

                  return (
                    <div
                      key={att.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-600 transition-colors shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`px-2.5 py-1 text-xs font-bold font-mono rounded-lg border ${formatColor} shrink-0`}>
                          {att.format}
                        </span>
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-neutral-900 dark:text-neutral-100 truncate">
                            {att.name}
                          </h5>
                          {att.description && (
                            <p className="text-[11px] text-neutral-500 truncate">
                              {att.description}
                            </p>
                          )}
                          <span className="text-[10px] text-neutral-400 font-mono">Tamanho: {att.size}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadAttachment(att)}
                        className="px-3.5 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer ml-3"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Social Feedback Bar (Curtir & Comentários) */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleLike}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  hasLiked
                    ? 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/40 dark:border-red-900'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{hasLiked ? 'Você curtiu' : 'Curtir'} ({likesCount})</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <MessageSquare className="w-4 h-4" />
                <span>{comments.length} comentários</span>
              </div>
            </div>

            <div className="text-xs text-neutral-400">
              Canal de Comunicação Oficial · Berneck Araucária
            </div>
          </div>

          {/* Interactive Comments Thread */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Comentários dos Colaboradores ({comments.length})
            </h4>

            {/* Comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Deixe uma mensagem ou parabenize a equipe..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Comentar</span>
              </button>
            </form>

            {/* Comments list */}
            <div className="space-y-2.5">
              {comments.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">{c.author}</span>
                      <span className="text-[10px] text-neutral-400">{c.role}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">{c.time}</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
          <span className="text-xs text-neutral-500 font-medium">
            Berneck S.A. · Departamento de Marketing & Comunicação Interna
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Fechar Matéria
          </button>
        </div>
      </div>
    </div>
  );
};
