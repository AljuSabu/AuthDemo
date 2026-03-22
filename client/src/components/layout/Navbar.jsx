import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  //loggout
  const handleLoggout = async () => {
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
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <GppGoodOutlinedIcon className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                AuthDemo
              </span>
            </div>

            <div
              className={`fixed top-15 right-0 z-50 w-full text-slate-600 font-medium flex flex-col items-center gap-5 py-6 transform transition-all duration-300 ease-in-out ${showLinks ? "translate-x-0 opacity-100 blur-none bg-white" : "translate-x-full opacity-0 blur-sm"} lg:static lg:translate-x-0 lg:flex-row lg:w-auto lg:opacity-100 lg:blur-none lg:py-0`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-5">
                <NavLink
                  to="/"
                  onClick={() => setShowLinks(false)}
                  className="cursor-pointer flex justify-center items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Home
                </NavLink>
                <div className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Features
                </div>
              </div>

              <div className="cursor-pointer flex flex-col lg:flex-row items-center gap-5">
                {auth?.user ? (
                  <>
                    <div className="flex items-center gap-2 px-3 lg:py-1.5 bg-slate-50 rounded-full border border-slate-100">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <AccountCircleIcon className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">
                        {auth.user?.name}
                      </span>
                    </div>
                    <button
                      onClick={handleLoggout}
                      className="flex items-center gap-2 px-4 lg:py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                    >
                      <LogoutIcon className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="login">
                      <button
                        onClick={() => setShowLinks(false)}
                        className="px-4 lg:py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                      >
                        Login
                      </button>
                    </NavLink>
                    <NavLink to="signup">
                      <button
                        onClick={() => setShowLinks(false)}
                        className="px-4 lg:py-2 text-sm font-medium text-slate-600 lg:text-white lg:bg-indigo-600 lg:hover:bg-indigo-700 lg:rounded-xl transition-all lg:shadow-sm lg:hover:shadow-md lg:active:scale-95"
                      >
                        Sign Up
                      </button>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setShowLinks((open) => !open);
              }}
              className="lg:hidden h-full w-15  border-none"
            >
              {showLinks ? (
                <CloseIcon className="text-3xl! md:text-4xl!" />
              ) : (
                <MenuIcon className="text-3xl! md:text-4xl!" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
