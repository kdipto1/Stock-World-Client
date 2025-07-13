import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

const AddProduct = () => {
  const [user, loading] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: '',
    supplier: '',
    price: '',
    quantity: '',
    description: '',
    image: '',
    category: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return <LoadingSpinner message="Loading..." />;
  }
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.supplier.trim()) {
      errors.supplier = 'Supplier name is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required';
    }
    
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      errors.quantity = 'Valid quantity is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Product description is required';
    }
    
    if (!formData.image.trim()) {
      errors.image = 'Product image URL is required';
    }
    
    if (!formData.category) {
      errors.category = 'Please select a category';
    }
    
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addNewProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    const item = {
      email: user?.email,
      name: formData.name,
      supplier: formData.supplier,
      price: formData.price,
      quantity: formData.quantity,
      description: formData.description,
      image: formData.image,
      category: formData.category
    };

    try {
      const userEmail = localStorage.getItem("email");
      const accessToken = localStorage.getItem("accessToken");
      const url = `https://stock-world-server.onrender.com/inventory/`;
      
      const response = await axios.post(url, item, {
        headers: {
          Authorization: `${userEmail} ${accessToken}`,
        },
      });
      
      if (response.data) {
        toast.success("Product Successfully Added!");
        setFormData({
          name: '',
          supplier: '',
          price: '',
          quantity: '',
          description: '',
          image: '',
          category: ''
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to add product");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Add New Product
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Add a new product to your inventory
            </p>
          </div>
          
          <div className="card bg-base-100 shadow-2xl border-0">
            <div className="card-body p-8">
              <form onSubmit={addNewProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium">Product Name</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.name ? 'border-error' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.name && <span className="text-xs text-error mt-1">{formErrors.name}</span>}
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium">Supplier</span>
                    </label>
                    <input
                      name="supplier"
                      type="text"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      placeholder="Enter supplier name"
                      className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.supplier ? 'border-error' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.supplier && <span className="text-xs text-error mt-1">{formErrors.supplier}</span>}
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium">Price ($)</span>
                    </label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.price ? 'border-error' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.price && <span className="text-xs text-error mt-1">{formErrors.price}</span>}
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium">Quantity</span>
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Enter quantity"
                      className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.quantity ? 'border-error' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.quantity && <span className="text-xs text-error mt-1">{formErrors.quantity}</span>}
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium">Category</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.category ? 'border-error' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Graphics Card">Graphics Card</option>
                      <option value="Processor">Processor</option>
                      <option value="Memory">Memory</option>
                      <option value="Storage">Storage</option>
                      <option value="Motherboard">Motherboard</option>
                      <option value="Power Supply">Power Supply</option>
                      <option value="Case">Case</option>
                      <option value="Cooling">Cooling</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                    {formErrors.category && <span className="text-xs text-error mt-1">{formErrors.category}</span>}
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium">Image URL</span>
                    </label>
                    <input
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL"
                      className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                        formErrors.image ? 'border-error' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.image && <span className="text-xs text-error mt-1">{formErrors.image}</span>}
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter product description"
                    className={`textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                      formErrors.description ? 'border-error' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {formErrors.description && <span className="text-xs text-error mt-1">{formErrors.description}</span>}
                </div>
                
                <div className="form-control mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary w-full text-white font-medium py-3 rounded-lg transition-all duration-200 ${
                      isSubmitting ? 'loading' : 'hover:shadow-lg hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? 'Adding Product...' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
