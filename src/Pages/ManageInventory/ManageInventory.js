import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ManageInventory = () => {
  const {
    data: inventoryItems,
    isLoading,
    refetch,
  } = useQuery(["manageInventory"], () =>
    fetch("http://localhost:5000/inventory").then((res) => res.json())
  );
  if (isLoading) {
    return;
  }
  const deleteItem = async (id) => {
    const verify = window.confirm("Delete");
    if (!verify) {
      return;
    } else {
      const url = `http://localhost:5000/inventory/${id}`;
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
  return (
    <section className="mt-6 container mx-auto">
      <h2 className="font-bold text-2xl text-center">Manage inventory</h2>
      <div className="text-center">
        <Link to="/addProduct" className="btn my-4">
          Add New Product
        </Link>
      </div>
      {/* ++++++++++++++ */}
      <div class="overflow-x-auto">
        <table class="table w-full">
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
          {inventoryItems?.map((item) => (
            <tbody>
              <tr className="hover">
                <td>{item?._id}</td>
                <td>
                  <div class="tooltip" data-tip={item?.name}>
                    {item?.name.slice(0, 30)}...
                  </div>
                </td>
                <td>{item?.quantity}</td>
                <td>{item?.supplier}</td>
                <td>
                  <img
                    className="w-24"
                    src={item?.image}
                    alt="Inventory product images"
                  />
                </td>
                <td>
                  <Link
                    to={`/manageProduct/${item?._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    Manage
                  </Link>{" "}
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => deleteItem(item?._id)}
                  >
                    Delete
                  </button>
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
