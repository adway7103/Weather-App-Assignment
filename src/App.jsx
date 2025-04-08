import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherDashboard from "./pages/WeatherDashboard";
import NotFound from "./pages/NotFound";
import { FaSun, FaMoon, FaHome, FaChartLine } from "react-icons/fa";
import { WeatherProvider } from "./context/WeatherContext";
import { motion } from "framer-motion";
const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <WeatherProvider>
      <Router>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          <Route
            path="/weather"
            element={<WeatherDashboard darkMode={darkMode} />}
          />
          <Route path="*" element={<NotFound darkMode={darkMode} />} />
        </Routes>
      </Router>
    </WeatherProvider>
  );
};

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <FaChartLine className="text-white text-xl" />
            </div>
            <span className="text-white text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-white transition-all duration-300">
              WeatherVista
            </span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-1 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full px-2 py-1">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-200"
              >
                <FaHome className="mr-2" />
                <span>Home</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/weather"
                className="flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-200"
              >
                <FaChartLine className="mr-2" />
                <span>Dashboard</span>
              </Link>
            </motion.div>
          </div>

          {/* Dark Mode Toggle - Enhanced */}
          <motion.button
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <motion.div
              animate={darkMode ? "light" : "dark"}
              variants={{
                light: { rotate: 0, opacity: 1 },
                dark: { rotate: 180, opacity: 1 },
              }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-white"
            >
              {darkMode ? (
                <FaSun className="text-yellow-300" />
              ) : (
                <FaMoon className="text-blue-100" />
              )}
            </motion.div>

            {/* Animated background */}
            <motion.span
              className="absolute inset-0 bg-white/10 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: darkMode ? 1.2 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>
      </div>
    </nav>
  );
};
export default App;
