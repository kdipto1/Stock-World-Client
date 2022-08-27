import React from "react";

const HomeContact = () => {
  return (
    <section className="mt-16 container mx-auto">
      <h2 className="text-2xl font-bold text-center text-cyan-800">Contact</h2>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src="https://placeimg.com/400/400/arch" alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
