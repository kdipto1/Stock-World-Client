import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IInventoryItem } from "../../types";

const MyProducts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email");

  const { data: myItems, isLoading } = useQuery<IInventoryItem[]>({
    queryKey: ["myItems"],
    queryFn: async () => {
      const res = await fetch(
        `https://stock-world-server.onrender.com/inventoryUser?email=${email}`,
        {
          headers: {
            Authorization: `${email} ${accessToken}`,
          },
        }
      );
      if (res.status === 403 || res.status === 401) {
        signOut(auth);
        navigate("/login");
        toast.error("Unauthorized access. Please log in again.");
        throw new Error("Unauthorized");
      }
      if (!res.ok) {
        throw new Error("Failed to fetch user products");
      }
      return res.json();
    },
    enabled: !!email && !!accessToken,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`https://stock-world-server.onrender.com/inventory/${id}`, {
        headers: {
          Authorization: `${email} ${accessToken}`,
        },
      }),
    onSuccess: () => {
      toast.success("Item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["myItems"] });
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

  if (isLoading) {
    return <LoadingSpinner message="Loading your products..." />;
  }

  return (
    <section className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Products</h1>
          <Link to="/addProduct" className="btn btn-primary">
            Add New Product
          </Link>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myItems?.map((product) => (
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

export default MyProducts;