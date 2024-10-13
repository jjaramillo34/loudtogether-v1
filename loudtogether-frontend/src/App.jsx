import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/phone-v1/Home";
import HomeTablet from "./pages/tablet-v1/HomeTablet";
import HomeWeb from "./pages/web-v1/HomeWeb";
import CreateSession from "./pages/phone-v1/CreateSession";
import JoinSession from "./pages/phone-v1/JoinSession";
import Session from "./pages/phone-v1/Session";
import SplashScreen from "./components/common/SplashScreen";
import Views from "./pages/Views";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState("mobile");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const getHomeComponent = () => {
    switch (currentView) {
      case "mobile":
        return Home;
      case "tablet":
        return HomeTablet;
      case "web":
        return HomeWeb;
      default:
        return Home;
    }
  };

  return (
    <Router>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <Routes>
        <Route
          path="/"
          element={
            <Views currentView={currentView} setCurrentView={setCurrentView} />
          }
        >
          <Route index element={React.createElement(getHomeComponent())} />
          <Route path="create" element={<CreateSession />} />
          <Route path="join" element={<JoinSession />} />
          <Route path="session/:sessionId" element={<Session />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
