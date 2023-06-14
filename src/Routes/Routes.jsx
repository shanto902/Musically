import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import ClassSection from "../pages/ClassSection/ClassSection";
import Auth from "../Layout/Auth";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import ManageClasses from "../pages/ManageClasses/ManageClasses";
import AddClasses from "../pages/AddClasses/AddClasses";
import MyClasses from "../pages/MyClasses/MyClasses";
import SelectedClasses from "../pages/SelectedClasses/SelectedClasses";

import Payment from "../pages/PaymentForm/Payment";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import EnrolledClass from "../pages/EnrolledClass/EnrolledClass";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'instructors',
            element: <Instructors />
        },
        {
            path: 'classes',
            element: <ClassSection />
        }
      ]
    },
    {
        path: 'auth',
        element: <Auth/>,
        children: [
            {
                path: 'login',
                element: <Login />,
    
            },
            {
                path: 'register',
                element: <Register />
            },
        ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard /></PrivateRoute> ,
      children: [
        {
          path: 'all-users',
          element: <AllUsers />
        },
        {
          path: 'manage-classes',
          element: <ManageClasses />
        },
        {
          path: 'add-class',
          element: <AddClasses />
        },
        {
          path: 'my-classes',
          element: <MyClasses />
        },
        {
          path: 'selected-class',
          element: <SelectedClasses />
        },
        {
          path: 'enrolled-classes',
          element: <EnrolledClass />
        },
        {
          path: 'payment/:id',
          element: <Payment/>
        }
      ]
    }, {
      path: '*',
      element: <ErrorPage /> // Replace with your 404 page component
    }
  ]);