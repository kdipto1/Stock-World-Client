import { useRoutes } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { useEffect, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { routes } from "./routes";
import LoadingSpinner from "./components/LoadingSpinner";

function App(): JSX.Element {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const element = useRoutes(routes);

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <main>{element}</main>
      </Suspense>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;