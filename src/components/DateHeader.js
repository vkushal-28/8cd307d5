import React from "react";
import MotionComponent from "./MotionComponent";

const DateHeader = ({ date }) => {
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 1 * 0.2 }}
      className="flex items-center max-md:mb-1 mb-2 font-semibold pt-1">
      <span className="text-sm whitespace-nowrap mr-2 text-slate-500">
        {date}
      </span>
    </MotionComponent>
  );
};

export default DateHeader;
