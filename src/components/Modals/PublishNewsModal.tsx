import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Image, 
  Video, 
  Paperclip, 
  FileText, 
  CheckCircle, 
  Sparkles,
  Layers,
  HardDrive
} from 'lucide-react';
import { NewsArticle, ArticleAttachment, ArticleGalleryItem } from '../../types';
import { GoogleDriveModal } from '../GoogleDrive/GoogleDriveModal';
import { DriveFileItem, formatFileSize } from '../../services/googleDriveService';

interface PublishNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newArticle: NewsArticle) => void;
}

export const PublishNewsModal: React.FC<PublishNewsModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [contentParagraphs, setContentParagraphs] = useState('');
  const [category, setCategory] = useState<NewsArticle['category']>('Destaque');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80');
  const [isFeatured, setIsFeatured] = useState(false);
  
  // Video state
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  const [videoTitle, setVideoTitle] = useState('Vídeo Institucional Berneck');
  const [videoDuration, setVideoDuration] = useState('02:40 min');

  // Gallery state
  const [gallery, setGallery] = useState<ArticleGalleryItem[]>([
    {
      id: 'g-1',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Espaço com painéis melamínicos Berneck',
    },
    {
      id: 'g-2',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      caption: 'Linha fabril de prensagem de alta precisão',
    },
  ]);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');

  // Attachments state
  const [attachments, setAttachments] = useState<ArticleAttachment[]>([
    {
      id: 'att-demo-1',
      name: 'Comunicado_Oficial_Berneck.pdf',
      format: 'PDF',
      size: '1.8 MB',
      description: 'Documento homologado pela diretoria.',
    },
  ]);
  const [newDocName, setNewDocName] = useState('');
  const [newDocFormat, setNewDocFormat] = useState<ArticleAttachment['format']>('PDF');
  const [newDocSize, setNewDocSize] = useState('1.2 MB');

  const [published, setPublished] = useState(false);
  const [isDrivePickerOpen, setIsDrivePickerOpen] = useState(false);

  const handleSelectDriveFile = (file: DriveFileItem) => {
    let fmt: ArticleAttachment['format'] = 'PDF';
    if (file.mimeType.includes('sheet') || file.mimeType.includes('excel') || file.mimeType.includes('csv')) {
      fmt = 'XLSX';
    } else if (file.mimeType.includes('word') || file.mimeType.includes('document')) {
      fmt = 'DOCX';
    } else if (file.mimeType.includes('presentation') || file.mimeType.includes('powerpoint')) {
      fmt = 'ZIP';
    }
    const att: ArticleAttachment = {
      id: `drive-${file.id}`,
      name: file.name,
      format: fmt,
      size: formatFileSize(file.size),
      description: `Sincronizado via Google Drive`,
    };
    setAttachments((prev) => [...prev, att]);
  };

  if (!isOpen) return null;

  const handleAddGalleryItem = () => {
    if (!newGalleryUrl.trim()) return;
    const item: ArticleGalleryItem = {
      id: `gal-${Date.now()}`,
      url: newGalleryUrl.trim(),
      caption: newGalleryCaption.trim() || 'Foto da galeria',
    };
    setGallery([...gallery, item]);
    setNewGalleryUrl('');
    setNewGalleryCaption('');
  };

  const handleRemoveGalleryItem = (id: string) => {
    setGallery(gallery.filter((g) => g.id !== id));
  };

  const handleAddAttachment = () => {
    if (!newDocName.trim()) return;
    const item: ArticleAttachment = {
      id: `att-${Date.now()}`,
      name: newDocName.trim().endsWith(`.${newDocFormat.toLowerCase()}`) 
        ? newDocName.trim() 
        : `${newDocName.trim()}.${newDocFormat.toLowerCase()}`,
      format: newDocFormat,
      size: newDocSize.trim() || '1.0 MB',
      description: 'Documento disponível para download na intranet.',
    };
    setAttachments([...attachments, item]);
    setNewDocName('');
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const parsedContent = contentParagraphs.trim()
      ? contentParagraphs.split('\n\n').filter((p) => p.trim())
      : [summary];

    const today = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date());

    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      summary: summary.trim(),
      content: parsedContent,
      category,
      date: today,
      readTime: '3 min de leitura',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      author: 'Comunicação Interna & Marketing Berneck',
      featured: isFeatured,
      likes: 1,
      views: 12,
      commentsCount: 0,
      video: hasVideo ? {
        url: videoUrl.trim(),
        title: videoTitle.trim(),
        duration: videoDuration.trim(),
      } : undefined,
      gallery: gallery.length > 0 ? gallery : undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    onPublish(newArticle);
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-[#003822] text-white">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="text-sm font-bold">Publicar Nova Notícia / Comunicado Multimídia</h3>
              <p className="text-xs text-emerald-200">Portal de Comunicação Interna & Marketing Berneck</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {published ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Notícia Publicada com Sucesso!
            </h4>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              A matéria foi adicionada ao mural de notícias corporativas com todos os vídeos, galeria de fotos e anexos para download.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 text-xs">
            
            {/* Basic Info */}
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Título da Notícia *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Berneck inaugura nova linha de prensagem de alta velocidade..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Categoria *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NewsArticle['category'])}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Destaque">Destaque Corporativo</option>
                    <option value="Institucional">Institucional</option>
                    <option value="Sustentabilidade">Sustentabilidade & Meio Ambiente</option>
                    <option value="Endomarketing">Endomarketing & Campanhas Internas</option>
                    <option value="RH">Gente & Gestão (RH)</option>
                    <option value="Comunicado">Comunicado Oficial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    URL da Imagem de Capa
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Subtítulo / Linha Fina (Opcional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Resumo em uma linha para a manchete..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Resumo / Lead *
                </label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Breve resumo que aparece no card da notícia..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Texto Completo da Notícia (separe parágrafos com linha em branco)
                </label>
                <textarea
                  rows={4}
                  value={contentParagraphs}
                  onChange={(e) => setContentParagraphs(e.target.value)}
                  placeholder="Escreva os parágrafos completos da matéria..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-sans"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-emerald-800 rounded focus:ring-emerald-600"
                />
                <label htmlFor="featured-check" className="text-neutral-700 dark:text-neutral-300 font-medium">
                  Marcar como Notícia em Destaque Principal do Portal
                </label>
              </div>
            </div>

            {/* Video Section Toggle */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">Vídeo Incorporado na Matéria</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasVideo(!hasVideo)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    hasVideo 
                      ? 'bg-emerald-800 text-white' 
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {hasVideo ? 'Vídeo Ativado' : '+ Adicionar Vídeo'}
                </button>
              </div>

              {hasVideo && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                      URL do Vídeo (YouTube embed ou MP4 corporativo)
                    </label>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                      Título do Vídeo
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Ex: Cobertura em vídeo"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Photo Gallery Section */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    Galeria de Fotos ({gallery.length} fotos adicionadas)
                  </span>
                </div>
              </div>

              {/* List of current photos */}
              {gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {gallery.map((g) => (
                    <div key={g.id} className="relative group rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 aspect-video bg-neutral-200">
                      <img src={g.url} alt={g.caption} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5 text-white text-[10px]">
                        <span className="line-clamp-2">{g.caption}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryItem(g.id)}
                          className="self-end p-1 text-red-400 hover:text-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add photo input */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <div className="sm:col-span-6">
                  <input
                    type="url"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="URL da foto (ex: https://...)"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={newGalleryCaption}
                    onChange={(e) => setNewGalleryCaption(e.target.value)}
                    placeholder="Legenda da foto..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddGalleryItem}
                    className="w-full py-1.5 px-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Foto
                  </button>
                </div>
              </div>
            </div>

            {/* Attachments / Download Files Section */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    Arquivos para Download (PDF, DOC, XLSX, ZIP)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDrivePickerOpen(true)}
                    className="px-2.5 py-1 text-[11px] font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-amber-300 dark:border-amber-800"
                    title="Vincular arquivo do seu Google Drive corporativo"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Selecionar do Google Drive</span>
                  </button>
                  <span className="text-[11px] text-neutral-400 font-mono">{attachments.length} anexos</span>
                </div>
              </div>

              {/* List of current attachments */}
              {attachments.length > 0 && (
                <div className="space-y-1.5">
                  {attachments.map((att) => (
                    <div 
                      key={att.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
                          att.format === 'PDF' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' 
                            : att.format === 'DOC' || att.format === 'DOCX'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {att.format}
                        </span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">{att.name}</span>
                        <span className="text-neutral-400 font-mono text-[11px]">({att.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(att.id)}
                        className="text-neutral-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add attachment inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <div className="sm:col-span-6">
                  <input
                    type="text"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="Nome do arquivo (ex: Relatório_2025)"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <select
                    value={newDocFormat}
                    onChange={(e) => setNewDocFormat(e.target.value as ArticleAttachment['format'])}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="DOC">DOC</option>
                    <option value="XLSX">XLSX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={newDocSize}
                    onChange={(e) => setNewDocSize(e.target.value)}
                    placeholder="Ex: 2.4 MB"
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="w-full py-1.5 px-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Anexo
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Publicar Notícia Agora
              </button>
            </div>
          </form>
        )}
      </div>

      <GoogleDriveModal
        isOpen={isDrivePickerOpen}
        onClose={() => setIsDrivePickerOpen(false)}
        selectionMode={true}
        onSelectFile={handleSelectDriveFile}
      />
    </div>
  );
};
