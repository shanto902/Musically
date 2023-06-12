import { useForm } from "react-hook-form";
import useMyClasses from "../../hooks/useMyClasses";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useEffect, useState } from "react";

const MyClasses = () => {
  const [selectedClass, setSelectedClass] = useState([]);
  const { isLoading, myClasses, refetch } = useMyClasses();
  const [secureAxios] = useSecureAxios();

  const handleModal = (classItem) => {
    setSelectedClass(classItem);
    window.my_modal_3.showModal();
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newData = {
      nameOfClass: data.nameOfClass,
      classImage: data.classImage,
      availableSeats: data.availableSeats,
      price: data.price,
    };
    console.log(newData);
    try {
      await secureAxios.patch(`/classes/${selectedClass._id}`, data);
      console.log("Class updated successfully!");
      reset();
      window.my_modal_3.close();
      refetch(); // Refetch the data to update the UI
    } catch (error) {
      console.error("Failed to update class:", error);
    }
  };
  useEffect(() => {
    if (selectedClass) {
      Object.keys(selectedClass).forEach((field) => {
        setValue(field, selectedClass[field]);
      });
    }
  }, [setValue, selectedClass]);

  const handleInputChange = (field, value) => {
    setValue(field, value);
  };

  return (
    <div>
      <h3>Total Users: {myClasses.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Class Image</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Total Enrolled Students</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="9">Loading...</td>
              </tr>
            ) : (
              myClasses.map((classItem, index) => (
                <tr key={classItem._id}>
                  <th>{index + 1}</th>
                  <td>{classItem.nameOfClass}</td>
                  <td>
                    <img
                      className="avatar w-24 h-24 rounded-xl"
                      src={classItem.classPhotoURL}
                      alt=""
                    />
                  </td>
                  <td>{classItem.availableSeats}</td>
                  <td>{classItem.price}</td>
                  <td>{classItem.enrolledStudents}</td>
                  <td>
                    {classItem.status === "approved"
                      ? "Approved"
                      : classItem.status === "denied"
                      ? "Denied"
                      : "Pending"}
                  </td>
                  <td>{classItem.feedback}</td>
                  <td>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleModal(classItem)}
                        className="btn btn-outline"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_3" className="modal">
        <form
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
          className="modal-box"
        >
          <button
            type="button"
            onClick={() => window.my_modal_3.close()}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          {Object.keys(selectedClass).map((field) => {
            if (
              field !== "_id" &&
              field !== "instructorName" &&
              field !== "instructorEmail" &&
              field !== "status"
            ) {
              let label;
              if (field === "nameOfClass") {
                label = "Name of Class";
              } else if (field === "availableSeats") {
                label = "Total Available Seats";
              } else if (field === "price") {
                label = "Price";
              } else if (field === "classImage") {
                label = "Class Image URL";
              } else {
                label = field;
              }
              return (
                <div key={field} className="form-control">
                  <label className="label">
                    <span className="label-text">{label}</span>
                  </label>
                  <input
                    defaultValue={selectedClass[field]}
                    type="text"
                    placeholder={`Type ${field} here`}
                    className="input input-bordered"
                    {...register(field, { required: true })}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  />
                  {errors[field] && (
                    <span className="text-red-600">This is required.</span>
                  )}
                </div>
              );
            }
            return null;
          })}
          <div className="form-control mt-6">
            <input className="btn" type="submit" />
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MyClasses;
