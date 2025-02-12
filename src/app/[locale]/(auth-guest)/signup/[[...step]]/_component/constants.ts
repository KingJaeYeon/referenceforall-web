export const SIGNUP_STEPS = {
  TYPE: "type",
  USERNAME: "username",
  EMAIL: "email",
  VERIFY: "verify",
  PASSWORD: "password",
} as const;

export const ALLOWED_STEPS = [
  undefined,
  SIGNUP_STEPS.USERNAME,
  SIGNUP_STEPS.EMAIL,
  SIGNUP_STEPS.VERIFY,
  SIGNUP_STEPS.PASSWORD,
] as const;

export type StepType = (typeof ALLOWED_STEPS)[number];
