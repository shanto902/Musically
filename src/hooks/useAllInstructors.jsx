import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";


const useAllInstructors = () => {

    const [secureAxios] = useSecureAxios();
    const { data: instructors = [], isLoading: isInstructorLoading } = useQuery({
      queryKey: ['allInstructors'],
      queryFn: async () => {
        const res = await secureAxios.get(`/users/instructors`);
        return res.data;
      }
    });
    return [instructors, isInstructorLoading];
  };
  

export default useAllInstructors;