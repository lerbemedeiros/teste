import React from 'react';
import { 
  Calendar, 
  Phone, 
  MapPin, 
  BadgeCheck, 
  MessageSquare, 
  Linkedin, 
  Instagram, 
  ExternalLink,
  Briefcase,
  Hash
} from 'lucide-react';
import { Employee } from '../types';

interface CollaboratorCardProps {
  employee: Employee;
  onOpenContactRH: () => void;
  onOpenProfileModal: () => void;
}

export const CollaboratorCard: React.FC<CollaboratorCardProps> = ({
  employee,
  onOpenContactRH,
  onOpenProfileModal,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-between transition-colors h-full">
      
      {/* Top Profile Lockup */}
      <div className="flex flex-col items-center text-center">
        {/* Avatar with Online indicator */}
        <div className="relative mb-3.5">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-md ring-2 ring-emerald-700/30"
          />
          <span 
            className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-neutral-900 rounded-full" 
            title="Colaborador Ativo / Online"
          />
        </div>

        {/* Name and Role */}
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-1.5 justify-center">
          {employee.name}
          <BadgeCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        </h2>
        
        <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mt-0.5">
          {employee.role}
        </p>

        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          {employee.department}
        </p>
      </div>

      {/* Metadata Attributes Grid */}
      <div className="my-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5 text-xs">
        
        <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-2 text-neutral-500">
            <Hash className="w-3.5 h-3.5 text-neutral-400" />
            <span>Matrícula:</span>
          </div>
          <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
            {employee.registration}
          </span>
        </div>

        <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-2 text-neutral-500">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Admissão:</span>
          </div>
          <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
            {employee.admissionDate}
          </span>
        </div>

        <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-2 text-neutral-500">
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            <span>Ramal Interno:</span>
          </div>
          <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">
            {employee.extension}
          </span>
        </div>

        <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
          <div className="flex items-center gap-2 text-neutral-500">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>Localidade:</span>
          </div>
          <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[130px] text-right">
            {employee.location}
          </span>
        </div>
      </div>

      {/* Social / Direct Channels */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-2">
          Canais Corporativos
        </span>
        <div className="flex items-center justify-center gap-2">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profissional"
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-[#0077B5] hover:text-white flex items-center justify-center transition-colors text-xs"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={() => alert(`Iniciando chat via Microsoft Teams com ${employee.email}`)}
            title="Microsoft Teams"
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-[#464EB8] hover:text-white flex items-center justify-center transition-colors text-xs font-bold font-mono"
          >
            T
          </button>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Berneck"
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-colors text-xs"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Primary CTA: Fale com RH -> */}
      <div className="mt-4 pt-3 space-y-2">
        <button
          onClick={onOpenContactRH}
          className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Fale com o RH</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <button
          onClick={onOpenProfileModal}
          className="w-full py-2 px-3 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-center"
        >
          Ver Dados & Dependentes
        </button>
      </div>

    </div>
  );
};
