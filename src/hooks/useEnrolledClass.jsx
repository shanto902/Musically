import { useEffect, useState } from 'react';

import useAuthentication from './useAuthentication';
import useSecureAxios from './useSecureAxios';

const useEnrolledClass = () => {
  const  {user} = useAuthentication ()
  const email = user.email
  const [secureAxios] = useSecureAxios();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await secureAxios.get('/enrolled', {
          params: { email },
        });
        setEnrolledClasses(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch enrolled classes.');
        setLoading(false);
      }
    };

    fetchEnrolledClasses();
  }, [email, secureAxios]);

  return [enrolledClasses, loading, error];
};

export default useEnrolledClass;
