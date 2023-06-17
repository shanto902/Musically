import { useState } from "react";

import { useForm } from "react-hook-form";
import useAllClasses from "../../../hooks/useAllClasses";
import useSecureAxios from "../../../hooks/useSecureAxios";

import { GrClose, GrCheckmark } from "react-icons/gr";
import { MdOutlineFeedback } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
const ManageClasses = () => {
  const [selectedClass, setSelectedClass] = useState([]);
  const [allClasses, isClassLoading, refetch] = useAllClasses();
  const [secureAxios] = useSecureAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    handleUpdateFeedback(selectedClass._id, data.feedback);
    window.my_modal_3.close();
  };

  const handleStatus = async (classItem, status) => {
    try {
      const response = await secureAxios.patch(
        `/classes/${status}/${classItem._id}`
      );
      const data = response.data;

      if (data.modifiedCount) {
        refetch();
        
        if (status === "approve") {
          toast.success(`${classItem.nameOfClass} is Approved`);
        } else {
          toast.error(`${classItem.nameOfClass} is Denied`);
        }
      }
    } catch (error) {
      console.error("Failed to update class:", error);
      toast.error(`Something wrong Error: ${error.message}`);
    }
  };

  const handleUpdateFeedback = (id, feedback) => {
    const body = { feedback };

    secureAxios
      .patch(`/classes/feedback/${id}`, body)
      .then((response) => {
        if (response.data.message) {
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{`${response.data.message}`}</span>
          </div>;
          // Feedback updated successfully

          // Perform any additional actions or update the UI as needed
        } else {
          // Class not found
          alert("Class not found");
        }
      })
      .catch((error) => {
        console.error("Failed to update feedback:", error);
        // Handle error or display error message
      });
  };

  const handleModal = (classItem) => {
    setSelectedClass(classItem);
    window.my_modal_3.showModal();
    setValue("feedback", ""); // Clear the feedback input field
  };

  return (
    <div>
      <Toaster position="bottom-left" />
      <div className="overflow-x-auto">
        <div className="container mx-auto">
          <table className="table ">
            <thead>
              <tr>
                <th className="hidden md:table-cell">#</th>
                <th className="hidden md:table-cell">Class Image</th>
                <th>Class Name</th>
                <th className="table-cell">Instructor Name & Email</th>

                <th className="hidden md:table-cell">Available Seats</th>
                <th className="hidden sm:table-cell">Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isClassLoading &&
                allClasses.map((thisClass, index) => (
                  <tr key={thisClass._id}>
                    <td className="hidden md:table-cell">{index + 1}</td>
                    <td className="hidden md:table-cell">
                      <div className="avatar">
                        <div className="w-14 rounded-xl">
                          <img src={thisClass.classImage} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="md:hidden avatar flex flex-col gap-2 justify-center items-center ">
                        <div className="w-14 rounded-xl">
                          <img src={thisClass.classImage} />
                        </div>
                        <span className="text-center">
                          {thisClass.nameOfClass}
                        </span>
                      </div>
                      <span className="hidden md:block">{thisClass.nameOfClass}</span>
                    </td>
                    <td className="table-cell">
                      <div className="font-bold">
                        {thisClass.instructorName}
                      </div>
                      <div className="text-sm opacity-50">
                        {thisClass.instructorEmail}
                      </div>
                    </td>

                    <td className="hidden md:table-cell">
                      {thisClass.availableSeats}
                    </td>
                    <td className="hidden sm:table-cell">${thisClass.price}</td>
                    <td className="">
                      {thisClass.status === "approve" ? (
                        <div className="badge text-white badge-success">
                          Approved
                        </div>
                      ) : thisClass.status === "deny" ? (
                        <div className="badge text-white badge-error">
                          Denied
                        </div>
                      ) : (
                        <div className="badge text-white badge-warning">
                          Pending
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="flex md:flex-row flex-col items-center gap-2 lg:gap-4">
                        <button
                          onClick={() => handleStatus(thisClass, "approve")}
                          disabled={thisClass.status === "approve"}
                          className="btn btn-outline h-10 w-10 rounded-full hover:bg-success md:mr-0 btn-sm"
                        >
                          <GrCheckmark />
                        </button>
                        <button
                          onClick={() => handleStatus(thisClass, "deny")}
                          disabled={thisClass.status === "deny"}
                          className="btn rounded-full btn-sm h-10 w-10 btn-outline hover:bg-error"
                        >
                          <GrClose />
                        </button>
                        <div
                          className={`${
                            thisClass.feedback
                              ? "tooltip tooltip-left md:tooltip-bottom"
                              : ""
                          }`}
                          data-tip={`${thisClass.feedback}`}
                        >
                          <button
                            onClick={() => handleModal(thisClass)}
                            disabled={
                              thisClass.status === "approve" ||
                              thisClass.status === "pending"
                            }
                            className="btn btn-sm btn-outline rounded-full h-10 w-10 "
                          >
                            {thisClass.feedback ? (
                              <AiOutlineFileDone />
                            ) : (
                              <MdOutlineFeedback />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal mx-auto md:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
          <button
            type="button"
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => window.my_modal_3.close()}
          >
            ✕
          </button>
          <h3 className="font-bold my-3 text-center text-lg">Send Feedback</h3>
          <textarea
            className="textarea w-full input-bordered"
            placeholder="Feedback"
            {...register("feedback", { required: true })}
          ></textarea>
          {errors.feedback && (
            <p className="text-red-500">Feedback is required</p>
          )}
          <input
            className="btn btn-outline btn-sm mt-5"
            type="submit"
            value="Submit"
          />
        </form>
      </dialog>
    </div>
  );
};

export default ManageClasses;
