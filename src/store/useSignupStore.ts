import { create } from "zustand";

type FormField = { value: string; errorMessage: string };

export type InitFormDataType = Record<
  "type" | "username" | "displayName" | "verify" | "password" | "confirmPwd",
  FormField
>;

export type InitFormDataKeys = keyof InitFormDataType;

interface ISignupStore {
  formData: InitFormDataType;
  onChangeHandler: (key: InitFormDataKeys, value: string) => void;
  onErrorHandler: (key: InitFormDataKeys, value: string) => void;
  failStep: string;
  setFailStep: (key: string) => void;
  initData: () => void;
}

const getInitialFormData = (): InitFormDataType => {
  const json = JSON.parse(localStorage.getItem("signup") ?? "{}");
  return {
    type: { value: json?.type || "", errorMessage: "" },
    username: { value: json?.username || "", errorMessage: "" },
    displayName: { value: json?.displayName || "", errorMessage: "" },
    verify: { value: json?.verify || "", errorMessage: "" },
    password: { value: "", errorMessage: "" },
    confirmPwd: { value: "", errorMessage: "" },
  };
};

const useSignupStore = create<ISignupStore>((set, get) => ({
  formData: getInitialFormData(),
  failStep: "",
  initData: () => set({ formData: getInitialFormData(), failStep: "" }),
  onChangeHandler: (key: InitFormDataKeys, value: string) => {
    const formData = get().formData;
    const newData = { ...formData, [key]: { ...formData[key], value } };
    set({ formData: newData });
  },
  onErrorHandler: (key: InitFormDataKeys, value: string) => {
    const formData = get().formData;
    const newData = { ...formData, [key]: { ...formData[key], errorMessage: value } };
    set({ formData: newData });
  },
  setFailStep: (key: string) => set({ failStep: key }),
}));

export default useSignupStore;
