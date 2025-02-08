//import React from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link, useSubmit, Form, useNavigation } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsCotext } from "../pages/AllJobs";

const SearchContainer = () => {
  const isSubmitting = useNavigation().state === "submitting";
  const submit = useSubmit();
  const { searchValues } = useAllJobsCotext();
  const { search, jobStatus, jobType, sort } = searchValues;

  function handleSubmit(e) {
    submit(e.currentTarget.form);
  }

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search form</h5>
        <div className="form-center">
          <FormRow
            type="searc"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={handleSubmit}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={handleSubmit}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={handleSubmit}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
