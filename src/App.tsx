import Body from "./components/Body";
import Header from "./components/Header";
import { Helmet, HelmetProvider } from 'react-helmet-async';
function App() {
  return(
    <HelmetProvider>
      <div>
        <Helmet>
            <title>Kyle's Porfolio</title>
            <link rel="icon" href="/helmet.png" type="image/x-icon" />
        </Helmet>
          <Header/>
          <Body/>
      </div>
    </HelmetProvider>
  );
}

export default App;