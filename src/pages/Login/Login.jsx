import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            login page 
            <br/>
            <Link to='/auth/register'>Need to create account?</Link>
        </div>
    );
};

export default Login;