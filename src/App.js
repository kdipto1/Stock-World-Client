import { Routes, Route } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Pages/Login/Login";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import NotFound from "./Pages/NotFound/NotFound";
import ManageProduct from "./Pages/ManageProduct/ManageProduct";
import { Toaster } from "react-hot-toast";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AddProduct from "./Pages/AddProduct/AddProduct";
import MyProducts from "./Pages/MyProducts/MyProducts";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";
import Blogs from "./Pages/Blogs/Blogs";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section>
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/manageProduct/:id"
          element={
            <RequireAuth>
              <ManageProduct />
            </RequireAuth>
          }
        />
        <Route
          path="/manageInventory"
          element={
            <RequireAuth>
              <ManageInventory />
            </RequireAuth>
          }
        />
        <Route
          path="/addProduct"
          element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }
        />
        <Route
          path="/myProducts"
          element={
            <RequireAuth>
              <MyProducts />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </section>
  );
}

export default App;
