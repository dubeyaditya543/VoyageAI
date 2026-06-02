import { create } from "zustand";
import type { Place } from "../components/FamousPlaceCard";

type FamousPlace = {
  places: Place[] | [],
  addPlaces: (places: Place[]) => void;
  clearPlaces: () => void,
}

export const useFamousPlaceStore = create<FamousPlace>((set) => ({
  places: [],
  addPlaces: (places: Place[]) => {
    set(() => ({
      places: places
    }))
  },
  clearPlaces: () => {
    set(() => ({
      places: []
    }))
  }
}))