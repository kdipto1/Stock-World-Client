import Slider from "react-slick";
import cover from "../../Images/Cover/cover.webp";
import cover1 from "../../Images/Cover/cover1.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  const slides = [
    {
      image: cover,
      title: "Streamline Your Inventory Management",
      subtitle:
        "Take control of your stock with powerful analytics and real-time tracking.",
      cta: "Get Started",
      link: "/manageInventory",
    },
    {
      image: cover1,
      title: "Boost Your Business Efficiency",
      subtitle:
        "Optimize your inventory operations with our comprehensive management system.",
      cta: "Learn More",
      link: "/about",
    },
  ];

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-full">
            <img
              className="w-full h-full object-cover"
              src={slide.image}
              alt={slide.title}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <Link to={slide.link} className="btn btn-primary btn-lg">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
