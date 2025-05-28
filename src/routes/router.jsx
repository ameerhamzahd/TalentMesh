import React from 'react';
import { createBrowserRouter } from "react-router";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <div>Hello World</div>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/login",
                Component: Login
            },
            
        ]
    },
]);

export default router;