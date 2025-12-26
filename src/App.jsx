import React from 'react';
import { Routes, Route } from 'react-router-dom';

// COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// PAGES
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Catalog from './pages/Catalog';

// ✅ 1. IMPORT THE ADMIN PORTAL
import AdminPortal from './pages/AdminPortal'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* NOTE: The Navbar will appear on the Admin page too. 
         If you want to hide it later, we can add logic for that. 
      */}
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          
          <Route path="/contact" element={<Contact />} />

          {/* ✅ 2. REGISTER THE ADMIN ROUTE */}
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;