import React, { useState } from 'react';
import { X, Bus, MapPin, Clock, Phone, AlertCircle, Search } from 'lucide-react';

interface CharteredBusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharteredBusModal: React.FC<CharteredBusModalProps> = ({ isOpen, onClose }) => {
  const [selectedUnit, setSelectedUnit] = useState<'Araucária' | 'Curitibanos' | 'Lages'>('Araucária');
  const [selectedShift, setSelectedShift] = useState<'adm' | 'turno1' | 'turno2' | 'turno3'>('adm');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const busRoutes = [
    {
      line: 'Linha 101 - Curitiba Sul / Pinheirinho',
      company: 'Viação Berneck Fretamento',
      departure: '06:40',
      returnTime: '17:45',
      stops: ['Terminal Pinheirinho (Plataforma 4)', 'Rua Nicola Pellanda', 'Rodovia BR-476', 'Portaria Central Araucária'],
      driverContact: 'Ramal Transporte: 2540',
    },
    {
      line: 'Linha 102 - Araucária Centro / Costeira',
      company: 'Viação Berneck Fretamento',
      departure: '07:05',
      returnTime: '17:40',
      stops: ['Terminal Central de Araucária', 'Av. Victor do Amaral', 'Thomaz Coelho', 'Complexo Industrial Berneck'],
      driverContact: 'Ramal Transporte: 2540',
    },
    {
      line: 'Linha 103 - Fazenda Rio Grande / Gralha Azul',
      company: 'Viação Berneck Fretamento',
      departure: '06:30',
      returnTime: '17:50',
      stops: ['Praça Brasil (Fazenda Rio Grande)', 'Bairro Iguaçu', 'Av. das Araucárias', 'Portaria Fábrica MDF'],
      driverContact: 'Ramal Transporte: 2540',
    },
    {
      line: 'Linha 104 - Campo Largo / Ferraria',
      company: 'Viação Berneck Fretamento',
      departure: '06:25',
      returnTime: '17:55',
      stops: ['Terminal Urbano Campo Largo', 'Rodovia do Xisto', 'Portaria Serraria'],
      driverContact: 'Ramal Transporte: 2540',
    },
  ];

  const filtered = busRoutes.filter(
    (b) => !search || b.line.toLowerCase().includes(search.toLowerCase()) || b.stops.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-[#003822] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/60 flex items-center justify-center">
              <Bus className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Transporte Fretado Berneck - Linhas & Horários</h3>
              <p className="text-xs text-emerald-200">Setor de Logística de Pessoas & RH</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-500">Unidade:</span>
              <div className="flex gap-1">
                {(['Araucária', 'Curitibanos', 'Lages'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setSelectedUnit(u)}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                      selectedUnit === u ? 'bg-emerald-800 text-white' : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-500">Turno:</span>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              >
                <option value="adm">Comercial / Administrativo (08h às 17h30)</option>
                <option value="turno1">Turno 1 Industrial (06h às 14h20)</option>
                <option value="turno2">Turno 2 Industrial (14h20 às 22h40)</option>
                <option value="turno3">Turno 3 Noturno (22h40 às 06h)</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por bairro, terminal ou ponto de embarque..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Bus Routes List */}
        <div className="overflow-y-auto p-5 space-y-3.5 text-xs">
          {filtered.map((route, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-600 transition-all space-y-2.5 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <Bus className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    {route.line}
                  </h4>
                  <p className="text-[11px] text-neutral-500">{route.company}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold font-mono text-[11px]">
                    IDA: {route.departure} · VOLTA: {route.returnTime}
                  </span>
                </div>
              </div>

              {/* Itinerary Steps */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Itinerário & Pontos Principais
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-300">
                  {route.stops.map((stop, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <span className="bg-white dark:bg-neutral-700 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-600">
                        {stop}
                      </span>
                      {sIdx < route.stops.length - 1 && <span className="text-neutral-400 font-bold">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span>Dúvidas de atraso ou rota: {route.driverContact}</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Embarque somente com crachá</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <span className="text-xs text-neutral-500">Linhas exclusivas para colaboradores Berneck</span>
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
