import React from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      className={`fixed top-4 right-4 p-2 rounded-full ${
        isDark ? "bg-yellow-400" : "bg-gray-800"
      }`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.7, ease: "anticipate" }}
      >
        {isDark ? (
          <FaSun className="text-gray-800 text-xl" />
        ) : (
          <FaMoon className="text-yellow-400 text-xl" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
