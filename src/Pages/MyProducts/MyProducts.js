// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyProducts = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const email = localStorage.getItem("email");
  const {
    data: myItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myItems"],
    queryFn: async () =>
      await fetch(
        `https://stock-world-server.onrender.com/inventoryUser?email=${email}`,
        {
          headers: {
            Authorization: `${email} ${accessToken}`,
          },
        }
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  if (myItems?.status === 403) {
    toast(myItems?.message);
    signOut(auth);
    navigate("/login");
  }

  /* ++++++++++++++++++++++++++++++++ */
  // const [user, loading, error] = useAuthState(auth);
  // const [myItems, setMyItems] = useState([]);
  // const [newItems, setNewItems] = useState([]);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   }
  //   const getMyItems = async () => {
  //     const email = user?.email;
  //     const url = `https://stock-world-server.onrender.com/inventoryUser?email=${email}`;
  //     try {
  //       const { data } = await axios.get(url, {
  //         headers: {
  //           Authorization: `${user?.email} ${localStorage.getItem(
  //             "accessToken"
  //           )}`,
  //         },
  //       });
  //       console.log(data);
  //       setMyItems(data);
  //     } catch (error) {
  //       console.log(error);
  //       if (error?.response.status === 403) {
  //         toast(error?.response.data.message);
  //         signOut(auth);
  //         navigate("/login");
  //       }
  //     }
  //   };
  //   if (loading) {
  //     return (
  //       <div className="flex justify-center my-10">
  //         <InfinitySpin width="200" color="#4fa94d" />
  //       </div>
  //     );
  //   }
  //   getMyItems();
  // }, [user, newItems, navigate, loading, myItems]);
  // if (!myItems) {
  //   return (
  //     <div className="flex justify-center my-10">
  //       <InfinitySpin width="200" color="#4fa94d" />
  //     </div>
  //   );
  // }

  const deleteItem = async (id) => {
    const verify = window.confirm("Delete");
    if (!verify) {
      return;
    } else {
      const url = `https://stock-world-server.onrender.com/inventory/${id}`;
      try {
        await axios
          .delete(
            url,
            {
              headers: {
                Authorization: `${email} ${accessToken}`,
              },
            },
            { id }
          )
          .then((response) => {
            const { data } = response;
            if (data) {
              toast.success("Item Deleted");
              refetch();
            }
          });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };
  return (
    <section className="mt-6 container mx-auto">
      <h2 className="font-bold text-2xl text-center">Manage inventory</h2>
      <div className="text-center">
        <Link to="/addProduct" className="btn my-4">
          Add New Product
        </Link>
      </div>
      {/* ++++++++++++++ */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Image</th>
              <th>Manage Product</th>
            </tr>
          </thead>
          {myItems?.map((item) => (
            <tbody key={item?._id}>
              <tr className="hover">
                <td>{item?._id}</td>
                <td>
                  <div className="tooltip" data-tip={item?.name}>
                    {item?.name.slice(0, 30)}...
                  </div>
                </td>
                <td>{item?.quantity}</td>
                <td>{item?.supplier}</td>
                <td>
                  <img
                    className="w-24"
                    src={item?.image}
                    alt="Inventory product images"
                  />
                </td>
                <td>
                  <Link
                    to={`/manageProduct/${item?._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    Manage
                  </Link>{" "}
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => deleteItem(item?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {/* ++++++++++++++ */}
    </section>
  );
};

export default MyProducts;
