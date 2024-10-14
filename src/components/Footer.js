import React from 'react';
import { Link } from 'react-router-dom';
import { RiFacebookCircleLine, RiInstagramLine, RiLinkedinLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";



export default function App() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 lg:text-left">
      <div className="mx-6 py-8 text-center md:text-left">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="text-white space-y-4">
            <h6 className="flex items-center justify-center font-bold uppercase text-xl mb-4 md:justify-start">
              <Link to={`/`} className="hover:text-blue">Aidifys.com</Link>
            </h6>
            <p className="text-sm">
              Job Portal is a platform created by professionals for professionals, connecting talent with opportunities to drive career growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-white space-y-4">
            <h6 className="mb-4 font-bold uppercase text-lg">Quick Links</h6>
            <ul className="space-y-2">
              <li><Link to={`/browsejobs`} className="hover:text-blue">Browse Jobs</Link></li>
              <li><Link to={`/my-job`} className="hover:text-blue">My Jobs</Link></li>
              <li><Link to={`/post-job`} className="hover:text-blue">Post Job!</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="text-white space-y-4">
            <h6 className="mb-4 font-bold uppercase text-lg">Company</h6>
            <ul className="space-y-2">
              <li><Link to={`/companyinfo`} className="hover:text-blue">Company Information</Link></li>
              <li><Link to={`/contact`} className="hover:text-blue">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-white space-y-4">
            <h6 className="mb-4 font-bold uppercase text-lg">Contact</h6>
            <p className="flex items-center justify-center md:justify-start">
              <ImHome size={20} className='mr-1' />
              North Adam, 83 Jacob Glens, United Kingdom
            </p>
            <p className="flex items-center justify-center md:justify-start cursor-pointer">
              <MdEmail size={20} className="mr-1" />
              <a href="mailto:jobs@aidifys.com">
                jobs@aidifys.com
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaPhone size={20} className='mr-1' />
              +44 6487 415 50
            </p>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="py-4 flex justify-center">
        <a href="https://facebook.com" className="mx-2 text-white hover:text-blue transition-transform duration-300">
          <RiFacebookCircleLine size={30} />
        </a>
        <a href="https://www.instagram.com/aidifys.hiring?igsh=MTM3ZjNmbmVtNmR0Yg=="
          className="mx-2 text-white hover:text-blue transition-transform duration-300"
          target='blank'
        >
          <RiInstagramLine size={30} />
        </a>
        <a
          href="https://www.linkedin.com/company/aidifys/"
          className="mx-2 text-white hover:text-blue transition-transform duration-300"
          target='blank'
        >
          <RiLinkedinLine size={30} />
        </a>
      </div>

      {/* Footer Bottom */}
      <div className="py-4 text-center bg-gray-800">
        <p className="text-white">©2024 Aidifys.com All Rights Reserved.</p>
      </div>
    </footer>
  );
}
