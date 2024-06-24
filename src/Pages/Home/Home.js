import React from "react";
import Banner from "../Banner/Banner";
import HomeContact from "../HomeContact/HomeContact";
import HomeItems from "../HomeItems/HomeItems";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";

const Home = () => {
  console.log("updated");
  return (
    <main className="overflow-x-hidden">
      <Banner />
      <HomeItems />
      <HorizontalScroll />
      <HomeContact />
    </main>
  );
};

export default Home;
