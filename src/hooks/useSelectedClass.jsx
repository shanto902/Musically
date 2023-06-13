import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useSecureAxios from "./useSecureAxios";
// Assuming you have a secureAxios utility function

const useSelectedClass = () => {
    const [secureAxios] = useSecureAxios();
  const { user } = useContext(AuthContext);
  const { refetch, data: selectedClass = [] } = useQuery({
    queryKey: ["selectedClasses", user?.email],
    queryFn: async () => {
      const response = await secureAxios.get(`/classes/selected-class?email=${user?.email}`);
      return response.data;
    },
  });
  return [selectedClass, refetch];
};

export default useSelectedClass;
