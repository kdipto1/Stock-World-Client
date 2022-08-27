import React from "react";
import Banner from "../Banner/Banner";
import HomeContact from "../HomeContact/HomeContact";
import HomeItems from "../HomeItems/HomeItems";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";

const Home = () => {
  return (
    <main className=" mx-auto">
      <Banner />
      <HorizontalScroll/>
      <HomeItems />
      <HomeContact/>
    </main>
  );
};

export default Home;
