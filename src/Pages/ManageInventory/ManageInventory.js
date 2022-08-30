import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";

const ManageInventory = () => {
  const {
    data: inventoryItems,
    isLoading,
    refetch,
  } = useQuery(["manageInventory"], () =>
    fetch("https://stock-world-server.herokuapp.com/inventory", {
      headers: {
        Authorization: `${localStorage.getItem("email")} ${localStorage.getItem(
          "accessToken"
        )}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  if (inventoryItems?.status === 403) {
    toast(inventoryItems?.message);
    signOut(auth);
    Navigate("/login");
  }
  // console.log(inventoryItems.status);
  const deleteItem = async (id) => {
    console.log(id);
    const verify = window.confirm("Delete");
    if (!verify) {
      return;
    } else {
      const url = `https://stock-world-server.herokuapp.com/inventory/${id}`;
      try {
        await axios.delete(url, { id }).then((response) => {
          const { data } = response;
          if (data) {
            toast.success("Item Deleted");
            refetch(data);
          }
        });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };
  return (
    <section className="mt-6 container mx-auto">
      <h2 className="font-bold text-2xl text-center">Manage inventory</h2>
      <div className="text-center">
        <Link
          to="/addProduct"
          className="btn btn-outline hover:btn-primary mt-4"
        >
          Add New Product
        </Link>
      </div>
      {/* ++++++++++++++ */}
      <h2 className="mb-2 font-bold">
        Total Products: {inventoryItems?.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Image</th>
              <th>Manage Product</th>
            </tr>
          </thead>
          {inventoryItems?.map((product) => (
            <tbody key={product?._id}>
              <tr key={product._id} className="hover">
                <td>{product?._id}</td>
                <td>
                  <div className="tooltip" data-tip={product?.name}>
                    {product?.name.slice(0, 30)}...
                  </div>
                </td>
                <td>{product?.quantity}</td>
                <td>{product?.supplier}</td>
                <td>
                  <img
                    className="w-24"
                    src={product?.image}
                    alt="Inventory product images"
                  />
                </td>
                <td key={product._id}>
                  <Link
                    to={`/manageProduct/${product?._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    Manage
                  </Link>{" "}
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => deleteItem(product?._id)}
                  >
                    Delete
                  </button>
                  {/* <label
                    key={product._id}
                    htmlFor="my-modal-6"
                    className="btn btn-xs btn-warning"
                  >
                    Delete
                  </label>
                  <input
                    key={product._id}
                    type="checkbox"
                    id="my-modal-6"
                    className="modal-toggle"
                  />
                  <div
                    key={product._id}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div key={product._id} className="modal-box">
                      <h3 className="font-bold text-lg">
                        Are you sure you want to delete?
                      </h3>
                      <div key={product._id} className="modal-action">
                        <label
                          key={product._id}
                          onClick={() => deleteItem(product?._id)}
                          htmlFor="my-modal-6"
                          className="btn btn-warning"
                        >
                          Yes
                        </label>
                        <label htmlFor="my-modal-6" className="btn btn-primary">
                          No
                        </label>
                      </div>
                    </div>
                  </div> */}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {/* ++++++++++++++ */}
    </section>
  );
};

export default ManageInventory;
