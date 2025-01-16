import React, { useContext } from "react";
import "./HorizontalScroll.css";
// import "react-horizontal-scrolling-menu/dist/styles.css";
import "react-horizontal-scrolling-menu/styles.css";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import RightArrowIcon from "../../Images/Icons/right-arrow.png";
import LeftArrowIcon from "../../Images/Icons/left-arrow.png";
import amd from "../../Images/Icons/amd.svg";
import asus from "../../Images/Icons/asus.svg";
import corsair from "../../Images/Icons/corsair.svg";
// import galaxy from '../../Images/Icons/galaxy.svg';
import gigabyte from "../../Images/Icons/gigabyte.svg";
import intel from "../../Images/Icons/intel.svg";
import msi from "../../Images/Icons/msi.svg";
import pny from "../../Images/Icons/pny.svg";
import samsung from "../../Images/Icons/samsung.svg";
import sapphire from "../../Images/Icons/sapphire.svg";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <button onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <button onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </button>
  );
};

const HorizontalScroll = () => {
  const images = [
    amd,
    asus,
    corsair,
    gigabyte,
    intel,
    msi,
    pny,
    samsung,
    sapphire,
  ];

  return (
    <section className="mt-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary">
          Valuable Partners
        </h2>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          children={undefined}
        >
          {images.map((image, index) => (
            <div key={index} className="w-64 p-10 inline-block">
              <img src={image} alt="" />
            </div>
          ))}
        </ScrollMenu>
      </div>
    </section>
  );
};

export default HorizontalScroll;
