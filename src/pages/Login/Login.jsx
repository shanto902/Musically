import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLoginSection from "../Shared/SocialLoginSection/SocialLoginSection";

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
    <div className="max-w-7xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">This is required.</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />
          <label className="label">
            <Link
              to="/auth/register"
              className="label-text-alt link link-hover"
            >
              Need an Account?
            </Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
      <SocialLoginSection />
    </div>
  );
};

export default Login;
