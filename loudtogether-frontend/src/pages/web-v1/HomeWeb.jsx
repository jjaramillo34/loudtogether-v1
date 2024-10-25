import { Link } from "react-router-dom";

const HomeWeb = () => {
  return (
    <>
      {/* Outer container for mobile and larger screens */}
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl max-w-[301px] md:max-w-[1024px] h-[489px] overflow-hidden">
        {/* Scrollable content area inside the mockup */}
        <div className="rounded-lg overflow-y-auto bg-white dark:bg-gray-800 h-[450px]">
          <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src="/img/logo1.png"
                  alt="LoudTogether Logo"
                  className="w-12 h-12 mr-4"
                />
                <h1 className="text-3xl font-bold text-gray-800">
                  LoudTogether
                </h1>
              </div>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to LoudTogether
                </h2>
                <p className="text-xl text-gray-600">
                  Create or join a session to start collaborating!
                </p>
              </div>

              <div className="flex justify-center space-x-8">
                <Link to="/create-web" className="flex-1 max-w-xs">
                  <div className="bg-[#17D9A3] text-white rounded-2xl py-6 px-8 text-center font-semibold text-xl shadow-lg transform transition duration-200 hover:scale-105 hover:bg-[#15c795]">
                    Create Session
                  </div>
                </Link>
                <Link to="/join-web" className="flex-1 max-w-xs">
                  <div className="bg-[#17D9A3] text-white rounded-2xl py-6 px-8 text-center font-semibold text-xl shadow-lg transform transition duration-200 hover:scale-105 hover:bg-[#15c795]">
                    Join Session
                  </div>
                </Link>
              </div>

              {/* Features Section */}
              <section id="features" className="mt-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-2">
                      Real-time Collaboration
                    </h4>
                    <p className="text-gray-600">
                      Work together with your team in real-time, no matter where
                      you are.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-2">
                      Easy Session Creation
                    </h4>
                    <p className="text-gray-600">
                      Create a new session with just a few clicks and invite
                      your team members.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-2">
                      Cross-platform Support
                    </h4>
                    <p className="text-gray-600">
                      Access LoudTogether from your desktop, tablet, or mobile
                      device.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-[#17D9A3] text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <p>&copy; 2024 LoudTogether. All rights reserved.</p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-gray-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-gray-300">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[50px] max-w-[351px] md:max-w-7xl">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[196px] md:h-[8px] bg-gray-800"></div>
      </div>
    </>
  );
};

export default HomeWeb;
