import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SocialLoginSection from "../Shared/SocialLoginSection/SocialLoginSection";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            picture: data.photoURL,
            role : 'student'
          };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Profile Updated Successfully",
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <>
      <Helmet>
        <title>Register | Vista Vocal</title>
      </Helmet>
      <div className=" max-w-7xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className=" text-red-600">This is required.</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">PhotoURL</span>
            </label>
            <input
              type="text"
              placeholder="PhotoURL"
              className="input input-bordered"
              {...register("photoURL", { required: true })}
            />
            {errors.photoURL && (
              <span className=" text-red-600">This is required.</span>
            )}
          </div>
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
              <span className=" text-red-600">This is required.</span>
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
            {/* TODO: ADD PATTERN  */}
            <label className="label">
              <Link to="/auth/login" className="label-text-alt link link-hover">
                Already Have an Account?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <input className="btn" type="Submit" />
          </div>
        </form>
      </div>
      <SocialLoginSection />
    </>
  );
};

export default Register;
