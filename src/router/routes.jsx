import MainLayout from "@/layout/Mainlayout";
import ErrorPage from "@/pages/ErrorPage/errorpage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AddTask from "@/components/addTask/AddTask";
import Register from "@/pages/Register/Register";
import Profile from "@/pages/ProfilePage/UserProfile";



const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path:'/register',
                element:<Register/>,
            },
            {
                path:'/profile',
                element:<PrivateRoute><Profile/></PrivateRoute>,
            },
            {
                path:'/add-task',
                element:<PrivateRoute><AddTask/></PrivateRoute>,
            },
             
           

        ]
    },
   

]);

export default router