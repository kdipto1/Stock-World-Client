import React from "react";
import Slider from "react-slick";
import cover from "../../Images/Cover/cover.png";
import cover1 from "../../Images/Cover/cover1.png";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    fade: true,
  };

  return (
    <section
      data-aos="zoom-in"
      data-aos-once="true"
      data-aos-duration="500"
      data-aos-easing="linear"
    >
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
