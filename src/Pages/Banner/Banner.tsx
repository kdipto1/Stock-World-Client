import Slider from "react-slick";
import cover from "../../Images/Cover/cover.webp";
import cover1 from "../../Images/Cover/cover1.webp";

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
    <section>
      <Slider {...settings}>
        <div>
          <img
            // style={{ height: "60vh" }}
            className="w-full"
            src={cover}
            alt=""
            {...({fetchpriority: "high"} as any)}
          />
        </div>
        <div>
          <img
            // style={{ height: "85vh" }}
            className="w-full"
            src={cover1}
            alt=""
            {...({fetchpriority: "high"} as any)}
          />
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
