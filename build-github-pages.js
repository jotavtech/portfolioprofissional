import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cores para outputs no console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

console.log(`${colors.fg.cyan}${colors.bright}=== Iniciando build para GitHub Pages ===${colors.reset}`);

// Passo 1: Fazer build do frontend
console.log(`\n${colors.fg.yellow}Passo 1: Fazendo build do frontend${colors.reset}`);
try {
  // Criar diretório dist se não existir
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  // Vamos criar uma versão estática diretamente
  console.log(`${colors.fg.yellow}Criando build customizado para GitHub Pages${colors.reset}`);
  
  // Criar HTML estático
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfólio de João Vitor - Designer e Desenvolvedor - Estilo Y2K com elementos cibertribais">
  <title>Portfólio JV - Y2K Style</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <link rel="stylesheet" href="styles.css">
  <script src="https://cdn.jsdelivr.net/npm/framer-motion@10.16.4/dist/framer-motion.min.js"></script>
  <script>
    // Verificar se estamos no GitHub Pages
    const isGitHubPages = window.location.hostname.endsWith('.github.io') || 
                         !window.location.hostname.includes('localhost');
    
    // Se estamos no GitHub Pages, instrui o fetch a buscar dados estáticos
    if (isGitHubPages) {
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        // Se for uma requisição para a API, redireciona para o JSON estático
        if (typeof url === 'string' && url.startsWith('/api/')) {
          const newUrl = url + '.json';
          console.log('GitHub Pages: Redirecionando fetch para', newUrl);
          return originalFetch(newUrl, options);
        }
        return originalFetch(url, options);
      };
      console.log('GitHub Pages: Modo de compatibilidade ativado');
    }
  </script>
</head>
<body class="bg-black text-white">
  <main id="root">
    <header class="py-8 border-b border-white/20">
      <div class="container mx-auto flex flex-col items-center text-center">
        <h1 class="text-6xl font-bold mb-4 animate-pulse">JV PORTFOLIO</h1>
        <p class="text-xl mb-6">Desenvolvimento Web & Design</p>
        <div class="flex space-x-4 mb-4">
          <a href="https://github.com/jotavtech" target="_blank" class="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors">GITHUB</a>
          <a href="mailto:martinsjoao1227@gmail.com" class="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors">CONTATO</a>
        </div>
      </div>
    </header>
    
    <section class="py-16 bg-black">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-8 text-center">PROJETOS</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="border border-white/20 p-6 hover:border-white transition-all">
            <h3 class="text-2xl font-bold mb-3">Clínica</h3>
            <p class="mb-4">Sistema de gerenciamento para clínicas médicas com agendamento de consultas, prontuários eletrônicos e controle financeiro.</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-white/10 text-xs">React</span>
              <span class="px-3 py-1 bg-white/10 text-xs">Node.js</span>
              <span class="px-3 py-1 bg-white/10 text-xs">MongoDB</span>
            </div>
          </div>
          
          <div class="border border-white/20 p-6 hover:border-white transition-all">
            <h3 class="text-2xl font-bold mb-3">Portfolio JV</h3>
            <p class="mb-4">Portfólio profissional com design minimalista e responsivo, destacando projetos e habilidades de forma interativa e moderna.</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-white/10 text-xs">HTML</span>
              <span class="px-3 py-1 bg-white/10 text-xs">CSS</span>
              <span class="px-3 py-1 bg-white/10 text-xs">JavaScript</span>
            </div>
          </div>
          
          <div class="border border-white/20 p-6 hover:border-white transition-all">
            <h3 class="text-2xl font-bold mb-3">Folheando</h3>
            <p class="mb-4">Aplicativo de gerenciamento e recomendação de livros, com integração de APIs para informações de livros e comunidade de leitores.</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-white/10 text-xs">React Native</span>
              <span class="px-3 py-1 bg-white/10 text-xs">Firebase</span>
              <span class="px-3 py-1 bg-white/10 text-xs">API</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="py-16 bg-black/50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-8">SKILLS</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div class="border border-white/20 p-4 hover:bg-white/5 transition-all">
            <h3 class="text-xl font-bold">Frontend</h3>
            <p>React, HTML, CSS, JavaScript</p>
          </div>
          <div class="border border-white/20 p-4 hover:bg-white/5 transition-all">
            <h3 class="text-xl font-bold">Backend</h3>
            <p>Node.js, Express, MongoDB</p>
          </div>
          <div class="border border-white/20 p-4 hover:bg-white/5 transition-all">
            <h3 class="text-xl font-bold">Mobile</h3>
            <p>React Native, Flutter</p>
          </div>
          <div class="border border-white/20 p-4 hover:bg-white/5 transition-all">
            <h3 class="text-xl font-bold">Design</h3>
            <p>Figma, Photoshop, Illustrator</p>
          </div>
          <div class="border border-white/20 p-4 hover:bg-white/5 transition-all">
            <h3 class="text-xl font-bold">Tools</h3>
            <p>Git, VS Code, Docker</p>
          </div>
          <div class="border border-white/20 p-4 hover:bg-white/5 transition-all">
            <h3 class="text-xl font-bold">Other</h3>
            <p>SEO, UI/UX, Web Audio</p>
          </div>
        </div>
      </div>
    </section>
    
    <footer class="py-8 border-t border-white/20">
      <div class="container mx-auto text-center">
        <p class="mb-4">João Vitor Martins | Developer & Designer</p>
        <p class="text-sm text-gray-500">
          Esta é uma versão estática do portfólio criada para GitHub Pages. <br>
          Para ver o projeto completo com todas as funcionalidades, acesse <a href="https://github.com/jotavtech" class="text-blue-400 hover:underline">github.com/jotavtech</a>
        </p>
      </div>
    </footer>
  </main>
</body>
</html>`;

  // Criar CSS básico
  const cssContent = `
body {
  font-family: monospace, sans-serif;
  background-color: #000;
  color: #fff;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.7;
  }
}

.text-flicker {
  animation: flicker 2s infinite alternate;
}

/* Y2K Estilo Elementos */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.border-glow {
  box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.2);
}

.text-glow {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

/* Efeitos hover */
a, button {
  transition: all 0.3s ease;
}

a:hover {
  text-shadow: 0 0 5px white;
}

/* Elementos tribais */
.tribal-border {
  position: relative;
}

.tribal-border::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%);
  pointer-events: none;
}
`;
  
  fs.writeFileSync('dist/index.html', htmlContent);
  fs.writeFileSync('dist/styles.css', cssContent);
  console.log(`${colors.fg.green}✓ HTML e CSS estáticos criados${colors.reset}`);
  
  // Copiar a pasta public diretamente
  if (fs.existsSync('client/public')) {
    fs.cpSync('client/public', 'dist', { recursive: true });
    console.log(`${colors.fg.green}✓ Arquivos públicos copiados${colors.reset}`);
  }
  
  console.log(`${colors.fg.green}✓ Build do frontend concluído${colors.reset}`);
} catch (error) {
  console.error(`${colors.fg.red}✗ Erro ao fazer build do frontend: ${error}${colors.reset}`);
  process.exit(1);
}

// Passo 2: Copiar os dados da API para arquivos estáticos
console.log(`\n${colors.fg.yellow}Passo 2: Copiando dados da API para arquivos estáticos${colors.reset}`);

const apiDir = path.join(__dirname, 'dist', 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Copiar os projetos
try {
  // Buscando diretamente os dados de projetos - criando script temporário
  const tempScript = `
// Temporary script to get projects data
import { getProjectsData } from './server/routes.js';
console.log(JSON.stringify(getProjectsData(), null, 2));
  `;
  fs.writeFileSync('temp-get-projects.js', tempScript);
  execSync('node temp-get-projects.js > dist/api/projects.json', { stdio: 'inherit' });
  fs.unlinkSync('temp-get-projects.js'); // Remover script temporário
  console.log(`${colors.fg.green}✓ Dados de projetos copiados para API estática${colors.reset}`);
} catch (error) {
  console.log(`${colors.fg.yellow}! Usando dados de projetos estáticos${colors.reset}`);
  
  // Falha ao executar diretamente, vamos usar um arquivo estático
  const projectsData = [
    {
      "id": 1,
      "title": "Clínica",
      "description": "Sistema de gerenciamento para clínicas médicas com agendamento de consultas, prontuários eletrônicos e controle financeiro.",
      "image": "https://images.unsplash.com/photo-1516549655959-df999a316cd6?q=80&w=800&h=500&auto=format&fit=crop",
      "category": "web",
      "technologies": ["React", "Node.js", "MongoDB"],
      "link": "https://exemplo.com/clinica"
    },
    {
      "id": 2,
      "title": "Portfolio JV",
      "description": "Portfólio profissional com design minimalista e resposivo, destacando projetos e habilidades de forma interativa e moderna.",
      "image": "https://images.unsplash.com/photo-1481887328591-3e277f9473dc?q=80&w=800&h=500&auto=format&fit=crop",
      "category": "web",
      "technologies": ["HTML", "CSS", "JavaScript"],
      "link": "https://exemplo.com/portfoliojv"
    },
    {
      "id": 3,
      "title": "Folheando",
      "description": "Aplicativo de gerenciamento e recomendação de livros, com integração de APIs para informações de livros e comunidade de leitores.",
      "image": "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=800&h=500&auto=format&fit=crop",
      "category": "app",
      "technologies": ["React Native", "Firebase", "API"],
      "link": "https://exemplo.com/folheando"
    }
  ];
  
  fs.writeFileSync(path.join(apiDir, 'projects.json'), JSON.stringify(projectsData, null, 2));
  console.log(`${colors.fg.green}✓ Dados de projetos estáticos criados${colors.reset}`);
}

// Passo 3: Criar arquivos auxiliares para o GitHub Pages
console.log(`\n${colors.fg.yellow}Passo 3: Criando arquivos para GitHub Pages${colors.reset}`);

// Criar arquivo 404.html para suportar SPA com roteamento no navegador
const notFoundPath = path.join(__dirname, 'dist', '404.html');
const indexHtmlPath = path.join(__dirname, 'dist', 'index.html');

try {
  // Copiar index.html para 404.html
  const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  fs.writeFileSync(notFoundPath, indexContent);
  console.log(`${colors.fg.green}✓ 404.html criado${colors.reset}`);
  
  // Criar arquivo .nojekyll para evitar processamento do Jekyll
  fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');
  console.log(`${colors.fg.green}✓ .nojekyll criado${colors.reset}`);
  
  // Injetar script no index.html para lidar com modo GitHub Pages
  const indexHtmlInject = indexContent.replace(
    '<head>',
    `<head>
    <script>
      // Verificar se estamos no GitHub Pages
      const isGitHubPages = window.location.hostname.endsWith('.github.io') || 
                           !window.location.hostname.includes('localhost');
      
      // Se estamos no GitHub Pages, instrui o fetch a buscar dados estáticos
      if (isGitHubPages) {
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
          // Se for uma requisição para a API, redireciona para o JSON estático
          if (typeof url === 'string' && url.startsWith('/api/')) {
            const newUrl = url + '.json';
            console.log('GitHub Pages: Redirecionando fetch para', newUrl);
            return originalFetch(newUrl, options);
          }
          return originalFetch(url, options);
        };
        console.log('GitHub Pages: Modo de compatibilidade ativado');
      }
    </script>`
  );
  fs.writeFileSync(indexHtmlPath, indexHtmlInject);
  fs.writeFileSync(notFoundPath, indexHtmlInject); // Atualizar também o 404.html
  console.log(`${colors.fg.green}✓ Script de compatibilidade injetado${colors.reset}`);
} catch (error) {
  console.error(`${colors.fg.red}✗ Erro ao criar arquivos auxiliares: ${error}${colors.reset}`);
  process.exit(1);
}

// Copiar os assets importantes
console.log(`\n${colors.fg.yellow}Passo 3: Copiando assets importantes${colors.reset}`);
const assetsDir = path.join(__dirname, 'attached_assets');
const destDir = path.join(__dirname, 'dist', 'assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Criar diretório para o CV
const cvDir = path.join(__dirname, 'dist', 'api', 'download-cv');
if (!fs.existsSync(cvDir)) {
  fs.mkdirSync(cvDir, { recursive: true });
}

try {
  // Copiar imagens e outros assets
  const files = fs.readdirSync(assetsDir);
  files.forEach(file => {
    const srcPath = path.join(assetsDir, file);
    const destPath = path.join(destDir, file);
    
    // Ignorar arquivos específicos se necessário
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`${colors.fg.green}✓ Copiado para assets: ${file}${colors.reset}`);
      
      // Se for o CV, copiar também para o diretório da API
      if (file.toLowerCase().includes('cv') || file.toLowerCase().includes('resume')) {
        const cvDestPath = path.join(cvDir, 'joao-vitor-cv.pdf');
        fs.copyFileSync(srcPath, cvDestPath);
        console.log(`${colors.fg.green}✓ CV copiado para API para download direto${colors.reset}`);
      }
    }
  });
} catch (error) {
  console.error(`${colors.fg.red}✗ Erro ao copiar assets: ${error}${colors.reset}`);
}

// Criar um arquivo README.md para o repo do GitHub
const readmePath = path.join(__dirname, 'dist', 'README.md');
const readmeContent = `# Portfolio JV - Y2K Style

Este é o repositório do meu portfólio pessoal com estilo Y2K e elementos cibertribais.

## Características

- Design Y2K nostálgico com toques cibertribais
- Animações interativas e efeitos visuais
- Player de música integrado
- Página alternativa JOTAVERSO inspirada no GTA VI
- Totalmente responsivo

## Tecnologias

- React.js
- Tailwind CSS
- Framer Motion
- Web Audio API

## Contato

- GitHub: [jotavtech](https://github.com/jotavtech)
- Email: martinsjoao1227@gmail.com
`;

try {
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`${colors.fg.green}✓ README.md criado${colors.reset}`);
} catch (error) {
  console.error(`${colors.fg.red}✗ Erro ao criar README.md: ${error}${colors.reset}`);
}

console.log(`\n${colors.fg.cyan}${colors.bright}=== Build concluído com sucesso ===${colors.reset}`);
console.log(`\n${colors.fg.yellow}Para publicar no GitHub Pages:${colors.reset}`);
console.log(`${colors.fg.white}1. Crie um novo repositório no GitHub${colors.reset}`);
console.log(`${colors.fg.white}2. Inicialize um repositório git na pasta 'dist'${colors.reset}`);
console.log(`${colors.fg.white}3. Adicione os arquivos, faça commit e push para o GitHub${colors.reset}`);
console.log(`${colors.fg.white}4. Configure seu repositório para usar GitHub Pages na branch principal${colors.reset}`);

console.log(`\n${colors.fg.white}Comandos para referência:${colors.reset}`);
console.log(`${colors.fg.green}cd dist${colors.reset}`);
console.log(`${colors.fg.green}git init${colors.reset}`);
console.log(`${colors.fg.green}git add .${colors.reset}`);
console.log(`${colors.fg.green}git commit -m "Initial commit"${colors.reset}`);
console.log(`${colors.fg.green}git branch -M main${colors.reset}`);
console.log(`${colors.fg.green}git remote add origin https://github.com/jotavtech/portfolio.git${colors.reset}`);
console.log(`${colors.fg.green}git push -u origin main${colors.reset}`);