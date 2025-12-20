import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure you have this
import Footer from './components/Footer'; // Ensure you have this
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact'; // Ensure you have this
import ProjectDetail from './pages/ProjectDetail'; // <--- THIS WAS LIKELY MISSING

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          
          {/* Dynamic Route for Project Details */}
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;