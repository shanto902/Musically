import useAllInstructors from "../../../hooks/useAllInstructors";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import backgroundImage from '../../../assets/Bg.svg'
import InstructorCard from "../../Shared/InstructorCard/InstructorCard";

const PopularInstructors = () => {

    const [instructors, isInstructorLoading] = useAllInstructors();
  return (
    <div>
    
      <div
        className="w-full"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          height: "100%",
        
        }}
      >
        <div className="mt-20 max-w-6xl mx-auto">
        <HeaderTitle title={"Popular Instructors"} />
          <div className=" mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10">
            {!isInstructorLoading &&
              instructors
                // Sort the classes based on enrolled in descending order
                .slice(0, 6)
                .map((instructor) => (
                  <InstructorCard key={instructor._id} instructor={instructor} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;
