import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";

const AddProduct = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return;
  }
  const addNewProduct = (event) => {
    event.preventDefault();
    const email = user?.email;
    const name = event?.target?.name?.value;
    const supplier = event?.target?.supplier?.value;
    const price = event?.target?.price?.value;
    const quantity = event?.target?.quantity?.value;
    const description = event?.target?.description?.value;
    const image = event?.target?.image?.value;
    const item = {
      email: email,
      name: name,
      supplier: supplier,
      price: price,
      quantity: quantity,
      description: description,
      image: image,
    };
    console.log(item);
    const url = `http://localhost:5000/inventory/`;
    axios
      .post(url, item)
      .then(function (response) {
        const { data } = response;
        console.log(data);
        if (data) {
          toast.success("Product Successfully Added");
        }
        event.target.reset();
      })
      .catch(function (error) {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <section className="mt-10 h-screen container mx-auto">
      <div className="card  bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Add New Product:</h2>
          <form onSubmit={addNewProduct}>
            <br />
            <input
              name="name"
              type="text"
              placeholder="product name"
              required
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <input
              type="text"
              name="supplier"
              placeholder="product supplier"
              required
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <br />
            <input
              type="text"
              name="image"
              placeholder="Image Link"
              required
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <input
              type="number"
              placeholder="Price of product"
              name="price"
              required
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <br />
            <input
              type="number"
              name="quantity"
              placeholder="Product quantity"
              required
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <textarea
              name="description"
              required
              cols="40"
              rows="6"
              placeholder="product description"
              className="textarea textarea-primary my-4"
            ></textarea>
            <br />
            <input
              className="btn btn-primary"
              type="submit"
              value="Add Product"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;