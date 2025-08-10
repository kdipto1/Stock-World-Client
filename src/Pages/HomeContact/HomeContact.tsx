import contact from "../../Images/Login/contact.svg";

const HomeContact = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Get in Touch</h2>
          <p className="text-lg opacity-70">
            Have questions? We’d love to hear from you. Send us a message and
            we’ll respond as soon as possible.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2">
            <img
              className="rounded-lg"
              src={contact}
              alt="Contact Us Illustration"
            />
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              <textarea
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="Your Message"
              />
              <div className="text-right">
                <button type="submit" className="btn btn-primary">
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