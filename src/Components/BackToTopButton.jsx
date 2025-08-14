import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-7 p-3 rounded-full bg-blue-700  rounded-full text-white shadow-lg hover:bg-blue-800"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
