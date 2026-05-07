import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Layout from "../pages/Layout";
import Planner from "../pages/Planner";
import ProtectedRoute from "../utils/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "planner",
        element: <ProtectedRoute component={<Planner />} />
      }
    ]
  }
])