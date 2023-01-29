import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import cover from "../../Images/Cover/cover.png";
import cover1 from "../../Images/Cover/cover1.png";


const SwiperBanner = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className='container mx-auto'>
        <img src={cover} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={cover1} alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperBanner;