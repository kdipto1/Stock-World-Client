import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IInventoryItem } from "../../types";
import { inventoryService } from "../../services/inventoryService";
import { useState } from "react";

const ManageProduct = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [restockQuantity, setRestockQuantity] = useState("");

  const { data: product, isLoading } = useQuery<IInventoryItem>({
    queryKey: ["manageProduct", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const response = await inventoryService.getItemById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 300000, // 5 minutes
  });

  const updateQuantityMutation = useMutation({
    mutationFn: (newQuantity: number) => {
      if (!id) throw new Error("Product ID is required");
      return inventoryService.updateItem(id, { quantity: newQuantity });
    },
    onSuccess: () => {
      toast.success("Product quantity updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["manageProduct", id] });
      queryClient.invalidateQueries({ queryKey: ["manageItems"] });
      queryClient.invalidateQueries({ queryKey: ["myItems"] });
    },
    onError: (error: any) => {
      // Handle Zod validation errors from server
      if (error.validationErrors) {
        error.validationErrors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(error.message || "Failed to update product quantity");
      }
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
              <h2 className="card-title text-2xl sm:text-3xl">{product.name}</h2>
              <p className="text-sm opacity-50">ID: {product._id}</p>
              <p className="text-sm sm:text-base">{product.description}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-4 gap-2">
                <p className="text-lg sm:text-xl font-bold">Price: ${product.price}</p>
                <p className="text-lg sm:text-xl font-bold">
                  Quantity: {product.quantity}
                </p>
              </div>
              <div className="card-actions justify-end">
                <button
                  onClick={handleDelivery}
                  className="btn btn-primary w-full sm:w-auto"
                  disabled={updateQuantityMutation.isPending || product.quantity === 0}
                >
                  {updateQuantityMutation.isPending ? "Processing..." : "Deliver"}
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg mt-8">
            <div className="card-body">
              <h2 className="card-title">Restock Item</h2>
              <form onSubmit={handleRestock} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="input input-bordered w-full"
                  min="1"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-secondary w-full sm:w-auto"
                  disabled={updateQuantityMutation.isPending}
                >
                  {updateQuantityMutation.isPending ? "Restocking..." : "Restock"}
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