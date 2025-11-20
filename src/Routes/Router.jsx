import { Children, Component } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Covarage from "../Pages/Covarage/Covarage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Covarage,
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
    ],
  },
]);
export default router;
