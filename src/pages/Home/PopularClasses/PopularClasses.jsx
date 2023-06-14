import useClasses from "../../../hooks/useClasses";
import ClassCard from "../../Shared/ClassCard/ClassCard";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";
import backgroundImage from '../../../assets/Bg.svg'

const PopularClasses = () => {
  const [classes, isClassLoading] = useClasses();
  console.log(classes);
  return (
    <div className="w-full"
    style={{
      backgroundImage:
        `url('${backgroundImage}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
     
      height: "100vh",
      position: "relative",
    }}>
      <div className=" max-w-6xl mx-auto">
      <HeaderTitle title={"Popular Classes"} />
      <div className=" mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10">
      {!isClassLoading &&
  classes
    .sort((a, b) => b.enrolled - a.enrolled) // Sort the classes based on enrolled in descending order
    .slice(0, 6)
    .map((classItem) => (
      <ClassCard key={classItem._id} classItem={classItem} />
    ))}
      </div>
    </div>
    </div>
  );
};

export default PopularClasses;
