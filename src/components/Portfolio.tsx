import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

const categories = ['All', 'Branding', 'UI/UX', 'Illustration', 'Graphic Design'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    
    // Listen for custom event to refresh portfolio when admin makes changes
    const handleRefresh = () => fetchProjects();
    window.addEventListener('portfolio-refresh', handleRefresh);
    return () => window.removeEventListener('portfolio-refresh', handleRefresh);
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (loading) return <div className="py-32 text-center text-zinc-500">Loading Portfolio...</div>;

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-6"
            >
              Selected Works
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-zinc-900 leading-[0.9] tracking-tighter"
            >
              Crafting <span className="text-zinc-400">Excellence.</span>
            </motion.h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-zinc-900 text-white shadow-xl scale-105' 
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[16/10] rounded-[3rem] overflow-hidden bg-zinc-100 cursor-pointer"
              >
                <div className="w-full h-full bg-zinc-100 relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                      No Image
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
                      {project.category}
                    </span>
                    <h4 className="text-4xl font-display font-black text-white mb-4 tracking-tight">
                      {project.title}
                    </h4>
                    <p className="text-zinc-300 text-lg font-light max-w-md leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
