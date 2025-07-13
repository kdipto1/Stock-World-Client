import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";

const AddProduct = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return;
  }
  const addNewProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = user?.email;
    const target = event.target as HTMLFormElement;
    const name = (target.elements.namedItem('name') as HTMLInputElement).value;
    const supplier = (target.elements.namedItem('supplier') as HTMLInputElement).value;
    const price = (target.elements.namedItem('price') as HTMLInputElement).value;
    const quantity = (target.elements.namedItem('quantity') as HTMLInputElement).value;
    const description = (target.elements.namedItem('description') as HTMLTextAreaElement).value;
    const image = (target.elements.namedItem('image') as HTMLInputElement).value;
    const item = {
      email: email,
      name: name,
      supplier: supplier,
      price: price,
      quantity: quantity,
      description: description,
      image: image,
    };

    const userEmail = localStorage.getItem("email");
    const accessToken = localStorage.getItem("accessToken");
    const url = `https://stock-world-server.onrender.com/inventory/`;
    axios
      .post(url, item, {
        headers: {
          Authorization: `${userEmail} ${accessToken}`,
        },
      })
      .then(function (response) {
        const { data } = response;
        console.log(data);
        if (data) {
          toast.success("Product Successfully Added");
        }
        (event.target as HTMLFormElement).reset();
      })
      .catch(function (error) {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <section className="mt-10 container mx-auto">
      <div className="card  bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="graphics card"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Add New Product:</h2>
          <form onSubmit={addNewProduct}>
            <br />
            <input
              name="name"
              type="text"
              placeholder="product name"
              required
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <input
              type="text"
              name="supplier"
              placeholder="product supplier"
              required
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <br />
            <input
              type="text"
              name="image"
              placeholder="Image Link"
              required
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <input
              type="number"
              placeholder="Price of product"
              name="price"
              required
              className="input input-bordered input-primary w-full max-w-xs my-4"
            />
            <br />
            <input
              type="number"
              name="quantity"
              placeholder="Product quantity"
              required
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <br />
            <select className="select select-primary w-full max-w-xs mt-4">
              <option disabled selected>
                Select Category
              </option>
              <option>Graphics Card</option>
            </select>
            <br />
            <textarea
              name="description"
              required
              cols={40}
              rows={6}
              placeholder="product description"
              className="textarea textarea-primary my-4"
            ></textarea>
            <br />
            <input
              className="btn btn-primary"
              type="submit"
              value="Add Product"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
