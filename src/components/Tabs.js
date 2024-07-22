import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { CallsContext } from "../context/CallsContext";

const Tabs = ({ children }) => {
  // Calls Context
  const { archiveAllCalls, unarchiveAllCalls, calls, archivedCalls } =
    useContext(CallsContext);

  // State Data
  const [activeTab, setActiveTab] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(60);
  const [tabHeight, setTabHeight] = useState(60);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetLeft, clientWidth } = tabRefs.current[activeTab];
      setUnderlineProps({ left: offsetLeft, width: clientWidth });
    }

    window.addEventListener("resize", getMeasure);
  }, [activeTab]); // eslint-disable-line

  // getMeasure function will measure heights of required elements on screen resize
  const getMeasure = () => {
    const isHeaderElement = document.getElementsByTagName("header")[0];
    const isHeaderHeight = isHeaderElement?.clientHeight;
    setHeaderHeight(isHeaderHeight);

    const tabElement = document.getElementsByName("tabButton")[0];
    const isTabButtonHeight = tabElement?.clientHeight;
    setTabHeight(isTabButtonHeight);

    const { offsetLeft, clientWidth } = tabRefs.current[activeTab];
    setUnderlineProps({ left: offsetLeft, width: clientWidth });
  };

  return (
    <div className="container mx-auto max-sm:mt-0 mt-4">
      <div className=" w-full flex  justify-between max-xl:px-4 ">
        <div className="relative flex max-sm:w-full max-md:justify-center justify-start max-sm:h-9 h-11 bg-white hover:bg-gray rounded-lg shadow-lg drop-shadow-md ">
          {React.Children.map(children, (child, index) => (
            <button
              key={index}
              name="tabButton"
              ref={(el) => (tabRefs.current[index] = el)}
              className={`pl-4 pr-5 py-0 max-sm:w-full w-[200px] text-md font-medium flex max-md:justify-center items-center justify-center z-10 text-emerald-700 `}
              onClick={() => setActiveTab(index)}>
              <i className={`fi ${child.props.icon} mt-1 mr-3`} />{" "}
              <p> {child.props.title}</p>
            </button>
          ))}
          <motion.div
            className="absolute -bottom-0 max-sm:h-9 h-11 bg-bgLightGreenTwo w-full z-0 border-b-2 border-emerald-700  rounded-lg"
            animate={underlineProps}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <Button
          onClick={(e) => {
            activeTab ? unarchiveAllCalls() : archiveAllCalls();
          }}
          className={
            "bg-gradient-to-r from-emerald-800 to-green-600 hover:from-green-600 hover:to-emerald-800  rounded-lg shadow-lg  flex items-center justify-center max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none z-40 max-sm:w-full transition duration-300  ease-in-out py-2 disabled:from-emerald-600 disabled:to-green-400 disabled:text-gray-50 opacity-80"
          }
          disabled={
            (activeTab === 0 && calls.length === 0) ||
            (activeTab === 1 && archivedCalls.length === 0)
          }>
          <i
            className={`fi fi-sr-folder-${
              activeTab === 0 ? "download" : "upload"
            } mt-1 mr-2`}></i>
          <p>{`${activeTab === 0 ? "Archive" : "UnArchive"}`} All Calls</p>
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="max-md:mt-2 mt-4 sm:px-0 px-0 max-xl:mx-4 max-md:mx-0  shadow-xl drop-shadow-lg shadow-gray-500  rounded-tl-3xl rounded-tr-3xl overflow-hidden"
        style={{
          height: `calc(100vh - ${headerHeight + tabHeight}px - 2.1rem)`,
        }}>
        <div
          className=" px-7 max-md:px-3 py-3 max-md:py-2 bg-gradient-to-br from-bgPrakey from-[20%] via-bgLightGreen
        via-[60%] to-bgLightGreenThree to-[90%] h-full  overflow-auto rounded-tl-3xl rounded-tr-3xl ">
          {children[activeTab]}
        </div>
      </motion.div>
    </div>
  );
};

export default Tabs;
