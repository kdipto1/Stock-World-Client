import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";

const ManageProduct = () => {
  let params = useParams();
  const email = localStorage.getItem("email");
  const accessToken = localStorage.getItem("accessToken");
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
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  /* Delivery Product function */
  const handleDelivery = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (product.quantity <= 0) {
      toast.loading("Product not available. Please Restock!", {
        duration: 80,
      });
      return;
    }
    let quantity = parseInt(product.quantity) - 1;
    const url = `https://stock-world-server.onrender.com/inventory/${params.id}`;
    try {
      axios
        .put(
          url,
          { quantity: quantity },
          {
            headers: {
              Authorization: `${email} ${accessToken}`,
            },
          }
        )
        .then((response) => {
          const { data } = response;
          if (data) {
            toast.success("Product Delivered", {
              position: "top-right",
              duration: 80,
            });
            refetch();
          }
        });
    } catch (error) {
      console.log(error);
      toast.error((error as any)?.message);
    }
  };
  const handleRestock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    if (!(target.quantity as HTMLInputElement).value) {
      toast("Please put the quantity", {
        duration: 80,
      });
    }
    let quantity =
      parseInt(product?.quantity) + parseInt((target.quantity as HTMLInputElement).value);
    const url = `https://stock-world-server.onrender.com/inventory/${params.id}`;
    if (parseInt((target.quantity as HTMLInputElement).value) <= 0) {
      toast.error("Enter a positive number");
      return;
    }
    if (parseInt((target.quantity as HTMLInputElement).value) >= 0) {
      try {
        axios
          .put(
            url,
            { quantity: quantity },
            {
              headers: {
                Authorization: `${email} ${accessToken}`,
              },
            }
          )
          .then((response) => {
            const { data } = response;
            if (data) {
              toast.success("Stock updated");
              refetch();
              target.reset();
            }
          });
      } catch (error) {
        toast.error((error as any)?.message);
        console.log(error);
      }
    }
  };
  return (
    <section className="container mx-auto mt-10">
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        data-aos-once="true"
        className="card lg:card-side bg-base-100 shadow-xl"
      >
        <figure>
          <img src={product?.image} alt="Album" />
        </figure>
        <div className="card-body my-auto">
          <p className="card-title">{product?.name}</p>
          <p className="">
            <span className="font-bold">Product Id:</span> {product?._id}
          </p>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {product?.description}
          </p>
          <p className="">
            <span className="font-bold">Product Price:</span> {product?.price}$
          </p>
          <p>
            <span className="font-bold">Product Quantity:</span>{" "}
            <span className="">{product?.quantity}</span>
          </p>
          <div className="card-actions justify-end">
            <button onClick={handleDelivery} className="btn">
              Deliver
            </button>
          </div>
        </div>
      </div>
      {/* +++++++++++ */}
      <div
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
        data-aos-once="true"
        className="mt-20 card bg-base-100 shadow-xl mx-auto"
      >
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            Update Stock Quantity for {product?.name}
          </h2>
          <form onSubmit={handleRestock}>
            <input
              className="input input-bordered input-primary w-full max-w-xs"
              type="number"
              placeholder="update stock"
              name="quantity"
            />
            <br />
            <input className="btn mt-4" type="submit" value="Update Stock" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
