import { request } from "@/lib/axios";
import { server } from "@/lib/axios-server";

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

export function checkSession(params: { email: string; type: string; token: string }) {
  return server({
    url: prefix("tokens"),
    method: "GET",
    params,
  });
}
