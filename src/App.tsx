import { Routes, Route } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import Home from "./Pages/Home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { useEffect, lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";

function App(): JSX.Element {
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
  const Blogs = lazy(() => import("./Pages/Blogs/Blogs"));
  const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
  const Login = lazy(() => import("./Pages/Login/Login"));
  const Register = lazy(() => import("./Pages/Register/Register"));

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
        <Route
          path="/login"
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/blogs"
          element={
            <Suspense>
              <Blogs />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
      <Toaster />
    </section>
  );
}

export default App;
