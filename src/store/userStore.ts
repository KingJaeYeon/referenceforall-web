import { create } from "zustand";

interface UserStoreType {
  isLogin: boolean;
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

const useUserStore = create<UserStoreType>((set: any, get: any) => ({
  isLogin: false,
  user: null,
  setUser: async (user: any) => {
    set({ isLogin: true, user });
  },
  logout: async () => {
    set({
      isLogin: false,
      user: {
        _id: null,
        name: "Guest",
        avatar: "",
        email: null,
        createAt: null,
      },
    });
    window.location.href = "/";
  },
}));

export default useUserStore;
