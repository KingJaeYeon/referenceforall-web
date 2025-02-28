import { request } from "@/lib/axios";

const prefix = (path: string) => `/email-verification/${path}`;

export function sendSignupCode(username: string) {
  return request({
    url: prefix("tokens/email"),
    method: "POST",
    data: { username },
  });
}

export function sendEmailVerificationForEmailUpdate({ email }: { email: string }) {
  return request({
    url: prefix("tokens/email-change"),
    method: "POST",
    data: { email },
  });
}
