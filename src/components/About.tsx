import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-8">
              Our Philosophy
            </h2>
            <h3 className="text-5xl md:text-8xl font-display font-black text-zinc-900 mb-10 leading-[0.85] tracking-tighter">
              Design that <br /> <span className="text-gradient">Moves</span> the World.
            </h3>
            <div className="space-y-8 text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
              <p>
                At PixelCraft, we don't just follow trends—we set them. Our approach combines deep strategic insight with fearless creative execution.
              </p>
              <p>
                We believe every pixel has a purpose. From the initial spark of an idea to the final polished product, we obsess over the details that make your brand unforgettable.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mt-16">
              {[
                { label: 'Projects', value: '150+' },
                { label: 'Awards', value: '12+' },
                { label: 'Clients', value: '50+' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-5xl font-display font-black text-zinc-900 mb-2">{stat.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
              <img
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000"
                alt="Creative Process"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 bg-zinc-900 text-white p-10 rounded-full w-48 h-48 flex items-center justify-center text-center border-8 border-white shadow-2xl"
            >
              <span className="text-sm font-black uppercase tracking-widest leading-tight">
                Est. <br /> 2024
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
