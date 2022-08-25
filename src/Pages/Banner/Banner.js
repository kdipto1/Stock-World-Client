import React from "react";
import Slider from "react-slick";
import cover from "../../Images/Cover/cover.jpg"
import cover1 from "../../Images/Cover/cover1.jpg"

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  return (
    <section>
      <Slider {...settings}>
        <div>
          <img className="object-cover" src={cover} alt="" />
        </div>
        <div>
          <img src={cover1} alt="" />
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
