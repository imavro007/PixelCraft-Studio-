import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: 'Alex Rivers',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Visionary leader with 10+ years in branding.',
  },
  {
    name: 'Sarah Chen',
    role: 'Lead UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    bio: 'Obsessed with user behavior and clean interfaces.',
  },
  {
    name: 'Marcus Thorne',
    role: 'Senior Illustrator',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Bringing stories to life through digital art.',
  },
  {
    name: 'Elena Vance',
    role: 'Brand Strategist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Mastermind behind market-winning brand strategies.',
  },
];

export default function Team() {
  return (
    <section id="team" className="py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-6"
            >
              Our Talent
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-zinc-900 leading-[0.9] tracking-tighter"
            >
              The Minds <br /> <span className="text-zinc-400">Behind the Craft.</span>
            </motion.h3>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="flex justify-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-brand-primary transition-colors">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <h4 className="text-2xl font-display font-black text-zinc-900 mb-1 tracking-tight">{member.name}</h4>
              <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">{member.role}</p>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
