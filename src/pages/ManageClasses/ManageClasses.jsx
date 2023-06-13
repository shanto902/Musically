import { useState } from "react";
import useAllClasses from "../../hooks/useAllClasses";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useForm } from "react-hook-form";

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
    window.my_modal_3.close()
  };

  const handleStatus = async (classItem, status) => {
    try {
      const response = await secureAxios.patch(
        `/classes/${status}/${classItem._id}`
      );
      const data = response.data;

      if (data.modifiedCount) {
        refetch();
        alert(`${classItem.nameOfClass} is now ${status}`);
        
      }
    } catch (error) {
      console.error("Failed to update class:", error);
      // Handle error
    }
  };

  const handleUpdateFeedback = (id, feedback) => {
    const body = { feedback };

    secureAxios
      .patch(`/classes/feedback/${id}`, body)
      .then((response) => {
        if (response.data.message) {
          // Feedback updated successfully
          alert(response.data.message);
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
      <h3>Total Users: {allClasses.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isClassLoading &&
              allClasses.map((thisClass, index) => (
                <tr key={thisClass._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="avatar w-24 h-24 rounded-xl"
                      src={thisClass.classImage}
                      alt=""
                    />
                  </td>
                  <td>{thisClass.nameOfClass}</td>
                  <td>{thisClass.instructorName}</td>
                  <td>{thisClass.instructorEmail}</td>
                  <td>{thisClass.availableSeats}</td>
                  <td>{thisClass.price}</td>
                  <td>
                    {thisClass.status === "approve"
                      ? "Approved"
                      : thisClass.status === "deny"
                      ? "Denied"
                      : "Pending"}
                  </td>
                  <td>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleStatus(thisClass, "approve")}
                        disabled={thisClass.status === "approve"}
                        className="btn btn-outline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatus(thisClass, "deny")}
                        disabled={thisClass.status === "deny"}
                        className="btn btn-outline"
                      >
                        Deny
                      </button>
                      <div className={`${thisClass.feedback ? "tooltip  tooltip-bottom ": ""}`} data-tip={`${thisClass.feedback}`}>
                      <button
                        onClick={() => handleModal(thisClass)}
                        className="btn btn-outline"
                      >
                         {thisClass.feedback ? "Feedback Done" : "Send Feedback"}
                      </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_3" className="modal">
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
          <input className="btn" type="submit" value="Submit" />
        </form>
      </dialog>
    </div>
  );
};

export default ManageClasses;
