import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";

const useClasses = () => {
  const [secureAxios] = useSecureAxios();
  const { data: classes = [], isLoading: isClassLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await secureAxios.get(`/classes`);
      return res.data;
    }
  });
  return [classes, isClassLoading];
};

export default useClasses;
