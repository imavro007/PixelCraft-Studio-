import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const words = "PixelCraft Studio – Crafting Visuals".split(" ");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 noise" />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-brand-primary/20 rounded-full blur-[120px] animate-float" 
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 500], [0, -150]) }}
          className="absolute bottom-1/4 -right-20 w-[35rem] h-[35rem] bg-brand-secondary/20 rounded-full blur-[120px] animate-float delay-1000" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_100%)]" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-[0.2em] uppercase bg-white/5 text-zinc-400 rounded-full backdrop-blur-md border border-white/10"
          >
            Digital Experience Agency
          </motion.span>
          
          <h1 className="text-6xl md:text-9xl font-display font-black text-white mb-8 tracking-tighter leading-[0.85]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className={`inline-block mr-4 ${word === 'Visuals' ? 'text-gradient' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed tracking-tight"
          >
            We blend art and technology to create immersive digital identities that resonate and inspire.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#portfolio"
              className="group relative px-10 py-5 bg-white text-zinc-950 rounded-full font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="#contact"
              className="px-10 py-5 bg-transparent text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white hover:text-zinc-950 transition-all active:scale-95"
            >
              Start Project
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-px h-24 bg-linear-to-b from-brand-primary to-transparent" />
      </motion.div>
    </section>
  );
}
