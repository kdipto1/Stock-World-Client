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
    console.log(id);
    // const url = `http://localhost:5000/inventory/${id}`;
    // try {
    //   await axios.delete(url, { id }).then((response) => {
    //     const { data } = response;
    //     if (data) {
    //       toast.success("Item Deleted");
    //       refetch();
    //     }
    //   });
    // } catch (error) {
    //   toast.error(error.message);
    //   console.log(error);
    // }
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
          {inventoryItems?.map((item) => (
            <tbody key={item?._id}>
              <tr key={item._id} className="hover">
                <td>{item?._id}</td>
                <td>
                  <div className="tooltip" data-tip={item?.name}>
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
                <td key={item._id}>
                  <Link
                    to={`/manageProduct/${item?._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    Manage
                  </Link>{" "}
                  <label
                    key={item._id}
                    htmlFor="my-modal-6"
                    className="btn btn-xs btn-warning"
                  >
                    Delete
                  </label>
                  <input
                    key={item._id}
                    type="checkbox"
                    id="my-modal-6"
                    className="modal-toggle"
                  />
                  <div key={item._id} className="modal modal-bottom sm:modal-middle">
                    <div key={item._id} className="modal-box">
                      <h3 className="font-bold text-lg">
                        Are you sure you want to delete?
                      </h3>
                      <div key={item._id} className="modal-action">
                        <label
                          key={item._id}
                          onClick={() => deleteItem(item?._id)}
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
                  </div>
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
