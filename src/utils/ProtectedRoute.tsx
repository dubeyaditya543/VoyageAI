import type { JSX } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({component}: {component: JSX.Element}){
  const location = useLocation()
  const user: User | null = useAuthStore((state) => state.currentUser)
  return user ? component : <Navigate to="/login" state={{from: location}} replace/>
}