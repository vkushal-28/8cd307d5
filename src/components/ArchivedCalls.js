import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { CallsContext } from "../context/CallsContext";
import { AnimatePresence } from "framer-motion";
import { groupCallsByDate } from "../utils/groupCallsByDate";
import DateHeader from "./DateHeader";
import Loading from "./Loading";
import Message from "./Message";
import CallDetailModal from "./CallDetailModal";
import axios from "axios";
const CallItem = lazy(() => import("./CallItem.js"));

const ArchivedCalls = () => {
  // Calls Context
  const {
    archivedCalls,
    setArchivedCalls,
    initialArchivedLoading,
    setInitialArchivedLoading,
  } = useContext(CallsContext);

  // State Data
  const [callDetails, setCallDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchArchivedCalls();
  }, []); // eslint-disable-line

  const fetchArchivedCalls = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/activities`)
      .then(({ data }) => {
        setInitialArchivedLoading(false);
        setArchivedCalls(data.filter((call) => call.is_archived));
      });
  };

  const groupedCalls = groupCallsByDate(archivedCalls);

  const handleModalOpen = async (e, id) => {
    setIsModalOpen(true);

    await axios
      .get(`${process.env.REACT_APP_API_URL}/activities/${id}`)
      .then(({ data }) => {
        setCallDetails(data);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <AnimatePresence>
        {initialArchivedLoading ? (
          <Loading />
        ) : Object.keys(groupedCalls).length > 0 && !initialArchivedLoading ? (
          Object.keys(groupedCalls)
            .reverse()
            .map((date, i) => (
              <div key={i}>
                <DateHeader date={date} />
                {groupedCalls[date].map((call, ind) => (
                  <Suspense fallback={<Loading />} key={ind}>
                    <CallItem
                      key={call.id}
                      call={call}
                      indx={ind + 1}
                      onOpenClick={(e) => handleModalOpen(e, call.id)}
                      onCloseClick={(e) => handleModalClose}
                    />
                  </Suspense>
                ))}
              </div>
            ))
        ) : !initialArchivedLoading &&
          Object.keys(groupedCalls).length === 0 ? (
          <Message text="No archived record found" />
        ) : null}
      </AnimatePresence>
      <CallDetailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        call={callDetails}
      />
    </>
  );
};

export default ArchivedCalls;
