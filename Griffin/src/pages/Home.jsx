import React from "react";
import { useNavigate } from "react-router-dom";
import LetterGlitch from "../components/LetterGlitch";
import UploadFile from "../components/UploadFile";

const Home = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // 1. Destroy the session token
    localStorage.removeItem("soc_token");
    // 2. Redirect back to the login screen
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 font-sans bg-black overflow-hidden">
      
      {/* 🔴 NEW: Sign Out Button positioned in the top right */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-900/30 hover:bg-red-800/80 text-red-400 hover:text-red-100 text-sm font-semibold rounded-lg border border-red-800/50 backdrop-blur-md transition-all duration-200 shadow-lg"
        >
          Terminate Session
        </button>
      </div>

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          outerVignette={true}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex flex-col items-center mt-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-lg">
            Network Threat <span className="text-blue-400">Intelligence</span>
          </h1>
          <p className="text-slate-300 max-w-lg mx-auto drop-shadow-md font-medium">
            Upload a raw packet capture to passively discover assets, extract
            service banners, and correlate vulnerabilities against the NVD
            database.
          </p>
        </div>

        <UploadFile />

      </div>
    </div>
  );
};

export default Home;