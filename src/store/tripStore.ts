import { create } from "zustand";
import type { Id } from "../../convex/_generated/dataModel";

type TripStore = {
  tripId: Id<"trips"> | null;
  setTripId: (tripId: Id<"trips">) => void;
};

export const useTripStore = create<TripStore>((set) => ({
  tripId: null,
  setTripId: (tripId: Id<"trips">) => {
    set(() => ({
      tripId: tripId,
    }));
  },
}));
