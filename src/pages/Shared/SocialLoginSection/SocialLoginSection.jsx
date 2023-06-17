import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
const SocialLoginSection = () => {
  const { googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {

    googleSignIn().then((result) => {
      const loggedUser = result.user;
      const saveUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        picture: loggedUser.photoURL,
        role: "student",
      };
       fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div className="  flex flex-col justify-center items-center gap-2">
      <p className="text-xs">Or, Login With</p>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-circle btn-sm btn-outline "
      >
        <FcGoogle className=" w-4 h-4" />
      </button> 
    </div>
  );
};

export default SocialLoginSection;
