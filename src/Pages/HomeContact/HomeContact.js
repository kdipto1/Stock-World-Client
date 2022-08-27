import React from "react";

const HomeContact = () => {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-center text-cyan-800">
        Contact
      </h2>
      <div class="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src="https://placeimg.com/400/400/arch" alt="Album" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
