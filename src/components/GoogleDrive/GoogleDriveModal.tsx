import React from 'react';
import { X, HardDrive } from 'lucide-react';
import { GoogleDriveView } from './GoogleDriveView';
import { DriveFileItem } from '../../services/googleDriveService';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile?: (file: DriveFileItem) => void;
  selectionMode?: boolean;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  onSelectFile,
  selectionMode = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-5xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center border border-amber-200 dark:border-amber-900/50">
              <HardDrive className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {selectionMode ? 'Selecionar Arquivo do Google Drive' : 'Google Drive Berneck'}
              </h3>
              <p className="text-[11px] text-neutral-400">
                {selectionMode 
                  ? 'Escolha um arquivo do Drive para vincular à matéria de notícias' 
                  : 'Gerenciador de arquivos em nuvem corporativo'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <GoogleDriveView
            selectionMode={selectionMode}
            onSelectFileForArticle={(file) => {
              if (onSelectFile) {
                onSelectFile(file);
                onClose();
              }
            }}
          />
        </div>

      </div>
    </div>
  );
};
