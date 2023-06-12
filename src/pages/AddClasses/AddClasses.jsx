import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuthentication from "../../hooks/useAuthentication";
import { useEffect } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";

const imageToken = import.meta.env.VITE_imageToken;

const AddClasses = () => {
  console.log(imageToken)
  const [secureAxios] = useSecureAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const { user } = useAuthentication();
  const onSubmit = async (data) => {
    
    try {
    const newData = { ...data, status: 'pending' };
      await secureAxios.post("/classes", newData);
      console.log("Class added successfully!");
      reset();
    } catch (error) {
      console.error("Failed to add class:", error);
    }

  };

  useEffect(() => {
    setValue("instructorName", user.displayName);
    setValue("instructorEmail", user.email);
  }, [user, setValue]);
  return (
    <>
      <Helmet>
        <title>Add Class | Vista Vocal</title>
      </Helmet>
      <div className=" max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
              <span className=" text-red-600">This is required.</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Image</span>
            </label>
            <input
              type="text"
              placeholder="Enter PhotoURL of Class"
              className="input input-bordered"
              {...register("classImage")}
            />
            {errors.classImage && (
              <span className=" text-red-600">This is required.</span>
            )}
          </div>
          <div className="form-control">
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
          <div className="form-control">
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
              <span className=" text-red-600">This is required.</span>
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
              <span className=" text-red-600">This is required.</span>
            )}
          </div>
          <div className="form-control mt-6">
            <input className="btn" type="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClasses;
