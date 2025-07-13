import { useContext } from "react";
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

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We collaborate with industry-leading brands to bring you the best products
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="w-48 mx-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center h-20 mb-4">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain filter dark:invert"
                  />
                </div>
                <h3 className="text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                  {partner.name}
                </h3>
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
