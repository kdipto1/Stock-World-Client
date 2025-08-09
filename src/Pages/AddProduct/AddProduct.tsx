import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "../../services/inventoryService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IInventoryCreatePayload } from "../../types";

// Input schema for form (string inputs)
const inputSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  category: z.string().min(1, "Category is required"),
  supplier: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
});

// Transform schema for processing data (converts to numbers)
const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform((val) => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) {
      throw new Error("Price must be a positive number");
    }
    return num;
  }),
  quantity: z.string().min(1, "Quantity is required").transform((val) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 0) {
      throw new Error("Quantity must be a non-negative integer");
    }
    return num;
  }),
  category: z.string().min(1, "Category is required"),
  supplier: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
});

type ProductFormInputs = z.infer<typeof inputSchema>;

const AddProduct = () => {
  const [user, loading] = useAuthState(auth);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormInputs>({
    resolver: zodResolver(inputSchema),
  });

  const mutation = useMutation({
    mutationFn: (newProduct: IInventoryCreatePayload) => {
      return inventoryService.createItem(newProduct);
    },
    onSuccess: () => {
      toast.success("Product Successfully Added!");
      queryClient.invalidateQueries({ queryKey: ["manageItems"] });
      reset();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add product"
      );
    },
  });

  const onSubmit = (data: ProductFormInputs) => {
    try {
      // Transform the input data using the product schema
      const transformedData = productSchema.parse(data);
      const productWithEmail = {
        ...transformedData,
        email: user?.email || "", // Ensure email is included
      };
      mutation.mutate(productWithEmail);
    } catch (error: any) {
      console.error('Form validation error:', error);
      if (error.errors) {
        error.errors.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        toast.error('Please check your form inputs');
      }
    }
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Product Name"
                      className={`input input-bordered w-full ${
                        errors.name ? 'input-error' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      {...register("category")}
                      className={`select select-bordered w-full ${
                        errors.category ? 'select-error' : ''
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    {...register("supplier")}
                    type="text"
                    placeholder="Supplier (Optional)"
                    className="input input-bordered w-full"
                  />
                  {errors.supplier && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.supplier.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register("price")}
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      className="input input-bordered w-full"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("quantity")}
                      type="number"
                      placeholder="Quantity"
                      className="input input-bordered w-full"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <textarea
                    {...register("description")}
                    className="textarea textarea-bordered w-full"
                    placeholder="Description"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("image")}
                    type="text"
                    placeholder="Image URL (optional)"
                    className="input input-bordered w-full"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}
                </div>
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