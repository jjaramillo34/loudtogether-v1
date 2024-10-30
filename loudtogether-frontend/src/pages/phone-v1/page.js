import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/phone-v1/Home";
import CreateSession from "./pages/phone-v1/CreateSession";
import JoinSession from "./pages/phone-v1/JoinSession";
import Session from "./pages/phone-v1/Session";
import SplashScreen from "./components/common/SplashScreen";

const Page = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <Routes>
        <Route path="/phone-v1" element={<Home />} />
        <Route path="/phone-v1/create" element={<CreateSession />} />
        <Route path="/phone-v1/join" element={<JoinSession />} />
        <Route path="/phone-v1/session/:sessionId" element={<Session />} />
        <Route path="/phone-v1/session/:sessionName" element={<Session />} />
      </Routes>
    </Router>
  );
};

export default Page;
