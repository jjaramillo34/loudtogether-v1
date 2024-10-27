import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

const SplashScreen = () => (
<<<<<<< HEAD
  <div className="w-full mx-auto text-gray-800 h-screen flex flex-col rounded-[3rem] overflow-hidden relative">
    <motion.div
      className="flex-grow flex items-center justify-center bg-gradient-to-br from-[#17D9A3] to-[#15c795] relative"
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
          className="inline-block p-6 bg-white rounded-full shadow-lg"
=======
  <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] my-10">
    {/* Decorative lines on the left and right */}
    <div className="absolute -start-[17px] top-[72px] h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 rounded-s-lg"></div>
    <div className="absolute -start-[17px] top-[124px] h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 rounded-s-lg"></div>
    <div className="absolute -start-[17px] top-[178px] h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 rounded-s-lg"></div>
    <div className="absolute -end-[17px] top-[142px] h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 rounded-e-lg"></div>

    {/* Main content area */}
    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
      <div className="relative h-full">
        <StatusBar />
        <motion.div
          className="flex-grow flex items-center justify-center bg-gradient-to-br from-[#17D9A3] to-[#15c795] absolute h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
>>>>>>> origin/main
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Animated volume icon */}
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
            {/* App Title */}
            <motion.h1
              className="text-3xl font-bold text-white mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              LoudTogether
            </motion.h1>
            {/* Tagline */}
            <motion.p
              className="text-xl text-white mt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Listen Together, Anytime
            </motion.p>
          </motion.div>
        </motion.div>
<<<<<<< HEAD

        <motion.div
          className="text-4xl font-extrabold text-white mt-6 tracking-wide"
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
      className="bg-white h-1 mx-auto w-16 rounded-full mb-6"
    />
=======
        {/* AppDock and HomeIndicator */}
        <div className="absolute bottom-4 w-full">
          <div className="flex justify-center mt-2">
            <HomeIndicator
              width="w-32"
              height="h-2"
              color="bg-blue-500"
              animate={true}
              darkMode={true}
            />
          </div>
        </div>
      </div>
    </div>
>>>>>>> origin/main
  </div>
);

export default SplashScreen;
