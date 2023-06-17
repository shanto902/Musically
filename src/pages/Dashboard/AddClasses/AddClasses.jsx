import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useImageUploader from "../../../hooks/useImageUploader";
import useSecureAxios from "../../../hooks/useSecureAxios";
import useAuthentication from "../../../hooks/useAuthentication";

const AddClasses = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { uploadedImage, uploading, uploadImage } = useImageUploader();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [secureAxios] = useSecureAxios();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const { user } = useAuthentication();

  const onSubmit = async (data) => {
    console.log(data)
    const updatedData = {
      ...data,
      availableSeats: parseInt(data.availableSeats),
      price: parseFloat(data.price),
      enrolled: 0,
      status: "pending",
      classImage: uploadedImage,
    };

    try {
      await secureAxios.post("/classes", updatedData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Class added successfully!");

      setValue("image", "");
      setIsUploading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        await uploadImage(file);
        console.log("Image uploaded successfully");
        setImageLoaded(true)
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setIsUploading(false);
    }
  };

  //

  //

  useEffect(() => {
    setValue("instructorName", user.displayName);
    setValue("instructorEmail", user.email);
  }, [user, setValue]);


  return (
    <>
      <Helmet>
        <title>Add Class | Musically</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className=" flex flex-col lg:flex-row lg:gap-6  ">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Instructor Name</span>
              </label>
              <input
                disabled
                defaultValue={user.displayName}
                type="text"
                placeholder="instructorName"
                className="input input-bordered"
                {...register("instructorName")}
              />
            </div>

            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Instructor Email</span>
              </label>
              <input
                disabled
                defaultValue={user.email}
                type="email"
                placeholder="instructorEmail"
                className="input input-bordered"
                {...register("instructorEmail")}
              />
            </div>
          </div>
          <div className=" grid  md:grid-cols-3 grid-cols-1 md:gap-10 gap-3">
           
              <div className="order-1 form-control col-span-2">
                <label className="label">
                  <span className="label-text">Class name</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Type class name here"
                  className="input input-bordered"
                  {...register("nameOfClass", { required: true })}
                />
              </div>
              <div className="order-3 form-control">
                  <label className="label">
                    <span className="label-text">Available seats</span>
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="Seats"
                    className="input input-bordered"
                    {...register("availableSeats", { required: true })}
                  />
                </div>
                <div className="order-4 form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    required
                    step="0.01"
                    type="number"
                    placeholder="$"
                    className="input input-bordered"
                    {...register("price", { required: true })}
                  />
                </div>
            <div className=" order-2 row-span-2 grid-flow-row  cursor-pointer place-self-start md:place-self-center form-control pt-3">
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
                          : uploadedImage ||
                            "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                      } // Display the uploaded image or a placeholder image
                      alt=""
                      onClick={() => fileInputRef.current.click()} // Trigger the click event on the file input when the image is clicked
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              className="btn btn-block"
              type="submit"
              disabled={!imageLoaded }
            >
              <span
                className={`${isUploading && "loading"} loading-spinner`}
              ></span>
              {uploading? "Uploading Image": "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClasses;
