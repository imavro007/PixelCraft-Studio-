import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section id="contact" className="py-32 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full noise opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-brand-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-8">
              Let's Talk
            </h2>
            <h3 className="text-6xl md:text-8xl font-display font-black mb-10 leading-[0.85] tracking-tighter">
              Ready to <br /> <span className="text-gradient">Elevate?</span>
            </h3>
            <p className="text-xl text-zinc-400 font-light mb-12 leading-relaxed">
              Whether you're starting from scratch or looking to evolve, we're here to help you navigate the creative landscape.
            </p>

            <div className="space-y-10">
              {[
                { icon: Mail, label: 'Email', value: 'hello@pixelcraft.studio', color: 'text-brand-primary' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', color: 'text-brand-secondary' },
                { icon: MapPin, label: 'Office', value: 'Creative City, NY', color: 'text-brand-accent' },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
                    <p className="text-xl font-medium group-hover:text-brand-primary transition-colors">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/5 p-12 md:p-16 rounded-[3rem] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors" />
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-hidden focus:border-brand-primary transition-colors text-lg font-light"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-hidden focus:border-brand-primary transition-colors text-lg font-light"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-white/5 border-b border-white/10 py-4 focus:outline-hidden focus:border-brand-primary transition-colors text-lg font-light resize-none"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-zinc-950 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-primary hover:text-white transition-all active:scale-95 group/btn"
                >
                  Send Inquiry <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
