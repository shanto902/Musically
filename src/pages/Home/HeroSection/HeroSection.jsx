import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './HeroSection.css'

const HeroSection = () => {
  return (
    <div className=" -mt-36 mb-20">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        modules={[Autoplay,Pagination]}
        className="mySwiper"
      >
         <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.0) 100%)",
              }}
            ></div>
        <SwiperSlide>
            
          <div
            style={{
              backgroundImage:
                "url('https://i.ibb.co/Cbts4JW/pexels-karolina-grabowska-5902913.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
             
              height: "100vh",
              position: "relative",
            }}
          >
           
          </div>
        </SwiperSlide>
        <SwiperSlide>
            
            <div
              style={{
                backgroundImage:
                  "url('https://i.ibb.co/Cbts4JW/pexels-karolina-grabowska-5902913.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
               
                height: "100vh",
                position: "relative",
              }}
            >
             
            </div>
          </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default HeroSection;
