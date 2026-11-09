import React from 'react';
import { X, QrCode, Shield, Download, Printer, Building2, Phone } from 'lucide-react';
import { Employee } from '../../types';

interface DigitalBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

export const DigitalBadgeModal: React.FC<DigitalBadgeModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-neutral-100 dark:border-neutral-800 bg-[#003822] text-white">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-300" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Crachá Funcional Digital Berneck</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badge Card Container */}
        <div className="p-6 flex flex-col items-center bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
          
          {/* Lanyard Clip Simulation */}
          <div className="w-16 h-3 bg-neutral-400 rounded-full mb-1 shadow-inner"></div>
          <div className="w-8 h-4 bg-emerald-800 rounded-b-md mb-2 shadow-xs"></div>

          {/* Badge Physical Layout */}
          <div className="w-full max-w-[320px] rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl border-2 border-emerald-800 overflow-hidden text-center flex flex-col justify-between">
            
            {/* Top Brand Stripe */}
            <div className="bg-[#003822] text-white py-3.5 px-4 flex items-center justify-between">
              <div className="text-left">
                <span className="font-extrabold text-base tracking-tight block">BERNECK</span>
                <span className="text-[9px] uppercase tracking-wider text-emerald-200 block font-medium">Painéis e Serrados</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-700/80 px-2 py-0.5 rounded border border-emerald-500/40">
                ACESSO GERAL
              </span>
            </div>

            {/* Employee Portrait */}
            <div className="py-5 px-6 flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-28 h-28 rounded-xl object-cover border-2 border-emerald-800 shadow-md"
                />
                <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 text-[9px] font-bold bg-emerald-700 text-white rounded-full shadow-xs">
                  ATIVO
                </span>
              </div>

              <h4 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100 leading-tight">
                {employee.name}
              </h4>
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mt-0.5">
                {employee.role}
              </p>
              <p className="text-[11px] text-neutral-500">
                {employee.department}
              </p>

              {/* Data Strip */}
              <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
                <div className="text-left bg-neutral-50 dark:bg-neutral-800/60 p-2 rounded-lg">
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold">Matrícula</span>
                  <span className="font-mono font-extrabold text-neutral-800 dark:text-neutral-200">{employee.registration}</span>
                </div>
                <div className="text-left bg-neutral-50 dark:bg-neutral-800/60 p-2 rounded-lg">
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold">Admissão</span>
                  <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{employee.admissionDate}</span>
                </div>
              </div>

              {/* QR Code and Barcode */}
              <div className="w-full mt-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-3">
                <div className="text-left text-[10px] text-neutral-500 space-y-0.5">
                  <p className="font-bold text-neutral-700 dark:text-neutral-300">Catraca & Refeitório</p>
                  <p>Válido para entrada nas fábricas e desconto em farmácias conveniadas.</p>
                </div>
                <div className="w-14 h-14 bg-white p-1 rounded-lg border border-neutral-300 flex items-center justify-center shrink-0 shadow-xs">
                  <QrCode className="w-12 h-12 text-neutral-900" />
                </div>
              </div>

              {/* Barcode representation */}
              <div className="w-full mt-3 flex flex-col items-center">
                <div className="flex items-center gap-0.5 h-6">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-full bg-neutral-800 dark:bg-neutral-200 ${
                        i % 4 === 0 ? 'w-1' : i % 3 === 0 ? 'w-0.5' : 'w-1.5'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 mt-1">
                  BRN-25611-ARAU-SEC
                </span>
              </div>
            </div>

            {/* Bottom Location */}
            <div className="bg-neutral-100 dark:bg-neutral-800/80 py-2 px-4 text-[10px] text-neutral-500 font-semibold border-t border-neutral-200 dark:border-neutral-700">
              {employee.unit} · Berneck S.A.
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <span className="text-[11px] text-neutral-500">Apresente este crachá na portaria e refeitório</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
