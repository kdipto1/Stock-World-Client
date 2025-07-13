import { Link } from "react-router-dom";
import { IInventoryItem } from "../types";

const ProductCard = ({ item }: { item: IInventoryItem }) => (
  <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <figure>
      <img
        className="w-full h-48 object-cover"
        src={item.image || "https://via.placeholder.com/300"}
        alt={item.name}
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{item.name}</h2>
      <p className="text-sm opacity-70">
        {item.description?.slice(0, 90)}...
      </p>
      <div className="mt-2">
        <p className="font-semibold">Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Supplier: {item.supplier || "N/A"}</p>
      </div>
      <div className="card-actions justify-end mt-4">
        <Link to={`/manageProduct/${item._id}`} className="btn btn-primary">
          Update Stock
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
