import { create } from "zustand";

type ModeStore = {
  mode: string;
  changeMode: (mode: string) => void;
};

export const useModeStore = create<ModeStore>((set) => ({
  mode: "planner",
  changeMode: (mode: string) => {
    set(() => ({
      mode: mode,
    }));
  },
}));
