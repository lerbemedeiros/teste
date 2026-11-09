import React, { useState } from 'react';
import { Utensils, Calendar, MapPin, ThumbsUp, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

interface CafeteriaMenuProps {
  onClose?: () => void;
}

export const CafeteriaMenu: React.FC<CafeteriaMenuProps> = ({ onClose }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Hoje');
  const [selectedShift, setSelectedShift] = useState<'almoco' | 'jantar' | 'ceia'>('almoco');
  const [selectedUnit, setSelectedUnit] = useState<string>('Araucária');
  const [rated, setRated] = useState<boolean>(false);

  const menuDays = [
    { id: 'Hoje', label: 'Hoje (Segunda)', date: '10/11' },
    { id: 'Ter', label: 'Terça-feira', date: '11/11' },
    { id: 'Qua', label: 'Quarta-feira', date: '12/11' },
    { id: 'Qui', label: 'Quinta-feira', date: '13/11' },
    { id: 'Sex', label: 'Sexta-feira', date: '14/11' },
  ];

  const menuData = {
    almoco: {
      pratoPrincipal: 'Alcatra Grelhada ao Molho Madeira ou Filé de Frango Grelhado',
      opcaoLeve: 'Omelete de Forno com Queijo Branco e Espinafre',
      guarnicao: 'Batata Rústica Assada com Ervas Finas',
      acompanhamentos: 'Arroz Branco, Arroz Integral e Feijão Carioca',
      saladas: 'Mix de Folhas Nobres, Tomate Cereja, Beterraba Ralada e Salpicão Leve',
      sobremesa: 'Pudim de Leite Condensado Artesanal ou Fruta da Estação (Abacaxi com Raspas de Limão)',
      suco: 'Suco Natural de Laranja com Acerola',
      calorias: '680 kcal (Média)',
    },
    jantar: {
      pratoPrincipal: 'Iscas de Carne com Cebola Caramelizada ou Frango Xadrez',
      opcaoLeve: 'Lasanha de Berinjela com Ricota Temperada',
      guarnicao: 'Purê de Mandioquinha Salsa',
      acompanhamentos: 'Arroz Branco e Feijão Preto',
      saladas: 'Salada Colorida, Cenoura Cozida e Pepino Japonês',
      sobremesa: 'Gelatina Bicolor ou Melão em Fatias',
      suco: 'Suco Natural de Uva',
      calorias: '620 kcal (Média)',
    },
    ceia: {
      pratoPrincipal: 'Strogonoff de Frango Tradicional com Champignon',
      opcaoLeve: 'Sopa Creme de Legumes com Croutons Integrais',
      guarnicao: 'Batata Palha Crocante',
      acompanhamentos: 'Arroz Branco e Feijão Carioca',
      saladas: 'Salada Verde e Vinagrete',
      sobremesa: 'Mousse de Maracujá ou Maçã',
      suco: 'Suco de Abacaxi com Hortelã',
      calorias: '590 kcal (Média)',
    },
  };

  const currentMenu = menuData[selectedShift];

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              Cardápio do Refeitório Industrial
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Nutrição Berneck
              </span>
            </h3>
            <p className="text-xs text-neutral-500">
              Refeições completas preparadas com acompanhamento nutricional para todos os turnos fabris
            </p>
          </div>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center gap-2 text-xs">
          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-500">Unidade:</span>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs focus:outline-none"
          >
            <option value="Araucária">Complexo Araucária (PR)</option>
            <option value="Curitibanos">Complexo Curitibanos (SC)</option>
            <option value="Lages">Complexo Lages (SC)</option>
          </select>
        </div>
      </div>

      {/* Days Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {menuDays.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedDay === day.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            <span>{day.label}</span>
            <span className="block text-[10px] opacity-75 font-mono">{day.date}</span>
          </button>
        ))}
      </div>

      {/* Shifts Selector */}
      <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3 text-xs">
        <span className="text-neutral-400 font-medium">Turno:</span>
        <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
          <button
            onClick={() => setSelectedShift('almoco')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              selectedShift === 'almoco' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Almoço (11h às 14h)
          </button>
          <button
            onClick={() => setSelectedShift('jantar')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              selectedShift === 'jantar' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Jantar (18h às 21h)
          </button>
          <button
            onClick={() => setSelectedShift('ceia')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              selectedShift === 'ceia' ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Ceia Noturna (23h às 02h)
          </button>
        </div>
      </div>

      {/* Menu Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
        
        {/* Prato Principal */}
        <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
            Prato Principal
          </span>
          <p className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
            {currentMenu.pratoPrincipal}
          </p>
        </div>

        {/* Opção Leve / Vegetariana */}
        <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
            Opção Saudável / Vegetariana
          </span>
          <p className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
            {currentMenu.opcaoLeve}
          </p>
        </div>

        {/* Guarnição */}
        <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
            Guarnição do Dia
          </span>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
            {currentMenu.guarnicao}
          </p>
        </div>

        {/* Acompanhamentos */}
        <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
            Acompanhamentos Base
          </span>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            {currentMenu.acompanhamentos}
          </p>
        </div>

        {/* Saladas */}
        <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
            Buffet de Saladas & Fibras
          </span>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            {currentMenu.saladas}
          </p>
        </div>

        {/* Sobremesa e Bebida */}
        <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
            Sobremesa & Bebida
          </span>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            {currentMenu.sobremesa} · {currentMenu.suco}
          </p>
        </div>

      </div>

      {/* Footer bar with feedback */}
      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-neutral-500">
          <span className="font-mono text-[11px]">Valor Calórico Estimado: {currentMenu.calorias}</span>
          <span>·</span>
          <span>Cardápio sujeito a pequenas alterações sazonais</span>
        </div>

        <button
          onClick={() => setRated(!rated)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            rated ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{rated ? 'Obrigado por avaliar a refeição!' : 'Avaliar Refeição do Turno'}</span>
        </button>
      </div>

    </div>
  );
};
