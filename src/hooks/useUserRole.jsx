import { useEffect } from 'react';

import useAuthentication from './useAuthentication';
import useSecureAxios from './useSecureAxios';
import { useQuery } from '@tanstack/react-query';

const useUserRole = (email) => {
  const { user } = useAuthentication();
  const [secureAxios] = useSecureAxios();

  const fetchUserRole = async () => {
    const response = await secureAxios.get(`/user/role/${user?.email}`);
    const { role } = response.data;
    return role === 'student';
  };

  const { data: isStudent, isLoading, refetch } = useQuery(['userRole', email], fetchUserRole, {
    enabled: !!email,
  });

  useEffect(() => {
    refetch();
  }, [email, refetch]);

  console.log("isLoading",isLoading, "isStudent",isStudent)

  return [isStudent, isLoading];
};

export default useUserRole;
