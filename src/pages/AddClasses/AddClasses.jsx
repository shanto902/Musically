import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect, useState } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import useImageUploader from "../../hooks/useImageUploader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddClasses = () => {
  const navigate = useNavigate();
  const { uploadedImage, uploading, uploadImage } = useImageUploader();
  const [isUploading, setIsUploading] = useState(false);

  const [secureAxios] = useSecureAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { user } = useAuthentication();

  const onSubmit = async (data) => {
    // Handle form submission, excluding the image
    const { image, ...newData } = data;
    const updatedData = {
      ...newData,
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
      } catch (error) {
        console.error("Error uploading image:", error);
      }
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setValue("instructorName", user.displayName);
    setValue("instructorEmail", user.email);
  }, [user, setValue]);

  const imageFieldValue = watch("image");

  return (
    <>
      <Helmet>
        <title>Add Class | Vista Vocal</title>
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
              type="text"
              placeholder="instructorEmail"
              className="input input-bordered"
              {...register("instructorEmail")}
            />
          </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class name</span>
            </label>
            <input
              type="text"
              placeholder="Type class name here"
              className="input input-bordered"
              {...register("nameOfClass", { required: true })}
            />
            {errors.nameOfClass && (
              <span className="text-red-600">This is required.</span>
            )}
          </div>
          <div className="form-control flex flex-row justify-between">
           <div>
           <label className="label">
              <span className="label-text">Class Image</span>
            </label>
            <input
              type="file"
              placeholder="Enter PhotoURL of Class"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleImageUpload} // Call the image upload function on change
            />
           </div>
           <img className="h-32 w-32 border rounded-lg" src={`${uploadedImage ? uploadedImage: ''}`} alt="" />
            {uploading || (isUploading && <p>Uploading image...</p>)}
            
            {errors.image && (
              <span className="text-red-600">This is required.</span>
            )}
          </div>
        
          <div className="form-control">
            <label className="label">
              <span className="label-text">Available seats</span>
            </label>
            <input
              type="number"
              placeholder="password"
              className="input input-bordered"
              {...register("availableSeats", { required: true })}
            />
            {errors.availableSeats && (
              <span className="text-red-600">This is required.</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              step="0.01"
              type="number"
              placeholder="password"
              className="input input-bordered"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-600">This is required.</span>
            )}
          </div>
          <div className="form-control mt-6">
            <input
              className="btn"
              type="submit"
              disabled={isUploading || imageFieldValue}
            />{" "}
            {/* Disable the submit button if uploading or no image selected */}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClasses;
