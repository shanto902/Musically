import { useNavigate } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";
import masking from "../../../assets/Rectangle.svg";
import wave from "../../../assets/wave.png";
import { useState } from "react";

const ClassCard = ({ classItem }) => {
  const { user } = useAuthentication();
  const [secureAxios] = useSecureAxios();
  const [hover, setHover] = useState(false);
  const [isStudent, isLoading] = useUserRole();

  const navigate = useNavigate();

  const handleBuy = async (classItem) => {
    if (isLoading) {
      return; // Do nothing if data is still loading
    }

    if (!user) {
      Swal.fire({
        title: "Please Login to enroll in class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth/login");
        }
      });
      return;
    }

    if (!isStudent) {
      Swal.fire({
        title: "Only students can enroll in this class",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    const selectedClass = {
      classId: classItem._id,
      email: user.email,
      name: classItem.nameOfClass,
      image: classItem.classImage,
      price: classItem.price,
      seats: classItem.availableSeats,
    };

    try {
      const res = await secureAxios.post("/classes/select", selectedClass);
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added to Dashboard",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Handle the error if needed
      console.error("Failed to enroll in class:", error);
    }
  };

  return (
    <>
      <div
        className="group w-[300px] h-[400px] rounded-[30px] relative flex justify-end drop-shadow-lg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="absolute top-0 left-0 w-[99%] h-[225px] rounded-3xl ml-[1.5px]"
          style={{
            backgroundImage: `url('https://i.ibb.co/Cbts4JW/pexels-karolina-grabowska-5902913.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <img className="self-end z-10" src={masking} alt="" />
        <img
          className="absolute self-end z-20 rounded-b-[30px]"
          src={wave}
          alt=""
        />
        <div className="absolute z-30 top-1/2 left-0 w-full">
          <h3 className="text-center font-skia font-thin text-2xl">
            {classItem.nameOfClass}
          </h3>
          <p className={`text-center ${hover && isStudent ? 'hidden' : ''}`}>
            Instructor Name: {classItem.instructorName}
          </p>
          <p className={`text-center ${hover && isStudent ? 'hidden' : ''}`}>
            Available Seats: {classItem.availableSeats}
          </p>
          <p className={`text-center ${hover && isStudent ? 'hidden' : ''}`}>
            Price: $ {classItem.availableSeats}
          </p>
         
        </div>
      

        {!isLoading && user ? (
          isStudent ? (
            <div className={`absolute w-full bottom-28 flex justify-center z-30 py-2 px-4 ${hover ? '' : 'hidden'}`}>
            <button
              className={`absolute px-7  bg-[#C03C6C] text-white hover:text-black p-2 rounded-xl drop-shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"${!hover ? 'hidden' : ''}`}
              disabled={isLoading}
              onClick={() => handleBuy(classItem)}
            >
              {isLoading ? "Loading..." : "Buy"}
            </button>
            </div>
          ) : (
            <p className={` m-3 badge badge-error absolute text-center ${!hover || isStudent ? 'hidden' : ''}`}>
            Only Students can enroll in this class
          </p>
          )
        ) : (
          <div className={`absolute w-full bottom-28 flex justify-center z-30 py-2 px-4 ${hover ? '' : 'hidden'}`}>
            <button
              className="bg-[#C03C6C] text-white hover:text-black p-2 rounded-xl drop-shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
              onClick={() => navigate("/auth/login")}
            >
              Login to Enroll
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default ClassCard;
