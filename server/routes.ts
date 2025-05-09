import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { contactSchema, Project } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Endpoints
  app.get('/api/projects', (req: Request, res: Response) => {
    const projects = storage.getAllProjects();
    res.json(projects);
  });

  app.get('/api/projects/:id', (req: Request, res: Response) => {
    const projectId = parseInt(req.params.id);
    const project = storage.getProjectById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  });

  // Contact form endpoint
  app.post('/api/contact', (req: Request, res: Response) => {
    try {
      const contactData = contactSchema.parse(req.body);
      // In a real app, we'd save this to a database or send an email
      // For now we'll just return success
      res.status(200).json({ success: true, message: "Message received!" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // CV download endpoint
  app.get('/api/download-cv', (req: Request, res: Response) => {
    const cvPath = path.join(process.cwd(), 'attached_assets', 'Beige Bold Graphic Designer CV Resume.pdf (1).pdf');
    
    // Check if file exists
    if (!fs.existsSync(cvPath)) {
      console.error(`CV file not found at path: ${cvPath}`);
      return res.status(404).json({ message: "CV file not found" });
    }
    
    res.download(cvPath, 'joao-vitor-cv.pdf');
  });

  // Initialize projects data if needed
  initializeProjectsData();

  const httpServer = createServer(app);

  return httpServer;
}

// Initialize some projects data for demonstration
function initializeProjectsData() {
  if (storage.getAllProjects().length === 0) {
    const projects: Project[] = [
      {
        id: 1,
        title: "Clínica",
        description: "Sistema de gerenciamento para clínicas médicas com agendamento de consultas, prontuários eletrônicos e controle financeiro.",
        image: "https://images.unsplash.com/photo-1516549655959-df999a316cd6?q=80&w=800&h=500&auto=format&fit=crop",
        category: "web",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "https://exemplo.com/clinica"
      },
      {
        id: 2,
        title: "Portfolio JV",
        description: "Portfólio profissional com design minimalista e resposivo, destacando projetos e habilidades de forma interativa e moderna.",
        image: "https://images.unsplash.com/photo-1481887328591-3e277f9473dc?q=80&w=800&h=500&auto=format&fit=crop",
        category: "web",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://exemplo.com/portfoliojv"
      },
      {
        id: 3,
        title: "Folheando",
        description: "Aplicativo de gerenciamento e recomendação de livros, com integração de APIs para informações de livros e comunidade de leitores.",
        image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=800&h=500&auto=format&fit=crop",
        category: "app",
        technologies: ["React Native", "Firebase", "API"],
        link: "https://exemplo.com/folheando"
      },
      {
        id: 4,
        title: "Pixel Art Creator",
        description: "Ferramenta online para criação de pixel art com recursos de animação, paleta de cores customizáveis e exportação em vários formatos.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&h=500&auto=format&fit=crop",
        category: "design",
        technologies: ["JavaScript", "Canvas API", "GSAP"],
        link: "https://exemplo.com/pixelart"
      },
      {
        id: 5,
        title: "TechBlog",
        description: "Blog focado em tecnologia com sistema de gerenciamento de conteúdo personalizado, categorização de artigos e recursos de SEO.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&h=500&auto=format&fit=crop",
        category: "web",
        technologies: ["Next.js", "Tailwind CSS", "Prisma"],
        link: "https://exemplo.com/techblog"
      },
      {
        id: 6,
        title: "Crypto Dashboard",
        description: "Dashboard para monitoramento de criptomoedas em tempo real com gráficos interativos, alertas de preço e portfolio personalizado.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&h=500&auto=format&fit=crop",
        category: "data",
        technologies: ["React", "Chart.js", "WebSocket"],
        link: "https://exemplo.com/cryptodash"
      },
      {
        id: 7,
        title: "Fitness Tracker",
        description: "Aplicativo para acompanhamento de atividades físicas, metas de condicionamento e progresso com recursos de gamificação.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&h=500&auto=format&fit=crop",
        category: "app",
        technologies: ["Flutter", "Firebase", "Health API"],
        link: "https://exemplo.com/fittrack"
      },
      {
        id: 8,
        title: "Weather UI Kit",
        description: "Kit de interface para aplicativos de previsão do tempo com componentes personalizáveis, animações e integração com APIs de clima.",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=800&h=500&auto=format&fit=crop",
        category: "ui",
        technologies: ["Figma", "Adobe XD", "Sketch"],
        link: "https://exemplo.com/weatherui"
      },
      {
        id: 9,
        title: "Game Music Composer",
        description: "Ferramenta para composição de músicas e efeitos sonoros para jogos com biblioteca de samples e exportação em vários formatos.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&h=500&auto=format&fit=crop",
        category: "audio",
        technologies: ["Web Audio API", "Tone.js", "SVG"],
        link: "https://exemplo.com/gamemusic"
      }
    ];

    projects.forEach(project => {
      storage.addProject(project);
    });
  }
}
