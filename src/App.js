import './App.css';
import { NavBar } from './component/NavBar';
import { Banner } from './component/Banner';
import {Skills} from "./component/Skills";
import { Projects } from './component/Project';

import "bootstrap/dist/css/bootstrap.min.css"
import BOHAN from './component/BOHAN.tsx';
import React from 'react';
import Pointer from './pointer/Pointer.tsx';
function App() {
  return (
    <div className="App">
      <div>
        <BOHAN/>
        <NavBar />
        <Banner />
        
        <Projects />
        <Skills />
      </div>
      
      {/* <Contact />
      <Footer /> */}
    </div>
  );
}

export default App;
