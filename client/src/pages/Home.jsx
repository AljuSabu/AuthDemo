import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "sonner";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import FeatureCard from "../components/card/FeatureCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import KeyIcon from "@mui/icons-material/Key";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LockIcon from "@mui/icons-material/Lock";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);

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
        localStorage.removeItem("auth");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while logging out");
    }
  };

  return (
    <>
    <Helmet>
      <title>Home AuthDemo</title>
    </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-15">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Developer Learning Path
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Authentication{" "}
              <span className="text-indigo-600">Demo Project</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn how signup, login, and logout systems work with this
              interactive demonstration of modern web security patterns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="login"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-95 flex items-center justify-center gap-2"
              >
                {auth?.user ? "Explore Dashboard" : "Get Started"}
                <ChevronRightIcon />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards Section */}
        <section id="features" className="py-20 mt-10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                What's inside?
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Explore the core components that make up a standard
                authentication flow in modern applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={PersonAddIcon}
                title="Secure Signup"
                description="Learn how to collect user data, validate inputs, and securely store credentials in a database."
              />
              <FeatureCard
                icon={KeyIcon}
                title="Login Auth"
                description="Verify user identities using hashed passwords and secure comparison algorithms."
              />
              <FeatureCard
                icon={WatchLaterIcon}
                title="Session Handling"
                description="Manage user state across requests using JWTs or secure session cookies."
              />
              <FeatureCard
                icon={LockIcon}
                title="Protected Routes"
                description="Restrict access to specific pages or API endpoints based on authentication status."
              />
            </div>
          </div>
        </section>
      </motion.div>

      {/* Login Status Card Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className={`relative p-8 md:p-12 rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 ${
              auth?.user
                ? "bg-emerald-50 border-emerald-100 shadow-xl shadow-emerald-500/10"
                : "bg-indigo-50 border-indigo-100 shadow-xl shadow-indigo-500/10"
            }`}
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                {auth?.user ? (
                  <motion.div
                    key="logged-in"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                      <GppGoodOutlinedIcon className="size-10! text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      You are logged in!
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Welcome back,{" "}
                      <span className="font-bold text-emerald-600">
                        {auth.user?.name}
                      </span>
                      . Your session is currently active.
                    </p>

                    <div className="w-full max-w-sm bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-emerald-100 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <AccountCircleIcon className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Active User
                          </p>
                          <p className="text-sm font-medium text-slate-700">
                            {auth.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <LogoutIcon />
                      Logout Now
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="logged-out"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                      <LockOutlineIcon className="size-10! text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      You are not logged in
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-sm">
                      Please sign in to access protected features and view your
                      personal dashboard.
                    </p>
                    <Link
                      to="login"
                      className="px-10 py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95"
                    >
                      <LoginIcon />
                      Login
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative background elements */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-3xl transition-colors duration-500 ${auth?.user ? "bg-emerald-400/20" : "bg-indigo-400/20"}`}
            />
            <div
              className={`absolute bottom-0 left-0 w-32 h-32 -ml-16 -mb-16 rounded-full blur-3xl transition-colors duration-500 ${auth?.user ? "bg-emerald-400/20" : "bg-indigo-400/20"}`}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
