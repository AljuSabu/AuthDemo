import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

// eslint-disable-next-line no-unused-vars
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/15 transition-all"
      >
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
          <Icon className="text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </motion.div>
    </>
  );
};

export default FeatureCard;
