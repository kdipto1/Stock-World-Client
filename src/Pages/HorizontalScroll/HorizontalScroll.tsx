import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import amd from "../../Images/Icons/amd.svg";
import asus from "../../Images/Icons/asus.svg";
import corsair from "../../Images/Icons/corsair.svg";
import gigabyte from "../../Images/Icons/gigabyte.svg";
import intel from "../../Images/Icons/intel.svg";
import msi from "../../Images/Icons/msi.svg";
import pny from "../../Images/Icons/pny.svg";
import samsung from "../../Images/Icons/samsung.svg";
import sapphire from "../../Images/Icons/sapphire.svg";

const HorizontalScroll = () => {
  const partners = [
    { name: "AMD", logo: amd },
    { name: "ASUS", logo: asus },
    { name: "Corsair", logo: corsair },
    { name: "Gigabyte", logo: gigabyte },
    { name: "Intel", logo: intel },
    { name: "MSI", logo: msi },
    { name: "PNY", logo: pny },
    { name: "Samsung", logo: samsung },
    { name: "Sapphire", logo: sapphire },
  ];

  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const autoplay = React.useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    prefersReducedMotion ? [] : [autoplay.current]
  );

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    }
  };

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Our Trusted Partners</h2>
          <p className="text-lg opacity-70">
            We collaborate with industry-leading brands to bring you the best
            products.
          </p>
        </div>

        <div
          className="relative"
          onKeyDown={onKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="Partner brands"
        >
          {/* Edge fade indicators */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-base-100 to-transparent z-10"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-base-100 to-transparent z-10"></div>

          {/* Arrows */}
          <button
            aria-label="Scroll left"
            className="btn btn-circle btn-outline absolute left-2 top-1/2 -translate-y-1/2 z-20 backdrop-blur bg-base-100/60"
            onClick={scrollPrev}
          >
            ‹
          </button>
          <button
            aria-label="Scroll right"
            className="btn btn-circle btn-outline absolute right-2 top-1/2 -translate-y-1/2 z-20 backdrop-blur bg-base-100/60"
            onClick={scrollNext}
          >
            ›
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="shrink-0 w-32 sm:w-40 md:w-48 p-6 rounded-xl bg-base-200/40 hover:bg-base-200 transition shadow-sm hover:shadow-md flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-16 max-w-full object-contain transition duration-300 ease-out grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
