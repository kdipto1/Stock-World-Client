import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
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

        <ScrollMenu>
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-48 mx-4 p-6 flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-16 max-w-full object-contain"
              />
            </div>
          ))}
        </ScrollMenu>
      </div>
    </section>
  );
};

export default HorizontalScroll;