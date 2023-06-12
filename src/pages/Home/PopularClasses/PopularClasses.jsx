import useClasses from "../../../hooks/useClasses";
import ClassCard from "../../Shared/ClassCard/ClassCard";

const PopularClasses = () => {
  const [classes,isClassLoading] = useClasses();
  console.log(classes)
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {!isClassLoading && classes.slice(0, 6).map((classItem) => (
        <ClassCard key={classItem._id} classItem={classItem} />
      ))}
    </div>
  );
};

export default PopularClasses;
