import { useQuery } from "@tanstack/react-query";
import useAuthentication from "./useAuthentication";
import useSecureAxios from "./useSecureAxios";

const useInstructor = () => {
    const {user, loading} = useAuthentication();
    const [secureAxios] = useSecureAxios();
    // use axios secure with react query
    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await secureAxios.get(`/users/instructor/${user?.email}`);
            return res.data.instructor;
        }
    })
    return [isInstructor, isInstructorLoading]
}
export default useInstructor;