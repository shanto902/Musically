import { Helmet } from "react-helmet-async";
import useClasses from "../../hooks/useClasses";
import ClassCard from "../Shared/ClassCard/ClassCard";

const ClassSection = () => {
  const [classes, isClassLoading] = useClasses();
  console.log(classes);
  return (
    <>
      <Helmet>
        <title>Classes | Vista Vocal</title>
      </Helmet>
      <div className="container">
        {!isClassLoading &&
          classes
            .filter((classItem) => classItem.status === "approved")
            .map((classItem) => (
              <ClassCard key={classItem._id} classItem={classItem} />
            ))}
      </div>
    </>
  );
};

export default ClassSection;
