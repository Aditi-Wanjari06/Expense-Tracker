import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./global.css"

import Home from "./views/Home/Home"
import Login from "./views/Login/Login"
import SignUp from "./views/SignUp/SignUp"
import AddTransaction from './views/AddTransaction/AddTransaction.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/add-transaction",
    element: <AddTransaction />
  },
  {
    path: "*",
    element: "404 Not Found"
  }
])

root.render(<RouterProvider router={router} />)
