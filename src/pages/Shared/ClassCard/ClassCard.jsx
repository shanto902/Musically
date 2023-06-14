import { useNavigate } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";
import masking from "../../../assets/Rectangle.svg";
import wave from "../../../assets/wave.png";
import redMasking from "../../../assets/red-rec.svg";
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
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Already selected this class",
        showConfirmButton: false,
        timer: 1500,
      });
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
          className="absolute bg-white top-0 left-0 w-[99%] h-[225px] rounded-3xl ml-[1.5px]"
          style={{
            backgroundImage: `url('${classItem.classImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <img
          className="self-end z-10 rounded-b-[30px]"
          src={classItem.availableSeats === 0 ? redMasking : masking}
          alt=""
        />

        <img
          className="absolute self-end z-20 rounded-b-[30px]"
          src={wave}
          alt=""
        />
        <div className="absolute z-30 top-[48%] left-0 w-full">
          <h3
            className={`text-center font-skia font-thin text-2xl ${
              classItem.availableSeats === 0 ? "text-white" : ""
            }`}
          >
            {classItem.nameOfClass}
          </h3>
          <p
            className={`text-center ${hover && isStudent ? "hidden" : ""} ${
              classItem.availableSeats === 0 ? "text-white" : ""
            }`}
          >
            Instructor Name: {classItem.instructorName}
          </p>
          <p
            className={`text-center ${hover && isStudent ? "hidden" : ""} ${
              classItem.availableSeats === 0 ? "text-white" : ""
            }`}
          >
            Available Seats: {classItem.availableSeats}
          </p>
          <p
            className={`text-center ${hover && isStudent ? "hidden" : ""} ${
              classItem.availableSeats === 0 ? "text-white" : ""
            }`}
          >
            Price: $ {classItem.price}
          </p>
        </div>

        {!isLoading && user ? (
          isStudent ? (
            <div
              className={`absolute w-full bottom-36 flex justify-center z-30 py-2 px-4 ${
                hover ? "" : "hidden"
              }`}
            >
              <button
                className={`absolute px-7 ${classItem.availableSeats === 0 ? "text-white" : "bg-[#C03C6C] text-white hover:text-black p-2 rounded-xl drop-shadow-lg hover:bg-gray-200"} transition duration-300 ease-in-out ${
                  !hover ? "hidden" : ""
                }`}
                disabled={isLoading || classItem.availableSeats === 0}
                onClick={() => handleBuy(classItem)}
              >
                {isLoading
                  ? "Loading..."
                  : classItem.availableSeats === 0
                  ? "Seat Full"
                  : "Buy"}
              </button>
            </div>
          ) : (
            <p
              className={` m-3 badge badge-error absolute text-center text-white ${
                !hover || isStudent || classItem.availableSeats === 0
                  ? "hidden"
                  : ""
              }`}
            >
              {classItem.availableSeats === 0
                ? `Seat Full`
                : `Only Students can enroll in this class`}
            </p>
          )
        ) : (
          <div
            className={`absolute w-full bottom-28 flex justify-center z-30 py-2 px-4 ${
              hover ? "" : "hidden"
            }`}
          >
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
