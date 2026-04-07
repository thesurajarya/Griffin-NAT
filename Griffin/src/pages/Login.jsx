import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LetterGlitch from "../components/LetterGlitch";
import ClickSpark from "../components/ClickSpark";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the authentication token securely in the browser
        localStorage.setItem("soc_token", data.access_token);
        // Route the user to the protected dashboard
        navigate("/dashboard");
      } else {
        // If the backend returns a 401 Unauthorized
        setError("Invalid credentials. Access denied.");
      }
    } catch (err) {
      // If the FastAPI server isn't running
      setError("Cannot connect to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 font-sans bg-black overflow-hidden">
      
      {/* Background Layer: Dimmed Glitch Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <LetterGlitch 
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]} 
          glitchSpeed={50} 
          outerVignette={true} 
        />
      </div>

      {/* Foreground Content: Login Form */}
      <div className="relative z-10 w-full max-w-md mt-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">
            System <span className="text-blue-500">Authentication</span>
          </h1>
          <p className="text-slate-400 font-medium">Authorized personnel only.</p>
        </div>

        <form 
          onSubmit={handleLogin} 
          className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-2xl shadow-black/50 border border-slate-700/50 p-8"
        >
          
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-bold mb-2">Admin ID</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-500"
              placeholder="admin@soc.local"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-bold mb-2">Passphrase</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder-slate-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/80 border border-red-500 rounded text-red-200 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="flex justify-center mt-2">
            <ClickSpark 
              sparkColor="#fff" 
              sparkSize={10} 
              sparkRadius={20} 
              sparkCount={6} 
              duration={400}
            >
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full px-8 py-3 rounded-lg font-bold text-white transition-all duration-200 
                  ${isLoading 
                    ? "bg-slate-700 cursor-not-allowed opacity-50" 
                    : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/50 hover:-translate-y-0.5"
                  }`}
              >
                {isLoading ? "Authenticating..." : "Initialize Session"}
              </button>
            </ClickSpark>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;