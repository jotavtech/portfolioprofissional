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
        
        {/* Porsche Animation */}
        <motion.div 
          className="mb-16 relative h-40 md:h-60 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute w-full h-[1px] bg-white/30 top-3/4 left-0 right-0"></div>
          
          <motion.div 
            className="absolute left-[-150px] z-10"
            initial={{ x: "-100%" }}
            whileInView={{ x: "150%" }}
            viewport={{ once: false }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            {/* Porsche Car SVG */}
            <div className="relative w-64 h-32">
              {/* Car Body */}
              <motion.svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40,20 L60,10 L160,10 L190,20 L220,40 L230,60 L30,60 L20,50 L20,30 Z" fill="white" stroke="black" strokeWidth="1"/>
                <path d="M60,10 L70,40 L160,40 L170,20 Z" fill="white" stroke="black" strokeWidth="1"/>
                <rect x="80" y="15" width="40" height="25" fill="black" opacity="0.7"/>
                <rect x="130" y="15" width="30" height="25" fill="black" opacity="0.7"/>
                
                {/* Car Details */}
                <path d="M220,40 L230,60" stroke="black" strokeWidth="1"/>
                <path d="M20,50 L30,60" stroke="black" strokeWidth="1"/>
                <path d="M20,30 L20,50" stroke="black" strokeWidth="1"/>
                
                {/* Headlights */}
                <circle cx="215" cy="35" r="5" fill="yellow" />
                <circle cx="25" cy="35" r="5" fill="red" />
                
                {/* Front Wheel */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "55px 60px" }}
                >
                  <circle cx="55" cy="60" r="15" fill="black" />
                  <circle cx="55" cy="60" r="10" fill="#333" />
                  <circle cx="55" cy="60" r="5" fill="#666" />
                  <line x1="55" y1="50" x2="55" y2="70" stroke="white" strokeWidth="1" />
                  <line x1="45" y1="60" x2="65" y2="60" stroke="white" strokeWidth="1" />
                </motion.g>
                
                {/* Rear Wheel */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "180px 60px" }}
                >
                  <circle cx="180" cy="60" r="15" fill="black" />
                  <circle cx="180" cy="60" r="10" fill="#333" />
                  <circle cx="180" cy="60" r="5" fill="#666" />
                  <line x1="180" y1="50" x2="180" y2="70" stroke="white" strokeWidth="1" />
                  <line x1="170" y1="60" x2="190" y2="60" stroke="white" strokeWidth="1" />
                </motion.g>
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-center">
            <div className="w-full max-w-4xl mx-auto">
              <motion.div 
                className="skill-cards-stack relative mx-auto transform-gpu" 
                initial={{ rotateY: 0 }}
                whileInView={{ rotateY: 15 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d', perspective: '1000px', height: '400px' }}
              >
                {/* HTML Card */}
                <motion.div 
                  className="absolute left-0 right-0 top-0 mx-auto max-w-[280px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
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
                  className="absolute left-0 right-0 top-0 mx-auto mt-8 max-w-[280px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
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
                  className="absolute left-0 right-0 top-0 mx-auto mt-16 max-w-[280px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
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
                  className="absolute left-0 right-0 top-0 mx-auto mt-24 max-w-[280px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
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
                  className="absolute left-0 right-0 top-0 mx-auto mt-32 max-w-[280px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
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
                  className="absolute left-0 right-0 top-0 mx-auto mt-40 max-w-[280px] bg-black/80 border border-white/50 p-6 rounded-sm shadow-glow transform-gpu"
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
      </div>
    </section>
  );
}