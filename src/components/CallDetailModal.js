import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import { seconds_to_days_hours_mins_secs_str } from "../utils/dateUtils";
import { ModelDetailsLoading } from "./Loading";

const CallDetailModal = ({ isOpen, onClose, call }) => {
  if (!isOpen || !call) return null;

  const { from, to, via, call_type, duration, is_archived, created_at } = call;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full max-sm:w-[80%]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4  border-b text-emerald-700 ">
              Call Details
            </h2>
            <ModelDetailsLoading />
            <div className="flex-col">
              <div className="flex justify-between">
                <p className="font-semibold text-2xl text-slate-800 mb-2">
                  {from}
                  <i
                    className={`fi ${
                      call_type === "missed"
                        ? "fi-sr-call-missed text-red-700"
                        : call_type === "voicemail"
                        ? "fi-ss-microphone text-blue-500"
                        : "fi-sr-phone-call text-green-700 "
                    } text-lg  ml-2 `}></i>
                </p>
                <div className="text-slate-500">
                  <span>{seconds_to_days_hours_mins_secs_str(duration)}</span>
                </div>
              </div>

              <p className="text-slate-500">
                <span className={`capitalize`}>{call_type}</span> call to {to}{" "}
                via {via}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-slate-700 font-semibold">
                {dayjs(created_at).format("MMMM D, YYYY h:mm A")}
              </p>
              <p>{is_archived && "Archived"}</p>
            </div>
          </div>
          <div className="bg-bgLightGreen px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-700 text-base font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CallDetailModal;
