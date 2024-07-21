import React from "react";
import Skeleton from "react-loading-skeleton";

const Loading = () => {
  return (
    <>
      <Skeleton height={18} width={"250px"} style={{ marginBottom: 5 }} />
      <Skeleton
        height={55}
        style={{ marginBottom: 6, borderRadius: 15 }}
        count={3}
      />
      <Skeleton height={18} width={"250px"} style={{ marginBottom: 5 }} />
      <Skeleton
        height={55}
        style={{ marginBottom: 6, borderRadius: 15 }}
        count={5}
      />
      <Skeleton height={18} width={"250px"} style={{ marginBottom: 5 }} />
      <Skeleton
        height={55}
        style={{ marginBottom: 6, borderRadius: 15 }}
        count={4}
      />
    </>
  );
};

export const ModelDetailsLoading = () => {
  <>
    <Skeleton
      height={35}
      width={"500px"}
      style={{ marginBottom: 5, borderRadius: 15 }}
      count={3}
    />
    <Skeleton height={18} width={"250px"} style={{ marginBottom: 5 }} />
  </>;
};

export default Loading;
