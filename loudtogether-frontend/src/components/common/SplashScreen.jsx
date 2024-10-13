import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import StatusBar from "../StatusBar";
import HomeIndicator from "../HomeIndicator";

const SplashScreen = () => (
  <div className="max-w-md mx-auto bg-white text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden border-[14px] border-gray-200 relative">
    <StatusBar />
    <motion.div
      className="flex-grow flex items-center justify-center bg-gradient-to-br from-[#17D9A3] to-[#15c795]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block p-4 bg-white rounded-full shadow-lg"
        >
          <Volume2 size={64} color="#17D9A3" />
        </motion.div>
        <motion.div
          className="text-3xl font-bold text-white mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          LoudTogether
        </motion.div>
        <motion.div
          className="text-xl text-white mt-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Listen Together, Anytime
        </motion.div>
      </motion.div>
    </motion.div>
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="bg-white h-1 mx-auto w-16 rounded-full mb-4"
    />
    <HomeIndicator
      width="w-40"
      height="h-2"
      color="bg-white"
      animate={true}
      darkMode={false}
    />
  </div>
);

export default SplashScreen;
