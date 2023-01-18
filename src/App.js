import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Page/Header';
import { Home } from './Page/Home';
import { Coins } from './Page/Coins';
import { Exchanges } from './Page/Exchanges';
import { CoinsDetails } from './Page/CoinsDetails';
import { Footer } from './Page/Footer.js';


 
function App() {
  return(
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/exchanges' element={<Exchanges/>}/>
        <Route path='/coins/:id' element={<CoinsDetails/>}/>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
export default App;