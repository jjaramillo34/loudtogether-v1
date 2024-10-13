import React from "react";
import { Outlet } from "react-router-dom";
import Proptypes from "prop-types";

const Views = ({ currentView, setCurrentView }) => {
  Views.propTypes = {
    currentView: Proptypes.string.isRequired,
    setCurrentView: Proptypes.func.isRequired,
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          LoudTogether Views
        </h1>
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setCurrentView("mobile")}
            className={`px-4 py-2 rounded-md font-medium ${
              currentView === "mobile"
                ? "bg-[#17D9A3] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setCurrentView("tablet")}
            className={`px-4 py-2 rounded-md font-medium ${
              currentView === "tablet"
                ? "bg-[#17D9A3] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Tablet
          </button>
          <button
            onClick={() => setCurrentView("web")}
            className={`px-4 py-2 rounded-md font-medium ${
              currentView === "web"
                ? "bg-[#17D9A3] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Web
          </button>
        </div>
        <div className={`${currentView === "web" ? "" : "max-w-md mx-auto"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Views;
