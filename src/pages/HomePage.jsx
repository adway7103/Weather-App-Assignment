import { Link } from "react-router-dom";
import {
  FaCloudSun,
  FaGlobeAmericas,
  FaChartLine,
  FaGithub,
} from "react-icons/fa";
import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";

const HomePage = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-20">
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 p-2 bg-clip-text text-transparent ${
                darkMode
                  ? "bg-gradient-to-r from-blue-400 to-blue-600"
                  : "bg-gradient-to-r from-blue-600 to-blue-800"
              }`}
            >
              Weather Insights
            </h1>
            <p
              className={`text-xl md:text-2xl p-1 mb-10 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Your comprehensive weather dashboard with real-time data and
              forecasts
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/weather"
                className={`inline-block px-10 py-4 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-500/30 hover:from-blue-500 hover:to-blue-600"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-blue-400/30 hover:from-blue-400 hover:to-blue-500"
                }`}
              >
                Check Weather
              </Link>
            </motion.div>
          </div>
          <div
            className={`mb-20 p-8 rounded-xl ${
              darkMode ? "bg-gray-800/50" : "bg-white/80"
            } shadow-lg`}
          >
            <h2
              className={`text-3xl font-bold mb-6 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              About Weather Insights
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p
                  className={`text-lg mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Weather Insights is a modern, responsive weather application
                  built with React that provides accurate weather forecasts and
                  atmospheric data for locations worldwide.
                </p>
                <p
                  className={`text-lg mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Utilizing data from reliable meteorological sources, our
                  platform offers detailed 7-day forecasts, hourly temperature
                  trends, humidity levels, wind speeds, and more.
                </p>
              </div>
              <div>
                <p
                  className={`text-lg mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Designed with both casual users and weather enthusiasts in
                  mind, Weather Insights presents complex meteorological data in
                  an intuitive, visually appealing interface.
                </p>
                <div className="flex items-center space-x-4 mt-6">
                  <a
                    href="https://github.com/adway7103/Weather-App-Assignment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-colors`}
                  >
                    <FaGithub className="mr-2 text-xl" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mb-20">
            <h2
              className={`text-3xl font-semibold mb-12 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaCloudSun className="text-4xl mb-4 text-blue-500" />}
                title="Real-time Weather"
                description="Current conditions with temperature, humidity, wind speed, and atmospheric pressure"
                darkMode={darkMode}
              />
              <FeatureCard
                icon={
                  <FaGlobeAmericas className="text-4xl mb-4 text-blue-500" />
                }
                title="Global Coverage"
                description="Search any city worldwide with autocomplete and geolocation support"
                darkMode={darkMode}
              />
              <FeatureCard
                icon={<FaChartLine className="text-4xl mb-4 text-blue-500" />}
                title="Detailed Forecasts"
                description="7-day forecasts with interactive charts showing temperature trends and precipitation probability"
                darkMode={darkMode}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
