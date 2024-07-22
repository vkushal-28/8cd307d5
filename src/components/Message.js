import React from "react";

const Message = ({ text }) => {
  return (
    <div className="w-full text-center max-sm:text-md text-lg  text-slate-500  mt-8 ">
      {text}
    </div>
  );
};

export default Message;
