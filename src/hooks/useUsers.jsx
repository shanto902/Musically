
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";


const useUsers = () => {
  const [secureAxios] = useSecureAxios();
  const { data: users = [], refetch, isLoading } = useQuery(
    ["users"],
    async () => {
      const res = await secureAxios.get("/users");
  
      return res.data;
    }
  );

  return [users, isLoading, refetch];
};

export default useUsers;
