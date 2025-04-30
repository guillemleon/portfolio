import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Contact from './pages/contact';
import Work from './pages/work';
import About from './pages/about';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Project from './pages/project';

const validLangs = ['en', 'es', 'cat'];

const AppRoutes = () => {
  const location = useLocation();

  const lang = location.pathname.split('/')[1];

  if (lang && !validLangs.includes(lang)) {
    return <NotFound />;
  }

  return (
    <Routes>
      <Route path="/:lang" element={<Home />} />
      <Route path="/:lang/about" element={<About />} />
      <Route path="/:lang/work" element={<Work />} />
      <Route path="/:lang/contact" element={<Contact />} />
      <Route path="/:lang/work/:id" element={<Project />} />
      <Route path="/:lang/*" element={<NotFound />} />
      <Route path="/" element={<Navigate to="/en" />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
