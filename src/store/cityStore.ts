import { create } from "zustand";

type CityStore = {
  currentCity: CityFetch | null,
  cityName: string,
  setCity: (city: CityFetch) => void,
  setCityName: (city: string) => void,
  clearCity: () => void
}

export const useCityStore = create<CityStore>((set) => ({
  currentCity: null,
  cityName: "",
  setCity: (city: CityFetch) => {
    set(() => ({
      currentCity: city
    }))
  },
  setCityName: (city: string) => {
    set(() => ({
      cityName: city
    }))
  },
  clearCity: () => {
    set(() => ({
      currentCity: null
    }))
  }
}))