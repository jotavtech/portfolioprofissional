const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
  execSync('npx vite build client', { stdio: 'inherit' });
  console.log(`${colors.fg.green}✓ Build do frontend concluído${colors.reset}`);
} catch (error) {
  console.error(`${colors.fg.red}✗ Erro ao fazer build do frontend: ${error}${colors.reset}`);
  process.exit(1);
}

// Passo 2: Criar arquivos auxiliares para o GitHub Pages
console.log(`\n${colors.fg.yellow}Passo 2: Criando arquivos para GitHub Pages${colors.reset}`);

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

try {
  // Copiar imagens e outros assets
  const files = fs.readdirSync(assetsDir);
  files.forEach(file => {
    const srcPath = path.join(assetsDir, file);
    const destPath = path.join(destDir, file);
    
    // Ignorar arquivos específicos se necessário
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`${colors.fg.green}✓ Copiado: ${file}${colors.reset}`);
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