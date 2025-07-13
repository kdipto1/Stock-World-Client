import contact from "../../Images/Login/contact.svg";

const HomeContact = () => {
  return (
    <section className="mt-16 container mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={contact} alt="Album" />
        </figure>
        <div className="card-body">
          <div className="mx-auto">
            <h2 className="card-title text-4xl ">Contact Us</h2>
          </div>
          <form onClick={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <input
              type="text"
              placeholder="Your Email"
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <br />
            <textarea
              cols={42}
              rows={5}
              className="textarea textarea-primary"
              placeholder="Your Message"
            ></textarea>
            <br />
            <div className="text-start">
              <input
                className="btn btn-primary btn-wide mt-2 "
                type="submit"
                value="Send"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
