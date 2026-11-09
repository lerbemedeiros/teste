import React from 'react';
import { X, Download, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { PaycheckRecord, Employee } from '../../types';

interface PaycheckModalProps {
  paycheck: PaycheckRecord | null;
  employee: Employee;
  onClose: () => void;
}

export const PaycheckModal: React.FC<PaycheckModalProps> = ({ paycheck, employee, onClose }) => {
  if (!paycheck) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `BERNECK S.A. PAINÉIS E SERRADOS\nDEMONSTRATIVO DE PAGAMENTO DE SALÁRIO - ${paycheck.month.toUpperCase()}/${paycheck.year}\n\nCOLABORADOR: ${employee.name}\nMATRÍCULA: ${employee.registration}\nCARGO: ${employee.role}\nDEPARTAMENTO: ${employee.department}\nUNIDADE: ${employee.unit}\n\nTOTAL PROVENTOS: R$ ${paycheck.grossValue.toFixed(2)}\nTOTAL DESCONTOS: R$ ${paycheck.discounts.toFixed(2)}\nVALOR LÍQUIDO A RECEBER: R$ ${paycheck.netValue.toFixed(2)}\n\nAUTENTICAÇÃO BANCÁRIA: BRN-DOC-${paycheck.id}-OK`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Holerite_Berneck_${paycheck.month}_${paycheck.year}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              B
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Recibo de Pagamento de Salário
              </h3>
              <p className="text-xs text-neutral-500">
                Competência: {paycheck.month} / {paycheck.year} · {paycheck.type}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              title="Imprimir Holerite"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              title="Baixar Arquivo"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Holerite Brazilian Standard Template */}
        <div className="overflow-y-auto p-6 space-y-5 print:p-0">
          <div className="border border-neutral-300 dark:border-neutral-700 rounded-xl p-5 bg-white dark:bg-neutral-950 font-sans text-xs space-y-4">
            {/* Company Info */}
            <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 gap-2">
              <div>
                <p className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                  BERNECK S.A. PAINÉIS E SERRADOS
                </p>
                <p className="text-neutral-500 text-[11px]">
                  CNPJ: 76.495.319/0001-30 · Inscrição Estadual: 101.428.90-1
                </p>
                <p className="text-neutral-500 text-[11px]">
                  Rua Dr. Valério Sobania, 222 - Thomaz Coelho, Araucária - PR
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold rounded">
                  REFERÊNCIA: {paycheck.month.toUpperCase()}/{paycheck.year}
                </span>
                <p className="text-neutral-500 text-[10px] mt-1">Liberado em {paycheck.releaseDate}</p>
              </div>
            </div>

            {/* Employee Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 dark:bg-neutral-900/60 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-medium">Matrícula</span>
                <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{employee.registration}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-medium">Nome do Colaborador</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.name}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-medium">Cargo</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.role}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-medium">Lotação</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.department}</span>
              </div>
            </div>

            {/* Rubrics Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500 uppercase">
                    <th className="py-2 px-1">Cód.</th>
                    <th className="py-2 px-2">Descrição</th>
                    <th className="py-2 px-2 text-right">Referência</th>
                    <th className="py-2 px-2 text-right">Proventos (R$)</th>
                    <th className="py-2 px-2 text-right">Descontos (R$)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-[11px]">
                  <tr>
                    <td className="py-2 px-1 font-mono text-neutral-400">001</td>
                    <td className="py-2 px-2 font-medium">SALÁRIO BASE MENSAL</td>
                    <td className="py-2 px-2 text-right font-mono">30 dias</td>
                    <td className="py-2 px-2 text-right font-mono tabular-nums text-emerald-700 dark:text-emerald-400 font-semibold">
                      {paycheck.grossValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-2 text-right font-mono tabular-nums text-neutral-400">-</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-1 font-mono text-neutral-400">105</td>
                    <td className="py-2 px-2">INSS - PREVIDÊNCIA SOCIAL</td>
                    <td className="py-2 px-2 text-right font-mono">14.00%</td>
                    <td className="py-2 px-2 text-right font-mono text-neutral-400">-</td>
                    <td className="py-2 px-2 text-right font-mono tabular-nums text-red-600 font-semibold">
                      682.40
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-1 font-mono text-neutral-400">108</td>
                    <td className="py-2 px-2">IRRF - IMPOSTO DE RENDA RETIDO NA FONTE</td>
                    <td className="py-2 px-2 text-right font-mono">22.50%</td>
                    <td className="py-2 px-2 text-right font-mono text-neutral-400">-</td>
                    <td className="py-2 px-2 text-right font-mono tabular-nums text-red-600 font-semibold">
                      492.15
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-1 font-mono text-neutral-400">210</td>
                    <td className="py-2 px-2">COPARTICIPAÇÃO PARANÁ CLÍNICAS</td>
                    <td className="py-2 px-2 text-right font-mono">02 cons.</td>
                    <td className="py-2 px-2 text-right font-mono text-neutral-400">-</td>
                    <td className="py-2 px-2 text-right font-mono tabular-nums text-red-600 font-semibold">
                      85.00
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-1 font-mono text-neutral-400">225</td>
                    <td className="py-2 px-2">REFEITÓRIO INDUSTRIAL / CO-PARTICIPAÇÃO</td>
                    <td className="py-2 px-2 text-right font-mono">30 dias</td>
                    <td className="py-2 px-2 text-right font-mono text-neutral-400">-</td>
                    <td className="py-2 px-2 text-right font-mono tabular-nums text-red-600 font-semibold">
                      70.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t-2 border-neutral-200 dark:border-neutral-700 pt-3">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Total Proventos</span>
                <span className="text-sm font-bold font-mono text-emerald-800 dark:text-emerald-400">
                  R$ {paycheck.grossValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Total Descontos</span>
                <span className="text-sm font-bold font-mono text-red-700 dark:text-red-400">
                  R$ {paycheck.discounts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 bg-emerald-800 text-white rounded-lg shadow-sm">
                <span className="text-emerald-200 block text-[10px] uppercase font-bold">Valor Líquido a Receber</span>
                <span className="text-base font-extrabold font-mono">
                  R$ {paycheck.netValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Bases & FGTS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-500">
              <div>Salário Base: <span className="font-mono text-neutral-700 dark:text-neutral-300">R$ {paycheck.grossValue.toFixed(2)}</span></div>
              <div>Base Cálc. INSS: <span className="font-mono text-neutral-700 dark:text-neutral-300">R$ {paycheck.grossValue.toFixed(2)}</span></div>
              <div>Base Cálc. FGTS: <span className="font-mono text-neutral-700 dark:text-neutral-300">R$ {paycheck.grossValue.toFixed(2)}</span></div>
              <div>FGTS do Mês (8%): <span className="font-mono font-semibold text-emerald-600">R$ {(paycheck.grossValue * 0.08).toFixed(2)}</span></div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Documento emitido eletronicamente com validade jurídica conforme MP 2.200-2/2001. Banco Creditado: Itaú Unibanco S.A.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <span className="text-xs text-neutral-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Depósito compensado na conta salário
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Baixar Demonstrativo
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
