import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";

const ManageProduct = () => {
  let params = useParams();
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("accessToken");
  const [isDelivering, setIsDelivering] = useState(false);
  const [isRestocking, setIsRestocking] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState('');
  
  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageProduct"],
    queryFn: () =>
      fetch(`https://stock-world-server.onrender.com/inventory/${params.id}`, {
        headers: {
          Authorization: `${email} ${accessToken}`,
        },
      }).then((res) => res.json()),
  });
  
  if (isLoading) {
    return <LoadingSpinner message="Loading product details..." />;
  }
  const handleDelivery = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (product.quantity <= 0) {
      toast.error("Product not available. Please restock!");
      return;
    }
    
    setIsDelivering(true);
    const quantity = parseInt(product.quantity) - 1;
    const url = `https://stock-world-server.onrender.com/inventory/${params.id}`;
    
    try {
      const response = await axios.put(
        url,
        { quantity: quantity },
        {
          headers: {
            Authorization: `${email} ${accessToken}`,
          },
        }
      );
      
      if (response.data) {
        toast.success("Product delivered successfully!");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error((error as any)?.response?.data?.message || "Failed to deliver product");
    } finally {
      setIsDelivering(false);
    }
  };
  
  const handleRestock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!restockQuantity || parseInt(restockQuantity) <= 0) {
      toast.error("Please enter a valid positive quantity");
      return;
    }
    
    setIsRestocking(true);
    const quantity = parseInt(product?.quantity) + parseInt(restockQuantity);
    const url = `https://stock-world-server.onrender.com/inventory/${params.id}`;
    
    try {
      const response = await axios.put(
        url,
        { quantity: quantity },
        {
          headers: {
            Authorization: `${email} ${accessToken}`,
          },
        }
      );
      
      if (response.data) {
        toast.success("Stock updated successfully!");
        refetch();
        setRestockQuantity('');
      }
    } catch (error) {
      console.error(error);
      toast.error((error as any)?.response?.data?.message || "Failed to update stock");
    } finally {
      setIsRestocking(false);
    }
  };
  return (
<section className="container mx-auto mt-10 space-y-8">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow md:space-x-4 overflow-hidden">
        <img src={product?.image} alt="Product" className="w-full md:w-1/3 object-cover" />
        <div className="p-4 flex flex-col space-y-2 justify-center">
          <h2 className="text-xl font-semibold">{product?.name}</h2>
          <p>Product Id: <span className="text-gray-600">{product?._id}</span></p>
          <p>{product?.description}</p>
          <p>Price: <span className="font-semibold">${product?.price}</span></p>
          <p>Quantity: <span className="font-semibold">{product?.quantity}</span></p>
          <button onClick={handleDelivery} className="btn btn-primary mt-4">
            Deliver
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-center text-lg font-medium mb-4">
          Update Stock for {product?.name}
        </h2>
        <form onSubmit={handleRestock} className="flex flex-col items-center space-y-4">
          <input
            className="input input-bordered w-full max-w-xs"
            type="number"
            value={restockQuantity}
            onChange={(e) => setRestockQuantity(e.target.value)}
            placeholder="Enter new quantity"
          />
          <button type="submit" className="btn btn-primary">
            Update Stock
          </button>
        </form>
      </div>
    </section>
  );
};

export default ManageProduct;
