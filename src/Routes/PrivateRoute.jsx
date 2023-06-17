import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Bars } from "react-loader-spinner";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className=" bg-white w-full h-screen flex justify-center items-center">
            <Bars
        height="80"
        width="80"
        color="#1f75bd"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
        </div>
    }
    if(user) {
        return children;
    }
    return <Navigate to='/auth/login' state={{from: location}} replace/>
};

export default PrivateRoute;