import { Helmet } from "react-helmet-async";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import HeroSection from "../HeroSection/HeroSection";
import StudentTestimonials from "../StudentTestimonials/StudentTestimonials";






const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Vista Vocal</title>
      </Helmet>
     
      <HeroSection />
      <PopularClasses />
      
      <PopularInstructors/>
      <StudentTestimonials />
    </>
  );
};

export default Home;
