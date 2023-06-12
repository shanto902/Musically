

import useSecureAxios from "../hooks/useSecureAxios";


const useUpdateClass = () => {
  const [secureAxios] = useSecureAxios();


  const updateClass = async (classId, updatedData) => {
    try {
      await secureAxios.put(`/classes/${classId}`, updatedData);
      console.log("Class updated successfully!");
    } catch (error) {
      console.error("Failed to update class:", error);
      throw new Error(error.message);
    }
  };

  return { updateClass };
};

export default useUpdateClass;
