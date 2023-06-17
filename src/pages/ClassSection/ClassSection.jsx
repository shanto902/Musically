import { Helmet } from "react-helmet-async";
import useClasses from "../../hooks/useClasses";
import ClassCard from "../Shared/ClassCard/ClassCard";
import Banner from "../Shared/Banner/Banner";
import backgroundImage from '../../assets/Bg.svg'

const ClassSection = () => {
  const [classes, isClassLoading] = useClasses();
  return (
    <>
      <Helmet>
        <title>Classes | Musically</title>
      </Helmet>
      <Banner url={'https://i.ibb.co/qgKjxBT/classroom.jpg'}  title={"Welcome to Our Class Section"}/>
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
        {!isClassLoading &&
          classes
            .map((classItem) => (
              <ClassCard key={classItem._id} classItem={classItem} />
            ))}
            </div>
            </div>
            </div>
    </>
  );
};

export default ClassSection;
