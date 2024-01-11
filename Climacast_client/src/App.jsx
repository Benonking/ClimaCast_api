import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from "./components";
import { Landing } from "./components";
import Companies from "./components/Companies";
import {Home} from "./components";  
import {About} from "./components";

const App = () => {
  return (
    <div className="bg-slate-900">
      <Router>
        <Navbar />
        <Landing />
        <Companies />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;