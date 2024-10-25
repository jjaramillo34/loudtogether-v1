import { Outlet } from "react-router-dom";
import Proptypes from "prop-types";
import Navbar from "../components/Navbar";

const Views = ({ currentView }) => {
  Views.propTypes = {
    currentView: Proptypes.string.isRequired,
    setCurrentView: Proptypes.func.isRequired,
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navbar />
        <div className={`${currentView === "web" ? "" : "max-w-md mx-auto"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Views;
