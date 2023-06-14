import bgImage from "../../../assets/testiBg.jpg";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./StudentTestimonial.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import shapeImage from "../../../assets/shape.svg";

import { Pagination } from "swiper";
const StudentTestimonials = () => {
  return (
    <>

    
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="relative min-h-[560px] mb-32  bg-cover  bg-right flex mt-20 bg-fixed"
    >
   
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-10 drop-shadow-2xl mt-12 text-center "><p className=" font-roundhand text-[#FF9E15] text-5xl">Our Class</p>
      <p className=" text-white text-3xl">What Our Students Say</p></div>
      
      <div className=" flex justify-center items-center w-full">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
          }}
          modules={[Pagination]}
          className="mySwiper mt-32"
        >
           <SwiperSlide>
            <div
              className="h-[360px] w-[360px] rounded-full flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url('https://i.ibb.co/GntwfpV/c-1.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="w-full h-full rounded-full flex flex-col justify-center items-center"
                style={{
                  backgroundImage: `url('${shapeImage}')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                }}
              >
                {/* Content */}

                <p className="text-[#BB649C] mt-28 mb-3 text-2xl">Davia Beech</p>
                <p className="mx-10 -mb-9 text-center ">I absolutely loved the Musically Summer Camp online classes! </p>
              </div>
              {/* <img
                className="self-end mb-[1.5px] z-30 rounded-b-[30px] drop-shadow-lg"
                src={shapeImage}
                alt=""
              /> */}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="h-[360px] w-[360px] rounded-full flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url('https://i.ibb.co/jWYSJZb/b-1.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="w-full h-full rounded-full flex flex-col justify-center items-center"
                style={{
                  backgroundImage: `url('${shapeImage}')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                }}
              >
                {/* Content */}

                <p className="text-[#BB649C] mt-28 mb-3 text-2xl">Roland</p>
                <p className="mx-10 -mb-9 text-center">I can't express enough how much I enjoyed the Musically Summer Camp online classes. </p>
              </div>
              {/* <img
                className="self-end mb-[1.5px] z-30 rounded-b-[30px] drop-shadow-lg"
                src={shapeImage}
                alt=""
              /> */}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-[360px] w-[360px] rounded-full flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url('https://i.ibb.co/F3HxWFC/a-1.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="w-full h-full rounded-full flex flex-col justify-center items-center"
                style={{
                  backgroundImage: `url('${shapeImage}')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                }}
              >
                {/* Content */}

                <p className="text-[#BB649C] mt-28 mb-3 text-2xl">Mia Kunis</p>
                <p className="mx-10 -mb-9 text-center">Attending the Musically Summer Camp online classes was an amazing experience.  </p>
              </div>
              {/* <img
                className="self-end mb-[1.5px] z-30 rounded-b-[30px] drop-shadow-lg"
                src={shapeImage}
                alt=""
              /> */}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="h-[360px] w-[360px] rounded-full flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url('https://th-thumbnailer.cdn-si-edu.com/RWEZCsYya1RziyWIewt8N_wKKII=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/cd/ee/cdee1c82-f8e3-4de4-983e-8599d4485745/finland-smiles-wr.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="w-full h-full rounded-full flex flex-col justify-center items-center"
                style={{
                  backgroundImage: `url('${shapeImage}')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                }}
              >
                {/* Content */}

                <p className="text-[#BB649C] mt-28 mb-3 text-2xl">Dua Lipa</p>
                <p className="mx-10 -mb-9 text-center">The virtual concerts and showcases were a fantastic way to connect with other students and showcase our talents. </p>
              </div>
              {/* <img
                className="self-end mb-[1.5px] z-30 rounded-b-[30px] drop-shadow-lg"
                src={shapeImage}
                alt=""
              /> */}
            </div>
          </SwiperSlide>
         
        </Swiper>
      </div>
    </div></>
  );
};

export default StudentTestimonials;
