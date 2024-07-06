import Home from "./components/Home"
import Header from "./components/Header";
import SkillCards from "./components/SkillCards";
import PortfolioCard from "./components/PortfolioCard";

import { Helmet, HelmetProvider } from 'react-helmet-async';
function App() {
  return(
    <HelmetProvider>
      <div>
        <Helmet>
            <title>Kyle's Porfolio</title>
            <link rel="icon" href="helmet.png" type="image/x-icon" />
        </Helmet>
          <Header/>
          <Home/>
          <SkillCards/>
          <PortfolioCard/>
      </div>
    </HelmetProvider>
  );
}

export default App;