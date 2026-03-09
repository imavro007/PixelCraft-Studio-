import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
