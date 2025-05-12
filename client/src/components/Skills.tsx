import { motion } from "framer-motion";
import LazyLoad from '@/components/LazyLoad';

/**
 * Componente de habilidades otimizado sem porcentagens
 * - Cards com efeito 3D de stack
 * - Organizado em 3 colunas para telas maiores
 * - Animação de entrada suave por meio de LazyLoad
 */
export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Lista de habilidades para renderizar dinamicamente
  const skills = [
    {
      name: "HTML",
      description: "Estruturação semântica e acessível de páginas web"
    },
    {
      name: "CSS",
      description: "Estilização avançada e layouts responsivos"
    },
    {
      name: "JAVASCRIPT",
      description: "Programação dinâmica e interatividade"
    },
    {
      name: "REACT",
      description: "Desenvolvimento de interfaces modernas"
    },
    {
      name: "TYPESCRIPT",
      description: "Tipagem estática para JavaScript"
    },
    {
      name: "POSTGRESQL",
      description: "Banco de dados relacional"
    }
  ];

  return (
    <section id="skills" className="min-h-screen bg-black py-20 page-section">
      <div className="container mx-auto px-4">
        <LazyLoad animation="fade" rootMargin="0px 0px 100px 0px">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-pixel text-4xl animate-glitch mb-2">HABILIDADES</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </motion.div>
        </LazyLoad>

        <LazyLoad animation="slideUp" delay={100} rootMargin="0px 0px 100px 0px">
          <motion.div 
            className="grid grid-cols-1 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    className="bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 10,
                      boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                    }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: `translateZ(${index * 5}px)`,
                      marginTop: `${index % 3 === 0 ? 0 : index % 3 * 5}px`
                    }}
                  >
                    <div className="text-center">
                      <h4 className="font-pixel text-xl mb-2 text-glow">{skill.name}</h4>
                      <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                        <span className="text-xl font-pixel">{skill.name.substring(0, 2)}</span>
                      </div>
                      <p className="font-mono text-xs text-gray-300">{skill.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </LazyLoad>
      </div>
    </section>
  );
}