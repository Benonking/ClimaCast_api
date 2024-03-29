// Hooks.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';

const Hooks = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default Hooks;
