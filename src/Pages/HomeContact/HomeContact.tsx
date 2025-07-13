import contact from "../../Images/Login/contact.svg";

const HomeContact = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center mb-16">
          <figure className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img className="rounded-lg shadow-lg" src={contact} alt="Contact Us Illustration" />
          </figure>
          <div className="w-full lg:w-1/2 lg:pl-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              Have questions? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered input-primary w-full"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered input-primary w-full"
                />
              </div>
              <textarea
                rows={6}
                className="textarea textarea-primary w-full"
                placeholder="Your Message"
              />
              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-primary hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
