import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Login from "./Login";
import SignUp from "./Signup";
import Swal from 'sweetalert2';
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [SignupOpen, setSignupOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    setIsMenuOpen(false);
  };

  const handleSignupModal = () => {
    setSignupOpen(!SignupOpen);
    setIsMenuOpen(false);
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
        localStorage.removeItem('UserId');
        setUserName(null);

        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        setIsMenuOpen(false);
        navigate('/');
      }
    });
  };

  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/post-job", title: "Post Job" },
    ...(userName ? [{ path: "/my-job", title: "My Jobs" }] : []),
    { path: "/browsejobs", title: "Browse Jobs" },
  ];
  const handlePostJobClick = () => {
    if (!userName) {
      Swal.fire({
        title: 'Please log in or Sign up',
        text: 'You need to log in or sign up to post a job',
        icon: 'warning',
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonText: 'Sign Up',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoginOpen(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSignupOpen(true);
        }
      });
    } else {
      setIsMenuOpen(false);
      navigate('/post-job');
    }
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <header className="fixed top-0 z-50 shadow-md bg-white max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* <header className="fixed top-0 w-full z-50 bg-white shadow-md max-w-screen-2xl container mx-auto xl:px-24 px-4"> */}
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-2 text-2xl text-black">
          <img
            src="/Aidifyslogo-removebg-preview.png"
            alt="Aidifys Logo"
            className="h-auto max-h-12 w-auto max-w-xs object-contain"
          />
        </Link>
        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12" id="navbar">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              {path === '/post-job' ? (
                <button
                  onClick={() => handlePostJobClick(path)}
                  className={`relative group p-1 ${location.pathname === '/post-job' ? 'border-b-2 border-blue text-blue' : ''}`}
                >
                  {title}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "active relative border-b-2 border-blue p-1 text-primary"
                      : "relative group p-1"
                  }
                >
                  {title}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        {/* Conditional rendering based on user's name */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {userName ? (
            <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                className="flex items-center py-2 px-5 border rounded"
              >
                {userName}
                {dropdownVisible ? (
                  <IoMdArrowDropup size={20} className="ml-2" />
                ) : (
                  <IoMdArrowDropdown size={20} className="ml-2" />
                )}
              </button>

              {dropdownVisible && (
                <div className="absolute bg-white border rounded mt-1 py-2 w-40 z-30 justify-center text-center flex flex-col">
                  <NavLink
                    to="/userprofile"
                    onClick={handleSelectProfile}
                    className={({ isActive }) =>
                      isActive
                        ? "active relative border-b-2 border-blue p-1"
                        : "relative group p-1"
                    }
                  >
                    Show Profile
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </NavLink>
                  <NavLink
                    to="/user-applied-jobs"
                    onClick={handleSelectProfile}
                    className={({ isActive }) =>
                      isActive
                        ? "active relative border-b-2 border-blue p-1"
                        : "relative group p-1"
                    }
                  >
                    Applied Jobs
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </NavLink>
                  {/* Add more links here if needed */}
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLoginModal} className="py-2 px-5 border rounded">
              Log In
            </button>
          )}
          {userName ? (
            <button
              onClick={handleLogout}
              className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleSignupModal}
              className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <button
            onClick={handleMenuToggler}
            className="text-primary focus:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Nav items for mobile */}
      <div
        className={`fixed inset-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-200 ease-in-out bg-white z-30 md:hidden`}
      >
        {/* Overlay to close the menu when clicking outside */}
        {isMenuOpen && (
          <div
            className="absolute inset-0  opacity-50"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Mobile Menu Content */}
        <div className="relative flex flex-col h-full bg-white p-4">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={handlePathClick} className="flex items-center gap-2 text-2xl text-black">
              <img
                src="/Aidifyslogo-removebg-preview.png"
                alt="Aidifys Logo"
                className="h-auto max-h-12 w-auto max-w-xs object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-red-700 focus:outline-none"
              aria-label="Close Menu"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col space-y-4">
            {navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-primary">
                {path === '/post-job' ? (
                  <button
                    onClick={() => handlePostJobClick(path)}
                    className={`relative group p-1 ${location.pathname === '/post-job' ? 'border-b-2 border-blue text-blue' : ''}`}
                  >
                    {title}
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                ) : (
                  <NavLink
                    to={path}
                    onClick={handleNavLinkClick}
                    className={({ isActive }) =>
                      isActive
                        ? "active relative border-b-2 border-blue p-1 text-primary"
                        : "relative group p-1"
                    }
                  >
                    {title}
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* User Authentication Buttons */}
          <div className="w-40">
            {userName ? (
              <div className="flex flex-col space-y-4">
                <div className="mt-4 space-y-4 flex flex-col w-28">
                  {/* Show Profile Link */}
                  <NavLink
                    to="/userprofile"
                    onClick={() => {
                      handleSelectProfile();
                      handlePathClick();
                    }}
                    className={({ isActive }) =>
                      isActive
                        ? "active relative border-b-2 border-blue p-1"
                        : "relative group p-1"
                    }
                  >
                    Show Profile
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </NavLink>
                  <NavLink
                    to="/user-applied-jobs"
                    onClick={() => {
                      handleSelectProfile();
                      handlePathClick();
                    }}
                    className={({ isActive }) =>
                      isActive
                        ? "active relative border-b-2 border-blue p-1"
                        : "relative group p-1"
                    }
                  >
                    Applied Jobs
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </NavLink>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900 transition-colors duration-300 w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-3">
                {/* Log In Button */}
                <button
                  onClick={handleLoginModal}
                  className="py-2 px-4 border rounded hover:bg-gray-100 focus:outline-none w-full"
                >
                  Log In
                </button>

                {/* Sign Up Button */}
                <button
                  onClick={handleSignupModal}
                  className="py-2 px-4 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900 transition-colors duration-300 w-full"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <Login
          setLoginOpen={setIsLoginOpen}
          setsignupOpen={setSignupOpen}
          setUserName={setUserName}
        />
      )}
      {SignupOpen && (
        <SignUp
          setsignupOpen={setSignupOpen}
          setLoginOpen={setIsLoginOpen}
          setUserName={setUserName}
        />
      )}
    </header>

  );
};

export default Navbar;
