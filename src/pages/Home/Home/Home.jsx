import { Helmet } from "react-helmet-async";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import HeroSection from "../HeroSection/HeroSection";






const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Vista Vocal</title>
      </Helmet>

      {/* TODO: Slider */}
     
      <HeroSection />
      <PopularClasses />
      <PopularInstructors/>
    </>
  );
};

export default Home;
