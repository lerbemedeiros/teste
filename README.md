# Portal Berneck - Intranet Corporativa & Portal de Notícias

Sistema de intranet corporativa e portal de comunicação interna da **BERNECK S.A. Painéis e Serrados**, desenvolvido com foco em Endomarketing, Gente & Gestão (RH), autoatendimento para colaboradores e integração oficial com o **Google Drive**.

---

## 🚀 Tecnologias Utilizadas

- **React 19** com **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (Ícones)
- **Firebase Auth & Google Workspace OAuth** (Google Drive API v3)

---

## 📌 Principais Recursos

1. **Portal de Notícias Multimídia (Home)**:
   - Destaque editorial jornalístico com manchetão principal e grade de notícias.
   - Suporte completo a vídeos incorporados, galerias fotográficas e arquivos para download (PDF, DOCX, XLSX).
   - Publicador de notícias interativo para o time de Marketing.
   - Barra de plantão interno e filtros ágeis por editoria (*Endomarketing, RH, Segurança, Sustentabilidade*).

2. **Integração com Google Drive (Workspace)**:
   - Autenticação oficial com Google Workspace.
   - Navegação em pastas e subpastas corporativas (*breadcrumbs*).
   - Upload de múltiplos arquivos, criação de pastas e busca instantânea.
   - Anexação direta de arquivos do Drive às notícias internas.

3. **Autoatendimento de RH (Gente & Gestão)**:
   - Crachá Funcional Digital com QR Code e código de barras para catracas e refeitório.
   - Simulador e agendamento de férias com cálculo de 1/3 e abono pecuniário.
   - Consulta ao cardápio semanal dos refeitórios por turno e unidade (*Araucária, Curitibanos e Lages*).
   - Linhas e horários do transporte fretado.
   - Programa Viva Bem (Apoio confidencial 24h).
   - Ponto eletrônico com saldo de banco de horas e justificativa de ocorrências/atestados.
   - Demonstrativo de pagamento (Holerite digital brasileiro).

4. **Endomarketing & Reconhecimento**:
   - Mural público *"Gente de Valor Berneck"* com selos de reconhecimento entre colegas.
   - Aniversariantes do mês com envio de mensagens de felicitações.

---

## 🛠️ Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

### 4. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O portal estará disponível em: `http://localhost:3000`

---

## 📦 Build para Produção

```bash
npm run build
npm run preview
```

---

© BERNECK S.A. Painéis e Serrados · Todos os direitos reservados.
