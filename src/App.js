// @ts-nocheck
import { Routes, Route } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Pages/Login/Login";
// import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import NotFound from "./Pages/NotFound/NotFound";
// import ManageProduct from "./Pages/ManageProduct/ManageProduct";
import { Toaster } from "react-hot-toast";
import Register from "./Pages/Register/Register";
// import Dashboard from "./Pages/Dashboard/Dashboard";
import React, { useEffect, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import AddProduct from "./Pages/AddProduct/AddProduct";
// import MyProducts from "./Pages/MyProducts/MyProducts";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";
import Blogs from "./Pages/Blogs/Blogs";
// import ManageInventory from "./Pages/ManageInventory/ManageInventory";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
  const ManageProduct = lazy(() =>
    import("./Pages/ManageProduct/ManageProduct")
  );
  const ManageInventory = lazy(() =>
    import("./Pages/ManageInventory/ManageInventory")
  );
  const AddProduct = lazy(() => import("./Pages/AddProduct/AddProduct"));
  const MyProducts = lazy(() => import("./Pages/MyProducts/MyProducts"));
  return (
    <section>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Suspense>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/manageProduct/:id"
          element={
            <RequireAuth>
              <Suspense>
                <ManageProduct />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/manageInventory"
          element={
            <RequireAuth>
              <Suspense>
                <ManageInventory />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/addProduct"
          element={
            <RequireAuth>
              <Suspense>
                <AddProduct />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/myProducts"
          element={
            <RequireAuth>
              <Suspense>
                <MyProducts />
              </Suspense>
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
