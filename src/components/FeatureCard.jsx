import { motion } from "framer-motion";
const FeatureCard = ({ icon, title, description, darkMode }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${
      darkMode
        ? "bg-gray-800 text-white hover:shadow-blue-500/20 hover:bg-gray-700"
        : "bg-white text-gray-800 hover:shadow-blue-300/20 hover:bg-gray-50"
    }`}
  >
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
        {description}
      </p>
    </div>
  </motion.div>
);
export default FeatureCard;
