import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Card/Section';


function App() {
  return (
       <BrowserRouter>
       <Navbar/>
       <Hero/>
       <Section sectionType="albums"/>
       <Section sectionType="songs"/>
       </BrowserRouter>
  );
}

export default App;
