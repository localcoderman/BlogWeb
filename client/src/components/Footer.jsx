import { RouteIndex } from '@/helpers/RouteName'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="relative z-[999] bg-white border-t border-gray-300 py-10 text-black font-['Montserrat',sans-serif]">
      {/* Container wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid System (Responsive: 1 column on mobile, 3 columns on medium screens) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo/Brand Section */}
          <div className="flex flex-col space-y-3">
            <Link to={RouteIndex}>
            <div className='flex justify-center md:justify-start'>
              <h5 className="text-black font-bold tracking-[2px] text-lg">
              TECHFO
            </h5>
            <h5 className="text-red-500 font-bold tracking-[2px] text-lg">
             ANALYZER
            </h5>
            </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Collaborative learning ecosystem built for growth. Learn, Teach, and Grow together.
            </p>
            <span className="text-white text-sm">
              Developed by Mohammad Abdullah
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h6 className="text-black font-semibold">Quick Links</h6>
            <ul className="space-y-2 p-0 list-none text-black">
              <li>
                <a href="/" className=" hover:text-red-500 transition-colors text-sm no-underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/discover" className=" hover:text-red-500 transition-colors text-sm no-underline">
                  Discover
                </a>
              </li>
              <li>
                <a href="/about_us" className=" hover:text-red-500 transition-colors text-sm no-underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Connected / Contact */}
          <div className="flex flex-col space-y-3">
            <h6 className="text-black font-semibold">Stay Connected</h6>
            <p className="text-sm m-0">
              Have questions? Reach out to us:
            </p>
            <a href="tel:+923267838125" className="text-black mt-2 hover:underline  text-sm no-underline">
              +92 3267838125
            </a>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="border-white/10 my-7" />

        {/* Branding Footer Bottom */}
        <div className="text-center text-xs">
          &copy; Copyright {new Date().getFullYear()}  | Designed & Developed By: Developer Mohammad Abdullah
        </div>
      </div>
    </footer>
    // <div
    // className='text-sm text-center py-4'
    // >© Copyright 2026 | Designed & Developed By: Developer Mohammad Abdullah</div>
  )
}

export default Footer