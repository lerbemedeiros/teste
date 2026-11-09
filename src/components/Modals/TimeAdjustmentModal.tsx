import React, { useState } from 'react';
import { X, Clock, AlertTriangle, CheckCircle, Upload } from 'lucide-react';

interface TimeAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; type: string; reason: string; attachment?: string }) => void;
  currentBalance: string;
}

export const TimeAdjustmentModal: React.FC<TimeAdjustmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentBalance,
}) => {
  const [date, setDate] = useState('2025-11-06');
  const [type, setType] = useState('Esquecimento de Marcação');
  const [punchTime, setPunchTime] = useState('17:00');
  const [reason, setReason] = useState('');
  const [fileAttached, setFileAttached] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      type,
      reason: `${type} às ${punchTime}: ${reason}`,
      attachment: fileAttached ? 'atestado_comprovante.pdf' : undefined,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Solicitação de Ajuste de Ponto / Ocorrência
              </h3>
              <p className="text-xs text-neutral-500">
                Banco de horas atual: <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{currentBalance}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Ocorrência Enviada ao Gestor!
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Sua justificativa foi registrada com sucesso sob o protocolo <strong>OCORR-2025-981</strong>. Assim que seu gestor validar, o espelho será atualizado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Warning banner */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-2.5 text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Conforme a Portaria 671 do MTE e Normativa Interna Berneck, ocorrências devem ser justificadas em até 48 horas úteis após a data do evento.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Data da Ocorrência
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Horário Previsto
                </label>
                <input
                  type="time"
                  value={punchTime}
                  onChange={(e) => setPunchTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Motivo / Tipo de Ocorrência
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Esquecimento de Marcação">Esquecimento de Marcação</option>
                <option value="Problema no Leitor / Crachá">Problema no Leitor / Crachá</option>
                <option value="Atestado Médico / Odontológico">Atestado Médico / Odontológico</option>
                <option value="Serviço Externo / Viagem a Unidades">Serviço Externo / Viagem a Unidades</option>
                <option value="Compensação de Horas Autorizada">Compensação de Horas Autorizada</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Justificativa Detalhada
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Descreva o motivo da ausência ou ajuste da batida..."
                rows={3}
                required
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Document attachment */}
            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Anexo Comprobatório (Atestado / Declaração)
              </label>
              <div 
                onClick={() => setFileAttached(!fileAttached)}
                className={`p-3 border-2 border-dashed rounded-xl cursor-pointer text-center transition-colors ${
                  fileAttached 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300' 
                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-500'
                }`}
              >
                <Upload className="w-5 h-5 mx-auto mb-1 opacity-70" />
                <span className="font-medium">
                  {fileAttached ? '✓ Comprovante anexado: atestado_medico.pdf (320 KB)' : 'Clique para selecionar o PDF ou foto do atestado'}
                </span>
              </div>
            </div>

            {/* Submit buttons */}
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
                className="px-5 py-2 font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors"
              >
                Registrar Ocorrência
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
