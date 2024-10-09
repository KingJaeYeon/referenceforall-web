export type FontType =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "heading7"
  | "heading8"
  | "heading9"
  | "heading10"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "body5"
  | "body6"
  | "body7"
  | "body8"
  | "body9"
  | undefined;

export function utilFont(input: FontType, callback: () => string) {
  if (input) return input;
  return callback();
}
