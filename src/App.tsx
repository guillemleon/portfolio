import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/home/index';
import About from './pages/about/index';
import NotFound from './pages/not-found/index';
import './normalize.css';
import './fonts.css';
import { ThemeProvider } from './context/ThemeContext';
import useDeviceDetection from './hooks/useDeviceDetection';

const App = () => {
  const isMobile = useDeviceDetection();

  if (isMobile === null) return null;

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
