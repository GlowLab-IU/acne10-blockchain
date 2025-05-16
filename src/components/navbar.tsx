import React from "react";
import { Link } from "react-router-dom";
import { Box } from "zmp-ui";

const Navbar: React.FunctionComponent = () => (
  <Box
    className="
    bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 
    text-white px-6 py-3 flex justify-between items-center 
    shadow-lg rounded-b-xl
  "
  >
    <h1 className="text-xl md:text-2xl font-extrabold tracking-wide select-none">
      GlowLab
    </h1>

    {/* Nav Links */}
    <Box className="hidden md:flex space-x-8">
      {[
        { to: "/camera", icon: "fas fa-camera", label: "Camera" },
        { to: "/homepage", icon: "fas fa-home", label: "Home" },
        { to: "/shopping", icon: "fas fa-shopping-cart", label: "Shopping" },
        { to: "/profile", icon: "fas fa-user", label: "Personal" },
      ].map(({ to, icon, label }) => (
        <Link
          to={to}
          key={to}
          className="
            flex items-center text-white text-lg font-medium 
            hover:text-blue-200 transition-colors duration-300 ease-in-out
          "
        >
          <i className={`${icon} mr-2`} />
          {label}
        </Link>
      ))}
    </Box>
  </Box>
);

export default Navbar;
