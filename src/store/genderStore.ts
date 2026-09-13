import { create } from "zustand";

type GenderStore = {
  gender: string | undefined;
  menstruationStatus: boolean;
  setGender: (gender: string | undefined) => void;
  setMenstruationStatus: (status: boolean) => void;
};

export const useGenderStore = create<GenderStore>((set) => ({
  gender: undefined,
  menstruationStatus: false,
  setGender: (gender: string | undefined) => {
    set(() => ({
      gender: gender,
    }));
  },
  setMenstruationStatus: (status: boolean) => {
    set(() => ({
      menstruationStatus: status,
    }));
  },
}));
