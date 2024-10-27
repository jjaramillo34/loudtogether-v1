import { Outlet } from "react-router-dom";
<<<<<<< HEAD
import Navbar from "../components/Navbar";

const Views = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Navbar/>
        <div className={`max-w-7xl w-full mx-auto`}>
=======
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
>>>>>>> origin/main
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Views;
