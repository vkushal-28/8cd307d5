import { motion } from "framer-motion";
import React from "react";

const Message = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="w-full h-full flex items-center justify-center min-lg: text-lg  text-slate-500 ">
      {text}
    </motion.div>
  );
};

export default Message;
