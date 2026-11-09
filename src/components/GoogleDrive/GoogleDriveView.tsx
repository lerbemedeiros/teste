import React, { useState, useEffect, useRef } from 'react';
import { 
  Folder, 
  FileText, 
  Table, 
  Image as ImageIcon, 
  Film, 
  Upload, 
  FolderPlus, 
  RefreshCw, 
  Search, 
  Trash2, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  HardDrive, 
  ChevronRight, 
  ArrowLeft,
  X,
  File,
  Filter,
  Grid,
  List as ListIcon,
  LogOut,
  UserCheck
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken 
} from '../../services/googleAuth';
import { 
  listDriveFiles, 
  uploadFileToDrive, 
  createDriveFolder, 
  deleteDriveFile, 
  getDriveAbout, 
  DriveFileItem, 
  DriveAboutResponse, 
  formatFileSize, 
  isFolder, 
  getMimeTypeInfo 
} from '../../services/googleDriveService';

interface GoogleDriveViewProps {
  onSelectFileForArticle?: (file: DriveFileItem) => void;
  selectionMode?: boolean;
}

export const GoogleDriveView: React.FC<GoogleDriveViewProps> = ({
  onSelectFileForArticle,
  selectionMode = false,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Drive Data State
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [driveAbout, setDriveAbout] = useState<DriveAboutResponse | null>(null);

  // Navigation & Filtering
  const [currentFolder, setCurrentFolder] = useState<{ id: string; name: string }>({ id: 'root', name: 'Meu Drive' });
  const [folderHistory, setFolderHistory] = useState<Array<{ id: string; name: string }>>([
    { id: 'root', name: 'Meu Drive' },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals & User Confirmations (MANDATORY for destructive ops)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setNeedsAuth(false);
      },
      () => {
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Drive Files & Storage Info when token or folder changes
  useEffect(() => {
    if (token) {
      loadDriveData();
    }
  }, [token, currentFolder.id, typeFilter]);

  const loadDriveData = async () => {
    setLoading(true);
    try {
      const [filesRes, aboutRes] = await Promise.allSettled([
        listDriveFiles({
          folderId: currentFolder.id,
          searchQuery: searchQuery,
          mimeTypeFilter: typeFilter,
        }),
        getDriveAbout(),
      ]);

      if (filesRes.status === 'fulfilled') {
        setFiles(filesRes.value.files || []);
      } else {
        console.error('Erro ao listar arquivos:', filesRes.reason);
      }

      if (aboutRes.status === 'fulfilled') {
        setDriveAbout(aboutRes.value);
      }
    } catch (err: any) {
      console.error('Erro ao carregar Google Drive:', err);
      showNotice('error', 'Falha ao carregar arquivos do Google Drive.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        showNotice('success', `Conectado com sucesso como ${result.user.email}!`);
      }
    } catch (err: any) {
      console.error('Falha de login com Google:', err);
      setAuthError(err.message || 'Falha ao autenticar com a conta Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setNeedsAuth(true);
    setFiles([]);
    setDriveAbout(null);
    showNotice('success', 'Desconectado do Google Drive.');
  };

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Folder Navigation
  const navigateToFolder = (folder: { id: string; name: string }) => {
    setCurrentFolder(folder);
    setFolderHistory((prev) => [...prev, folder]);
    setSearchQuery('');
  };

  const navigateBack = (index: number) => {
    const target = folderHistory[index];
    const newHistory = folderHistory.slice(0, index + 1);
    setCurrentFolder(target);
    setFolderHistory(newHistory);
    setSearchQuery('');
  };

  // Create New Folder
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      await createDriveFolder(newFolderName.trim(), currentFolder.id);
      showNotice('success', `Pasta "${newFolderName}" criada com sucesso!`);
      setNewFolderName('');
      setIsCreateFolderOpen(false);
      loadDriveData();
    } catch (err: any) {
      showNotice('error', err.message || 'Erro ao criar pasta no Drive.');
    }
  };

  // File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        await uploadFileToDrive(file, currentFolder.id);
      }
      showNotice('success', `${selectedFiles.length} arquivo(s) enviado(s) com sucesso ao Google Drive!`);
      loadDriveData();
    } catch (err: any) {
      showNotice('error', err.message || 'Erro ao enviar arquivo para o Google Drive.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // File Deletion with MANDATORY explicit confirmation dialog (SKILL.md requirement)
  const confirmDeleteFile = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(fileToDelete.id);
      showNotice('success', `"${fileToDelete.name}" foi excluído com sucesso.`);
      setFileToDelete(null);
      loadDriveData();
    } catch (err: any) {
      showNotice('error', err.message || 'Erro ao excluir arquivo.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered files according to local search
  const displayedFiles = files.filter((f) => {
    if (!searchQuery) return true;
    return f.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-7 border border-neutral-200/80 dark:border-neutral-800 shadow-sm transition-colors space-y-6">
      
      {/* 1. Header with Google Drive Branding & Auth Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 gap-4">
        
        {/* Logo and Identity */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center shadow-xs">
            {/* Google Drive SVG Logo */}
            <svg className="w-6 h-6" viewBox="0 0 87.3 78" fill="none">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA"/>
              <path d="M43.65 25 29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.55h27.5z" fill="#00AC47"/>
              <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15 7.9 13.65z" fill="#EA4335"/>
              <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2z" fill="#00832D"/>
              <path d="M59.8 48.55H27.5L13.75 72.35c1.35.8 2.9 1.2 4.45 1.2h50.9c1.55 0 3.1-.4 4.45-1.2z" fill="#2684FC"/>
              <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 23.55h27.5c0-1.55-.4-3.1-1.2-4.5z" fill="#FFBA00"/>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                Google Drive Corporativo
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 rounded-full">
                Workspace Oficial
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Arquivos, normas, apresentações e documentos integrados da Berneck
            </p>
          </div>
        </div>

        {/* User Info or Auth Button */}
        <div className="flex items-center gap-3">
          {user && !needsAuth ? (
            <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800/60 p-2 rounded-xl border border-neutral-200 dark:border-neutral-700">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-emerald-600" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block truncate max-w-[150px]">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono block truncate max-w-[150px]">
                  {user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                title="Desconectar do Google Drive"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Official Sign in with Google Button as mandated by SKILL.md */
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>{isLoggingIn ? 'Conectando...' : 'Conectar com Google'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
          notification.type === 'success' 
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300' 
            : 'bg-red-50 text-red-900 border border-red-200 dark:bg-red-950/70 dark:text-red-300'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Auth Error Banner */}
      {authError && (
        <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{authError}</span>
        </div>
      )}

      {/* 2. Unauthenticated State / Welcome Callout */}
      {needsAuth || !token ? (
        <div className="py-12 px-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-dashed border-neutral-300 dark:border-neutral-700 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mx-auto flex items-center justify-center shadow-md">
            <HardDrive className="w-8 h-8 text-amber-500" />
          </div>
          
          <h3 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">
            Conecte seu Google Drive à Intranet Berneck
          </h3>
          
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
            Acesse seus arquivos, normas técnicas, planilhas da fábrica e relatórios corporativos.
            Você também poderá anexar arquivos do Google Drive diretamente às notícias e comunicados da Berneck com permissão do usuário.
          </p>

          <div className="pt-2">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="px-5 py-3 rounded-xl bg-[#003822] hover:bg-[#002817] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>{isLoggingIn ? 'Autenticando no Google...' : 'Conectar com Conta Google'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* 3. Authenticated Drive Explorer Interface */
        <div className="space-y-4">
          
          {/* Action & Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar arquivos e pastas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'folder', label: 'Pastas' },
                { id: 'pdf', label: 'PDFs' },
                { id: 'docs', label: 'Docs' },
                { id: 'sheets', label: 'Planilhas' },
                { id: 'images', label: 'Imagens' },
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTypeFilter(tf.id)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    typeFilter === tf.id
                      ? 'bg-[#003822] text-white shadow-xs'
                      : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Action Buttons: New Folder, Upload, Refresh */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#003822] hover:bg-[#002817] rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                title="Fazer upload de arquivo para a pasta atual"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-300" />
                <span>{uploading ? 'Enviando...' : 'Enviar Arquivo'}</span>
              </button>

              <button
                onClick={() => setIsCreateFolderOpen(true)}
                className="px-3 py-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Criar nova pasta"
              >
                <FolderPlus className="w-3.5 h-3.5 text-amber-500" />
                <span>Nova Pasta</span>
              </button>

              <button
                onClick={loadDriveData}
                disabled={loading}
                className="p-1.5 text-neutral-500 hover:text-emerald-700 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                title="Atualizar lista de arquivos"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-900">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 ${viewMode === 'grid' ? 'bg-neutral-100 dark:bg-neutral-800 text-emerald-700' : 'text-neutral-400'}`}
                  title="Visualização em Grade"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 ${viewMode === 'table' ? 'bg-neutral-100 dark:bg-neutral-800 text-emerald-700' : 'text-neutral-400'}`}
                  title="Visualização em Lista"
                >
                  <ListIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Breadcrumbs Navigation */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 overflow-x-auto py-1">
            {folderHistory.map((folder, index) => {
              const isLast = index === folderHistory.length - 1;
              return (
                <React.Fragment key={folder.id}>
                  {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
                  <button
                    onClick={() => navigateBack(index)}
                    disabled={isLast}
                    className={`px-2 py-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer ${
                      isLast 
                        ? 'font-bold text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800' 
                        : 'text-emerald-800 dark:text-emerald-400 hover:underline'
                    }`}
                  >
                    {folder.name}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Drive Files Grid or Table */}
          {loading ? (
            <div className="py-16 text-center text-xs text-neutral-400 space-y-2">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-700" />
              <p>Carregando arquivos do Google Drive...</p>
            </div>
          ) : displayedFiles.length === 0 ? (
            <div className="py-16 text-center text-xs text-neutral-400 space-y-2 bg-neutral-50 dark:bg-neutral-800/30 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-700">
              <Folder className="w-8 h-8 text-neutral-300 dark:text-neutral-600 mx-auto" />
              <p className="font-semibold text-neutral-600 dark:text-neutral-300">Nenhum arquivo encontrado nesta pasta.</p>
              <p className="text-[11px] text-neutral-400">Clique em "Enviar Arquivo" para fazer upload de PDFs, planilhas ou documentos.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {displayedFiles.map((file) => {
                const folder = isFolder(file.mimeType);
                const info = getMimeTypeInfo(file.mimeType);

                return (
                  <div
                    key={file.id}
                    onDoubleClick={() => {
                      if (folder) navigateToFolder({ id: file.id, name: file.name });
                      else if (file.webViewLink) window.open(file.webViewLink, '_blank');
                    }}
                    className="group relative p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-600 dark:hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                  >
                    {/* Top Type Badge & Actions */}
                    <div className="flex items-center justify-between pb-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${info.bg} ${info.color}`}>
                        {info.badge}
                      </span>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-neutral-400 hover:text-emerald-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            title="Abrir no Google Drive"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* Delete button triggering confirmation modal */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFileToDelete(file);
                          }}
                          className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950/40"
                          title="Excluir arquivo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Preview / Thumbnail / Icon */}
                    <div 
                      onClick={() => {
                        if (folder) navigateToFolder({ id: file.id, name: file.name });
                      }}
                      className="h-24 w-full rounded-lg bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center overflow-hidden my-1 relative"
                    >
                      {file.thumbnailLink && !folder ? (
                        <img src={file.thumbnailLink} alt={file.name} className="w-full h-full object-cover" />
                      ) : folder ? (
                        <Folder className="w-12 h-12 text-amber-500 drop-shadow-xs" />
                      ) : (
                        <FileText className={`w-10 h-10 ${info.color}`} />
                      )}
                    </div>

                    {/* Name & Size */}
                    <div className="pt-1.5 space-y-0.5">
                      <p 
                        className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors"
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                        <span>{formatFileSize(file.size)}</span>
                        {file.modifiedTime && (
                          <span>{new Date(file.modifiedTime).toLocaleDateString('pt-BR')}</span>
                        )}
                      </div>
                    </div>

                    {/* Selection Action if in News modal */}
                    {selectionMode && onSelectFileForArticle && !folder && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFileForArticle(file);
                        }}
                        className="mt-2 w-full py-1 text-[11px] font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors text-center"
                      >
                        Anexar à Notícia
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 font-semibold border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th className="p-3">Nome</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Tamanho</th>
                    <th className="p-3">Modificado</th>
                    <th className="p-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-medium">
                  {displayedFiles.map((file) => {
                    const folder = isFolder(file.mimeType);
                    const info = getMimeTypeInfo(file.mimeType);

                    return (
                      <tr 
                        key={file.id} 
                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors group cursor-pointer"
                        onDoubleClick={() => {
                          if (folder) navigateToFolder({ id: file.id, name: file.name });
                          else if (file.webViewLink) window.open(file.webViewLink, '_blank');
                        }}
                      >
                        <td className="p-3 flex items-center gap-2.5">
                          {folder ? (
                            <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                          ) : (
                            <FileText className={`w-4 h-4 ${info.color} shrink-0`} />
                          )}
                          <span className="font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 truncate max-w-md">
                            {file.name}
                          </span>
                        </td>
                        <td className="p-3 text-neutral-500 text-[11px]">
                          {info.label}
                        </td>
                        <td className="p-3 text-neutral-400 font-mono text-[11px]">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="p-3 text-neutral-400 font-mono text-[11px]">
                          {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('pt-BR') : '—'}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-400 hover:text-emerald-700 inline-block p-1"
                              title="Abrir no Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => setFileToDelete(file)}
                            className="text-neutral-400 hover:text-red-600 inline-block p-1"
                            title="Excluir arquivo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Storage Quota Footer */}
          {driveAbout && driveAbout.storageQuota && (
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-700" />
                <span>
                  Armazenamento Google Drive: <strong>{formatFileSize(driveAbout.storageQuota.usage)}</strong> utilizados de{' '}
                  <strong>{formatFileSize(driveAbout.storageQuota.limit)}</strong>
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono">
                Conta conectada: {driveAbout.user.emailAddress}
              </span>
            </div>
          )}

        </div>
      )}

      {/* MODAL: Nova Pasta */}
      {isCreateFolderOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-sm w-full p-5 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Criar Nova Pasta</h4>
              </div>
              <button onClick={() => setIsCreateFolderOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Nome da Pasta
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Comunicados RH 2025"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateFolderOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#003822] hover:bg-[#002817] rounded-lg shadow-xs"
                >
                  Criar Pasta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY EXPLICIT CONFIRMATION MODAL FOR DESTRUCTIVE OPERATIONS (SKILL.md) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-md w-full p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 flex items-center justify-center mx-auto text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">
                Confirmar Exclusão no Google Drive?
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Você tem certeza de que deseja excluir o item{' '}
                <strong className="text-neutral-900 dark:text-neutral-100">"{fileToDelete.name}"</strong> do seu Google Drive?
                Esta ação moverá o arquivo para a lixeira do Google Drive com sua autorização.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Excluindo...' : 'Confirmar e Excluir'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
