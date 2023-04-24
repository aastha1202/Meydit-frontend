import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Consumer from './components/Consumer/Consumer';
import { Maker } from './components/Maker/Maker';
import Home from './components/Home';
import "../src/index.css"
import Login from './components/Login';
import Signin from './components/Signin';
import Profile from './components/Profile';
import Work from './components/Work';
import Quotation from './components/Quotation';
import MakerQuotation from './components/MakerQuotation';

function App() {
  return (
    <div className="App font-montserrat">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/consumer' element={<Consumer/>}/>
        <Route path='/maker' element={<Maker/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/quotation' element={<Quotation/>}/>
        <Route path='/maker/quotation' element={<MakerQuotation/>}/>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
