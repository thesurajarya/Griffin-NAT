import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LetterGlitch from "../components/LetterGlitch";
import ClickSpark from "../components/ClickSpark";
import DecryptedText from "../components/DecryptedText";
import Footer from "../components/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Backend auth loading
  const [isSystemActivating, setIsSystemActivating] = useState(true); // Initial page loading

  const navigate = useNavigate();

  // Handle the initial "Loading" sequence
  useEffect(() => {
    const activationText = "Griffin is activating...";
    const animationSpeed = 70;
    // Calculate duration based on text length + a small buffer for the final reveal
    const totalDuration = activationText.length * animationSpeed + 1000;

    const timer = setTimeout(() => {
      setIsSystemActivating(false);
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://griffin-backend-cb00.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("soc_token", data.access_token);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Access denied.");
      }
    } catch (err) {
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

      <AnimatePresence mode="wait">
        {isSystemActivating ? (
          /* STEP 1: INITIAL LOADING PAGE */
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <DecryptedText
              text="Griffin is activating..."
              animateOn="view"
              revealDirection="start"
              sequential={true}
              speed={70}
              className="text-emerald-400 font-mono text-2xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              parentClassName="inline-block"
              encryptedClassName="text-emerald-900 opacity-40 font-mono text-2xl"
            />
            {/* Minimalist loading bar under the text */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-[1px] bg-emerald-500/50 mt-4 w-48"
            />
          </motion.div>
        ) : (
          /* STEP 2: YOUR ORIGINAL LOGIN FORM */
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">
                System <span className="text-blue-500">Authentication</span>
              </h1>
              <p className="text-slate-400 font-medium">
                Authorized personnel only.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-2xl shadow-black/50 border border-slate-700/50 p-8"
            >
              <div className="mb-6">
                <label className="block text-slate-300 text-sm font-bold mb-2">
                  Admin ID
                </label>
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
                <label className="block text-slate-300 text-sm font-bold mb-2">
                  Passphrase
                </label>
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
                      ${
                        isLoading
                          ? "bg-slate-700 cursor-not-allowed opacity-50"
                          : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/50 hover:-translate-y-0.5"
                      }`}
                  >
                    {isLoading ? "Authenticating..." : "Initialize Session"}
                  </button>
                </ClickSpark>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Login;
