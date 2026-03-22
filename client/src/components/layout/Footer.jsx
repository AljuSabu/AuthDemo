import React from "react";
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GppGoodOutlinedIcon className="text-indigo-600 w-6 h-6" />
                <span className="text-lg font-bold text-slate-900">
                  AuthDemo
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                A simple authentication learning project designed to demonstrate
                core security concepts for developers.
              </p>
            </div>
            <div className="flex flex-wrap gap-8 md:justify-end">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Resources
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-slate-600 hover:text-indigo-600 flex items-center gap-2"
                    >
                      <GitHubIcon className="w-4 h-4" /> GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-slate-600 hover:text-indigo-600 flex items-center gap-2"
                    >
                      <MenuBookIcon className="w-4 h-4" /> Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">
              © 2026 AuthDemo Project. Built for educational purposes.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
