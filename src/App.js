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
import ManageProduct from "./Pages/ManageProduct/ManageProduct";
import { Toaster } from "react-hot-toast";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import React from "react";
import AddProduct from "./Pages/AddProduct/AddProduct";

function App() {
  return (
    <section className="">
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manageProduct/:id" element={<ManageProduct />} />
        <Route path="/manageInventory" element={<ManageInventory />} />
        <Route path="/addProduct" element={<AddProduct/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </section>
  );
}

export default App;
