import React, { useState } from 'react';
import { X, Gift, Send, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { BirthdayEmployee } from '../../types';

interface BirthdayModalProps {
  employee: BirthdayEmployee | null;
  onClose: () => void;
}

export const BirthdayModal: React.FC<BirthdayModalProps> = ({ employee, onClose }) => {
  const [message, setMessage] = useState('Parabéns pelo seu dia! Desejo muito sucesso, saúde e realizações nesta nova etapa na Berneck! 🎂✨');
  const [sent, setSent] = useState(false);

  if (!employee) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
  };

  const quickWishes = [
    'Parabéns! Muitas felicidades e conquistas!',
    'Feliz aniversário! Que seja um ano incrível de realizações!',
    'Sucesso, saúde e um dia muito especial com a família!',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-emerald-800 text-white">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold">Enviar Felicitações</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-700/80 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Mensagem Entregue!
            </h4>
            <p className="text-xs text-neutral-500">
              Suas felicitações foram enviadas para <strong>{employee.name}</strong> por e-mail e Teams.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-100 dark:border-neutral-800">
              <img 
                src={employee.avatar} 
                alt={employee.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600"
              />
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{employee.name}</h4>
                <p className="text-xs text-neutral-500">{employee.role} · {employee.unit}</p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aniversário em {employee.birthDate}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Sugestões Rápidas:
              </label>
              <div className="space-y-1.5">
                {quickWishes.map((w, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMessage(w)}
                    className="w-full text-left p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-[11px] text-neutral-700 dark:text-neutral-300 transition-colors border border-neutral-200 dark:border-neutral-700 truncate"
                  >
                    "{w}"
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Sua Mensagem Personalizada
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                className="w-full p-3 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Enviar Parabéns
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
