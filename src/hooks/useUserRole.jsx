import { useEffect, useState } from 'react';
import useAuthentication from './useAuthentication';
import useSecureAxios from './useSecureAxios';

const useUserRole = (email) => {
  const [isStudent, setIsStudent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [secureAxios] = useSecureAxios();

  const {user} = useAuthentication()

  useEffect(() => {
    let isMounted = true;

    const checkUserRole = async () => {
      try {
        const response = await secureAxios.get(`/user/role/${user.email}`);
        const { role } = response.data;
        if (isMounted) {
          setIsStudent(role === 'student');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        if (isMounted) {
          setIsStudent(false);
          setIsLoading(false);
        }
      }
    };

    if (email) {
      checkUserRole();
    }

    return () => {
      isMounted = false;
    };
  }, [email]);

  return { isStudent, isLoading };
};

export default useUserRole;
