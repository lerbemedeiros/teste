import React, { useState } from 'react';
import { X, MessageSquare, Send, CheckCircle2, Phone, Mail, HelpCircle, FileQuestion, HeartHandshake } from 'lucide-react';
import { Employee } from '../../types';

interface ContactRHModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

export const ContactRHModal: React.FC<ContactRHModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const [topic, setTopic] = useState('Benefícios & Plano de Saúde');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('Normal');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-emerald-800 text-white">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="text-sm font-bold">Atendimento Gente & Gestão (RH Berneck)</h3>
              <p className="text-xs text-emerald-100">Canal direto de suporte ao colaborador</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-700 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Protocolo Gerado com Sucesso!
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Seu chamado <strong>#RH-2025-4491</strong> foi encaminhado para a equipe de Recursos Humanos da unidade <strong>{employee.unit}</strong>. Prazo de resposta: até 24h úteis.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Quick contact direct channels */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="block font-semibold text-[11px]">Ramal RH: 2500</span>
                  <span className="text-[10px] text-neutral-400">Atendimento 08h às 17h30</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="block font-semibold text-[11px]">rh@berneck.com.br</span>
                  <span className="text-[10px] text-neutral-400">Canal Corporativo</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Assunto / Categoria
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Benefícios & Plano de Saúde">Benefícios & Plano de Saúde (Paraná Clínicas / Odonto)</option>
                <option value="Dúvidas de Folha & Holerite">Dúvidas de Folha de Pagamento & Holerite</option>
                <option value="Agendamento ou Saldo de Férias">Agendamento ou Saldo de Férias</option>
                <option value="Segunda Via de Crachá Funcional">Segunda Via de Crachá Funcional</option>
                <option value="Declaração de Vínculo / Rendimentos">Declaração de Vínculo Empregatício</option>
                <option value="Suporte Psicológico / Programa Viva Bem">Programa Viva Bem (Apoio Social / Psicológico)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Colaborador Solicitante
                </label>
                <input
                  type="text"
                  disabled
                  value={`${employee.name} (${employee.registration})`}
                  className="w-full p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/80 text-neutral-500 font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Prioridade
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Normal">Normal (até 48h)</option>
                  <option value="Alta">Alta (urgência médica ou viagem)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Descreva sua solicitação ou dúvida
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detalhe o motivo do seu contato com a equipe de Recursos Humanos..."
                rows={4}
                required
                className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Enviar Mensagem
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
