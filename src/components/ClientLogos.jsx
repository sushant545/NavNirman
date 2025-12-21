import React from 'react';

const ClientLogos = () => {
  // Stable, public URLs for these logos
  const logos = [
    { 
      name: "Tirumala Tirupati Devasthanams", 
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/TTD-Logo.png" 
    },
    { 
      name: "L&T Construction", 
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbt9nYv0bZhZXDb9xmeO9s8fi2bYC3CiVvg&s" 
    },
    { 
      name: "IIT Delhi", 
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYSMRrwORnDdusOT7bJ3S7WS04C3bPzEGS1Q&s" 
    },
    { 
      name: "Emaar", 
      url: "https://1000logos.net/wp-content/uploads/2020/09/Emaar-Properties-Logo.jpg" 
    },
    { 
      name: "Indian Railway", 
      url: "https://images.seeklogo.com/logo-png/31/1/indian-railways-logo-png_seeklogo-310214.png" 
    },
    { 
      name: "CPWD", 
      url: "https://images.seeklogo.com/logo-png/44/1/cpwd-logo-png_seeklogo-447978.png" 
    },
    { 
      name: "GMR Group", 
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnqpUklc-40xqlruZ7ivTtK52Mj1RCHBcDlg&s" 
    },
  ];

  // Triple the list for seamless infinite scrolling
  const scrollLogos = [...logos, ...logos, ...logos];

  return (
    <div className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">
          Trusted Partners
        </span>
        <h2 className="text-2xl font-bold text-gray-400">
          Powering the nation's leading infrastructure
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradients to fade edges (Left & Right) */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Scrolling Track */}
        <div className="flex w-max animate-scroll hover:pause">
          {scrollLogos.map((logo, index) => (
            <div 
              key={index} 
              className="mx-10 w-40 h-24 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ClientLogos;