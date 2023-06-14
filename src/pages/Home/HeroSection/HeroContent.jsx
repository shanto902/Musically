
import { SwiperSlide } from 'swiper/react';

const HeroContent = ({url, heading, subHeading}) => {
    return (
         <SwiperSlide>
  <div
    style={{
      backgroundImage:
        `url('${url}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      position: "relative",
    }}
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
      className="z-10 flex items-center justify-center"
    >
      <div className="text-center max-w-6xl">
        <h2 className="text-white text-6xl mb-8 font-roundhand">
         {heading}
        </h2>
        <p className="text-white text-lg text-center">
         {subHeading}
        </p>
      </div>
    </div>
  </div>
</SwiperSlide>
    );
};

export default HeroContent;