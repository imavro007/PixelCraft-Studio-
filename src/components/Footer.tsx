import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Dribbble, Github, Lock } from 'lucide-react';
import AdminPanel from './AdminPanel';

export default function Footer() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <footer className="py-20 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <div className="absolute inset-0 noise opacity-5" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-display font-black tracking-tighter text-white mb-8 block">
              PIXEL<span className="text-brand-primary">CRAFT</span>
            </a>
            <p className="text-zinc-500 text-lg font-light max-w-sm leading-relaxed">
              We are a creative studio dedicated to crafting exceptional digital experiences that inspire and connect.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Portfolio', 'Team', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-zinc-500 hover:text-brand-primary transition-colors text-sm font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8">Social</h4>
            <ul className="space-y-4">
              {['Instagram', 'Dribbble', 'Twitter', 'LinkedIn'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 hover:text-brand-primary transition-colors text-sm font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} PixelCraft Studio.
          </p>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-zinc-600 hover:text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
            >
              <Lock className="w-3 h-3" /> Admin Login
            </button>
            <a href="#" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
