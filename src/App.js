import './App.css';
import { NavBar } from './component/NavBar';
import { Banner } from './component/Banner';
import { Projects } from './component/Project';
import Ticket from './component/Ticket';
import "bootstrap/dist/css/bootstrap.min.css"
import BOHAN from './component/BOHAN.tsx';
import React from 'react';
import Pointer from './pointer/Pointer.tsx';
import Music from './component/music.tsx';
function App() {
  return (
    <div className="App">
      <div>
        <BOHAN/>
        <NavBar />
        <Banner />
        {/* <Ticket/> */}
        <Projects />
        {/* <Music/> */}
      </div>
      
      {/* <Contact />
      <Footer /> */}
    </div>
  );
}

export default App;
