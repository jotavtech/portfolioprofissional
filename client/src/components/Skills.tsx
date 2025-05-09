import { motion } from "framer-motion";

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

  return (
    <section id="skills" className="min-h-screen bg-black py-20 page-section">
      <div className="container mx-auto px-4">
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
        


        <motion.div 
          className="grid grid-cols-1 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* HTML Card */}
              <motion.div 
                className="bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <h4 className="font-pixel text-xl mb-2 text-glow">HTML</h4>
                  <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                    <span className="text-3xl font-pixel">90%</span>
                  </div>
                  <p className="font-mono text-xs text-gray-300">Estruturação semântica e acessível de páginas web</p>
                </div>
              </motion.div>
              
              {/* CSS Card */}
              <motion.div 
                className="bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <h4 className="font-pixel text-xl mb-2 text-glow">CSS</h4>
                  <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                    <span className="text-3xl font-pixel">85%</span>
                  </div>
                  <p className="font-mono text-xs text-gray-300">Estilização avançada e layouts responsivos</p>
                </div>
              </motion.div>
              
              {/* JavaScript Card */}
              <motion.div 
                className="bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <h4 className="font-pixel text-xl mb-2 text-glow">JAVASCRIPT</h4>
                  <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                    <span className="text-3xl font-pixel">80%</span>
                  </div>
                  <p className="font-mono text-xs text-gray-300">Programação dinâmica e interatividade</p>
                </div>
              </motion.div>
              
              {/* React Card */}
              <motion.div 
                className="bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <h4 className="font-pixel text-xl mb-2 text-glow">REACT</h4>
                  <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                    <span className="text-3xl font-pixel">75%</span>
                  </div>
                  <p className="font-mono text-xs text-gray-300">Desenvolvimento de interfaces modernas</p>
                </div>
              </motion.div>
              
              {/* Prototipagem Card */}
              <motion.div 
                className="bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <h4 className="font-pixel text-xl mb-2 text-glow">PROTOTIPAGEM</h4>
                  <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                    <span className="text-3xl font-pixel">85%</span>
                  </div>
                  <p className="font-mono text-xs text-gray-300">Design de interfaces e experiência de usuário</p>
                </div>
              </motion.div>
              
              {/* Banco de Dados Card */}
              <motion.div 
                className="bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <h4 className="font-pixel text-xl mb-2 text-glow">BANCO DE DADOS</h4>
                  <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                    <span className="text-3xl font-pixel">65%</span>
                  </div>
                  <p className="font-mono text-xs text-gray-300">Modelagem e gerenciamento de dados</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}