import { create } from "zustand";

type ModeStore = {
  mode: string;
  changeMode: () => void;
};

export const useModeStore = create<ModeStore>((set) => ({
  mode: "planner",
  changeMode: () => {
    set((state) => ({
      mode: state.mode === "planner" ? "places" : "planner",
    }));
  },
}));
