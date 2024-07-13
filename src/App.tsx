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
    <HelmetProvider>
      <div>
        <Helmet>
            <title>Kyle's Porfolio</title>
            <link rel="icon" href="helmet.png" type="image/x-icon" />
        </Helmet>
          <Header 
           scrollToSkills={() => scrollToSection(skillRef)} 
           scrollToPortfolio={() => scrollToSection(portfolioRef)} 
           scrollToContact={() => scrollToSection(contactRef)} 
          />
          <section ref={contactRef}> <Home/> </section>
          <section ref={skillRef}> <SkillCards/> </section>
          <section ref={portfolioRef}> <PortfolioCard/> </section>
          <Footer/>
      </div>
    </HelmetProvider>
  );
}

export default App;