//import React from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utilits/customFetch";
import { useDashboardContext } from "./DashboardLayout";
export const action = async ({request})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try{
    await customFetch.post("/jobs",data)
    toast.success("Job added successfully")
    return redirect("/dashboard/all-jobs")
  } catch(error){
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const AddJob = () => {
  const { user } = useDashboardContext();
  console.log("user", user);
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h3>Add Job</h3>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="location"
            name="jobLocation"
            defaultValue={user.lacation}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <button
            className="form-btn btn btn-block"
            type="submit"
            disabled={isSubmiting}
          >
            {isSubmiting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
