import React, { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  // Scroll to features section
  const scrollToFeatures = () => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById("features");

      if (section) {
        const navbarHeight = 80;

        const top =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  //loggout
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
      );
      if (data.success) {
        toast.success(data.message);
        setAuth({
          user: null,
          token: "",
        });
        setShowLinks(false);
        localStorage.removeItem("auth");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out");
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            {/* logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <GppGoodOutlinedIcon className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                AuthDemo
              </span>
            </div>

            {/* Home + Features */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
              <NavLink
                to="/"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Home
              </NavLink>

              <button
                onClick={scrollToFeatures}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="ml-auto hidden lg:flex items-center gap-5">
              {auth?.user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <AccountCircleIcon className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {auth.user?.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                  >
                    <LogoutIcon className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="login">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                      Login
                    </button>
                  </NavLink>

                  <NavLink to="signup">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95">
                      Sign Up
                    </button>
                  </NavLink>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setShowLinks((open) => !open)}
              className="ml-auto lg:hidden h-full w-15 border-none"
            >
              {showLinks ? (
                <CloseIcon className="text-3xl! md:text-4xl!" />
              ) : (
                <MenuIcon className="text-3xl! md:text-4xl!" />
              )}
            </button>

            {/* MOBILE MENU */}
            <div
              className={`fixed top-15 right-0 z-50 w-full text-slate-600 text-sm font-medium flex flex-col items-center gap-5 py-6 transform transition-all duration-300 ease-in-out ${showLinks ? "translate-x-0 opacity-100 blur-none bg-white" : "translate-x-full opacity-0 blur-sm"} lg:hidden`}
            >
              <NavLink to="/" onClick={() => setShowLinks(false)}>
                Home
              </NavLink>
              <button onClick={scrollToFeatures}>Features</button>

              {auth?.user ? (
                <>
                  <div>{auth.user?.name}</div>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="login" onClick={() => setShowLinks(false)}>
                    Login
                  </NavLink>
                  <NavLink to="signup" onClick={() => setShowLinks(false)}>
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
