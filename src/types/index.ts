export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  registration: string; // Matrícula
  admissionDate: string; // Admissão
  extension: string; // Ramal
  phone: string;
  location: string;
  unit: string; // Unidade (Araucária, Curitibanos, Lages, Curitiba ADM)
  email: string;
  avatar: string;
  socials: {
    linkedin?: string;
    teams?: string;
    instagram?: string;
    facebook?: string;
  };
  timeBankBalance: string; // e.g., "-01:43" or "+02:15"
  timeBankStatus: 'positive' | 'negative' | 'neutral';
  vacationDaysLeft: number;
  vacationPeriod: string;
}

export interface ArticleAttachment {
  id: string;
  name: string;
  format: 'PDF' | 'DOC' | 'DOCX' | 'XLS' | 'XLSX' | 'ZIP';
  size: string;
  downloadUrl?: string;
  description?: string;
}

export interface ArticleGalleryItem {
  id: string;
  url: string;
  caption: string;
}

export interface ArticleVideo {
  url: string;
  title: string;
  duration?: string;
  thumbnail?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string[];
  category: 'Destaque' | 'Institucional' | 'Sustentabilidade' | 'Segurança' | 'Endomarketing' | 'Gente & Gestão' | 'RH' | 'Comunicado';
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
  featured?: boolean;
  pinned?: boolean;
  video?: ArticleVideo;
  gallery?: ArticleGalleryItem[];
  attachments?: ArticleAttachment[];
  likes?: number;
  views?: number;
  commentsCount?: number;
}

export interface TrainingItem {
  id: string;
  title: string;
  category: string;
  type: 'Vídeo' | 'Trilha Interativa' | 'Documento' | 'Palestra';
  duration: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluído';
  mandatory: boolean;
  deadline?: string;
  videoUrl?: string;
  description: string;
  certificateAvailable?: boolean;
}

export interface BirthdayEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  unit: string;
  birthDate: string; // e.g. "12/11"
  day: number;
  avatar: string;
  email: string;
}

export interface TimePunchRecord {
  id: string;
  date: string;
  weekday: string;
  entry1: string;
  exit1: string;
  entry2: string;
  exit2: string;
  totalHours: string;
  balance: string;
  status: 'Normal' | 'Falta' | 'Ajuste Solicitado' | 'Folga' | 'Feriado';
}

export interface PaycheckRecord {
  id: string;
  month: string;
  year: number;
  type: 'Mensal' | '13º Salário (1ª Parcela)' | '13º Salário (2ª Parcela)' | 'Férias' | 'PLR';
  grossValue: number;
  netValue: number;
  discounts: number;
  downloadUrl?: string;
  releaseDate: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Políticas & Normas' | 'Formulários Padrões' | 'RH & Benefícios' | 'Segurança (SIPATMA)' | 'Sustentabilidade';
  code: string;
  version: string;
  updateDate: string;
  fileSize: string;
  format: 'PDF' | 'DOCX' | 'XLSX';
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  category: 'comunicado' | 'rh' | 'sistema' | 'treinamento';
  linkTarget?: string;
}
