import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Pages/Login/Login";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <section className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manageProduct/:id" />
        <Route path="/manageInventory" element={<ManageInventory />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </section>
  );
}

export default App;
