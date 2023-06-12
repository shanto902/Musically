import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useClasses = () => {
  const [secureAxios] = useSecureAxios();
  // use axios secure with react query
  const { data: classes = [], isLoading: isClassLoading } = useQuery({
    queryKey: ['allClasses'],
    queryFn: async () => {
      const res = await secureAxios.get(`/classes`);
      console.log(res.data); // Log the response data
      return res.data;
    }
  });
  return [classes, isClassLoading];
};

export default useClasses;
