import React from 'react';
import { motion } from 'motion/react';
import { Palette, Layout, PenTool, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Brand Identity',
    description: 'We create unique brand stories through logos, color palettes, and comprehensive brand guidelines.',
    icon: Palette,
    color: 'bg-indigo-500',
    size: 'md:col-span-2',
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric digital experiences that are intuitive and high-performing.',
    icon: Layout,
    color: 'bg-pink-500',
    size: 'md:col-span-1',
  },
  {
    title: 'Digital Illustration',
    description: 'Custom artwork that gives your brand a distinct personality.',
    icon: PenTool,
    color: 'bg-amber-500',
    size: 'md:col-span-1',
  },
  {
    title: 'Graphic Design',
    description: 'From print materials to social media assets, we handle all your visual communication needs.',
    icon: ImageIcon,
    color: 'bg-emerald-500',
    size: 'md:col-span-2',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-6"
            >
              Our Capabilities
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-zinc-900 leading-[0.9] tracking-tighter"
            >
              Solutions for the <br /> <span className="text-zinc-400">Modern Brand.</span>
            </motion.h3>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-500 font-light max-w-xs leading-relaxed"
          >
            We combine strategic thinking with creative excellence to deliver results that matter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group relative p-10 rounded-[2.5rem] overflow-hidden border border-zinc-100 bg-zinc-50 hover:bg-zinc-900 transition-all duration-500 ${service.size}`}
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-display font-bold text-zinc-900 group-hover:text-white mb-4 transition-colors">
                  {service.title}
                </h4>
                <p className="text-zinc-500 group-hover:text-zinc-400 font-light leading-relaxed mb-8 transition-colors">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-primary opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  Learn More <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              
              {/* Decorative Background Element */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-zinc-200/50 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
