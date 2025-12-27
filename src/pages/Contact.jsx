import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Architectural GRC',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    // ✅ CHANGED: Reduced padding from 'pt-48' to 'pt-36'
    // This exactly matches the h-36 navbar height, eliminating the white gap.
    <div className="min-h-screen bg-white pt-36">

      {/* 1. HERO HEADER */}
      <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 block animate-pulse">
            Let's Build Together
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Your Quote</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Ready to transform your facade? Fill out the form below or visit our HQ in Gurugram.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* 2. LEFT COLUMN: INFO & MAP */}
          <div className="space-y-8">

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ContactCard
                icon={<Phone size={24} />}
                title="Call Us"
                content="+91 98765 43210"
                sub="Mon-Sat, 9am - 6pm"
              />
              <ContactCard
                icon={<Mail size={24} />}
                title="Email Us"
                content="info@navnirman.com"
                sub="Online Support 24/7"
              />
              <ContactCard
                icon={<MapPin size={24} />}
                title="Visit HQ"
                content="Gurgaon"
                sub="Plot 512, Block-C, Vatika Kunj"
              />
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="bg-green-50 border border-green-200 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="bg-green-100 p-3 rounded-full text-green-600 mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <h3 className="font-bold text-gray-900">WhatsApp Us</h3>
                <p className="text-green-600 text-sm font-medium">Chat Instantly →</p>
              </a>
            </div>

            {/* GOOGLE MAP EMBED - Rithoj, Gurugram */}
            <div className="bg-gray-100 rounded-xl overflow-hidden h-80 shadow-inner border border-gray-200 relative group">
              <iframe
                title="NavNirman Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Plot+no+512,+block-C,+vatika+kunj,+rithoj+dhani,+Near+Maruti+kunj,+gurgaon+122102&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                // ✅ CHANGED: Removed 'grayscale' and 'group-hover' classes
                className="w-full h-full"
              ></iframe>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded shadow text-xs font-bold pointer-events-none">📍 NavNirman HQ</div>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: QUOTE FORM */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative overflow-hidden">
            {isSubmitted ? (
              <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h3>
                <p className="text-gray-500">Thank you, {formData.name}. Our estimation team will review your requirements and get back to you within 24 hours.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-brand-gold font-bold underline">Send another request</button>
              </div>
            ) : null}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              <p className="text-gray-500 text-sm mt-1">Fields marked with <span className="text-red-500">*</span> are required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                    placeholder="+91 98..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                >
                  <option>Architectural GRC (Jali/Cladding)</option>
                  <option>Structural GRC</option>
                  <option>Restoration Work</option>
                  <option>Custom Moulding</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Project Details</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all resize-none"
                  placeholder="Tell us about the estimated area (sq. ft), location, or specific design requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark text-white font-bold py-4 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Send size={18} /> Submit Request
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 4. FAQ SECTION */}
      <div className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem q="What is the typical lead time for a GRC project?" a="Standard projects typically require 3-4 weeks for mould fabrication and production, though this varies based on design complexity and volume." />
            <FAQItem q="Do you provide installation services?" a="Yes, we have a specialized in-house team for GRC installation to ensure structural integrity and perfect alignment." />
            <FAQItem q="Is GRC suitable for exterior use?" a="Absolutely. GRC is alkali-resistant, non-corrosive, and withstands extreme weather conditions better than traditional concrete." />
          </div>
        </div>
      </div>

    </div>
  );
};

// --- Helper Components ---

const ContactCard = ({ icon, title, content, sub }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center text-brand-dark mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
    <p className="text-brand-gold font-bold mt-1">{content}</p>
    <p className="text-gray-400 text-xs mt-1">{sub}</p>
  </div>
);

const FAQItem = ({ q, a }) => (
  <details className="group bg-white rounded-lg border border-gray-200 overflow-hidden open:border-brand-gold transition-colors">
    <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-gray-700 group-hover:text-brand-dark">
      {q}
      <span className="transition group-open:rotate-180">
        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
      </span>
    </summary>
    <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">
      {a}
    </div>
  </details>
);

export default Contact;