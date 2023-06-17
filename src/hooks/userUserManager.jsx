import {  useQueryClient } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';
import { toast } from 'react-hot-toast';

const useUserManager = () => {
  const [secureAxios] = useSecureAxios();
  const queryClient = useQueryClient();

  const handleManageUser = async (user, role) => {
    try {
      const response = await secureAxios.patch(`/users/${role}/${user._id}`);
      const data = response.data;

      if (data.modifiedCount) {
        toast.success(`${user.name} is now ${role}`);
        queryClient.invalidateQueries('users');
        queryClient.refetchQueries('users');
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      // Handle error
    }
  };

  return handleManageUser;
};

export default useUserManager;
