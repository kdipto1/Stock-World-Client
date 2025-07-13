import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";
import Home from "./Pages/Home/Home";

const createLazyComponent = (
  componentImport: () => Promise<{ default: React.ComponentType }>,
  requireAuth = false
) => {
  const LazyComponent = lazy(componentImport);

  return {
    element: requireAuth ? (
      <RequireAuth>
        <LazyComponent />
      </RequireAuth>
    ) : (
      <LazyComponent />
    ),
  };
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    ...createLazyComponent(() => import("./Pages/Dashboard/Dashboard")),
  },
  {
    path: "/manageProduct/:id",
    ...createLazyComponent(
      () => import("./Pages/ManageProduct/ManageProduct"),
      true
    ),
  },
  {
    path: "/manageInventory",
    ...createLazyComponent(
      () => import("./Pages/ManageInventory/ManageInventory"),
      true
    ),
  },
  {
    path: "/addProduct",
    ...createLazyComponent(() => import("./Pages/AddProduct/AddProduct"), true),
  },
  {
    path: "/myProducts",
    ...createLazyComponent(() => import("./Pages/MyProducts/MyProducts"), true),
  },
  {
    path: "/login",
    ...createLazyComponent(() => import("./Pages/Login/Login")),
  },
  {
    path: "/register",
    ...createLazyComponent(() => import("./Pages/Register/Register")),
  },
  {
    path: "/blogs",
    ...createLazyComponent(() => import("./Pages/Blogs/Blogs")),
  },
  {
    path: "*",
    ...createLazyComponent(() => import("./Pages/NotFound/NotFound")),
  },
];
