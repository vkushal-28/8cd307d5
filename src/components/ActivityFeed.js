import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { CallsContext } from "../context/CallsContext";
import { AnimatePresence } from "framer-motion";
import { groupCallsByDate } from "../utils/groupCallsByDate";
import DateHeader from "./DateHeader";
import Loading from "./Loading";
import Message from "./Message";
import axios from "axios";
const CallItem = lazy(() => import("./CallItem.js"));

const ActivityFeed = () => {
  // Calls Context
  const { calls, setCalls, initialLoading, setInitialLoading } =
    useContext(CallsContext);

  // State Data
  const [modalId, setIsModalId] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []); // eslint-disable-line

  // Function to fetch activities data
  const fetchActivities = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/activities`)
      .then(({ data }) => {
        setInitialLoading(false);
        setCalls(data.filter((call) => !call.is_archived));
      });
  };

  // customize group calls data
  let groupedCalls = groupCallsByDate(calls);

  const handleModalOpen = async (e, id) => {
    setIsModalId(id);
  };

  const handleModalClose = (e, id) => {
    id === modalId && setIsModalId(null);
  };

  return (
    <>
      <AnimatePresence>
        {initialLoading ? (
          <Loading />
        ) : Object.keys(groupedCalls).length > 0 && !initialLoading ? (
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
                      onCloseClick={(e) => handleModalClose(e, call.id)}
                      modalId={modalId}
                    />
                  </Suspense>
                ))}
              </div>
            ))
        ) : !initialLoading && Object.keys(groupedCalls).length === 0 ? (
          <Message text="No activity record found" />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ActivityFeed;
