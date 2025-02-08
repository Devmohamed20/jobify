import { toast } from "react-toastify";
import customFetch from "../utilits/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return redirect("/dashboard/all-jobs");
};

function deleteJob() {
  return <div>deleteJob</div>;
}
export default deleteJob;
