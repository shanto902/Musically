import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
import useAuthentication from "./useAuthentication";

const useMyClasses = () => {
  const [secureAxios] = useSecureAxios();
  const { user } = useAuthentication();
  const { data: myClasses = [], refetch, isLoading } = useQuery({
    queryKey: ["myClasses"],
    queryFn: async () => {
      const response = await secureAxios(`/classes/instructor/${user?.email}`);
      return response.data;
    },
  });
  return { myClasses, refetch, isLoading };
};

export default useMyClasses;
