import { Helmet } from "react-helmet-async";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Vista Vocal</title>
      </Helmet>

      {/* TODO: Slider */}
      
      <PopularClasses />
      <PopularInstructors/>
    </>
  );
};

export default Home;
