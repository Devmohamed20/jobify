import { useAllJobsCotext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

function JobsContainer() {
  const { jobs, data } = useAllJobsCotext();
  const { totalJobs, numOfPages, currentPage } = data;
  if (!jobs.length === 0) {
    return (
      <Wrapper>
        <h1>No jobs found</h1>
      </Wrapper>
    );
  }



  return (
    <Wrapper>
      <h5>
        <strong>{totalJobs} </strong>job{jobs.length > 1 && "'s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer numOfPages={numOfPages} currentPage={currentPage} />
      )}
    </Wrapper>
  );
}

export default JobsContainer;
