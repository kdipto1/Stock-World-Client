import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductCard from "../../components/ProductCard";
import { IInventoryItem } from "../../types";
import { inventoryService } from "../../services/inventoryService";

const HomeItems = () => {
  const { data: items, isLoading } = useQuery<IInventoryItem[]>({
    queryKey: ["homeItems"],
    queryFn: async () => {
      // httpClient unwraps response to data
      const data = await inventoryService.getHomeItems();
      console.log(data.data);
      return data as unknown as IInventoryItem[];
    },
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Featured Products</h2>
          <p className="text-lg opacity-70">
            Discover our latest inventory and manage your stock efficiently.
          </p>
        </div>

        {!items || items.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No products available</h3>
            <p className="opacity-70">
              Start by adding your first product to the inventory.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items?.slice(0, 6).map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/manageInventory" className="btn btn-primary btn-wide">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeItems;
