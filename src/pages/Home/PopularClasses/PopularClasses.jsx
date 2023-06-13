import useClasses from "../../../hooks/useClasses";
import ClassCard from "../../Shared/ClassCard/ClassCard";
import HeaderTitle from "../../Shared/HeaderTitle/HeaderTitle";

const PopularClasses = () => {
  const [classes, isClassLoading] = useClasses();
  console.log(classes);
  return (
    <div className=" max-w-6xl mx-auto">
      <HeaderTitle title={"Popular Classes"} />
      <div className=" mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10">
        {!isClassLoading &&
          classes
            .slice(0, 6)
            .map((classItem) => (
              <ClassCard key={classItem._id} classItem={classItem} />
            ))}
      </div>
    </div>
  );
};

export default PopularClasses;
