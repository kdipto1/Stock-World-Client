import React from "react";
import Banner from "../Banner/Banner";
import HomeItems from "../HomeItems/HomeItems";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";

const Home = () => {
  return (
    <main className="container mx-auto">
      <Banner />
      <HorizontalScroll/>
      <HomeItems />
    </main>
  );
};

export default Home;
