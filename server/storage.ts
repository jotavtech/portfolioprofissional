import { users, type User, type InsertUser, type Project } from "@shared/schema";

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  currentId: number;
  currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.currentId = 1;
    this.currentProjectId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.get(id);
  }

  addProject(project: Project): void {
    this.projects.set(project.id, project);
    // Update currentProjectId to be the max ID + 1
    this.currentProjectId = Math.max(this.currentProjectId, project.id + 1);
  }
  
  clearProjects(): void {
    this.projects.clear();
    this.currentProjectId = 1;
  }
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllProjects(): Project[];
  getProjectById(id: number): Project | undefined;
  addProject(project: Project): void;
  clearProjects(): void; // Novo método para limpar projetos
}

export const storage = new MemStorage();
