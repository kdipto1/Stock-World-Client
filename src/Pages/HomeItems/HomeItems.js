import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

const HomeItems = () => {
  const { data: items, isLoading } = useQuery(["homeItems"], () =>
    fetch("https://stock-world-server.onrender.com/homeInventory").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  return (
    <section className="mt-10 container mx-auto">
      <h2 className="text-4xl font-bold text-center ">Products</h2>
      <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item) => (
          <div
            data-aos="zoom-in-down"
            data-aos-once="true"
            data-aos-easing="linear"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            key={item?._id}
            className="mx-auto card card-compact bg-base-200 shadow-lg"
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
                <Link
                  to={`/manageProduct/${item._id}`}
                  className="btn btn-primary"
                >
                  Update Stock &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link to="/manageInventory" className="btn btn-primary btn-wide ">
          Manage Inventory
        </Link>
      </div>
    </section>
  );
};

export default HomeItems;
