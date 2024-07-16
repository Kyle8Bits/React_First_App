import React, { useRef } from 'react';

import Home from "./components/Home"
import Header from "./components/Header";
import SkillCards from "./components/SkillCards";
import Footer from "./components/Footer";
import PortfolioCard from "./components/PortfolioCard";

import { Helmet, HelmetProvider } from 'react-helmet-async';
function App() {

  const contactRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  

  return(
    <>
      <Header 
        scrollToSkills={() => scrollToSection(skillRef)} 
        scrollToPortfolio={() => scrollToSection(portfolioRef)} 
        scrollToContact={() => scrollToSection(contactRef)} 
      />
      <section ref={contactRef}> <Home/> </section>
      <section ref={skillRef}> <SkillCards/> </section>
      <section ref={portfolioRef}> <PortfolioCard/> </section>
      <Footer/>
    </>
  );
}

export default App;