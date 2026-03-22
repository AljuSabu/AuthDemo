import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "sonner";

const Layout = ({ description, keywords, author, title }) => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="flex flex-col relative overflow-hidden min-h-screen">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]" />
        </div>

        <Navbar />

        <main className="grow pt-20 pb-10">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
