import { JobContainer, SearchContainer } from "../components";
import customFetch from "../utilits/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
const AllJobsContext = createContext();
export const loader = async ({ request }) => {
  const uri = [...new URL(request.url).searchParams.entries()];
  const params = Object.fromEntries(uri);
  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    console.log("this is all jobs", error);
    return redirect("/dashboard/add-job");
  }
};
function AllJobs() {
  const { data, searchValues } = useLoaderData();
  const jobs = data.jobs;
  return (
    <AllJobsContext.Provider value={{ jobs, searchValues, data }}>
      <SearchContainer />
      {jobs.length === 0 ? <h1>no jobs</h1> : <JobContainer />}
    </AllJobsContext.Provider>
  );
}
export const useAllJobsCotext = () => useContext(AllJobsContext);
export default AllJobs;
