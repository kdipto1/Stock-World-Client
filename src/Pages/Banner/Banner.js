import React from "react";
import Slider from "react-slick";
import cover from "../../Images/Cover/cover.png"
import cover1 from "../../Images/Cover/cover1.png"

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  return (
    <section className="mt-6">
      <Slider {...settings}>
        <div>
          <img className="w-full" src={cover} alt="" />
        </div>
        <div>
          <img className="w-full" src={cover1} alt="" />
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
