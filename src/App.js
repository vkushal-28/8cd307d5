import React from "react";
import Header from "./components/Header";
import ActivityFeed from "./components/ActivityFeed";
import ArchivedCalls from "./components/ArchivedCalls";
import { CallsProvider } from "./context/CallsContext";
import Tabs from "./components/Tabs";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  return (
    <CallsProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <SkeletonTheme baseColor="#cbd5e1" highlightColor="#e2e8f0">
        <div className="max-sm:relative min-h-screen bg-gray-300/80  max-sm:bg-emerald-700  bg-opacity-80">
          <Header />
          <Tabs>
            <ActivityFeed title="Activities" icon={"fi-br-heart-rate"} />
            <ArchivedCalls title="Archived" icon={"fi-sr-inbox-full"} />
          </Tabs>
        </div>
      </SkeletonTheme>
    </CallsProvider>
  );
};

export default App;
