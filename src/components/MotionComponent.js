import React from "react";
import { motion } from "framer-motion";

const MotionComponent = ({ children, transition, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transition}
      className={className}>
      {children}
    </motion.div>
  );
};

export default MotionComponent;
