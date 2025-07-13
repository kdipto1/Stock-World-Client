import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddProduct = () => {
  const [user, loading] = useAuthState(auth);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newProduct: any) => {
      const userEmail = localStorage.getItem("email");
      const accessToken = localStorage.getItem("accessToken");
      const url = `https://stock-world-server.onrender.com/inventory/`;
      return axios.post(url, newProduct, {
        headers: {
          Authorization: `${userEmail} ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Product Successfully Added!");
      queryClient.invalidateQueries({ queryKey: ["manageItems"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add product"
      );
    },
  });

  const addNewProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newProduct = {
      email: user?.email,
      name: form.productName.value,
      supplier: form.supplier.value,
      price: form.price.value,
      quantity: form.quantity.value,
      description: form.description.value,
      image: form.image.value,
    };
    mutation.mutate(newProduct);
    form.reset();
  };

  if (loading) {
    return <LoadingSpinner message="Loading..." />;
  }

  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Add New Product</h1>
            <p className="opacity-70">
              Add a new product to your inventory
            </p>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <form onSubmit={addNewProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="productName"
                    type="text"
                    placeholder="Product Name"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    name="supplier"
                    type="text"
                    placeholder="Supplier"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  placeholder="Description"
                  required
                ></textarea>
                <input
                  name="image"
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;