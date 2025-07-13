import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";
import { IInventoryItem } from "../../types";

const ManageInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email");

  const { data: inventoryItems, isLoading } = useQuery<IInventoryItem[]>({
    queryKey: ["manageItems"],
    queryFn: async () => {
      const res = await fetch(
        "https://stock-world-server.onrender.com/manageInventory",
        {
          headers: {
            Authorization: `${email} ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch inventory");
      }
      return res.json();
    },
    enabled: !!email && !!accessToken,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`https://stock-world-server.onrender.com/inventory/${id}`),
    onSuccess: () => {
      toast.success("Item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["manageItems"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete item"
      );
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate(id);
    }
  };

  const filteredItems = inventoryItems?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.supplier || "N/A").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner message="Loading inventory..." />;
  }

  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold">Manage Inventory</h1>
            <p className="opacity-70">
              Track and manage your product inventory
            </p>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/addProduct" className="btn btn-primary">
              Add Product
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Supplier</th>
                    <th>Price</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems?.map((product) => (
                    <tr key={product._id} className="hover">
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.name}</div>
                            <div className="text-sm opacity-50">
                              {product.supplier}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{product.quantity}</td>
                      <td>{product.supplier}</td>
                      <td>${product.price}</td>
                      <th className="text-center">
                        <Link
                          to={`/manageProduct/${product._id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          details
                        </Link>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => handleDelete(product._id)}
                          disabled={deleteMutation.isPending}
                        >
                          delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageInventory;