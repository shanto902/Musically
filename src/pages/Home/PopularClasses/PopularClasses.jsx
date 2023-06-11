import useClasses from "../../../hooks/useClasses";
import ClassCard from "../../Shared/ClassCard/ClassCard";

const PopularClasses = () => {
  const [classes] = useClasses();
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {classes.slice(0, 6).map((item) => (
        <ClassCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default PopularClasses;
