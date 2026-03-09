import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jonathan Doe',
    company: 'TechFlow Solutions',
    content: 'PixelCraft transformed our brand from generic to iconic. Their attention to detail and creative vision is unmatched in the industry.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
  },
  {
    name: 'Sarah Miller',
    company: 'GreenEarth Co.',
    content: 'The UI/UX design they provided for our mobile app increased our user engagement by 40%. They truly understand user behavior.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
  },
  {
    name: 'David Smith',
    company: 'Artisan Brews',
    content: 'Working with PixelCraft was a seamless experience. They captured the essence of our craft brewery perfectly in our new packaging.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-6"
            >
              Client Stories
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-zinc-900 leading-[0.9] tracking-tighter"
            >
              Trusted by <br /> <span className="text-zinc-400">Industry Leaders.</span>
            </motion.h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="p-12 bg-zinc-50 rounded-[3rem] relative group hover:bg-zinc-900 transition-colors duration-500"
            >
              <Quote className="absolute top-10 right-10 w-16 h-16 text-zinc-200 group-hover:text-white/5 transition-colors" />
              <p className="text-xl text-zinc-600 group-hover:text-zinc-300 font-light italic mb-10 relative z-10 leading-relaxed transition-colors">
                "{t.content}"
              </p>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white group-hover:border-white/10 transition-colors"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-primary rounded-full border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-display font-black text-zinc-900 group-hover:text-white transition-colors tracking-tight">{t.name}</h4>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
