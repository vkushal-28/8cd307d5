import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { CallsContext } from "../context/CallsContext";
import { AnimatePresence } from "framer-motion";
import { groupCallsByDate } from "../utils/groupCallsByDate";
import DateHeader from "./DateHeader";
import Loading from "./Loading";
import Message from "./Message";
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
  const [modalId, setIsModalId] = useState(null);

  useEffect(() => {
    fetchArchivedCalls();
  }, []); // eslint-disable-line

  // Function to fetch archived calls data
  const fetchArchivedCalls = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/activities`)
      .then(({ data }) => {
        setInitialArchivedLoading(false);
        setArchivedCalls(data.filter((call) => call.is_archived));
      });
  };

  // customize archived calls data
  const groupArchivedCalls = groupCallsByDate(archivedCalls);

  const handleModalOpen = async (e, id) => {
    setIsModalId(id);
  };

  const handleModalClose = (e, id) => {
    id === modalId && setIsModalId(null);
  };

  return (
    <>
      <AnimatePresence>
        {initialArchivedLoading ? (
          <Loading />
        ) : Object.keys(groupArchivedCalls).length > 0 &&
          !initialArchivedLoading ? (
          Object.keys(groupArchivedCalls)
            .reverse()
            .map((date, i) => (
              <div key={i}>
                <DateHeader date={date} />
                {groupArchivedCalls[date].map((call, ind) => (
                  <Suspense fallback={<Loading />} key={ind}>
                    <CallItem
                      key={call.id}
                      call={call}
                      indx={ind + 1}
                      onOpenClick={(e) => handleModalOpen(e, call.id)}
                      onCloseClick={(e) => handleModalClose(e, call.id)}
                      modalId={modalId}
                    />
                  </Suspense>
                ))}
              </div>
            ))
        ) : !initialArchivedLoading &&
          Object.keys(groupArchivedCalls).length === 0 ? (
          <Message text="No archived record found" />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ArchivedCalls;
