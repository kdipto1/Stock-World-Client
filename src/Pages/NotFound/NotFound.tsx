import found from '../../Images/Utility/found.png';
const NotFound = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="text-9xl font-extrabold dark:text-gray-600">
            404
          </h2>
          <h2 className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </h2>
          <p className="mt-4 mb-8 text-gray-600 dark:text-gray-300">
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          <a
            href="/"
            className="px-8 py-3 font-semibold rounded bg-primary text-gray-50 hover:bg-primary-focus"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;