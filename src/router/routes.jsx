import MainLayout from "@/layout/Mainlayout";
import ErrorPage from "@/pages/ErrorPage/errorpage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";

import { createBrowserRouter } from "react-router-dom";


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
            // {
            //     path: "/register",
            //     element:<Regsiter/>
            // },
           

        ]
    },
   

]);

export default router