import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LazyLoad from '@/components/LazyLoad';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link: string;
}

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};

/**
 * Seção de projetos com carregamento progressivo
 * - Usa LazyLoad para carregar conforme scroll
 * - Cards com efeito 3D e tags de tecnologias
 * - Filtro por categorias
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  useEffect(() => {
    if (projects?.length) {
      filterProjects(activeFilter);
    }
  }, [projects, activeFilter]);

  const filterProjects = (category: string) => {
    setActiveFilter(category);
    
    if (category === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  return (
    <section id="projects" className="py-20 bg-black cyber-tribal bg-opacity-10 page-section">
      <div className="container mx-auto px-4">
        <LazyLoad animation="fade" rootMargin="0px 0px 150px 0px">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-pixel text-4xl animate-glitch mb-2">PROJETOS</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </motion.div>
        </LazyLoad>
        
        <LazyLoad animation="slideUp" delay={50} rootMargin="0px 0px 150px 0px">
          <motion.div 
            className="mb-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.button 
              className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'all' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
              onClick={() => filterProjects("all")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              TODOS
            </motion.button>
            <motion.button 
              className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'web' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
              onClick={() => filterProjects("web")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              WEB
            </motion.button>
            <motion.button 
              className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'design' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
              onClick={() => filterProjects("design")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              DESIGN
            </motion.button>
            <motion.button 
              className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'app' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
              onClick={() => filterProjects("app")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              APP
            </motion.button>
            <motion.button 
              className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'ui' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
              onClick={() => filterProjects("ui")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              UI/UX
            </motion.button>
            <motion.button 
              className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'data' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
              onClick={() => filterProjects("data")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              DATA
            </motion.button>
            <motion.button 
              className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'audio' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
              onClick={() => filterProjects("audio")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              AUDIO
            </motion.button>
          </motion.div>
        </LazyLoad>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 border border-white/20 h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <LazyLoad animation="zoom" delay={100} rootMargin="0px 0px 100px 0px">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: { 
                    transition: { 
                      staggerChildren: 0.1 
                    } 
                  }
                }}
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="project-card bg-white/5 border border-white/20 overflow-hidden relative transform-gpu group"
                    variants={projectVariants}
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.3)",
                      borderColor: "rgba(255, 255, 255, 0.5)"
                    }}
                  >
                    {/* Easter Egg: Hidden mini-game trigger on triple click */}
                    <div 
                      className="absolute top-2 right-2 w-6 h-6 opacity-0 z-10 cursor-pointer hover:opacity-30 transition-opacity"
                      title="Easter egg: triplo clique para um mini-game"
                      onDoubleClick={(e) => {
                        const target = e.currentTarget;
                        setTimeout(() => {
                          const clickCount = parseInt(target.getAttribute('data-clicks') || '0') + 1;
                          if (clickCount >= 3) {
                            alert('🎮 Mini-game desbloqueado! Uma versão de Snake será implementada em breve.');
                            target.setAttribute('data-clicks', '0');
                          } else {
                            target.setAttribute('data-clicks', clickCount.toString());
                          }
                        }, 300);
                      }}
                    >
                      <span className="font-pixel text-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">🎮</span>
                    </div>
                    
                    {/* Main project card content */}
                    <div className="overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover object-center transition-transform"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
                      />
                    </div>
                    
                    <div className="p-6 relative z-0 overflow-hidden">
                      {/* Cyber-tribal animated background pattern */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-[-1] opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0, backgroundSize: "100% 100%" }}
                        whileHover={{ 
                          opacity: 1,
                          backgroundPosition: ["0% 0%", "100% 100%"],
                          transition: { duration: 10, repeat: Infinity, repeatType: "mirror" }
                        }}
                      />
                      
                      <div className="flex justify-between items-center mb-4">
                        <motion.h3 
                          className="font-retro text-xl"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5, transition: { duration: 0.2, type: "spring" } }}
                        >
                          {project.title}
                        </motion.h3>
                        <motion.span 
                          className="bg-white text-black text-xs px-2 py-1 font-mono"
                          whileHover={{ scale: 1.1 }}
                        >
                          {project.category.toUpperCase()}
                        </motion.span>
                      </div>
                      
                      <p className="font-mono text-sm text-gray-300 mb-6">
                        {project.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <motion.span 
                              key={idx} 
                              className="text-xs font-mono bg-white/10 px-2 py-1"
                              whileHover={{ 
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                y: -2
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                        
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-pixel text-sm underline clickable relative"
                          whileHover={{ 
                            scale: 1.1,
                            textShadow: "0 0 8px rgba(255, 255, 255, 0.5)" 
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          VER →
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </LazyLoad>
        )}
      </div>
    </section>
  );
}