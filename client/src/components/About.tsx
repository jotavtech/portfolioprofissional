import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const { scrollYProgress } = useScroll();
  
  // Transformação para o movimento do Porsche baseado no scroll
  const porscheX = useTransform(scrollYProgress, [0.3, 0.9], ["-5%", "105%"]);
  
  // Transformação para a rotação das rodas baseado no scroll
  const wheelRotation = useTransform(scrollYProgress, [0.3, 0.9], [0, 1500]);
  
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
          <h2 className="font-pixel text-4xl animate-glitch mb-2">SOBRE MIM</h2>
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
              duration: 6, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          >
            {/* Porsche Car SVG */}
            <div className="relative w-64 h-32">
              {/* Car Body */}
              <motion.svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40,20 L60,10 L160,10 L190,20 L220,40 L230,60 L30,60 L20,50 L20,30 Z" fill="#1E3A8A" stroke="black" strokeWidth="1"/>
                <path d="M60,10 L70,40 L160,40 L170,20 Z" fill="#1E3A8A" stroke="black" strokeWidth="1"/>
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
                    duration: 0.5,
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
                    duration: 0.5,
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
        
        {/* Porsche controlado pelo scroll */}
        <div className="relative h-32 mb-12 overflow-hidden">
          <div className="absolute w-full h-[2px] bg-white/30 top-3/4 left-0 right-0"></div>
          
          {/* Porsche Car com movimento baseado no scroll */}
          <motion.div 
            className="absolute z-20 pointer-events-none"
            style={{ x: porscheX }}
          >
            <img 
              src="/attached_assets/porsche.png" 
              alt="Porsche" 
              className="h-16 md:h-20 object-contain"
            />
            
            {/* Rodas que giram com o scroll */}
            <motion.div 
              className="absolute bottom-[2px] left-7 w-10 h-10"
              style={{ rotate: wheelRotation }}
            >
              <img 
                src="/attached_assets/rodaporsche.webp" 
                alt="Roda Porsche" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-[2px] left-[75px] w-10 h-10"
              style={{ rotate: wheelRotation }}
            >
              <img 
                src="/attached_assets/rodaporsche.webp" 
                alt="Roda Porsche" 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
        
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
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-8">INTERESSES</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">UI/UX</h4>
                  <p className="font-mono text-xs">Criação de interfaces e experiências de usuário intuitivas</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">WEB</h4>
                  <p className="font-mono text-xs">Desenvolvimento front-end com foco em interfaces modernas</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">MOBILE</h4>
                  <p className="font-mono text-xs">Aplicativos para Android e iOS com React Native</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">GAMES</h4>
                  <p className="font-mono text-xs">Desenvolvimento de jogos e experiências interativas</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">IA</h4>
                  <p className="font-mono text-xs">Aplicações de inteligência artificial e automação</p>
                </div>
                <div className="p-4 border border-white/20 text-center">
                  <h4 className="font-pixel mb-2">3D</h4>
                  <p className="font-mono text-xs">Modelagem e animação 3D para web e aplicações</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="bg-white/5 p-6 border border-white/10" variants={itemVariants}>
              <h3 className="font-retro text-2xl mb-4">IDIOMAS</h3>
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
