const Footer = () => (
  <footer className="bg-brand-dark text-white py-16">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
      <div>
        <h3 className="text-2xl font-bold mb-4">NAV<span className="text-brand-gold">NIRMAN</span></h3>
        <p className="text-gray-400 text-sm">Official digital introduction and product exploration platform.</p>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-brand-gold">Location</h4>
        <p className="text-sm text-gray-400">Industrial Zone, Delhi NCR<br/>India</p>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-brand-gold">Contact</h4>
        <p className="text-sm text-gray-400">info@navnirman.co<br/>+91 98XXX XXXXX</p>
      </div>
    </div>
    <p className="text-center text-xs text-gray-600 mt-8 uppercase tracking-widest">© 2025 Navnirman Industries</p>
  </footer>
);
export default Footer;