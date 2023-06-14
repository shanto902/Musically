import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLoginSection from "../Shared/SocialLoginSection/SocialLoginSection";
import { Helmet } from "react-helmet-async";
import backgroundImage from "../../assets/Bg.svg";
import wave from "../../assets/waveFull.png";
import LogoHeader from "../Shared/LogoHeader/LogoHeader";

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

  return (
    <>
      <Helmet>
        <title>Login | Vista Vocal</title>
      </Helmet>
      <div
        className=" fixed bottom-0 -z-20 left-0 w-full h-screen"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        </div>

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
          <div className="max-w-7xl mx-auto ">
            <LogoHeader />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body mt-10 bg-white rounded-3xl drop-shadow-lg max-w-xl mx-auto stroke border"
            >
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600 mt-2">Email is required.</span>
                )}
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600 mt-2">
                    Password is required.
                  </span>
                )}
              </div>
              <div className="mx-auto mt-6">
                <button
                  className=" bg-gradient-to-r from-[#006FD5] via-[#32439B] to-[#19194E] shadow-md rounded-lg text-white px-14 py-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </button>
              </div>

              <SocialLoginSection />

              <label className="flex justify-center gap-1">
                Dont Have An Account?
                <Link
                  to="/auth/register"
                  className=" link underline hover:text-blue-700 link-hover font-bold"
                >
                  Register Here
                </Link>
              </label>
            </form>
          </div>
      
    </>
  );
};

export default Login;
