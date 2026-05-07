import { create } from "zustand";

type AuthStore = {
  currentUser: User | null;
  users: User[];
  signup: (data: SignupData) => void;
  login: (data: LoginData) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  users: [],
  login: ({ email, password }: LoginData) => {
    set((state) => {
      const user = state.users.find((user) => user.email === email);
      if (user === undefined) {
        throw new Error("User not found");
      }
      if (user && user.password !== password) {
        throw new Error("Invalid credentials");
      }
      return { currentUser: user };
    });
  },
  signup: ({ name, email, password }: SignupData) => {
    set((state) => {
      const newUser: User = { name, email, password };
      return { currentUser: newUser, users: [...state.users, newUser] };
    });
  },
  logout: () => {
    set(() => ({
      currentUser: null,
    }));
  },
}));
