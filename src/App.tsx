import { useRoutes } from "react-router-dom";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { useEffect, Suspense, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { routes } from "./routes";
import LoadingSpinner from "./components/LoadingSpinner";
// Import auth debugger for development
if (import.meta.env.DEV) {
  import('./utils/authDebug');
}

function App(): JSX.Element {
  const [darkMode] = useState(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    // Apply theme to document
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

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