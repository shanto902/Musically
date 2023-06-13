import { Helmet } from "react-helmet-async";
import useAllInstructors from "../../hooks/useAllInstructors";

const Instructors = () => {
  const [instructors] = useAllInstructors();
  return (
    <>
      <Helmet>
        <title>Instructors | Vista Vocal</title>
      </Helmet>
      {instructors.length}
    </>
  );
};

export default Instructors;
