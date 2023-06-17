
import wave from "../../../assets/wave.png";

import { useState } from "react";

const InstructorCard = ({ instructor }) => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        className=" overflow-hidden group w-[300px] h-[400px] rounded-[30px] relative flex justify-end drop-shadow-lg bg-white"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        
        <img
  className="absolute inset-x-0 shadow-xl bg-white mx-auto mt-2 rounded-full border-4 border-white"
  src={instructor.picture}
  alt=""
  style={{ height: '150px', width: '150px', objectFit: 'cover' }}
/>

    
        <img
          className="absolute self-end z-20 rounded-b-[30px]"
          src={wave}
          alt=""
        />
        <div className="absolute z-32 top-[48%] left-0 w-full">
          <h3
            className={`text-center font-skia font-thin text-2xl ${
              hover ? "hidden" : ""
            } `}
          >
            {instructor.name}
          </h3>
          <p className={`text-center ${hover ? "hidden" : ""}`}>
            Email: {instructor.email}
          </p>
          {/* <p className={`text-center ${hover ? "hidden" : ""}`}>
            Total Classes: {instructor.availableSeats}
          </p> */}
        
        </div>
        <div
          className={`absolute w-full bottom-36 flex justify-center z-50 py-2 px-4 ${
            hover ? "" : "hidden"
          }`}
        >
          <button
            className={`absolute px-7 z-50 ${
              instructor.availableSeats === 0
                ? "text-white"
                : "bg-[#C03C6C] text-white hover:text-black p-2 rounded-xl drop-shadow-lg hover:bg-gray-200"
            } transition duration-300 ease-in-out ${!hover ? "hidden" : ""}`}
            //   onClick={() => handleBuy(instructor._id)}
          >
            View Classes
          </button>
        </div>
    
        <div
          className={`absolute w-full bottom-28 flex justify-center z-30 py-2 px-4 ${
            hover ? "" : "hidden"
          }`}
        >
         
        </div>
      </div>
    </>
  );
};

export default InstructorCard;
