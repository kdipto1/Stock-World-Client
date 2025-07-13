import Slider from "react-slick";
import cover from "../../Images/Cover/cover.webp";
import cover1 from "../../Images/Cover/cover1.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    fade: true,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  const slides = [
    {
      image: cover,
      title: "Streamline Your Inventory Management",
      subtitle:
        "Take control of your stock with powerful analytics and real-time tracking",
      cta: "Get Started",
      link: "/register",
    },
    {
      image: cover1,
      title: "Boost Your Business Efficiency",
      subtitle:
        "Optimize your inventory operations with our comprehensive management system",
      cta: "Learn More",
      link: "/about",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <style>{`
        .custom-dots {
          bottom: 30px;
        }
        .custom-dots li button:before {
          font-size: 14px;
          color: white;
          opacity: 0.6;
        }
        .custom-dots li.slick-active button:before {
          opacity: 1;
          color: #3b82f6;
        }
      `}</style>

      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.title}
                {...({ fetchpriority: "high" } as any)}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-primary hover:bg-primary-focus text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
