import { create } from "zustand";

type UiStore = {
  mode: "light" | "dark"
  changeMode: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  mode: "light",
  changeMode: () => {
    set((state) => {
      if(state.mode === "light"){
        return {mode: "dark"}
      }
      return {mode: "light"}
    })
  }
}))