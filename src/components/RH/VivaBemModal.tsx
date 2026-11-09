import React, { useState } from 'react';
import { X, HeartHandshake, Phone, ShieldCheck, Heart, MessageCircle, Calendar, CheckCircle2 } from 'lucide-react';
import { Employee } from '../../types';

interface VivaBemModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

export const VivaBemModal: React.FC<VivaBemModalProps> = ({ isOpen, onClose, employee }) => {
  const [sessionType, setSessionType] = useState('Apoio Psicológico / Emocional');
  const [preferredShift, setPreferredShift] = useState('Manhã (08h às 12h)');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-[#003822] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/60 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Programa "Viva Bem Berneck"</h3>
              <p className="text-xs text-emerald-200">Apoio Emocional, Psicológico, Social e Jurídico</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Solicitação Sigilosa Registrada
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              A equipe multidisciplinar de acolhimento entrará em contato de forma estritamente confidencial pelo seu número de preferência.
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto p-6 space-y-5 text-xs">
            
            {/* Banner of absolute confidentiality */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs">
                  Atendimento 100% Gratuito, Seguro e Confidencial
                </h4>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 mt-0.5 leading-relaxed">
                  O programa Viva Bem é prestado por consultoria especializada independente. Nenhuma informação pessoal ou conteúdo de conversa é compartilhado com gestores ou RH.
                </p>
              </div>
            </div>

            {/* Direct 24/7 Channels */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Linha 0800 24 Horas</span>
                <span className="text-base font-mono font-bold text-emerald-800 dark:text-emerald-400">0800 702 4411</span>
                <p className="text-[10px] text-neutral-500">Ligação gratuita de fixo ou celular</p>
              </div>

              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">WhatsApp de Acolhimento</span>
                <span className="text-base font-mono font-bold text-emerald-800 dark:text-emerald-400">(41) 99120-0080</span>
                <p className="text-[10px] text-neutral-500">Atendimento humanizado</p>
              </div>
            </div>

            {/* Request a session form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-xs">
                Agendar Sessão Online / Presencial
              </h4>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Área de Suporte Necessária
                </label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Apoio Psicológico / Emocional">Psicologia (Ansiedade, estresse, luto, bem-estar)</option>
                  <option value="Orientação Financeira">Orientação Financeira e Planejamento Familiar</option>
                  <option value="Assistência Social">Assistência Social (Família, saúde, previdência)</option>
                  <option value="Consultoria Jurídica Cível">Orientação Jurídica Básica (Direito civil e familiar)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Melhor Período para Retorno
                </label>
                <select
                  value={preferredShift}
                  onChange={(e) => setPreferredShift(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                  <option value="Tarde (13h às 17h)">Tarde (13h às 17h)</option>
                  <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5" /> Solicitar Contato Sigiloso
                </button>
              </div>
            </form>

          </div>
        )}
      </div>
    </div>
  );
};
