//import React from "react";
import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utilits/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs/stats");
    console.log("this is the data we got from stats", data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats}/>
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
