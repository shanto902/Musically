import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import ClassSection from "../pages/ClassSection/ClassSection";
import Auth from "../Layout/Auth";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import AddClasses from "../pages/Dashboard/AddClasses/AddClasses";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import SelectedClasses from "../pages/Dashboard/SelectedClasses/SelectedClasses";
import EnrolledClass from "../pages/Dashboard/EnrolledClass/EnrolledClass";
import Payment from "../pages/Dashboard/PaymentForm/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "classes",
        element: <ClassSection />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "manage-classes",
        element: <ManageClasses />,
      },
      {
        path: "add-class",
        element: <AddClasses />,
      },
      {
        path: "my-classes",
        element: <MyClasses />,
      },
      {
        path: "selected-class",
        element: <SelectedClasses />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClass />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />, // Replace with your 404 page component
  },
]);
