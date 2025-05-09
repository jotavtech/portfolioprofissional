import { motion } from "framer-motion";

export default function About() {
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
    <section id="about" className="min-h-screen bg-black py-20 page-section">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-4xl animate-glitch mb-2">ABOUT ME</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-4">EXPERIÊNCIA</h3>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <p className="font-pixel">FREELANCES</p>
                  <p className="font-mono text-sm">2022-2025</p>
                </div>
                <p className="text-gray-400 text-sm mb-2 font-mono">Freelancer</p>
                <p className="font-mono text-sm">
                  Tenho experiência atuando como freelancer, desenvolvendo projetos web com foco em front-end 
                  utilizando HTML, CSS, JavaScript e React. Também possuo conhecimento em bancos de dados, o que me permite 
                  trabalhar em aplicações completas, desde a interface até a integração com o back-end.
                </p>
              </div>
            </motion.div>
            
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-4">EDUCAÇÃO</h3>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <p className="font-pixel">UNIESP (CABEDELO)</p>
                  <p className="font-mono text-sm">Formação em junho de 2026</p>
                </div>
                <p className="font-mono text-sm">Sistemas para Internet</p>
                <p className="font-mono text-sm text-gray-400">3º Período</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div className="bg-white/5 p-6 border border-white/10 relative min-h-[400px]" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-8">SKILLS</h3>
              
              <div className="relative flex justify-center items-center perspective-container overflow-hidden">
                <div className="w-full max-w-md mx-auto">
                  <motion.div 
                    className="skill-cards-stack relative mx-auto" 
                    initial={{ rotateY: 0 }}
                    whileInView={{ rotateY: 15 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px', height: '350px' }}
                  >
                    {/* HTML Card */}
                    <motion.div 
                      className="absolute left-0 right-0 top-0 mx-auto max-w-[250px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow"
                      initial={{ y: 0, rotateY: 0, z: 60 }}
                      whileHover={{ 
                        y: "-20px", 
                        rotateY: 15, 
                        scale: 1.05,
                        zIndex: 70,
                        boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                      className="absolute left-0 right-0 top-0 mx-auto mt-8 max-w-[250px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow"
                      initial={{ y: 20, rotateY: 5, z: 50 }}
                      whileHover={{ 
                        y: "-10px", 
                        rotateY: 15, 
                        scale: 1.05,
                        zIndex: 70,
                        boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                      className="absolute left-0 right-0 top-0 mx-auto mt-16 max-w-[250px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow"
                      initial={{ y: 40, rotateY: 10, z: 40 }}
                      whileHover={{ 
                        y: "20px", 
                        rotateY: 15, 
                        scale: 1.05,
                        zIndex: 80,
                        boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                      className="absolute left-0 right-0 top-0 mx-auto mt-24 max-w-[250px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow"
                      initial={{ y: 60, rotateY: 15, z: 30 }}
                      whileHover={{ 
                        y: "50px", 
                        rotateY: 15, 
                        scale: 1.05,
                        zIndex: 90,
                        boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                      className="absolute left-0 right-0 top-0 mx-auto mt-32 max-w-[250px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow"
                      initial={{ y: 80, rotateY: 20, z: 20 }}
                      whileHover={{ 
                        y: "80px", 
                        rotateY: 15, 
                        scale: 1.05,
                        zIndex: 100,
                        boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                      className="absolute left-0 right-0 top-0 mx-auto mt-40 max-w-[250px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow"
                      initial={{ y: 100, rotateY: 25, z: 10 }}
                      whileHover={{ 
                        y: "110px", 
                        rotateY: 15, 
                        scale: 1.05,
                        zIndex: 110,
                        boxShadow: "0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="text-center">
                        <h4 className="font-pixel text-xl mb-2 text-glow">BANCO DE DADOS</h4>
                        <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                          <span className="text-3xl font-pixel">65%</span>
                        </div>
                        <p className="font-mono text-xs text-gray-300">Modelagem e gerenciamento de dados</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-4">LANGUAGES</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <p className="font-pixel mb-2">PORTUGUÊS</p>
                  <div className="h-2 bg-white/20">
                    <motion.div 
                      className="h-full bg-white" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-pixel mb-2">INGLÊS</p>
                  <div className="h-2 bg-white/20">
                    <motion.div 
                      className="h-full bg-white" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    ></motion.div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-pixel mb-2">ESPANHOL</p>
                  <div className="h-2 bg-white/20">
                    <motion.div 
                      className="h-full bg-white" 
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
