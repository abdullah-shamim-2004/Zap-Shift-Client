import { Children, Component } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Covarage from "../Pages/Covarage/Covarage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Rider from "../Pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/DashBoard/Payment/PaymentCancel";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/DashBoard/ApproveRider/ApproveRiders";

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
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },

      {
        path: "/coverage",
        Component: Covarage,
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "approve-riders",
        Component: ApproveRiders,
      },
    ],
  },
]);
export default router;
