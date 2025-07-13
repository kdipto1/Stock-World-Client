import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  supplier: string;
}

const ProductCard = ({ item }: { item: Product }) => (
  <div className="mx-auto card card-compact bg-base-200 shadow-lg">
    <figure>
      <img className="w-full" src={item.image} alt={item.name} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{item.name}</h2>
      <p>
        <span className="font-medium">Description:</span>{" "}
        {item.description.slice(0, 90)}...
      </p>
      <p>
        <span className="font-medium">Price: </span>
        {item.price}$
      </p>
      <p>
        <span className="font-medium">Quantity: </span>
        {item.quantity}
      </p>
      <p>
        <span className="font-medium">Supplier: </span>
        {item.supplier}
      </p>
      <div className="card-actions justify-end">
        <Link to={`/manageProduct/${item._id}`} className="btn btn-primary">
          Update Stock &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {/* ... */}
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
