import { useConvexAuth } from "convex/react";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  component,
}: {
  component: JSX.Element;
}) {
  const location = useLocation();
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading) {
    return <div className="text-center text-2xl font-semibold">Loading...</div>;
  }

  return isAuthenticated ? (
    component
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
