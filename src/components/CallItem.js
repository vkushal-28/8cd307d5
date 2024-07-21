import React, { useContext } from "react";
import { CallsContext } from "../context/CallsContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const CallItem = ({ call, indx, onOpenClick, onCloseClick }) => {
  const { archiveCall, unarchiveCall } = useContext(CallsContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: indx * 0.1 }}
      className=" w-full p-[2px] rounded-tl-[15px] rounded-r-[15px] rounded-bl-[15px] mb-2 rounded-br-[15px]  rounded bg-gradient-to-br from-green-600 from-[10%] via-bgLightGreenTwo/90 via-[50%]  to-emerald-700  to-[90%]  shadow-lg drop-shadow-lg z-0 ">
      <div className="relative w-full py-2 px-5 max-sm:px-3 bg-white  dark:bg-blue rounded-tl-[22px] rounded-tr-[15px]  rounded-br-[22px] rounded-bl-[15px] flex justify-between items-center  group overflow-hidden hover:bg-gray-50">
        <div
          className="flex justify-start items-center w-[90%] max-lg:w-[60%] max-md:w-[60%] z-20 "
          onClick={onOpenClick}>
          <i
            className={`fi ${
              call.call_type === "missed"
                ? "fi-sr-call-missed text-red-700"
                : call.call_type === "voicemail"
                ? "fi-ss-microphone text-blue-500"
                : "fi-sr-phone-call text-green-700 "
            } text-lg  mt-2 mr-4 `}></i>
          <div>
            <p className=" font-semibold text-slate-800 ">{call.from}</p>
            <p className="text-sm line-clamp-1 text-gray-800  dark:text-gray-400 ">
              {`called  ${call.to}  via ${call.via}`}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-800 font-semibold dark:text-gray-400 max-sm:px-8 pr-0 ">
          {dayjs(call.created_at).format("h:mm A")}
        </p>
        <div className="absolute right-0 max-sm:right-9 top-0 h-full flex items-center transition-transform duration-300 ease-in-out transform translate-x-full group-hover:translate-x-0 max-sm:group-hover:translate-x-10 cursor-pointer z-30">
          <div
            className="bg-emerald-700 hover:bg-emerald-800 p-1 px-3 text-white text-sm flex items-center w-30 rounded-l-lg"
            onClick={() =>
              call.is_archived ? unarchiveCall(call.id) : archiveCall(call.id)
            }>
            <i
              className={`fi fi-sr-folder-${
                call.is_archived ? "upload" : "download"
              }  mt-1 mr-2 max-lg:mr-0`}></i>
            <p className="max-lg:hidden">
              {call.is_archived ? "Unarchive" : "Archive"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CallItem;
