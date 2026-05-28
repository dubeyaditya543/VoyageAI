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
    return <div className="p-12 h-dvh flex justify-center items-center rounded-2xl">
      <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
    </div>
  }

  return isAuthenticated ? (
    component
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
