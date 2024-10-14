import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';

function App() {
  return (
       <BrowserRouter>
       <Navbar/>
       <Hero/>
       </BrowserRouter>
  );
}

export default App;
