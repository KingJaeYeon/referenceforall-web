import { ALLOWED_STEPS, FormData, StepType } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/constants";

export const isValidStep = (steps: string[]) => {
  if (steps.length > 1) return false;
  if (steps.length === 0) return true;
  return ALLOWED_STEPS.includes(steps[0] as StepType);
};

export const saveFormDataToLocal = (currentStep: string, formData: FormData, cb: any) => {
  if (currentStep === "type") {
    const json = {
      type: formData.type.value,
      username: "",
      displayName: "",
      verify: "",
    };
    localStorage.setItem("signup", JSON.stringify(json));
    return;
  }

  const json = localStorage.getItem("signup");
  if (!json) {
    console.log('create');
    cb();
    return;
  }

  localStorage.setItem(
    "signup",
    JSON.stringify({
      type: formData.type.value,
      username: formData.username.value,
      displayName: formData.displayName.value,
      verify: formData.verify.value,
    }),
  );
};

export const getInputElement = (id: string) => document.getElementById(id) as HTMLInputElement | null;
