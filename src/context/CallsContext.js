import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CallsContext = createContext();

export const CallsProvider = ({ children }) => {
  const [calls, setCalls] = useState([]);
  const [tempCalls, setTempCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialArchivedLoading, setInitialArchivedLoading] = useState(true);

  useEffect(() => {
    setTempCalls(calls);
  }, [calls]);

  const archiveCall = async (id) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/activities/${id}`, {
        is_archived: true,
      })
      .then(({ data }) => {
        toast.success(data);
        setCalls(calls.filter((call) => call.id !== id));
      });
  };

  const unarchiveCall = async (id) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/activities/${id}`, {
        is_archived: false,
      })
      .then(({ data }) => {
        toast.success(data);
        setArchivedCalls(archivedCalls.filter((call) => call.id !== id));
      });
  };

  const archiveAllCalls = async () => {
    for (let i = 0; i < tempCalls.length; i++) {
      const call = calls[i];

      await axios
        .patch(`${process.env.REACT_APP_API_URL}/activities/${call.id}`, {
          is_archived: true,
        })
        .then((res) => {
          setCalls([]);
        });
    }
    toast.success("All calls have been archived.");

    setTempCalls([]);
  };

  const unarchiveAllCalls = async () => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/reset`)
      .then(({ data }) => {
        setArchivedCalls([]);
        toast.success(data);
      });
  };

  return (
    <CallsContext.Provider
      value={{
        calls,
        setCalls,
        archivedCalls,
        setArchivedCalls,
        archiveCall,
        unarchiveCall,
        archiveAllCalls,
        unarchiveAllCalls,
        initialLoading,
        setInitialLoading,
        initialArchivedLoading,
        setInitialArchivedLoading,
      }}>
      {children}
    </CallsContext.Provider>
  );
};
