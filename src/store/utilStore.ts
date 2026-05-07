import { create } from "zustand";

type UtilStore = {
  searchFocus: boolean,
  handleFocus: () => void
}

export const useUtilStore = create<UtilStore>((set) => ({
  searchFocus: false,
  handleFocus: () => {
    set((state) => ({
      searchFocus: !state.searchFocus
    }))
  }
}))