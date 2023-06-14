import useAllInstructors from "../../../hooks/useAllInstructors";
import ClassCard from "../../Shared/ClassCard/ClassCard";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import LogoHeader from "../../Shared/LogoHeader/LogoHeader";
import backgroundImage from '../../../assets/Bg.svg'

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

          height: "100vh",
          position: "relative",
        }}
      >
        <div className=" max-w-6xl mx-auto">
        <HeaderTitle title={"Popular Instructors"} />
          <div className=" mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10">
            {!isInstructorLoading &&
              instructors
                .sort((a, b) => b.enrolled - a.enrolled) // Sort the classes based on enrolled in descending order
                .slice(0, 6)
                .map((classItem) => (
                  <ClassCard key={classItem._id} classItem={classItem} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;
