import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Contact from './pages/contact';
import Projects from './pages/projects';
import About from './pages/about';
import Home from './pages/home';
import NotFound from './pages/not-found';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/en" />} />

    <Route path="/:lang" element={<Home />} />
    <Route path="/:lang/about" element={<About />} />
    <Route path="/:lang/projects" element={<Projects />} />
    <Route path="/:lang/contact" element={<Contact />} />
    <Route path="/:lang/project/:id" element={<div />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
