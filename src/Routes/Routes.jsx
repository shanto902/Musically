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
            }
        ]
    }
  ]);