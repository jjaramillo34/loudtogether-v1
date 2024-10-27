import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/phone-v1/Home";
<<<<<<< HEAD
import CreateSession from "./pages/phone-v1/CreateSession";
import JoinSession from "./pages/phone-v1/JoinSession";
import Session from "./pages/phone-v1/Session";
import SplashScreen from "./components/common/SplashScreen";
import Views from "./pages/Views";
import { ToastContainer } from "react-toastify";
=======
import HomeTablet from "./pages/tablet-v1/HomeTablet";
import HomeWeb from "./pages/web-v1/HomeWeb";
import Session from "./pages/phone-v1/Session";
import SplashScreen from "./components/common/SplashScreen";
import Views from "./pages/Views";
import CreateSessionPhone from "./pages/phone-v1/CreateSessionPhone";
import JoinSessionPhone from "./pages/phone-v1/JoinSessionPhone";
import CreateSessionTab from "./pages/tablet-v1/CreateSessionTab";
import JoinSessionTab from "./pages/tablet-v1/JoinSessionTab";
import CreateSessionWeb from "./pages/web-v1/CreateSessionWeb";
import JoinSessionWeb from "./pages/web-v1/JoinSessionWeb";
>>>>>>> origin/main

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState("mobile");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

<<<<<<< HEAD
  const getHomeComponent = () => Home;

  return (
    <Router>
      <ToastContainer />
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen />
          </motion.div>
        )}
      </AnimatePresence>
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
=======
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setCurrentView("mobile");
      } else if (width >= 768 && width <= 1024) {
        setCurrentView("tablet");
      } else {
        setCurrentView("web");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>
      {!showSplash && (
        <Routes>
          <Route
            path="/"
            element={
              <Views
                currentView={currentView}
                setCurrentView={setCurrentView}
              />
            }
          >
            <Route index element={React.createElement(getHomeComponent())} />
            <Route path="/create-phone" element={<CreateSessionPhone />} />
            <Route path="join-phone" element={<JoinSessionPhone />} />
            <Route path="/create-tab" element={<CreateSessionTab />} />
            <Route path="join-tab" element={<JoinSessionTab />} />
            <Route path="/create-web" element={<CreateSessionWeb />} />
            <Route path="join-web" element={<JoinSessionWeb />} />
            <Route path="session/:sessionId" element={<Session />} />
          </Route>
        </Routes>
      )}
>>>>>>> origin/main
    </Router>
  );
}

export default App;
