import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IInventoryItem } from "../../types";
import { useState } from "react";

const ManageProduct = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("accessToken");
  const [restockQuantity, setRestockQuantity] = useState("");

  const { data: product, isLoading } = useQuery<IInventoryItem>({
    queryKey: ["manageProduct", id],
    queryFn: () =>
      fetch(`https://stock-world-server.onrender.com/inventory/${id}`, {
        headers: {
          Authorization: `${email} ${accessToken}`,
        },
      }).then((res) => res.json()),
    enabled: !!id && !!email && !!accessToken,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: (newQuantity: number) => {
      const url = `https://stock-world-server.onrender.com/inventory/${id}`;
      return axios.put(
        url,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `${email} ${accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Product quantity updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["manageProduct", id] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update product quantity"
      );
    },
  });

  const handleDelivery = () => {
    if (product && product.quantity > 0) {
      updateQuantityMutation.mutate(product.quantity - 1);
    } else {
      toast.error("Product is out of stock.");
    }
  };

  const handleRestock = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(restockQuantity, 10);
    if (product && quantity > 0) {
      updateQuantityMutation.mutate(product.quantity + quantity);
      setRestockQuantity("");
    } else {
      toast.error("Please enter a valid quantity.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card lg:card-side bg-base-100 shadow-lg">
            <figure className="lg:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body lg:w-1/2">
              <h2 className="card-title text-3xl">{product.name}</h2>
              <p className="text-sm opacity-50">ID: {product._id}</p>
              <p>{product.description}</p>
              <div className="flex justify-between items-center my-4">
                <p className="text-xl font-bold">Price: ${product.price}</p>
                <p className="text-xl font-bold">
                  Quantity: {product.quantity}
                </p>
              </div>
              <div className="card-actions justify-end">
                <button
                  onClick={handleDelivery}
                  className="btn btn-primary"
                  disabled={updateQuantityMutation.isPending}
                >
                  Deliver
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg mt-8">
            <div className="card-body">
              <h2 className="card-title">Restock Item</h2>
              <form onSubmit={handleRestock} className="flex gap-4">
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="input input-bordered w-full"
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={updateQuantityMutation.isPending}
                >
                  Restock
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;