import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider";


const useAuthentication = () => {
    const auth = useContext(AuthContext);
    return auth;
}

export default useAuthentication;