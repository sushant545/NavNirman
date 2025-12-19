const Contact = () => (
  <div className="py-24 max-w-5xl mx-auto px-4 text-center">
    <h1 className="text-5xl font-bold mb-6">Let's Build Together</h1>
    <p className="text-gray-500 mb-12 text-lg">Inquire about our GRC designs or request a site visit.</p>
    <div className="grid md:grid-cols-2 gap-10 text-left">
      <div className="bg-brand-gray p-10">
        <h3 className="font-bold text-xl mb-4">Direct Inquiry</h3>
        <p className="text-sm text-gray-600 mb-6">Our engineers will get back to you within 24 hours.</p>
        <button className="w-full bg-brand-dark text-white py-4 font-bold hover:bg-brand-gold transition">WHATSAPP US</button>
      </div>
      <div className="bg-brand-dark text-white p-10">
        <h3 className="font-bold text-xl mb-4 text-brand-gold">Visit Us</h3>
        <p className="text-sm text-gray-400">Navnirman Site Gallery,<br/>Sector 4, Industrial Area.</p>
      </div>
    </div>
  </div>
);
export default Contact;