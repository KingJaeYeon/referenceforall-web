import { ALLOWED_STEPS, StepType } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/constants";

export const isValidStep = (steps: string[]) => {
  if (steps.length > 1) return false;
  if (steps.length === 0) return true;
  return ALLOWED_STEPS.includes(steps[0] as StepType);
};
