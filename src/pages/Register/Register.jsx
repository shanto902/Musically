import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return <div className=" max-w-7xl mx-auto">



      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" className="input input-bordered" {...register("name",{ required: true })}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" {...register("email",{ required: true })}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" {...register("password",{ required: true })}/>
          <label className="label">
            <Link to='/auth/login' className="label-text-alt link link-hover">Already Have an Account?</Link>
          </label>
        </div>
        <div className="form-control mt-6">
         <input className="btn" type="Submit"/>
        </div>
      </form>
    </div>

};

export default Register;
