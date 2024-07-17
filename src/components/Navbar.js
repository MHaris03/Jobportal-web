import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import Login from "./Login";
import SignUp from "./Signup";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [SignupOpen, setSignupOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleSelectProfile = () => {
    closeDropdown();
  };

  const handleSelectSettings = () => {
    closeDropdown();
  };

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePathClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleSignupModal = () => {
    setSignupOpen(!SignupOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userToken');
        setUserName(null);

        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully!',
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/');
      }
    });
  };

  const navItems = [
    { path: "/", title: "Start a Search" },
    ...(userName ? [{ path: "/my-job", title: "My Jobs" }] : []),
    ...(userName ? [{ path: "/post-job", title: "Post a Job" }] : []),
    { path: "/browsejobs", title: "Browse Jobs" },
    // { path: "/cvbuilder", title: "Build Your CV" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-2 text-2xl text-black">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>WE HIRE</span>
        </Link>

        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12" id="navbar">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "active border-b-2 border-blue p-1" : "hover:border-b-2 hover:border-blue transition duration-300 p-1"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Conditional rendering based on user's name */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {userName ? (
            <div className="relative inline-block">
              <button onClick={toggleDropdown} className="flex items-center py-2 px-5 border rounded">
                {userName}
                <IoMdArrowDropdown size={20} />
              </button>
              {dropdownVisible && (
                <div className="absolute bg-white border rounded mt-2 py-2 w-40 z-30">
                  <Link to="/userprofile" onClick={handleSelectProfile} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Show Profile</Link>
                  <Link to="/" onClick={handleSelectSettings} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Show Settings</Link>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLoginModal} className="py-2 px-5 border rounded">Log In</button>
          )}
          {userName ? (
            <button onClick={handleLogout} className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900">Logout</button>
          ) : (
            <button onClick={handleSignupModal} className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900">Sign Up</button>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </nav>

      {/* Nav items for mobile */}
      <div className={`px-4 bg-white py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-black first:texti-white py-1">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active border-b-2 border-blue-500" : "hover:border-b-2 hover:border-blue-500 transition duration-300")}
                onClick={handlePathClick}
              >
                {title}
              </NavLink>
            </li>
          ))}
          {userName ? (
            <button className="py-2 px-5 border rounded">{userName}</button>
          ) : (
            <button onClick={handleLoginModal} className="py-2 px-5 border rounded">Log In</button>
          )}
          {userName ? (
            <button onClick={handleLogout} className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900">Logout</button>
          ) : (
            <button onClick={handleSignupModal} className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900">Sign Up</button>
          )}
        </ul>
      </div>

      {/* Login Modal */}
      {isLoginOpen && <Login setLoginOpen={setIsLoginOpen} setsignupOpen={setSignupOpen} setUserName={setUserName} />}
      {SignupOpen && <SignUp setsignupOpen={setSignupOpen} setLoginOpen={setIsLoginOpen} setUserName={setUserName} />}
    </header>
  );
};

export default Navbar;
