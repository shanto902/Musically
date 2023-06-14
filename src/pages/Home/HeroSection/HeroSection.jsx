import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="-mt-36 mb-20">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
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
                  Unleash Your Inner Rockstar
                </h2>
                <p className="text-white text-lg text-center">
                  Ready to rock? Join our Music Summer Camp and channel your
                  inner rockstar! From electric guitars to drum sets and vocal
                  coaching, our camp offers intensive training and exciting
                  performances. Experience the thrill of playing in a band,
                  mastering iconic riffs, and captivating audiences with your
                  musical prowess.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              backgroundImage:
                "url('https://i.ibb.co/VYSr8Hk/pexels-pavel-danilyuk-7521310.jpg')",
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
                Discover Your Musical Passion
                </h2>
                <p className="text-white text-lg text-center">
                Immerse yourself in the world of music and unlock your true potential. Our Music Summer Camp offers a wide range of courses and workshops to help you explore various instruments, genres, and musical styles. Unleash your creativity and embark on a musical journey like never before.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage:
                "url('https://i.ibb.co/gWv1MMM/pexels-rdne-stock-project-8363027-1.jpg')",
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
                Compose, Create, and Collaborate
                </h2>
                <p className="text-white text-lg text-center">
                At our Music Summer Camp, we foster a collaborative environment where aspiring musicians come together to compose and create. Explore songwriting, music production, and collaborative projects with fellow campers. Ignite your creativity, collaborate with like-minded individuals, and bring your musical ideas to life.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
