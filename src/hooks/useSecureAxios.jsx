import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useAuthentication from './useAuthentication';



const secureAxios = axios.create({
  // baseURL: 'https://musically-three.vercel.app', 
   baseURL: 'http://localhost:5000/', 
});

const useSecureAxios = () => {
  const {loading, logOut} = useAuthentication();
  const navigate = useNavigate(); 

  useEffect(() => {
    secureAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    secureAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logOut();
          if(!loading){
            navigate('/auth/login');
          }
        }
        return Promise.reject(error);
      }
    );
  }, [loading, logOut, navigate]);

  return [secureAxios];
};

export default useSecureAxios;