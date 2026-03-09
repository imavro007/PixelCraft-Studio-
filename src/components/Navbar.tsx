import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-500 rounded-full px-8 ${
          scrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent'
        }`}>
          <a href="#" className="text-2xl font-display font-black tracking-tighter group">
            PIXEL<span className="text-brand-primary group-hover:text-brand-secondary transition-colors">CRAFT</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-brand-primary transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-primary hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Contact
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 rounded-full ${scrolled ? 'bg-zinc-100' : 'bg-white/10 text-white'}`} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t md:hidden flex flex-col p-6 space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-brand-primary"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="bg-brand-primary text-white px-6 py-3 rounded-xl text-center font-semibold"
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
