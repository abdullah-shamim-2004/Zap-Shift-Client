import React from "react";
import bannarImg1 from "../../../assets/banner/banner1.png";
import bannarImg2 from "../../../assets/banner/banner2.png";
import bannarImg3 from "../../../assets/banner/banner3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

const Bannar = () => {
  const slides = [
    {
      id: 1,
      img: bannarImg1,
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      img: bannarImg2,
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 3,
      img: bannarImg3,
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="w-full ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="h-[80vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[80vh] w-full bg-center bg-cover flex rounded-2xl"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              <div className="absolute inset-0"></div>

              <div className="absolute h-fit bottom-15 left-8 z-10 text-center text-black max-w-2xl px-6">
                <p className="text-sm md:text-lg text-gray-500 mb-6">
                  {slide.description}
                </p>
                <div className=" flex flex-row gap-3 justify-start ">
                  <Link>
                    <button className="btn text-xl px-8 py-5 rounded-2xl btn-primary text-black font-bold">
                      Track Your Parcel
                    </button>
                  </Link>
                  <button className="btn text-xl px-8 py-5 rounded-2xl btn-outline text-black font-bold w-fit">
                    Be A Rider
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Bannar;
