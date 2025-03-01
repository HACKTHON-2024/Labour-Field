import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase, FaPlus } from 'react-icons/fa';

const LabourNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    console.log("Toggling Navbar");
    setIsOpen(prevState => !prevState);
  };

  return (
    <div>
      <nav className={`fixed top-12 left-0 h-full transition-all duration-300 ease-in-out z-40 ${isOpen ? 'w-64' : 'w-16'} bg-gradient-to-b from-gray-800 to-gray-900`}>
        <button 
          onClick={toggleNavbar} 
          className="p-2 text-white rounded z-40 absolute top-4 left-4"
        >
          <span className="mx-2">{isOpen ? "<" : ">"}</span>
        </button>
        
        <ul className={`mt-12 flex flex-col items-center`}>
          <li className="w-full flex justify-center mb-4">
            <Link to="/labour/dashboard" className="navbar__link flex items-center justify-center p-2 text-white whitespace-nowrap relative gap-4 hover:bg-green-600 transition duration-300 rounded">
              <FaHome className="text-lg" />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li className="w-full flex justify-center mb-4">
            <Link to="/labour/job-listing" className="navbar__link flex items-center justify-center p-2 text-white whitespace-nowrap relative gap-4 hover:bg-green-600 transition duration-300 rounded">
              <FaBriefcase className="text-lg" />
              {isOpen && <span>Job Listings</span>}
            </Link>
          </li>
          <li className="w-full flex justify-center mb-4">
            <Link to="/labour/create-job" className="navbar__link flex items-center justify-center p-2 text-white whitespace-nowrap relative gap-4 hover:bg-green-600 transition duration-300 rounded">
              <FaPlus className="text-lg" />
              {isOpen && <span>Create Job</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LabourNavbar;