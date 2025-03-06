import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBriefcase, FaPlus, FaChevronLeft, FaChevronRight, FaUserCheck, FaUser, FaClock, FaShoppingCart } from 'react-icons/fa';

const LabourNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div>
      {/* Vertical Navbar for Desktop */}
      <nav className={`hidden md:flex fixed top-13 left-0 h-full overflow-y-auto transition-all duration-300 ease-in-out z-40 ${isOpen ? 'w-48' : 'w-16'} bg-white border-r-2 border-green-700 flex flex-col`}>        
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h2 className={`text-lg font-bold text-gray-800 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Menu</h2>
          <button onClick={toggleNavbar} className="p-2 text-gray-800 hover:text-green-700">
            {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        <ul className="mt-4 flex flex-col space-y-2 px-2 overflow-y-auto">
          <li>
            <Link to="/labour/landowner-jobs" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaUserCheck className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>LandOwner Jobs</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/active-jobs" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaBriefcase className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Active Jobs</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/register" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaPlus className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Register</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/available-labour" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaUserCheck className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Available Labour</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/profile" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaUser className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/create-job" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaPlus className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Create Job</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/request-history" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaClock className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Request History</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/payment" className="flex items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded w-full">
              <FaShoppingCart className="text-xl" />
              <span className={`ml-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Payment</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Horizontal Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-green-700 overflow-x-auto">
        <ul className="flex justify-around p-2 whitespace-nowrap">
          <li>
            <Link to="/labour/landowner-jobs" className="flex flex-col items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded">
              <FaUserCheck className="text-xl" />
              <span className="text-gray-800 text-sm">LandOwner Jobs</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/active-jobs" className="flex flex-col items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded">
              <FaBriefcase className="text-xl" />
              <span className="text-gray-800 text-sm">Active Jobs</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/register" className="flex flex-col items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded">
              <FaPlus className="text-xl" />
              <span className="text-gray-800 text-sm">Register</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/available-labour" className="flex flex-col items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded">
              <FaUserCheck className="text-xl" />
              <span className="text-gray-800 text-sm">Available Labour</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/profile" className="flex flex-col items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded">
              <FaUser className="text-xl" />
              <span className="text-gray-800 text-sm">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/labour/payment" className="flex flex-col items-center p-3 text-gray-800 hover:bg-green-600 transition duration-300 rounded">
              <FaShoppingCart className="text-xl" />
              <span className="text-gray-800 text-sm">Payment</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LabourNavbar;