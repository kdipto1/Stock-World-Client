import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ManageProduct = () => {
  let params = useParams();
  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery(["manageProduct"], () =>
    fetch(`http://localhost:5000/inventory/${params.id}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return;
  }
  console.log(product);
  /* Delivery Product function */
  const handleDelivery = (event) => {
    event.preventDefault();
    if (product.quantity <= 0) {
      alert("Product not available. Please Restock!");
      return;
    }
    let quantity = parseInt(product.quantity) - 1;
    console.log(quantity);
    const url = `http://localhost:5000/inventory/${params.id}`;
    try {
      axios.put(url, { quantity: quantity }).then((response) => {
        const { data } = response;
        if (data) {
          console.log(data);
          toast.success("Product Delivered",{position:"top-right"});
          refetch();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container mx-auto mt-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={product?.image} alt="Album" />
        </figure>
        <div className="card-body my-auto">
          <p className="card-title">{product?.name}</p>
          <p className="">
            <span className="font-bold">Product Id:</span> {product?._id}
          </p>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {product?.description}
          </p>
          <p className="">
            <span className="font-bold">Product Price:</span> {product?.price}$
          </p>
          <p>
            <span className="font-bold">Product Quantity:</span>{" "}
            <span className="">{product?.quantity}</span>
          </p>
          <div className="card-actions justify-end">
            <button onClick={handleDelivery} className="btn">
              Deliver
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
