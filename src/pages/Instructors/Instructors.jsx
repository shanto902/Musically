import { Helmet } from "react-helmet-async";
import useAllInstructors from "../../hooks/useAllInstructors";
import InstructorCard from "../Shared/InstructorCard/InstructorCard";
import Banner from "../Shared/Banner/Banner";
import backgroundImage from '../../assets/Bg.svg'

const Instructors = () => {
  const [instructors, isInstructorLoading] = useAllInstructors();
  return (
    <>
      <Helmet>
        <title>Instructors | Vista Vocal</title>
      </Helmet>
    
   <Banner url={'https://i.ibb.co/PTHvjzP/instructor-Bg-Img.jpg'} title={"Meet Our Awesome Instructors"}/>
   <div className="w-full absolute"
    style={{
      backgroundImage:
        `url('${backgroundImage}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
     
      height: "100%",
      position: "relative",
    }}>
         <div className=" max-w-6xl mx-auto">
         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10 place-items-center">
        {!isInstructorLoading &&
          instructors
            .map((instructor) => (
              <InstructorCard key={instructor._id} instructor={instructor} />
            ))}
      </div>
            </div>
            </div>
    </>
  );
};

export default Instructors;
