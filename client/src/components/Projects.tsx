import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-4xl animate-glitch mb-2">PROJECTS</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="mb-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button 
            className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'all' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
            onClick={() => filterProjects("all")}
          >
            ALL
          </button>
          <button 
            className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'web' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
            onClick={() => filterProjects("web")}
          >
            WEB
          </button>
          <button 
            className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'design' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
            onClick={() => filterProjects("design")}
          >
            DESIGN
          </button>
          <button 
            className={`px-4 py-2 font-retro text-sm project-filter clickable ${activeFilter === 'app' ? 'bg-white text-black' : 'bg-transparent text-white border border-white'}`} 
            onClick={() => filterProjects("app")}
          >
            APP
          </button>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 border border-white/20 h-96 animate-pulse"></div>
            ))}
          </div>
        ) : (
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
                  className="project-card bg-white/5 border border-white/20 overflow-hidden"
                  variants={projectVariants}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-retro text-xl">{project.title}</h3>
                      <span className="bg-white text-black text-xs px-2 py-1 font-mono">
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-gray-300 mb-6">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs font-mono bg-white/10 px-2 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-sm underline clickable"
                      >
                        VIEW →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
