import React, { useState } from 'react';
import { Award, Heart, Plus, Send, Sparkles, Shield, Lightbulb, Users, Leaf, CheckCircle2, X } from 'lucide-react';
import { Employee } from '../../types';

interface RecognitionItem {
  id: string;
  fromName: string;
  fromRole: string;
  fromUnit: string;
  toName: string;
  toRole: string;
  toAvatar: string;
  badge: 'Segurança em 1º Lugar' | 'Inovação & Eficiência' | 'Espírito de Equipe' | 'Sustentabilidade';
  message: string;
  date: string;
  likes: number;
}

interface RecognitionWallProps {
  currentEmployee: Employee;
}

export const RecognitionWall: React.FC<RecognitionWallProps> = ({ currentEmployee }) => {
  const [recognitions, setRecognitions] = useState<RecognitionItem[]>([
    {
      id: 'rec-1',
      fromName: 'Lucas Almeida',
      fromRole: 'Design & Marketing',
      fromUnit: 'Araucária',
      toName: 'Marcos Vinicius Fontana',
      toRole: 'Manutenção Mecânica',
      toAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      badge: 'Segurança em 1º Lugar',
      message: 'Parabéns pela rápida identificação preventiva na linha de prensagem e por garantir a parada segura sem nenhum incidente na equipe!',
      date: 'Ontem',
      likes: 24,
    },
    {
      id: 'rec-2',
      fromName: 'Juliana Beatriz Koster',
      fromRole: 'Recursos Humanos',
      fromUnit: 'Araucária',
      toName: 'Mariana Duarte',
      toRole: 'Engenheira Florestal',
      toAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      badge: 'Sustentabilidade',
      message: 'Excelente condução do processo de auditoria da cadeia de custódia FSC® em Curitibanos. Orgulho do trabalho com nossas florestas!',
      date: 'Há 2 dias',
      likes: 38,
    },
    {
      id: 'rec-3',
      fromName: 'Rafael Silveira',
      fromRole: 'Produção MDF',
      fromUnit: 'Curitibanos',
      toName: 'Carolina Mendes Ramos',
      toRole: 'Controladoria',
      toAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      badge: 'Inovação & Eficiência',
      message: 'Apoio essencial na reformulação dos relatórios de desperdício zero de biomassa. Agilidade e precisão excepcionais!',
      date: 'Há 3 dias',
      likes: 19,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toName, setToName] = useState('');
  const [toRole, setToRole] = useState('');
  const [badge, setBadge] = useState<RecognitionItem['badge']>('Espírito de Equipe');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendRecognition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toName.trim() || !message.trim()) return;

    const newRec: RecognitionItem = {
      id: `rec-${Date.now()}`,
      fromName: currentEmployee.name,
      fromRole: currentEmployee.role,
      fromUnit: currentEmployee.unit,
      toName: toName.trim(),
      toRole: toRole.trim() || 'Colaborador Berneck',
      toAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge,
      message: message.trim(),
      date: 'Agora mesmo',
      likes: 1,
    };

    setRecognitions([newRec, ...recognitions]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setToName('');
      setToRole('');
      setMessage('');
    }, 1500);
  };

  const handleLike = (id: string) => {
    setRecognitions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              Mural "Gente de Valor Berneck"
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                Endomarketing
              </span>
            </h3>
            <p className="text-xs text-neutral-500">
              Reconhecimento público de atitudes de segurança, cooperação, inovação e sustentabilidade
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Enviar Reconhecimento</span>
        </button>
      </div>

      {/* Recognitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recognitions.map((rec) => {
          const badgeStyle = 
            rec.badge === 'Segurança em 1º Lugar' ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200' :
            rec.badge === 'Inovação & Eficiência' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200' :
            rec.badge === 'Sustentabilidade' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200' :
            'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200';

          return (
            <div 
              key={rec.id}
              className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${badgeStyle} flex items-center gap-1`}>
                    <Sparkles className="w-3 h-3" />
                    {rec.badge}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">{rec.date}</span>
                </div>

                <div className="flex items-center gap-3 my-2">
                  <img src={rec.toAvatar} alt={rec.toName} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600/40" />
                  <div>
                    <h5 className="font-bold text-xs text-neutral-900 dark:text-neutral-100">{rec.toName}</h5>
                    <p className="text-[10px] text-neutral-500">{rec.toRole}</p>
                  </div>
                </div>

                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic bg-white dark:bg-neutral-900 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
                  "{rec.message}"
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-neutral-400">
                  De: <strong className="text-neutral-600 dark:text-neutral-300">{rec.fromName}</strong> ({rec.fromUnit})
                </span>

                <button
                  onClick={() => handleLike(rec.id)}
                  className="flex items-center gap-1 text-neutral-500 hover:text-red-500 transition-colors p-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-100 text-red-500" />
                  <span className="font-mono text-[11px]">{rec.likes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recognition Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between px-6 py-4 bg-[#003822] text-white">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-300" />
                <h4 className="text-sm font-bold">Enviar Reconhecimento Público</h4>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-emerald-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-base">Reconhecimento Publicado no Mural!</h5>
                <p className="text-xs text-neutral-500">Seu colega receberá uma notificação especial no portal.</p>
              </div>
            ) : (
              <form onSubmit={handleSendRecognition} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Nome do Colega que Deseja Reconhecer *
                  </label>
                  <input
                    type="text"
                    required
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    placeholder="Ex: Rafael Silveira..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Cargo / Setor do Colega
                  </label>
                  <input
                    type="text"
                    value={toRole}
                    onChange={(e) => setToRole(e.target.value)}
                    placeholder="Ex: Operador de Linha MDF · Araucária"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Pilar / Valor Demonstrado *
                  </label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value as RecognitionItem['badge'])}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Segurança em 1º Lugar">Segurança em 1º Lugar (Zero Acidentes)</option>
                    <option value="Inovação & Eficiência">Inovação & Eficiência Operacional</option>
                    <option value="Espírito de Equipe">Espírito de Equipe & Ajuda Mútua</option>
                    <option value="Sustentabilidade">Sustentabilidade & Cuidado Ambiental</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Mensagem de Reconhecimento *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conte como a atitude deste colega fez a diferença no seu dia e na empresa..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Publicar Reconhecimento
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
