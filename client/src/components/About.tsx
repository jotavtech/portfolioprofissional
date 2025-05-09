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
              
              <div className="relative flex justify-center items-center perspective-container">
                <motion.div 
                  className="skill-cards-stack" 
                  initial={{ rotateY: 0 }}
                  whileInView={{ rotateY: 25 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* HTML Card */}
                  <motion.div 
                    className="absolute skill-card bg-black border border-white/50 p-6 rounded-sm shadow-glow"
                    initial={{ y: "0%", rotateY: 0, zIndex: 60, opacity: 1 }}
                    whileHover={{ 
                      y: "-10%", 
                      rotateY: 15, 
                      zIndex: 70,
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ top: "0px", left: "0px" }}
                  >
                    <div className="text-center">
                      <h4 className="font-pixel text-xl mb-2">HTML</h4>
                      <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                        <span className="text-3xl font-pixel">90%</span>
                      </div>
                      <p className="font-mono text-xs text-gray-300">Estruturação semântica e acessível de páginas web</p>
                    </div>
                  </motion.div>
                  
                  {/* CSS Card */}
                  <motion.div 
                    className="absolute skill-card bg-black border border-white/50 p-6 rounded-sm shadow-glow"
                    initial={{ y: "8%", rotateY: 5, zIndex: 50, opacity: 0.9 }}
                    whileHover={{ 
                      y: "-10%", 
                      rotateY: 15, 
                      zIndex: 70,
                      scale: 1.1,
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ top: "10px", left: "10px" }}
                  >
                    <div className="text-center">
                      <h4 className="font-pixel text-xl mb-2">CSS</h4>
                      <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                        <span className="text-3xl font-pixel">85%</span>
                      </div>
                      <p className="font-mono text-xs text-gray-300">Estilização avançada e layouts responsivos</p>
                    </div>
                  </motion.div>
                  
                  {/* JavaScript Card */}
                  <motion.div 
                    className="absolute skill-card bg-black border border-white/50 p-6 rounded-sm shadow-glow"
                    initial={{ y: "16%", rotateY: 10, zIndex: 40, opacity: 0.8 }}
                    whileHover={{ 
                      y: "-10%", 
                      rotateY: 15, 
                      zIndex: 70,
                      scale: 1.1,
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ top: "20px", left: "20px" }}
                  >
                    <div className="text-center">
                      <h4 className="font-pixel text-xl mb-2">JAVASCRIPT</h4>
                      <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                        <span className="text-3xl font-pixel">80%</span>
                      </div>
                      <p className="font-mono text-xs text-gray-300">Programação dinâmica e interatividade</p>
                    </div>
                  </motion.div>
                  
                  {/* React Card */}
                  <motion.div 
                    className="absolute skill-card bg-black border border-white/50 p-6 rounded-sm shadow-glow"
                    initial={{ y: "24%", rotateY: 15, zIndex: 30, opacity: 0.7 }}
                    whileHover={{ 
                      y: "-10%", 
                      rotateY: 15, 
                      zIndex: 70,
                      scale: 1.1,
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ top: "30px", left: "30px" }}
                  >
                    <div className="text-center">
                      <h4 className="font-pixel text-xl mb-2">REACT</h4>
                      <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                        <span className="text-3xl font-pixel">75%</span>
                      </div>
                      <p className="font-mono text-xs text-gray-300">Desenvolvimento de interfaces modernas</p>
                    </div>
                  </motion.div>
                  
                  {/* Prototipagem Card */}
                  <motion.div 
                    className="absolute skill-card bg-black border border-white/50 p-6 rounded-sm shadow-glow"
                    initial={{ y: "32%", rotateY: 20, zIndex: 20, opacity: 0.6 }}
                    whileHover={{ 
                      y: "-10%", 
                      rotateY: 15, 
                      zIndex: 70,
                      scale: 1.1,
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{ top: "40px", left: "40px" }}
                  >
                    <div className="text-center">
                      <h4 className="font-pixel text-xl mb-2">PROTOTIPAGEM</h4>
                      <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                        <span className="text-3xl font-pixel">85%</span>
                      </div>
                      <p className="font-mono text-xs text-gray-300">Design de interfaces e experiência de usuário</p>
                    </div>
                  </motion.div>
                  
                  {/* Banco de Dados Card */}
                  <motion.div 
                    className="absolute skill-card bg-black border border-white/50 p-6 rounded-sm shadow-glow"
                    initial={{ y: "40%", rotateY: 25, zIndex: 10, opacity: 0.5 }}
                    whileHover={{ 
                      y: "-10%", 
                      rotateY: 15, 
                      zIndex: 70,
                      scale: 1.1,
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    style={{ top: "50px", left: "50px" }}
                  >
                    <div className="text-center">
                      <h4 className="font-pixel text-xl mb-2">BANCO DE DADOS</h4>
                      <div className="w-16 h-16 mx-auto mb-3 border border-white/50 flex items-center justify-center">
                        <span className="text-3xl font-pixel">65%</span>
                      </div>
                      <p className="font-mono text-xs text-gray-300">Modelagem e gerenciamento de dados</p>
                    </div>
                  </motion.div>
                </motion.div>
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
