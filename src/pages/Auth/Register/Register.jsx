import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

import backgroundImage from "../../../assets/Bg.svg";
import wave from "../../../assets/waveFull.png";

import useSecureAxios from "../../../hooks/useSecureAxios";
import SocialLoginSection from "../../Shared/SocialLoginSection/SocialLoginSection";
import LogoHeader from "../../Shared/LogoHeader/LogoHeader";
import { useContext, useRef, useState } from "react";
import useImageUploader from "../../../hooks/useImageUploader";
import { AuthContext } from "../../../providers/AuthProvider";

const Register = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { uploadedImage, uploading, uploadImage } = useImageUploader();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const authContext = useContext(AuthContext);
  const noImage =
    "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg";
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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { createUser, updateUserProfile } = authContext;

  const [secureAxios] = useSecureAxios();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;

      updateUserProfile(data.name, uploadedImage)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            picture: uploadedImage,
            role: "student",
          };
          secureAxios
            .post("/users", saveUser)
            .then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Profile Updated Successfully",
                });
                navigate("/");
              }
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Register | Musically</title>
      </Helmet>
      <div
        className="fixed bottom-0 -z-20 left-0 w-full h-screen"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div
        className="fixed bottom-0 -z-10 left-0 w-full h-screen"
        style={{
          backgroundImage: `url('${wave}')`,
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          position: "",
        }}
      ></div>

      <div className="max-w-md z-30 mx-auto flex justify-center items-center flex-col">
        <LogoHeader />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-40 card-body mt-16 bg-white rounded-3xl drop-shadow-lg max-w-sm mx-auto stroke border grid grid-cols-1 gap-2"
        >
          <div className="form-control order-2 input-xs">
            <input
              required
              type="text"
              placeholder="Name"
              className="input input-bordered placeholder:text-xs text-xs"
              {...register("name", { required: true })}
            />
          </div>

          <div className="form-control input-xs order-3 ">
            <input
              required
              type="text"
              placeholder="Email"
              className="input input-bordered placeholder:text-xs text-xs"
              {...register("email", { required: true })}
            />
          </div>

          <div className=" cursor-pointer place-self-center  form-control  order-1  ">
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
                <div className="w-36 -mt-24  ring ring-white drop-shadow-lg ring-offset-base-100 ring-offset-2 rounded-full">
                  <img
                    className=" border rounded-lg cursor-pointer
                       cover" // Add the "cursor-pointer" class to show pointer cursor
                    src={
                      isUploading
                        ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                        : uploadedImage || noImage
                    } // Display the uploaded image or a placeholder image
                    alt=""
                    onClick={() => fileInputRef.current.click()} // Trigger the click event on the file input when the image is clicked
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-control input-xs order-3 ">

         
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered placeholder:text-xs text-xs"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 30,
                pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-600 mt-2">Password is required</span>
            )}

            {errors.password?.type === "minLength" && (
              <span className="text-red-600 mt-2">Minimum 6 digits</span>
            )}

            {errors.password?.type === "maxLength" && (
              <span className="text-red-600 mt-2">Maximum 30 digits</span>
            )}

            {errors.password?.type === "pattern" && (
              <span className="text-red-600 mt-2">Password is too easy</span>
            )}
          </div>

          <div className="form-control input-xs order-5 ">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered placeholder:text-xs text-xs"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
            />
            {errors.confirmPassword?.type === "required" && (
              <span className="text-red-600 mt-2">
                Confirm Password is required
              </span>
            )}

            {errors.confirmPassword?.type === "validate" && (
              <span className="text-red-600 mt-2">Passwords do not match</span>
            )}
          </div>

          <div className="mx-auto mt-2  order-6 ">
            <button
              className={`bg-gradient-to-r uppercase from-[#006FD5] via-[#32439B] to-[#19194E] shadow-md rounded-lg text-white px-14 py-1 ${
                noImage && !uploadedImage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={noImage && !uploadedImage}
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <div className="order-7 ">
          <SocialLoginSection  />
          </div>

          <label className="flex justify-center gap-1 order-8  text-xs" >
            Already Have an Account?
            <Link
              to="/auth/login"
              className="link underline hover:text-blue-700 link-hover font-bold  text-xs"
            >
              Login
            </Link>
          </label>
        </form>
      </div>
    </>
  );
};

export default Register;
