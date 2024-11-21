import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

export default function LoginButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        className="bg-white/10 backdrop-blur-md text-white/70 hover:text-white border border-white/20 rounded-full p-2 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <User className="h-5 w-5" />
      </motion.button>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 w-64"
          >
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="w-full bg-green-500/80 hover:bg-green-500 text-white rounded-lg py-2 transition-colors duration-300"
              >
                Login
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}