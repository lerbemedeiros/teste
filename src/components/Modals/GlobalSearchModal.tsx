import React, { useState, useEffect } from 'react';
import { Search, X, User, FileText, Newspaper, Phone, ArrowRight, CornerDownLeft } from 'lucide-react';
import { mockNewsArticles, mockDocuments, mockTrainings, mockEmployees } from '../../data/mockData';
import { NewsArticle, DocumentItem, TrainingItem } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onSelectTraining: (training: TrainingItem) => void;
  onSelectDocument: (doc: DocumentItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectTraining,
  onSelectDocument,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled in parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredNews = q
    ? mockNewsArticles.filter((n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q))
    : mockNewsArticles.slice(0, 2);

  const filteredDocs = q
    ? mockDocuments.filter((d) => d.title.toLowerCase().includes(q) || d.code.toLowerCase().includes(q))
    : mockDocuments.slice(0, 3);

  const filteredTrainings = q
    ? mockTrainings.filter((t) => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
    : mockTrainings.slice(0, 2);

  const employeesList = Object.values(mockEmployees).filter(
    (e) => !q || e.name.toLowerCase().includes(q) || e.extension.includes(q) || e.department.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800 gap-3">
          <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você procura? Ramal, colega, holerite, política, crachá, benefício..."
            className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 text-xs">
          {/* Colaboradores / Ramais */}
          {employeesList.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 block">
                Colaboradores & Ramais
              </span>
              <div className="space-y-1">
                {employeesList.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">{emp.name}</p>
                        <p className="text-[11px] text-neutral-500">{emp.role} · {emp.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-mono font-medium">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Ramal {emp.extension}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notícias */}
          {filteredNews.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 block">
                Notícias & Comunicados
              </span>
              <div className="space-y-1">
                {filteredNews.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Newspaper className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                      <div className="max-w-md">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {article.title}
                        </p>
                        <span className="text-[10px] text-neutral-400">{article.category} · {article.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentos & Normativas */}
          {filteredDocs.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 block">
                Documentos, Manuais & Normativas
              </span>
              <div className="space-y-1">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDocument(doc);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <div className="max-w-md">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {doc.title}
                        </p>
                        <span className="text-[10px] text-neutral-400 font-mono">{doc.code} · {doc.format} ({doc.fileSize})</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Treinamentos */}
          {filteredTrainings.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 block">
                Cursos & E-Learning
              </span>
              <div className="space-y-1">
                {filteredTrainings.map((trn) => (
                  <div
                    key={trn.id}
                    onClick={() => {
                      onSelectTraining(trn);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                      <div className="max-w-md">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {trn.title}
                        </p>
                        <span className="text-[10px] text-neutral-400">{trn.type} · {trn.duration}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredNews.length === 0 && filteredDocs.length === 0 && filteredTrainings.length === 0 && employeesList.length === 0 && (
            <div className="py-8 text-center text-neutral-400">
              <p>Nenhum resultado encontrado para "{query}".</p>
              <p className="text-[11px] mt-1">Tente buscar por "ponto", "holerite", "crachá", "Lucas" ou "benefícios".</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/60 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Pressione <kbd className="font-mono text-neutral-600 dark:text-neutral-300">↑</kbd> <kbd className="font-mono text-neutral-600 dark:text-neutral-300">↓</kbd> para navegar</span>
          <span className="flex items-center gap-1">Pressione <CornerDownLeft className="w-3 h-3" /> para abrir</span>
        </div>
      </div>
    </div>
  );
};
