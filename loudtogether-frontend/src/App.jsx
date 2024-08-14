import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";
import Session from "./pages/Session";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/join" element={<JoinSession />} />
        <Route path="/session/:sessionId" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
