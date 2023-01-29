import React, { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ManageInventory = () => {
  const accessToken = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email");
  const {
    data: inventoryItems,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    ["manageItems"],
    async () =>
      await fetch("https://stock-world-server.onrender.com/manageInventory", {
        headers: {
          Authorization: `${email} ${accessToken}`,
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
  const deleteItem = async (id) => {
    console.log(id);
    const verify = window.confirm("Delete");
    if (!verify) {
      return;
    } else {
      const url = `https://stock-world-server.onrender.com/inventory/${id}`;
      try {
        await axios.delete(url, { id }).then((response) => {
          const { data } = response;
          if (data) {
            toast.success("Item Deleted");
            refetch();
          }
        });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };
  // console.log(items);
  // console.log(email, accessToken);
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
      {/* <h2 className="mb-2 font-bold">
        Total Products: {inventoryItems?.length}
      </h2> */}
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
              <tr className="hover">
                <td>{product?._id}</td>
                <td>
                  <div className="tooltip" data-tip={product?.name}>
                    {product?.name?.slice(0, 30)}...
                  </div>
                </td>
                <td>{product?.quantity}</td>
                <td>{product?.supplier}</td>
                <td>
                  <img
                    loading="lazy"
                    className="w-24"
                    src={product?.image}
                    alt="Inventory product images"
                  />
                </td>
                <td>
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
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
};

export default ManageInventory;
