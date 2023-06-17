import { useQuery } from '@tanstack/react-query';
import useSecureAxios from './useSecureAxios';

const useAllClasses = () => {
    const [secureAxios] = useSecureAxios();
  // use axios secure with react query
  const { data: allClasses = [], isLoading: isClassLoading, refetch } = useQuery({
    queryKey: ['allClasses'],
    queryFn: async () => {
      const res = await secureAxios.get(`/all-classes`);
    
      return res.data;
      
    }
  });
  return [allClasses, isClassLoading, refetch];
};
export default useAllClasses;