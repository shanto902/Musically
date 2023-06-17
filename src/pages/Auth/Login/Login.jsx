import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

import { Helmet } from "react-helmet-async";
import backgroundImage from "../../../assets/Bg.svg";
import wave from "../../../assets/waveFull.png";

import { AuthContext } from "../../../providers/AuthProvider";
import SocialLoginSection from "../../Shared/SocialLoginSection/SocialLoginSection";
import LogoHeader from "../../Shared/LogoHeader/LogoHeader";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitting(true);

    signIn(data.email, data.password)
      .then((result) => {
        setIsSubmitting(false);
        Swal.fire("Success", "User Logged in Successfully", "success");
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire(`Error ${errorCode}`, `${errorMessage}`, "error");
        setIsSubmitting(false);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prevState) => !prevState);
};


  return (
    <>
      <Helmet>
        <title>Login | Musically</title>
      </Helmet>
      <div
        className=" fixed bottom-0 -z-20 left-0 w-full h-screen"
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
      <div className=" w-full mx-auto flex justify-center items-center flex-col">
        <LogoHeader />
        <div className="mt-10 max-w-md mx-auto stroke border bg-white rounded-3xl drop-shadow-lg  p-4">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="card-body "
        >
          <div className="form-control input-xs">
            <input
              required
              type="text"
              placeholder="Email"
              className="input input-bordered placeholder:text-xs text-xs"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-control input-xs relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input text-xs input-bordered"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-lg text-gray-500 focus:outline-none absolute right-3.5 top-1"
            >
              {showPassword ? <AiTwotoneEye/> : <AiTwotoneEyeInvisible/>}
            </button>
          </div>
          <div className="mx-auto mt-2">
            <button
              className=" bg-gradient-to-r from-[#006FD5] via-[#32439B] to-[#19194E] shadow-md rounded-lg text-white px-14 py-1 uppercase"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </div>

          
        </form>
        <SocialLoginSection />

          <label className="flex justify-center gap-1 text-xs">
            Dont Have An Account?
            <Link
              to="/auth/register"
              className=" link underline hover:text-blue-700 link-hover font-bold  text-xs"
            >
              Register Here
            </Link>
          </label>
        </div>
        
      </div>
    </>
  );
};

export default Login;
