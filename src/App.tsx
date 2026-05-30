import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Index";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useTripStore } from "./store/tripStore";

export default function App() {
  const tripInfo = useQuery(api.packingItems.getTripInfo)
  const setTripId = useTripStore((state) => state.setTripId)
  if (tripInfo) {
    setTripId(tripInfo._id)
  }
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
