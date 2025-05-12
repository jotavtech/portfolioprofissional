import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Loader2, MessageSquare } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Por favor, digite um email válido" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  // Função para abrir o WhatsApp
  const openWhatsApp = () => {
    // Número formatado sem o +55 para o link do WhatsApp
    const phoneNumber = "5583999290376";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato, responderei em breve.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Algo deu errado",
        description: error.message || "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-black page-section">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-4xl animate-glitch mb-2">CONTATO</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 p-8 border border-white/20">
            <h3 className="font-retro text-2xl mb-6">ENTRE EM CONTATO</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-sm">NOME</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full bg-transparent border border-white/50 p-3 font-mono text-white focus:border-white focus:outline-none" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-sm">EMAIL</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          className="w-full bg-transparent border border-white/50 p-3 font-mono text-white focus:border-white focus:outline-none" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-sm">MENSAGEM</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5} 
                          className="w-full bg-transparent border border-white/50 p-3 font-mono text-white focus:border-white focus:outline-none" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="button" 
                  onClick={openWhatsApp}
                  className="bg-white text-black font-pixel py-3 px-8 w-full hover:bg-black hover:text-white hover:border hover:border-white transition-colors duration-300 clickable"
                >
                  CONVERSAR NO WHATSAPP
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="bg-white/5 p-8 border border-white/20 flex flex-col justify-between">
            <div>
              <h3 className="font-retro text-2xl mb-6">INFORMAÇÕES DE CONTATO</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="font-pixel text-sm mb-2">EMAIL</p>
                  <a href="mailto:martinsjoao1227@gmail.com" className="font-mono text-gray-300 hover:text-white clickable">martinsjoao1227@gmail.com</a>
                </div>
                
                <div>
                  <p className="font-pixel text-sm mb-2">TELEFONE</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="tel:+5583999290376" className="font-mono text-gray-300 hover:text-white clickable">+55 83 999290376</a>
                    <button 
                      onClick={openWhatsApp} 
                      className="flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors duration-300 clickable"
                    >
                      <span className="text-sm font-mono">WhatsApp</span>
                      <MessageSquare size={16} className="animate-pulse" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="font-pixel text-sm mb-2">ENDEREÇO</p>
                  <p className="font-mono text-gray-300">58065 081 VALENTINA</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="font-pixel text-sm mb-4">REDES SOCIAIS</p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/jotavtech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-10 w-10 border border-white/50 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 clickable"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-10 w-10 border border-white/50 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 clickable"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-10 w-10 border border-white/50 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 clickable"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
