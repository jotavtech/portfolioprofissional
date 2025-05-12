import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { contactSchema, Project } from "@shared/schema";
import { ZodError } from "zod";

// Exportando função para acessar projetos para o script de build
export function getProjectsData() {
  // Inicializa os dados se necessário
  initializeProjectsData();
  return storage.getAllProjects();
}

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

  // Rotas para servir as imagens dos projetos
  app.get('/Clinica.png', (req: Request, res: Response) => {
    const imagePath = path.join(process.cwd(), 'attached_assets', 'Clinica.png');
    res.sendFile(imagePath);
  });
  
  app.get('/templify.png', (req: Request, res: Response) => {
    const imagePath = path.join(process.cwd(), 'attached_assets', 'templify.png');
    res.sendFile(imagePath);
  });
  
  app.get('/folheando.png', (req: Request, res: Response) => {
    const imagePath = path.join(process.cwd(), 'attached_assets', 'folheando.png');
    res.sendFile(imagePath);
  });
  
  app.get('/porsche.png', (req: Request, res: Response) => {
    const imagePath = path.join(process.cwd(), 'attached_assets', 'porsche.png');
    res.sendFile(imagePath);
  });
  
  app.get('/rodaporsche.webp', (req: Request, res: Response) => {
    const imagePath = path.join(process.cwd(), 'attached_assets', 'rodaporsche.webp');
    res.sendFile(imagePath);
  });

  // Initialize projects data if needed
  initializeProjectsData();

  const httpServer = createServer(app);

  return httpServer;
}

// Initialize some projects data for demonstration
function initializeProjectsData() {
  // Limpa os projetos existentes e recria apenas 3
  storage.clearProjects();
  
  // Cria apenas 3 projetos conforme solicitado
  const projects: Project[] = [
    {
      id: 1,
      title: "Clínica Executivas",
      description: "Sistema de gerenciamento para clínicas de massagem terapêutica com agendamento de consultas, prontuários eletrônicos e área administrativa.",
      image: "/Clinica.png",
      category: "web",
      technologies: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
      link: "https://exemplo.com/clinica"
    },
    {
      id: 2,
      title: "Templify",
      description: "Plataforma de templates premium para pequenas empresas, com soluções rápidas e personalizáveis para sites profissionais.",
      image: "/templify.png",
      category: "web",
      technologies: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
      link: "https://exemplo.com/templify"
    },
    {
      id: 3,
      title: "Folheando",
      description: "Aplicativo de gerenciamento e recomendação de livros, com integração para avaliações e comunidade de leitores.",
      image: "/folheando.png",
      category: "app",
      technologies: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
      link: "https://exemplo.com/folheando"
    }
  ];

  // Adiciona os 3 projetos ao storage
  projects.forEach(project => {
    storage.addProject(project);
  });
}
