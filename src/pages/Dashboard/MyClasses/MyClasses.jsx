import { useForm } from "react-hook-form";

import { useEffect, useRef, useState } from "react";
import useMyClasses from "../../../hooks/useMyClasses";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import useImageUploader from "../../../hooks/useImageUploader";

const MyClasses = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { uploadedImage, uploading, uploadImage } = useImageUploader();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

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
      availableSeats: parseInt(data.availableSeats),
      price: parseFloat(data.price),
      classImage: uploadedImage,
    };
    try {
      await secureAxios.patch(`/classes/${selectedClass._id}`, newData);
      console.log("Class updated successfully!");
      reset();
      window.my_modal_3.close();
      refetch(); // Refetch the data to update the UI
    } catch (error) {
      console.error("Failed to update class:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        await uploadImage(file);
        console.log("Image uploaded successfully");
        setImageLoaded(true);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setIsUploading(false);
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
      <div className="overflow-x-auto">
        <table className="table">
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
                  <td>{index + 1}</td>
                  <td>{classItem.nameOfClass}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-14 rounded">
                        <img src={classItem.classImage} />
                      </div>
                    </div>
                  </td>
                  <td>{classItem.availableSeats}</td>
                  <td className="text-end">$ {classItem.price}</td>
                  <td>{classItem.enrolled}</td>
                  <td>
                    {classItem.status === "approve" ? (
                      <div className="badge badge-success text-white">
                        Approved
                      </div>
                    ) : classItem.status === "denied" ? (
                      <div className="badge badge-error  text-white">
                        Denied
                      </div>
                    ) : (
                      <div className="badge badge-warning  text-white">
                        Pending
                      </div>
                    )}
                  </td>
                  <td>{classItem.feedback}</td>
                  <td>
                    <div className=" flex flex-row gap-4">
                      <button
                        onClick={() => handleModal(classItem)}
                        className="btn btn-outline h-10 w-10 rounded-full hover:bg-success md:mr-0 btn-sm"
                      >
                        <GrDocumentUpdate />
                      </button>

                      <button
                        onClick={() => handleModal(classItem)}
                        className="btn btn-outline h-10 w-10 rounded-full hover:bg-error md:mr-0 btn-sm"
                      >
                        <AiFillDelete className="" />
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
          <div className="text-center">
            <h2 className=" text-lg font-bold"> Update Class Information</h2>
          </div>
          <div className="grid grid-cols-2 md:gap-3 ">
            {Object.keys(selectedClass).map((field) => {
              if (
                field !== "_id" &&
                field !== "instructorName" &&
                field !== "instructorEmail" &&
                field !== "status" &&
                field != "enrolled" &&
                field != "classImage"
              ) {
                let label;
                if (field === "nameOfClass") {
                  label = "Name of Class";
                } else if (field === "availableSeats") {
                  label = "Total Available Seats";
                } else if (field === "price") {
                  label = "Price";
                } else {
                  label = field;
                }

                let divId = "";
                let customStyle = "";
                if (field === "nameOfClass") {
                  divId = "nameOfClassDiv";
                  customStyle = "order-1 col-span-2 grid-flow-col";
                } else if (field === "availableSeats") {
                  customStyle = "order-2 ";
                  divId = "availableSeatsDiv";
                } else if (field === "price") {
                  customStyle = "order-4 ";
                  divId = "availableSeatsDiv";
                }
                return (
                  <div
                    key={field}
                    id={divId}
                    className={`form-control ${customStyle} `}
                  >
                    <label className="label">
                      <span className="label-text">{label}</span>
                    </label>

                    <input
                      defaultValue={selectedClass[field]}
                      type="text"
                      placeholder={`Type ${field} here`}
                      className={`input input-bordered `}
                      {...register(field, { required: true })}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                    {errors[field] && (
                      <span className="text-red-600 ">This is required.</span>
                    )}
                  </div>
                );
              }

              return null;
            })}
            <div className="cursor-pointer form-control order-3 row-span-2 grid-flow-row place-items-center">
              <div>
                <input
                  required
                  name="image"
                  type="file"
                  placeholder="Enter PhotoURL of Class"
                  className="hidden" // Add the "hidden" class to hide the default file input
                  ref={fileInputRef} // Create a ref to the file input element
                  onChange={handleImageUpload} // Call the image upload function on change
                />

                <div className="avatar md:mt-4">
                  <div className="w-44 rounded">
                    <img
                      className=" border rounded-lg cursor-pointer
                       cover" // Add the "cursor-pointer" class to show pointer cursor
                      src={
                        isUploading
                          ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                          : uploadedImage || selectedClass.classImage
                      } // Display the uploaded image or a placeholder image
                      alt=""
                      onClick={() => fileInputRef.current.click()} // Trigger the click event on the file input when the image is clicked
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-control mt-3 order-5 col-span-2 ">
              <input
                disabled={isUploading}
                className="btn"
                type="submit"
                value="Update"
              />
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default MyClasses;
