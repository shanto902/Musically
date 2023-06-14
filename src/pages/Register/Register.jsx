import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SocialLoginSection from "../Shared/SocialLoginSection/SocialLoginSection";
import useSecureAxios from "../../hooks/useSecureAxios";
import backgroundImage from "../../assets/Bg.svg";
import wave from "../../assets/waveFull.png";
import LogoHeader from "../Shared/LogoHeader/LogoHeader";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const [secureAxios] = useSecureAxios();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            picture: data.photoURL,
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
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Register | Vista Vocal</title>
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

      <div className="max-w-7xl z-30 mx-auto">
        <LogoHeader />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-40 card-body mt-10 bg-white rounded-3xl drop-shadow-lg max-w-xl mx-auto stroke border"
        >
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-600">This is required.</span>
            )}
          </div>

          <div className="form-control">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">This is required.</span>
            )}
          </div>

          <div className="form-control">
            <input
              type="url"
              placeholder="PhotoURL"
              className="input input-bordered"
              {...register("photoURL", { required: true })}
            />
            {errors.photoURL && (
              <span className="text-red-600">This is required.</span>
            )}
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
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

          <div className="form-control">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered"
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

          <div className="mx-auto mt-6">
            <button
              className="bg-gradient-to-r from-[#006FD5] via-[#32439B] to-[#19194E] shadow-md rounded-lg text-white px-14 py-3"
              type="submit"
            >
              Register
            </button>
          </div>

          <SocialLoginSection />

          <label className="flex justify-center gap-1">
            Already Have an Account?
            <Link
              to="/auth/login"
              className="link underline hover:text-blue-700 link-hover font-bold"
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
