import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { motion, AnimatePresence } from "framer-motion";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen ${
            isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Nested Comments App
            </h1>
            <CommentForm />
            <CommentList />
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDark ? "dark" : "light"}
          />
        </motion.div>
        <ScrollToTop />
      </AnimatePresence>
    </Provider>
  );
}

export default App;
