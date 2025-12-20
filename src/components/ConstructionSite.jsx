import React, { useState, useEffect } from 'react';
import { Ruler, Truck, Hammer, PenTool, CheckCircle2 } from 'lucide-react';

const ConstructionSite = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500); 
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 0,
      title: "Design Analysis",
      desc: "Analyzing CAD drawings for GRC Dome scope.",
      icon: <Ruler size={18} />,
      color: "bg-blue-600",
      bg: "bg-blue-50",
      animation: <BlueprintAnimation isActive={activeStep === 0} />
    },
    {
      id: 1,
      title: "Mould Creation",
      desc: "Fabricating intricate moulds for Jali & cornices.",
      icon: <PenTool size={18} />,
      color: "bg-purple-600",
      bg: "bg-purple-50",
      animation: <MouldAnimation isActive={activeStep === 1} />
    },
    {
      id: 2,
      title: "Logistics",
      desc: "Safe transport of cured panels to the site.",
      icon: <Truck size={18} />,
      color: "bg-orange-600",
      bg: "bg-orange-50",
      animation: <TransportAnimation isActive={activeStep === 2} />
    },
    {
      id: 3,
      title: "Installation Done by our team",
      desc: "In-house skilled labor ensuring precision assembly.",
      icon: <Hammer size={18} />,
      color: "bg-green-600",
      bg: "bg-green-50",
      animation: <InstallationAnimation isActive={activeStep === 3} />
    }
  ];

  return (
    <div className="w-full bg-white py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Compact Header */}
        <div className="text-center mb-8">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-1 block">
            Our Workflow
          </span>
          <h2 className="text-2xl font-bold text-gray-800">
            From Drawing to Structure
          </h2>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div 
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-500 group ${
                activeStep === step.id 
                  ? `border-brand-gold shadow-md scale-100 ${step.bg}` 
                  : 'border-transparent bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {/* Animation Viewport */}
              <div className="h-28 w-full relative overflow-hidden border-b border-gray-100 bg-gray-100">
                {step.animation}
              </div>

              {/* Compact Content */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1.5 rounded text-white shadow-sm transition-colors ${
                    activeStep === step.id ? step.color : 'bg-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <h3 className={`font-bold text-sm leading-tight ${
                    activeStep === step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-xs text-gray-500 leading-tight min-h-[32px]">
                  {step.desc}
                </p>

                {/* Active Indicator */}
                <div className={`mt-2 flex items-center text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeStep === step.id ? 'text-brand-gold opacity-100' : 'opacity-0'
                }`}>
                  <CheckCircle2 size={12} className="mr-1 animate-pulse" /> Active
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ANIMATIONS ---

// 1. AutoCAD Dome Drawing
const BlueprintAnimation = ({ isActive }) => (
  <div className="w-full h-full relative bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 opacity-10" 
         style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
    </div>
    <div className={`relative transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}`}>
        <div className="w-32 h-16 border-t-2 border-l-2 border-r-2 border-cyan-500 rounded-t-full relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-cyan-900 border-l border-dashed border-cyan-500/50"></div>
            <div className="absolute bottom-0 w-full h-0.5 bg-cyan-500"></div>
            <div className="absolute top-1/2 right-2 text-[8px] text-yellow-400">R 1200</div>
        </div>
        <div className="w-40 h-0.5 bg-cyan-500 -ml-4 mt-1"></div>
        <div className="w-40 flex justify-between items-center -ml-4 mt-1">
            <div className="text-cyan-500 text-[8px]">◄</div>
            <div className="h-px bg-cyan-500/50 flex-1 mx-1"></div>
            <div className="text-cyan-500 text-[8px]">►</div>
        </div>
    </div>
    <div className={`absolute w-full h-0.5 bg-red-500/50 transition-all duration-[3000ms] linear ${
        isActive ? 'top-[80%]' : 'top-[10%]'
      }`}></div>
  </div>
);

// 2. Jali Mould
const MouldAnimation = ({ isActive }) => (
  <div className="w-full h-full flex items-center justify-center bg-purple-50 relative overflow-hidden">
    <div className="relative w-32 h-20 bg-gray-800 border-4 border-gray-300 rounded-sm shadow-inner overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-20 grid grid-cols-4 grid-rows-2 gap-1 p-1 pointer-events-none">
         {[...Array(8)].map((_,i) => (
            <div key={i} className="bg-gray-800 rounded-full border-2 border-gray-600"></div>
         ))}
      </div>
      <div className={`absolute bottom-0 left-0 right-0 bg-purple-400 z-10 transition-all duration-[3500ms] ease-in-out ${
        isActive ? 'h-full' : 'h-0'
      }`}></div>
    </div>
    <div className={`absolute top-0 w-3 bg-purple-400 transition-all duration-300 z-30 ${
      isActive ? 'h-1/2 opacity-100' : 'h-0 opacity-0'
    }`}></div>
  </div>
);

// 3. Truck Facing RIGHT (Left to Right Movement)
const TransportAnimation = ({ isActive }) => (
  <div className="w-full h-full flex flex-col justify-end bg-orange-50 overflow-hidden relative pb-2">
    <div className="absolute top-2 left-10 text-orange-200 text-xs">🏭 Factory</div>
    
    <div className={`absolute bottom-3 transition-all duration-[4000ms] linear flex items-end z-10 ${
      isActive ? 'left-[120%]' : 'left-[-120px]'
    }`}>
      <div className="w-24 h-5 bg-gray-700 relative flex items-end -mr-1">
          <div className="absolute bottom-5 left-2 flex gap-1">
              <div className="w-2 h-8 bg-gray-300 border border-gray-400 rounded-sm shadow-sm -rotate-6 origin-bottom-right"></div>
              <div className="w-2 h-8 bg-gray-300 border border-gray-400 rounded-sm shadow-sm -rotate-6 origin-bottom-right"></div>
              <div className="w-12 h-6 bg-gray-300 border border-gray-400 rounded-t-full shadow-sm"></div>
          </div>
      </div>
      <div className="w-10 h-12 bg-orange-700 rounded-sm relative border-r border-orange-800 z-20">
        <div className="absolute top-1 right-0 w-5 h-5 bg-blue-300 rounded-tl-sm border-l border-b border-white/30"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-200 rounded-full blur-[1px]"></div>
      </div>
      <div className="absolute -bottom-2 left-4 w-5 h-5 bg-black rounded-full flex items-center justify-center animate-spin">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className="absolute -bottom-2 right-2 w-5 h-5 bg-black rounded-full flex items-center justify-center animate-spin">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
       </div>
    </div>
    <div className="w-full h-4 bg-gray-600 mt-1 relative z-0 border-t border-gray-500">
      <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-yellow-500 opacity-70"></div>
    </div>
  </div>
);

// 4. Manual Assembly (No Crane)
// Sequence: Base -> Columns -> Support -> Cornice -> Dome (Done)
const InstallationAnimation = ({ isActive }) => (
  <div className="w-full h-full flex items-end justify-center bg-green-50 relative overflow-hidden pb-2">
    
    {/* 1. Base (Ground) */}
    <div className={`w-36 h-1.5 bg-gray-500 rounded-sm mb-0.5 transition-all duration-500 ease-out ${
      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
    }`}></div>

    {/* 2. Columns (Grow Upwards) */}
    <div className={`absolute bottom-3 left-[35%] w-2.5 bg-gray-300 border-x border-gray-400 transition-all duration-500 delay-300 ease-out ${
      isActive ? 'h-14 opacity-100' : 'h-0 opacity-0'
    }`}></div>
    <div className={`absolute bottom-3 right-[35%] w-2.5 bg-gray-300 border-x border-gray-400 transition-all duration-500 delay-300 ease-out ${
      isActive ? 'h-14 opacity-100' : 'h-0 opacity-0'
    }`}></div>

    {/* 3. Support/Beam (Fades in on top of columns) */}
    <div className={`absolute bottom-[60px] w-24 h-1.5 bg-gray-400 border border-gray-500 transition-all duration-500 delay-700 ease-out ${
      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}></div>

    {/* 4. Cornice (Expands on top of beam) */}
    <div className={`absolute bottom-[66px] w-28 h-2 bg-gray-300 border border-gray-400 shadow-sm transition-all duration-500 delay-1000 ease-out ${
      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
    }`}></div>

    {/* 5. Final Dome (Drops gently on top - "Done") */}
    <div className={`absolute bottom-[74px] w-16 h-8 bg-gradient-to-b from-yellow-100 to-yellow-300 border border-yellow-500 rounded-t-full shadow-md transition-all duration-500 delay-[1500ms] cubic-bezier-bounce ${
      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}></div>

    {/* "Done" Checkmark Effect */}
    <div className={`absolute top-2 right-2 text-green-600 transition-all duration-300 delay-[2000ms] ${
      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
    }`}>
      <CheckCircle2 size={20} />
    </div>

  </div>
);

export default ConstructionSite;