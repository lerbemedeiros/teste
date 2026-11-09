import React from 'react';
import { X, Heart, User, Clock, FileText, Award, Leaf, Download, Phone, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { Employee } from '../../types';

export type QuickAccessType = 'saude' | 'cadastro' | 'ponto' | 'documentos' | 'beneficios' | 'sustentabilidade' | null;

interface QuickAccessModalProps {
  type: QuickAccessType;
  employee: Employee;
  onClose: () => void;
  onOpenTimeAdjustment?: () => void;
}

export const QuickAccessModal: React.FC<QuickAccessModalProps> = ({
  type,
  employee,
  onClose,
  onOpenTimeAdjustment,
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-emerald-800 text-white">
          <div className="flex items-center gap-2.5">
            {type === 'saude' && <Heart className="w-5 h-5 text-red-300" />}
            {type === 'cadastro' && <User className="w-5 h-5 text-emerald-300" />}
            {type === 'ponto' && <Clock className="w-5 h-5 text-amber-300" />}
            {type === 'documentos' && <FileText className="w-5 h-5 text-blue-300" />}
            {type === 'beneficios' && <Award className="w-5 h-5 text-amber-300" />}
            {type === 'sustentabilidade' && <Leaf className="w-5 h-5 text-emerald-300" />}

            <div>
              <h3 className="text-sm font-bold">
                {type === 'saude' && 'Plano de Saúde & Assistência Médica'}
                {type === 'cadastro' && 'Meu Cadastro Funcional & Dados Pessoais'}
                {type === 'ponto' && 'Meu Ponto Eletrônico & Banco de Horas'}
                {type === 'documentos' && 'Central de Documentos & Declarações'}
                {type === 'beneficios' && 'Pacote de Benefícios Berneck'}
                {type === 'sustentabilidade' && 'Sustentabilidade, Meio Ambiente & FSC®'}
              </h3>
              <p className="text-xs text-emerald-100">Portal do Colaborador · Berneck</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 hover:bg-emerald-700 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body based on type */}
        <div className="overflow-y-auto p-6 space-y-4 text-xs text-neutral-700 dark:text-neutral-300">
          {/* 1. PLANO DE SAÚDE */}
          {type === 'saude' && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-emerald-900 to-emerald-800 text-white rounded-xl shadow-md space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-emerald-300 font-semibold">Operadora de Saúde</span>
                    <h4 className="text-base font-bold">Paraná Clínicas / SulAmérica</h4>
                    <p className="text-xs text-emerald-200">Plano Empresarial Especial com Coparticipação Reduzida</p>
                  </div>
                  <span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-bold rounded">ATIVO</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-700/60 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-emerald-300 block uppercase">Nº Carteirinha Digital</span>
                    <span>849.201.0049.21-0</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300 block uppercase">Titular</span>
                    <span className="truncate block">{employee.name}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Cobertura Incluída
                  </h5>
                  <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-[11px]">
                    <li>• Consultas médicas gerais e especialistas</li>
                    <li>• Pronto Atendimento 24h em Curitiba e RMC</li>
                    <li>• Exames complementares e imagem</li>
                    <li>• Internação em enfermaria/apartamento</li>
                  </ul>
                </div>
                <div className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-600" /> Centrais de Atendimento
                  </h5>
                  <div className="space-y-1 text-neutral-600 dark:text-neutral-400 text-[11px]">
                    <p>• Paraná Clínicas: 0800 644 0004</p>
                    <p>• Central Agendamento: (41) 3340-3030</p>
                    <p>• Guia Médico Online: paranaclinicas.com.br</p>
                    <p>• Suporte RH Berneck: Ramal 2500</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MEU CADASTRO */}
          {type === 'cadastro' && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mb-3">Ficha de Dados do Colaborador</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Nome Completo</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Matrícula Funcional</span>
                    <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{employee.registration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Data de Admissão</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.admissionDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Cargo Atual</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.role}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Lotação / Departamento</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.department}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Unidade Operacional</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.unit}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Ramal Interno</span>
                    <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{employee.extension}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">Telefone Corporativo</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{employee.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">E-mail Profissional</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">{employee.email}</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">
                Para solicitar atualização de endereço residencial, inclusão de dependente ou conta bancária, abra uma solicitação pelo "Fale com RH".
              </p>
            </div>
          )}

          {/* 3. MEU PONTO */}
          {type === 'ponto' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Saldo Atual do Banco de Horas
                  </span>
                  <div className="text-2xl font-bold font-mono text-emerald-900 dark:text-emerald-100">
                    {employee.timeBankBalance}
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
                    Acumulado do período de apuração mensal atual
                  </p>
                </div>
                {onOpenTimeAdjustment && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTimeAdjustment();
                    }}
                    className="px-3.5 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg shadow-sm transition-colors whitespace-nowrap"
                  >
                    Solicitar Ajuste / Ocorrência
                  </button>
                )}
              </div>

              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 font-bold text-neutral-800 dark:text-neutral-200 text-xs">
                  Batidas Registradas Hoje (Simulação Ponto Online)
                </div>
                <div className="p-4 grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <span className="text-[10px] text-neutral-400 block font-sans">Entrada 1</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">08:01</span>
                  </div>
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <span className="text-[10px] text-neutral-400 block font-sans">Saída 1</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">12:04</span>
                  </div>
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <span className="text-[10px] text-neutral-400 block font-sans">Entrada 2</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">13:02</span>
                  </div>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 rounded-lg">
                    <span className="text-[10px] text-emerald-600 block font-sans">Saída Prevista</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">17:00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. DOCUMENTOS */}
          {type === 'documentos' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-500">
                Selecione um dos documentos oficiais para visualização ou download imediato:
              </p>
              {[
                { title: 'Declaração de Trabalho e Horário Funcional', format: 'PDF', size: '140 KB' },
                { title: 'Informe de Rendimentos para IRPF (Ano Base 2024)', format: 'PDF', size: '210 KB' },
                { title: 'Manual do Colaborador & Código de Conduta Berneck', format: 'PDF', size: '3.4 MB' },
                { title: 'Apólice de Seguro de Vida em Grupo MetLife', format: 'PDF', size: '480 KB' },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">
                      {doc.format}
                    </div>
                    <div>
                      <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">{doc.title}</h5>
                      <span className="text-[10px] text-neutral-400">{doc.size} · Emitido por RH Berneck</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Download de ${doc.title} iniciado.`)}
                    className="p-2 text-neutral-500 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 5. BENEFÍCIOS */}
          {type === 'beneficios' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Refeitório Industrial</h5>
                  <p className="text-[11px] text-neutral-500 mb-2">Alimentação balanceada no complexo com nutricionista interna.</p>
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                    Subsidiado 90%
                  </span>
                </div>
                <div className="p-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Vale Alimentação (Alelo)</h5>
                  <p className="text-[11px] text-neutral-500 mb-2">Crédito mensal disponibilizado no 5º dia útil.</p>
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                    R$ 850,00 / mês
                  </span>
                </div>
                <div className="p-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Previdência Privada Berneck</h5>
                  <p className="text-[11px] text-neutral-500 mb-2">Contrapartida da empresa de até 100% da contribuição do colaborador.</p>
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                    Matching 1:1 até 5%
                  </span>
                </div>
                <div className="p-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Gympass / Wellhub</h5>
                  <p className="text-[11px] text-neutral-500 mb-2">Acesso a academias, natação e bem-estar físico e mental.</p>
                  <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                    Planos a partir de R$ 39,90
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 6. SUSTENTABILIDADE */}
          {type === 'sustentabilidade' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-900 text-white rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-sm">Compromisso Berneck com a Floresta e o Futuro</h4>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  A Berneck possui mais de 100 mil hectares de terras, sendo que quase a metade é destinada à conservação e preservação permanente da fauna e flora nativas brasileiras.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Certificação FSC® (FSC-C018861)</h5>
                  <p className="text-[11px] text-neutral-500">
                    Garantia de cadeia de custódia e manejo ambientalmente adequado, socialmente benéfico e economicamente viável.
                  </p>
                </div>
                <div className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">Energia Limpa & Biomassa</h5>
                  <p className="text-[11px] text-neutral-500">
                    Aproveitamento integral de resíduos de madeira e cascas para geração de energia térmica limpa nas caldeiras fabris.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
