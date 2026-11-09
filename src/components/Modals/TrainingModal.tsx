import React, { useState } from 'react';
import { X, Play, CheckCircle2, Award, Clock, FileText, Check } from 'lucide-react';
import { TrainingItem } from '../../types';

interface TrainingModalProps {
  training: TrainingItem | null;
  onClose: () => void;
  onComplete: (id: string) => void;
}

export const TrainingModal: React.FC<TrainingModalProps> = ({
  training,
  onClose,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(training?.status === 'Concluído');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!training) return null;

  const handleFinish = () => {
    setCompleted(true);
    onComplete(training.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>E-Learning Corporativo</span>
                <span>·</span>
                <span className="font-medium text-emerald-700 dark:text-emerald-400">{training.category}</span>
                {training.mandatory && (
                  <>
                    <span>·</span>
                    <span className="text-amber-700 dark:text-amber-400 font-medium">Obrigatório</span>
                  </>
                )}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-xl">
                {training.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Video / Interactive Simulation Container */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center text-white">
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-black/30 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-600/90 hover:bg-emerald-500 flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105 mb-4"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="w-8 h-8 text-white translate-x-0.5 fill-white" />
                </div>
                <h4 className="text-lg md:text-xl font-bold tracking-tight mb-1">{training.title}</h4>
                <p className="text-xs text-neutral-300 max-w-md">{training.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Duração: {training.duration}</span>
                  <span>·</span>
                  <span>Módulo 1 de 3</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-between p-4 bg-neutral-900">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-semibold text-emerald-400">BERNECK LEARNING HUB · VÍDEO HD</span>
                  <span>{training.duration} restantes</span>
                </div>

                <div className="my-auto text-center p-8 bg-neutral-950/80 rounded-xl border border-neutral-800 max-w-lg mx-auto">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h5 className="font-semibold text-sm mb-1 text-white">Conteúdo Interativo em Reprodução</h5>
                  <p className="text-xs text-neutral-400 mb-4">
                    Você assistiu a 100% da aula expositiva. Prossiga para a avaliação de retenção de conhecimento abaixo.
                  </p>
                  <button
                    onClick={() => setActiveStep(2)}
                    className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                  >
                    Responder Avaliação Rápida
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-500">
                    <span>00:00</span>
                    <span>{training.duration}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Quiz & Retention check */}
          <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Verificação de Aprendizado & Conformidade
              </h4>
              <span className="text-xs text-neutral-500">1 Pergunta Obrigatória</span>
            </div>

            <p className="text-xs text-neutral-700 dark:text-neutral-300">
              Qual é a principal matéria-prima sustentável utilizada pela Berneck na fabricação de painéis MDP e MDF?
            </p>

            <div className="space-y-2">
              {[
                { id: 1, text: 'Madeira 100% originária de florestas plantadas de Pinus e Teca certificadas FSC®.' },
                { id: 2, text: 'Madeira nativa extraída de florestas primárias sem rastreabilidade.' },
                { id: 3, text: 'Resíduos plásticos não recicláveis misturados a compósitos sintéticos.' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuizAnswer(opt.id)}
                  className={`w-full text-left p-3 text-xs rounded-lg border transition-all flex items-center justify-between ${
                    quizAnswer === opt.id
                      ? opt.id === 1
                        ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200'
                        : 'border-red-400 bg-red-50 text-red-950'
                      : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{opt.text}</span>
                  {quizAnswer === opt.id && opt.id === 1 && (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>

            {quizAnswer === 1 && (
              <div className="p-3 bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Correto! A Berneck preza pelo manejo sustentável e rastreabilidade total de suas florestas plantadas.</span>
              </div>
            )}
          </div>

          {/* Certificate Generation View */}
          {showCertificate && (
            <div className="p-6 rounded-xl border-2 border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 text-center space-y-3 animate-in zoom-in-95">
              <Award className="w-12 h-12 text-emerald-700 mx-auto" />
              <h5 className="text-lg font-bold text-neutral-900 dark:text-white">Certificado de Conclusão Berneck</h5>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                Certificamos que o colaborador concluiu com êxito o módulo de <strong>{training.title}</strong>, cumprindo as exigências do programa interno de desenvolvimento e conformidade corporativa.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono text-neutral-500">CÓDIGO DE AUTENTICIDADE: BNK-2025-E49817</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <div className="text-xs text-neutral-500">
            {completed ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Módulo Registrado como Concluído
              </span>
            ) : (
              <span>Finalize o vídeo e a avaliação para registrar sua presença.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {completed && (
              <button
                onClick={() => setShowCertificate(!showCertificate)}
                className="px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                {showCertificate ? 'Ocultar Certificado' : 'Ver Certificado'}
              </button>
            )}

            {!completed ? (
              <button
                onClick={handleFinish}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Concluir Treinamento
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 rounded-lg transition-colors"
              >
                Fechar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
