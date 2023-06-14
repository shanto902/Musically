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
const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
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
        >
          </div>
      <div className=" max-w-7xl z-30 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="z-40 card-body">
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
