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

// ✅ 1. IMPORT THE CATALOG PAGE (Crucial)
import Catalog from './pages/Catalog'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* ✅ 2. REGISTER THE CATALOG ROUTE (Crucial) */}
          <Route path="/catalog" element={<Catalog />} />
          
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;