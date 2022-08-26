import React from "react";
import { useQuery } from "@tanstack/react-query";

const HomeItems = () => {
  const { data: items, isLoading } = useQuery(["homeItems"], () =>
    fetch("http://localhost:5000/inventory?size=6").then((res) => res.json())
  );

  if (isLoading) {
    return;
  }
  console.log(items);
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-center text-white bg-cyan-800 p-1">
        Products
      </h2>
      <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item) => (
          <div
            key={item?._id}
            className="mx-auto card card-compact w-80 bg-base-200 shadow-lg"
          >
            <figure>
              <img className="w-full" src={item?.image} alt="Graphics Cards" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item?.name}</h2>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {item?.description?.slice(0, 90)}...
              </p>
              <p>
                <span className="font-medium">Price: </span>
                {item?.price}$
              </p>
              <p>
                <span className="font-medium">Quantity: </span>
                {item?.quantity}
              </p>
              <p>
                <span className="font-medium">Supplier: </span>
                {item?.supplier}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Update Stock</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button className="btn btn-primary btn-wide">Manage Inventory</button>
      </div>
    </section>
  );
};

export default HomeItems;
