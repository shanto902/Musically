import { useEffect } from 'react';

import useAuthentication from './useAuthentication';
import useSecureAxios from './useSecureAxios';
import { useQuery } from '@tanstack/react-query';

const useUserRole = (email) => {
  const { user } = useAuthentication();
  const [secureAxios] = useSecureAxios();

  const fetchUserRole = async () => {
    const response = await secureAxios.get(`/user/role/${user?.email}`);
    const { role, purchasedItems } = response.data;
    return {
      isStudent: role === 'student',
      purchasedItems: purchasedItems || [],
    };
  };

  const { data: userData, isLoading, refetch } = useQuery(['userRole', email], fetchUserRole, {
    enabled: !!email,
  });

  useEffect(() => {
    refetch();
  }, [email, refetch]);

  const { isStudent, purchasedItems } = userData || {};



  return [isStudent, purchasedItems, isLoading];
};

export default useUserRole;
