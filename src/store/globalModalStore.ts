import { create } from "zustand";

interface GlobalModalStoreType {
  key: string;
  setKey: (key: string) => void;
  onClose: () => void;
}

export const useGlobalModalStore = create<GlobalModalStoreType>(
  (set: any, get: any) => ({
    key: "",
    setKey: (key: string) => {
      set({ key });
    },
    onClose: () => {
      set({ key: "" });
    },
  }),
);
