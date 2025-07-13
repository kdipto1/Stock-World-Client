// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";

const ManageInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email");
  
  const {
    data: inventoryItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageItems"],
    queryFn: async () =>
      await fetch("https://stock-world-server.onrender.com/manageInventory", {
        headers: {
          Authorization: `${email} ${accessToken}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading inventory..." />;
  }
  
  const filteredItems = inventoryItems?.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const deleteItem = async (id) => {
    const verify = window.confirm("Are you sure you want to delete this item? This action cannot be undone.");
    if (!verify) {
      return;
    }
    
    setIsDeleting(id);
    const url = `https://stock-world-server.onrender.com/inventory/${id}`;
    
    try {
      const response = await axios.delete(url, { id });
      if (response.data) {
        toast.success("Item deleted successfully!");
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to delete item");
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };
  // console.log(items);
  // console.log(email, accessToken);
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Manage Inventory
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Track and manage your product inventory
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/addProduct"
              className="btn btn-primary gap-2 hover:shadow-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Product
            </Link>
            
            <div className="form-control">
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered w-full max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-2xl border-0">
          <div className="card-body p-0">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Products ({filteredItems?.length || 0})</h2>
            </div>
            
            {!filteredItems || filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first product.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="text-left">Product</th>
                      <th className="text-left">Quantity</th>
                      <th className="text-left">Supplier</th>
                      <th className="text-left">Image</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems?.map((product) => (
                      <tr key={product?._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="py-4">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {product?.name?.length > 40 ? (
                                <div className="tooltip" data-tip={product?.name}>
                                  {product?.name?.slice(0, 40)}...
                                </div>
                              ) : (
                                product?.name
                              )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {product?._id}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`badge ${
                            product?.quantity > 50 ? 'badge-success' : 
                            product?.quantity > 10 ? 'badge-warning' : 'badge-error'
                          }`}>
                            {product?.quantity}
                          </span>
                        </td>
                        <td className="py-4 text-gray-700 dark:text-gray-300">
                          {product?.supplier}
                        </td>
                        <td className="py-4">
                          <img
                            loading="lazy"
                            className="w-16 h-16 object-cover rounded-lg border"
                            src={product?.image}
                            alt={product?.name}
                          />
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <Link
                              to={`/manageProduct/${product?._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                              </svg>
                              Manage
                            </Link>
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() => deleteItem(product?._id)}
                              disabled={isDeleting === product?._id}
                            >
                              {isDeleting === product?._id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              )}
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageInventory;
