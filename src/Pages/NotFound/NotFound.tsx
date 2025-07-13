import { Link } from "react-router-dom";
import notFound from "../../Images/Utility/found.png";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md text-center mx-auto">
          <img src={notFound} alt="Not Found" className="w-64 mx-auto mb-8" />
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="opacity-70 mt-4">
            The page you are looking for does not exist.
          </p>
          <Link to="/" className="btn btn-primary mt-8">
            Go to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
