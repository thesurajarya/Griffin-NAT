import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-8 w-full text-center z-20 px-4">
      {/* Container with a subtle backdrop blur to clear the glitch background */}
      <div className="inline-block px-6 py-2 rounded-full bg-slate-950/40 backdrop-blur-sm border border-slate-800/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <p className="text-slate-400 font-mono text-[11px] font-medium uppercase tracking-[0.25em]">
          Project developed by 
          <span className="text-white ml-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
            Suraj Arya
          </span> 
          <span className="text-blue-500 mx-3 font-bold">|</span> 
          <span className="text-slate-400">aka</span> 
          <span className="text-emerald-400 ml-2 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
            spider
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;